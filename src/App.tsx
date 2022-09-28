import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import ShoppingBasketPage from './pages/shoppingBasketPage';

function App() {
  return (
    <BrowserRouter>
      <ShoppingBasketPage />
    </BrowserRouter>
  );
}

export default App;
