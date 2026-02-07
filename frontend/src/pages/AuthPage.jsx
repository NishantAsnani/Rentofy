import { useState } from 'react';
import { api } from '../api';

export default function AuthPage() {
  const [mode, setMode] = useState('login');
  const [form, setForm] = useState({ email: '', password: '', Firstname: '', Lastname: '' });
  const [message, setMessage] = useState('');

  const submit = async (event) => {
    event.preventDefault();
    try {
      if (mode === 'login') {
        await api('/auth/login', { method: 'POST', body: JSON.stringify({ email: form.email, password: form.password }) });
        setMessage('Logged in successfully.');
      } else {
        const data = new FormData();
        Object.entries(form).forEach(([key, value]) => data.append(key, value));
        await api('/auth/signup', { method: 'POST', body: data });
        setMessage('Account created. Please login.');
        setMode('login');
      }
    } catch (err) {
      setMessage('Authentication failed.');
    }
  };

  return (
    <main className="section auth">
      <h3>{mode === 'login' ? 'Welcome back' : 'Create account'}</h3>
      <form onSubmit={submit}>
        {mode === 'signup' && (
          <>
            <input placeholder="First name" onChange={(e) => setForm({ ...form, Firstname: e.target.value })} required />
            <input placeholder="Last name" onChange={(e) => setForm({ ...form, Lastname: e.target.value })} required />
          </>
        )}
        <input type="email" placeholder="Email" onChange={(e) => setForm({ ...form, email: e.target.value })} required />
        <input type="password" placeholder="Password" onChange={(e) => setForm({ ...form, password: e.target.value })} required />
        <button className="btn" type="submit">
          {mode === 'login' ? 'Login' : 'Signup'}
        </button>
      </form>
      <button className="link" onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}>
        {mode === 'login' ? 'Need an account? Sign up' : 'Already have an account? Login'}
      </button>
      {message && <p>{message}</p>}
    </main>
  );
}
