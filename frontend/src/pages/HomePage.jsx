import { Link } from 'react-router-dom';

const categories = ['Photography', 'Electronics', 'Travel', 'Fashion', 'Home'];

export default function HomePage() {
  return (
    <main>
      <section className="hero">
        <div>
          <p className="badge">Trusted rental marketplace</p>
          <h2>Rent premium products for a fraction of the cost.</h2>
          <p>
            Inspired by modern ecommerce experiences, Rentofy now highlights cleaner hierarchy, stronger
            visual rhythm, and quick paths to checkout.
          </p>
          <div className="actions">
            <Link className="btn" to="/products">
              Browse Products
            </Link>
            <Link className="btn ghost" to="/auth">
              Start Renting
            </Link>
          </div>
        </div>
      </section>

      <section className="section">
        <h3>Popular Categories</h3>
        <div className="grid categories">
          {categories.map((item) => (
            <article key={item}>
              <h4>{item}</h4>
              <p>Curated picks with verified owners and fast delivery options.</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
