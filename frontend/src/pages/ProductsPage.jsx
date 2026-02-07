import { useEffect, useState } from 'react';
import { api } from '../api';

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    api('/products')
      .then(setProducts)
      .catch((err) => setError(err.message));
  }, []);

  const addToCart = async (id) => {
    try {
      await api(`/cart/${id}`, { method: 'POST' });
      alert('Added to cart');
    } catch (err) {
      alert('Please login before adding to cart.');
    }
  };

  return (
    <main className="section">
      <h3>Explore Listings</h3>
      {error && <p className="error">{error}</p>}
      <div className="grid products">
        {products.map((item) => (
          <article className="card" key={item._id}>
            <img src={item.image} alt={item.description} />
            <div>
              <h4>{item.description}</h4>
              <p>₹{item.price}/day</p>
              <button className="btn" onClick={() => addToCart(item._id)}>
                Add to Cart
              </button>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
