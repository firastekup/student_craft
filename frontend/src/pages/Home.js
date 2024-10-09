import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductList from '../components/ProductList';
import './Home.css';

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await axios.get('http://localhost:5000/api/products'); // Remplacez par votre API
      setProducts(response.data);
    };
    fetchProducts();
  }, []);

  return (
    <div>
      <h1>Liste des Produits</h1>
      <ProductList products={products} />
    </div>
  );
};

export default Home;
