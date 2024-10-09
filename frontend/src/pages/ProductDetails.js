import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProductDetails = ({ match }) => {
  const [product, setProduct] = useState(null);
  
  useEffect(() => {
    const fetchProduct = async () => {
      const response = await axios.get(`http://localhost:5000/api/products/${match.params.id}`); // Remplacez par votre API
      setProduct(response.data);
    };
    fetchProduct();
  }, [match.params.id]);

  if (!product) return <div>Loading...</div>;

  return (
    <div>
      <h1>{product.name}</h1>
      <p>Prix: {product.price}€</p>
      <p>Description: {product.description}</p>
      <button>Ajouter au Panier</button>
    </div>
  );
};

export default ProductDetails;
