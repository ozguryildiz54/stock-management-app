"use strict";
const express = require("express");
const path = require("node:path");
const app = express();

/* ------------------------------------------------------- */
// Required Modules:

// envVariables to process.env:
require("dotenv").config();
const HOST = process.env?.HOST || "127.0.0.1";
const PORT = process.env?.PORT || 8000;

app.set("query parser", "extended");
/* ------------------------------------------------------- */
// Configrations:

// Connect to DB:
const { dbConnection } = require("./src/configs/dbConnection");
dbConnection();

/* ------------------------------------------------------- */
// Middlewares:

// Accept JSON:
app.use(express.json());

// Cors:
const corsOptions = {
  origin: [
    "http://localhost:5173",
    "https://stock-client-brown.vercel.app",
    /\.vercel\.app$/,
  ],
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
  optionsSuccessStatus: 204,
};
const cors = require("cors");
app.use(cors(corsOptions));

// Check Authentication:
app.use(require("./src/middlewares/authentication"));

// Run Logger:
app.use(require("./src/middlewares/logger"));

// Query Handler:
app.use(require("./src/middlewares/queryHandler"));

/* ------------------------------------------------------- */
// Routes:

// HomePath: friendly landing for browsers (recruiters), JSON for clients
app.get("/", (req, res) => {
  if (req.accepts("html")) {
    return res.send(`<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1"/>
<title>Stock Management App | Ozgur Yildiz</title>
<meta property="og:title" content="Stock Management App, a full-stack MERN project" />
<meta property="og:description" content="Inventory and sales management system with secure login, role-based access, a dashboard and charts. Live demo: demo@demo.com / Demo1234!" />
<meta property="og:image" content="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&h=630&fit=crop" />
<meta property="og:url" content="https://ozguryildiz-stock-api.vercel.app" />
<style>
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif;background:linear-gradient(135deg,#0f766e 0%,#0d9488 100%);min-height:100vh;padding:2rem 1rem;color:#1a1a1a}
.container{max-width:760px;margin:0 auto;background:white;border-radius:16px;padding:2.5rem;box-shadow:0 20px 60px rgba(0,0,0,.3)}
h1{font-size:2.25rem;margin-bottom:.5rem;line-height:1.15}
.subtitle{color:#555;margin-bottom:1.75rem;font-size:1.05rem;line-height:1.55}
.badge{display:inline-block;background:#16a34a;color:white;padding:.2rem .7rem;border-radius:999px;font-size:.8rem;font-weight:600;margin-left:.4rem;vertical-align:middle}
.primary-btn{display:block;text-align:center;background:#0f766e;color:white;text-decoration:none;font-weight:700;font-size:1.05rem;padding:1rem 1.5rem;border-radius:10px;transition:transform .15s,box-shadow .15s}
.primary-btn:hover{transform:translateY(-2px);box-shadow:0 10px 24px rgba(15,118,110,.35)}
.creds-line{text-align:center;color:#555;font-size:.9rem;margin:.85rem 0 2rem}
.creds-line code{background:#f3f4f6;padding:.12rem .45rem;border-radius:4px;font-size:.85rem}
.section-title{font-size:1.15rem;margin-bottom:1rem;color:#0f766e}
.feature-list{list-style:none;margin-bottom:2rem}
.feature-list li{padding:.55rem 0 .55rem 1.6rem;position:relative;color:#444;line-height:1.5;border-bottom:1px solid #f0f0f0}
.feature-list li:last-child{border-bottom:none}
.feature-list li:before{content:"✓";position:absolute;left:0;color:#16a34a;font-weight:700}
.feature-list strong{color:#1a1a1a}
.divider{border:none;border-top:1px solid #e5e7eb;margin:2rem 0}
.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:1rem;margin-bottom:1.5rem}
.card{background:#f3f4f6;padding:1.25rem;border-radius:8px;text-decoration:none;color:inherit;transition:transform .15s,box-shadow .15s;display:block}
.card:hover{transform:translateY(-2px);box-shadow:0 8px 20px rgba(0,0,0,.1)}
.card .label{font-weight:700;color:#0f766e;margin-bottom:.25rem}
.card .desc{font-size:.85rem;color:#555}
.dev-note{color:#6b7280;font-size:.85rem;margin-bottom:1rem}
.dev-note code{background:#f3f4f6;padding:.12rem .45rem;border-radius:4px}
.endpoints{background:#1f2937;color:#e5e7eb;padding:1.25rem 1.5rem;border-radius:8px;font-family:"SF Mono",Consolas,monospace;font-size:.85rem;line-height:1.7;overflow-x:auto}
.endpoints span.m{color:#fbbf24}
.endpoints span.p{color:#60a5fa}
footer{margin-top:2rem;padding-top:1.5rem;border-top:1px solid #e5e7eb;color:#6b7280;font-size:.85rem;text-align:center}
footer a{color:#0f766e}
</style>
</head>
<body>
  <div class="container">
    <h1>🛒 Stock Management App <span class="badge">Live</span></h1>
    <p class="subtitle">An inventory and sales management system. Track products, suppliers, purchases and sales, all behind a secure login with a dashboard.</p>

    <a class="primary-btn" href="https://ozguryildiz-stock.vercel.app">▶  Open the live app</a>
    <p class="creds-line">Demo login: <code>demo@demo.com</code> / <code>Demo1234!</code> &nbsp; (the login screen also shows these)</p>

    <h2 class="section-title">What this project shows</h2>
    <ul class="feature-list">
      <li><strong>Secure login</strong> with role-based access for admin and staff users.</li>
      <li><strong>Inventory management</strong> for products, brands, categories and suppliers.</li>
      <li><strong>Sales and purchase records</strong> that keep stock counts up to date.</li>
      <li><strong>A dashboard with charts</strong> built in React, Redux Toolkit and Recharts.</li>
      <li><strong>A documented REST API</strong> on the back end with Node, Express and MongoDB.</li>
    </ul>

    <hr class="divider"/>

    <h2 class="section-title">For developers</h2>
    <div class="grid">
      <a class="card" href="/api/documents/swagger"><div class="label">📘 API documentation</div><div class="desc">Interactive Swagger UI</div></a>
      <a class="card" href="https://github.com/yldzozgur/stock-management-app"><div class="label">⌨ Source code</div><div class="desc">github.com/yldzozgur</div></a>
      <a class="card" href="https://ozguryildiz-stock.vercel.app"><div class="label">🌐 Frontend app</div><div class="desc">React + Redux + Recharts</div></a>
    </div>

    <p class="dev-note">Demo credentials for direct API calls: <code>demo@demo.com</code> / <code>Demo1234!</code></p>

    <div class="endpoints">
<span class="m">POST</span>   <span class="p">/api/auth/login</span>           Login, returns JWT + refresh token
<span class="m">GET</span>    <span class="p">/api/products</span>             List products (auth)
<span class="m">GET</span>    <span class="p">/api/brands</span>               List brands (auth)
<span class="m">GET</span>    <span class="p">/api/categories</span>           List categories (auth)
<span class="m">GET</span>    <span class="p">/api/firms</span>                List suppliers (auth)
<span class="m">GET</span>    <span class="p">/api/purchases</span>            List purchases (auth)
<span class="m">GET</span>    <span class="p">/api/sales</span>                List sales (auth)
<span class="m">GET</span>    <span class="p">/api/users</span>                List users (admin)
    </div>

    <footer>
      Built by <a href="https://github.com/yldzozgur">Ozgur Yildiz</a> · Node + Express · MongoDB Atlas · deployed on Vercel
    </footer>
  </div>
</body>
</html>`);
  }
  res.json({
    error: false,
    message: "Welcome to Stock Management API",
    frontend: "https://ozguryildiz-stock.vercel.app",
    demo: { email: "demo@demo.com", password: "Demo1234!", role: "admin" },
    endpoints: {
      login: "POST /api/auth/login",
      products: "GET /api/products",
      brands: "GET /api/brands",
      categories: "GET /api/categories",
      firms: "GET /api/firms",
      purchases: "GET /api/purchases",
      sales: "GET /api/sales",
    },
  });
});

// Static Route:
app.use("/upload", express.static("./upload"));

// Routes:
app.use("/api", require("./src/routes"));

const distPath = path.join(__dirname, "client", "dist");
app.use(express.static(distPath));

app.use("/*splat", (req, res) => {
  if (req.path.startsWith("/api")) {
    res.status(404).send({
      error: true,
      message: "Route is not found",
    });
  } else {
    res.sendFile(path.join(distPath, "index.html"));
  }
});

/* ------------------------------------------------------- */

// errorHandler:
app.use(require("./src/middlewares/errorHandler"));

// RUN SERVER:
app.listen(PORT, HOST, () => console.log(`http://${HOST}:${PORT}`));

/* ------------------------------------------------------- */
// Syncronization (must be in commentLine):
// require('./src/helpers/sync')() // !!! It clear database.
