
"use client";

import { useState, useEffect } from "react";
import styles from './Maps.module.css'; 

export default function MapsComponent() {
  const [location, setLocation] = useState({ lat: 0, lng: 0 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [mapUrl, setMapUrl] = useState("");

  const fetchRandomLocation = async () => {
    setLoading(true);
    setError(null);
    try {
      
      const randomLat = (Math.random() * 180 - 90).toFixed(6);
      const randomLng = (Math.random() * 360 - 180).toFixed(6);
      setLocation({ lat: randomLat, lng: randomLng });

      
      setMapUrl(`https://maps.google.com/maps?q=${randomLat},${randomLng}&output=embed`);
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchRandomLocation();
  }, []);

  return (
    <div className={styles.container}>
      <h1>locacion random</h1>
      
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      
      <div className={styles.mapContainer}>
        <iframe
          src={mapUrl}
          width="600"
          height="450"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          title="Mapa"
        ></iframe>
      </div>

      <button onClick={fetchRandomLocation} className={styles.button}>Random </button> 
    </div>
  );
}
