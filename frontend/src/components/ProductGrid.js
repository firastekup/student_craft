import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductGrid = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const result = await axios.get('http://localhost:3000/products');
      setProducts(result.data);
    };
    fetchProducts();
  }, []);

  return (
    <div>
      <h2>Product List</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {products.map((product) => (
          <div key={product.id} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
            <img src={product.imageUrl} alt={product.name} style={{ width: '100px' }} />
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p>${product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;
