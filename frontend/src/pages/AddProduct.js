import React, { useState } from 'react';
import axios from 'axios';  // Importer axios

const AddProduct = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  // Fonction de soumission du formulaire
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Créer un nouvel objet produit
    const newProduct = {
      name,
      description,
      price: parseFloat(price), // Convertir le prix en nombre
      imageUrl,
    };

    try {
      // Utilisation de axios pour faire une requête POST
      const response = await axios.post('http://localhost:3000/products', newProduct);

      if (response.status === 201) {
        alert('Produit ajouté avec succès !');
        // Réinitialiser les champs après ajout
        setName('');
        setDescription('');
        setPrice('');
        setImageUrl('');
      } else {
        alert('Erreur lors de l\'ajout du produit.');
      }
    } catch (error) {
      console.error('Erreur:', error);
      alert('Erreur de réseau. Vérifiez la connexion à l\'API.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Nom du produit:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Description:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Prix:</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
      </div>
      <div>
        <label>URL de l'image:</label>
        <input
          type="text"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />
      </div>
      <button type="submit">Ajouter le produit</button>
    </form>
  );
};

export default AddProduct;
