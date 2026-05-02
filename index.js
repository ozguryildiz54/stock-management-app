"use strict";
/* -------------------------------------------------------
    | FULLSTACK TEAM | NODEJS / EXPRESS |
------------------------------------------------------- */
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

// HomePath — friendly landing for browsers (recruiters), JSON for clients
app.get("/", (req, res) => {
  if (req.accepts("html")) {
    return res.send(`<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1"/>
<title>Stock Management API — Ozgur Yildiz</title>
<meta property="og:title" content="🛒 Stock Management API — REST + JWT" />
<meta property="og:description" content="Backend API for the Stock Management App. JWT auth, role-based permissions, Multer uploads, Swagger docs. Demo: demo@demo.com / Demo1234!" />
<meta property="og:image" content="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&h=630&fit=crop" />
<meta property="og:url" content="https://ozguryildiz-stock-api.vercel.app" />
<style>
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif;background:linear-gradient(135deg,#0f766e 0%,#0d9488 100%);min-height:100vh;padding:2rem 1rem;color:#1a1a1a}
.container{max-width:800px;margin:0 auto;background:white;border-radius:16px;padding:2.5rem;box-shadow:0 20px 60px rgba(0,0,0,.3)}
h1{font-size:2.5rem;margin-bottom:.5rem}
.subtitle{color:#666;margin-bottom:2rem}
.badge{display:inline-block;background:#16a34a;color:white;padding:.25rem .75rem;border-radius:999px;font-size:.85rem;font-weight:600;margin-left:.5rem;vertical-align:middle}
.frontend-cta{background:#fef3c7;border-left:4px solid #f59e0b;padding:1rem 1.5rem;border-radius:8px;margin-bottom:2rem}
.frontend-cta strong{display:block;margin-bottom:.25rem;color:#78350f}
.frontend-cta a{color:#78350f;font-weight:600}
.creds{background:#dbeafe;border-left:4px solid #2563eb;padding:1rem 1.5rem;border-radius:8px;margin-bottom:2rem}
.creds strong{display:block;margin-bottom:.5rem;color:#1e3a8a}
.creds code{background:white;padding:.15rem .5rem;border-radius:4px}
.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:1rem;margin-bottom:2rem}
.card{background:#f3f4f6;padding:1.25rem;border-radius:8px;text-decoration:none;color:inherit;transition:transform .15s,box-shadow .15s;display:block}
.card:hover{transform:translateY(-2px);box-shadow:0 8px 20px rgba(0,0,0,.1)}
.card .label{font-weight:700;color:#0f766e;margin-bottom:.25rem}
.card .desc{font-size:.85rem;color:#555}
.endpoints{background:#1f2937;color:#e5e7eb;padding:1.25rem 1.5rem;border-radius:8px;font-family:"SF Mono",Consolas,monospace;font-size:.85rem;line-height:1.7;overflow-x:auto}
.endpoints span.m{color:#fbbf24}
.endpoints span.p{color:#60a5fa}
footer{margin-top:2rem;padding-top:1.5rem;border-top:1px solid #e5e7eb;color:#6b7280;font-size:.85rem;text-align:center}
footer a{color:#0f766e}
</style>
</head>
<body>
  <div class="container">
    <h1>🛒 Stock Management API <span class="badge">Live</span></h1>
    <p class="subtitle">Backend REST API for the Stock Management Full-Stack MERN application.</p>

    <div class="frontend-cta">
      <strong>👉 Looking for the full app with UI?</strong>
      Open the <a href="https://ozguryildiz-stock.vercel.app">Live Frontend Dashboard</a> — login banner shows demo creds.
    </div>

    <div class="creds">
      <strong>🔑 Demo Login (for direct API use)</strong>
      Email: <code>demo@demo.com</code> &nbsp; Password: <code>Demo1234!</code> &nbsp; Role: <code>admin</code>
    </div>

    <div class="grid">
      <a class="card" href="https://ozguryildiz-stock.vercel.app"><div class="label">🌐 Frontend Dashboard</div><div class="desc">Full UI with Redux + Recharts</div></a>
      <a class="card" href="/api/products"><div class="label">📦 GET /api/products</div><div class="desc">9 sample products (auth)</div></a>
      <a class="card" href="/api/firms"><div class="label">🏪 GET /api/firms</div><div class="desc">3 firms (auth)</div></a>
      <a class="card" href="https://github.com/ozguryildiz54/stock-management-app"><div class="label">⌨ Source Code</div><div class="desc">github.com/ozguryildiz54</div></a>
    </div>

    <div class="endpoints">
<span class="m">POST</span>   <span class="p">/api/auth/login</span>           Login → JWT + refresh token
<span class="m">GET</span>    <span class="p">/api/products</span>             List products (auth)
<span class="m">GET</span>    <span class="p">/api/brands</span>               List brands (auth)
<span class="m">GET</span>    <span class="p">/api/categories</span>           List categories (auth)
<span class="m">GET</span>    <span class="p">/api/firms</span>                List firms (auth)
<span class="m">GET</span>    <span class="p">/api/purchases</span>            List purchases (auth)
<span class="m">GET</span>    <span class="p">/api/sales</span>                List sales (auth)
<span class="m">GET</span>    <span class="p">/api/users</span>                List users (admin)
    </div>

    <footer>
      Built by <a href="https://github.com/ozguryildiz54">Ozgur Yildiz</a> · Deployed on Vercel · MongoDB Atlas
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
