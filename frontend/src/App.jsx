import { Link, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import CartPage from './pages/CartPage';
import AuthPage from './pages/AuthPage';

export default function App() {
  return (
    <div>
      <header className="nav">
        <h1>Rentofy</h1>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/products">Explore</Link>
          <Link to="/cart">Cart</Link>
          <Link to="/auth">Login</Link>
        </nav>
      </header>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/auth" element={<AuthPage />} />
      </Routes>
    </div>
  );
}
