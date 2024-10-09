import React from 'react';
import AddProduct from './components/AddProduct';
import ProductGrid from './components/ProductGrid';

const App = () => {
  return (
    <div>
      <h1>Product Management</h1>
      <AddProduct />
      <ProductGrid />
    </div>
  );
};

export default App;
