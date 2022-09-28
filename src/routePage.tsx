import { Routes, Route } from 'react-router-dom';
import ShoppingBasketPage from 'pages/shoppingBasketPage';
import SelectItemPage from 'pages/selectItemPage';
import SelectSalesPage from 'pages/selectSalesPage';

function RoutePage() {
  return (
    <Routes>
      <Route path="/" element={<ShoppingBasketPage />}></Route>
      <Route path="/select-items" element={<SelectItemPage />}></Route>
      <Route path="/select-sales" element={<SelectSalesPage />}></Route>
    </Routes>
  );
}

export default RoutePage;
