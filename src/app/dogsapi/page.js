// app/dogimage/page.js
"use client";

import { useState, useEffect } from "react";
import styles from './DogImage.module.css'; // Asegúrate de tener este archivo CSS

export default function DogImageComponent() {
  const [dogImage, setDogImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchDogImage = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('https://dog.ceo/api/breeds/image/random');
      if (!response.ok) {
        throw new Error("Error fetching dog image");
      }
      const data = await response.json();
      setDogImage(data.message);
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchDogImage(); // Cargar la imagen de perro al montar el componente
  }, []);

  const handleFetchNewDog = () => {
    fetchDogImage(); // Generar una nueva imagen de perro al hacer clic en el botón
  };

  return (
    <div className={styles.container}>
      <h1>Dog Image</h1>

      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {dogImage && (
        <div className={styles.dogContainer}>
          <img src={dogImage} alt="A cute dog" className={styles.image} />
        </div>
      )}
      
      <button onClick={handleFetchNewDog} className={styles.button}>Get Another Dog</button> {/* Botón para obtener otra imagen */}
    </div>
  );
}
