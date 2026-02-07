# Rentofy Monorepo

Rentofy is now split into two folders:

- `backend/`: existing Node.js + Express + MongoDB backend (legacy EJS routes still present).
- `frontend/`: new React + Vite storefront with modern ecommerce-inspired UI/UX.

## Run locally

### Backend
```bash
cd backend
npm install
npm run dev
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

Set `VITE_API_URL` (frontend) if backend API URL differs from `http://localhost:3001/api`.
