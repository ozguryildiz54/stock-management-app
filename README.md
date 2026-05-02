# Stock Management App

Full-stack inventory and sales management application — Node.js / Express REST API with MongoDB, paired with a Vite + React + Redux Toolkit dashboard.

> 🔗 **Live Demo:** https://stock-client-brown.vercel.app
> 📡 **API:** https://stock-api-wine.vercel.app
> 🔑 **Test credentials:** `demo@demo.com / Demo1234!`

## 🚀 Deploy in 5 Minutes

[![Deploy Backend with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fozguryildiz54%2Fstock-management-app&env=MONGODB,SECRET_KEY,ACCESS_KEY,REFRESH_KEY,NODE_ENV&envDescription=Atlas%20connection%20string%20%2B%20three%20random%20JWT%20secrets&project-name=stock-api&repository-name=stock-api)

[![Deploy Frontend with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fozguryildiz54%2Fstock-management-app&root-directory=client&env=VITE_BASE_URL&envDescription=Backend%20URL%20from%20step%201&project-name=stock-client&repository-name=stock-client)

**Steps:**
1. Create a free [MongoDB Atlas M0 cluster](https://www.mongodb.com/cloud/atlas/register), grab the connection string.
2. Click **Deploy Backend** above → set `MONGODB`, `SECRET_KEY`, `ACCESS_KEY`, `REFRESH_KEY`, `NODE_ENV=production` → deploy.
3. Click **Deploy Frontend** above → set `VITE_BASE_URL=<backend URL from step 2>/` → deploy.
4. Visit the frontend URL, register the demo user `demo@demo.com / demo1234`.

## ✨ Features

**Backend (Node.js / Express / MongoDB)**
- JWT + Token-based authentication
- Role-based permissions (admin / staff / user)
- CRUD for products, brands, firms, categories, sales, purchases
- File upload (Multer) for product images
- Email verification (Nodemailer)
- Pagination, sorting, search, filtering middleware
- Swagger / Redoc API documentation
- Centralized error handling and request logging

**Frontend (Vite / React / Redux Toolkit / Tailwind)**
- Login + Register flows with form validation
- Dashboard with KPI cards and charts (Recharts)
- Pages: Brands, Firms, Products, Sales, Purchases
- Custom hooks: `useAuthCall`, `useStockCall`, `useAxios`, `apiCall`
- Toast notifications, error boundary, protected routes

## 🧰 Stack

`Node.js` · `Express` · `MongoDB` · `Mongoose` · `JWT` · `Multer` · `Nodemailer` · `Swagger` · `Redoc` · `Vite` · `React` · `Redux Toolkit` · `React Router` · `Tailwind CSS` · `MUI` · `Recharts`

## 🗂 Project Layout

```
.
├── src/
│   ├── configs/         # DB, Swagger
│   ├── controllers/     # auth, brand, category, firm, product, purchase, sale, token, user
│   ├── helpers/         # customError, dummyData, passwordEncrypt, sendMail, sync
│   ├── middlewares/     # authentication, errorHandler, logger, permissions, queryHandler, upload
│   ├── models/          # brand, category, firm, product, purchase, sale, token, user
│   └── routes/
├── client/              # Vite + React + Redux Toolkit + Tailwind
└── index.js
```

## 🚀 Run Locally

**Backend**
```bash
pnpm install
cp .env.example .env   # add MONGODB_URI, SECRET_KEY, ACCESS_KEY, REFRESH_KEY, PAGE_SIZE
pnpm dev
```

**Frontend**
```bash
cd client
pnpm install
pnpm dev
```

API docs available at `http://localhost:8000/documents/swagger`.

## 📫 Contact

- **GitHub:** [@ozguryildiz54](https://github.com/ozguryildiz54)
- **LinkedIn:** [linkedin.com/in/ozguryildiz0](https://www.linkedin.com/in/ozguryildiz0)
