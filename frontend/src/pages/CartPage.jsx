import { useEffect, useState } from 'react';
import { api } from '../api';

export default function CartPage() {
  const [cart, setCart] = useState({ items: [], totalPrice: 0 });
  const [error, setError] = useState('');

  const loadCart = () => {
    api('/cart')
      .then(setCart)
      .catch(() => setError('Please login to view your cart.'));
  };

  useEffect(() => {
    loadCart();
  }, []);

  const removeItem = async (id) => {
    await api(`/cart/${id}`, { method: 'DELETE' });
    loadCart();
  };

  return (
    <main className="section">
      <h3>Your Cart</h3>
      {error && <p className="error">{error}</p>}
      {cart.items.map((item) => (
        <article className="row" key={item._id}>
          <span>{item.description}</span>
          <span>₹{item.price}</span>
          <button className="btn ghost" onClick={() => removeItem(item._id)}>
            Remove
          </button>
        </article>
      ))}
      <h4>Total: ₹{cart.totalPrice}</h4>
    </main>
  );
}
