import { Route, Routes, BrowserRouter } from 'react-router-dom';
import './App.css';
import Signin from './components/Signin';
import Signup from './components/Signup';
import HomePage from './components/HomePage';
import ProductList from './components/ProductList';
import ProductDetailPage from './components/ProductDetailPage';
import { AuthProvider } from './components/AuthContext';
import CartPage from './components/CartPage';
import CheckoutPage from './components/CheckoutPage';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AuthProvider> {/* Wrap with AuthProvider */}
          <Routes>
            <Route element={<HomePage />} path='/' />
            <Route element={<Signin />} path='/signin' />
            <Route element={<Signup />} path='/signup' />
            <Route element={<ProductList />} path='/products' />
            <Route element={<CartPage />} path='/cart' />
            <Route path="/products/:productName" element={<ProductDetailPage />} /> 
            <Route element={<CheckoutPage/>} path='/cart/checkout' />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
