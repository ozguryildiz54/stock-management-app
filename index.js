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
<title>Stock Management System | Ozgur Yildiz</title>
<meta property="og:title" content="Stock Management System, a project by Ozgur Yildiz" />
<meta property="og:description" content="An inventory and sales management system: products, suppliers, purchases and sales, with a dashboard. Full-stack, live and explorable." />
<meta property="og:image" content="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&h=630&fit=crop" />
<meta property="og:url" content="https://ozguryildiz-stock-api.vercel.app" />
<meta property="og:type" content="website" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="Stock Management System" />
<meta name="twitter:description" content="An inventory and sales management system. Full-stack, live and explorable." />
<meta name="twitter:image" content="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&h=630&fit=crop" />
<style>
  *{box-sizing:border-box;margin:0;padding:0}
  body{font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif;background:#fff;color:#1a1a1a}
  .hero{background:linear-gradient(135deg,#0f766e 0%,#0d9488 100%);color:#fff;text-align:center;padding:4.5rem 1.5rem 5.5rem}
  .live{display:inline-flex;align-items:center;gap:.45rem;background:rgba(255,255,255,.18);padding:.32rem .9rem;border-radius:999px;font-size:.8rem;font-weight:600;margin-bottom:1.4rem}
  .live .dot{width:7px;height:7px;border-radius:50%;background:#4ade80;box-shadow:0 0 0 3px rgba(74,222,128,.35)}
  .hero .ic{font-size:4.5rem;line-height:1}
  .hero h1{font-size:clamp(2rem,5vw,3.1rem);font-weight:800;margin:.7rem 0 .6rem;letter-spacing:-.02em}
  .hero p{font-size:1.15rem;opacity:.93;max-width:31rem;margin:0 auto 2rem;line-height:1.55}
  .cta{display:inline-block;background:#fff;color:#0f766e;font-weight:700;font-size:1.05rem;padding:.95rem 2.1rem;border-radius:999px;text-decoration:none;box-shadow:0 10px 30px rgba(0,0,0,.22);transition:transform .15s}
  .cta:hover{transform:translateY(-2px)}
  .features{max-width:940px;margin:-3rem auto 0;padding:0 1.5rem;display:grid;grid-template-columns:repeat(4,1fr);gap:1.1rem}
  .feature{background:#fff;border:1px solid #eee;border-radius:16px;padding:1.9rem 1rem;text-align:center;box-shadow:0 8px 24px rgba(0,0,0,.07)}
  .feature .fi{font-size:2.6rem;line-height:1}
  .feature .ft{font-weight:700;margin-top:.7rem;font-size:1.02rem}
  .feature .fd{color:#888;font-size:.82rem;margin-top:.25rem}
  .devbar{max-width:940px;margin:3rem auto 0;padding:1.75rem 1.5rem 3rem;border-top:1px solid #eee;text-align:center;color:#999;font-size:.85rem;line-height:1.8}
  .devbar a{color:#0f766e;text-decoration:none;margin:0 .5rem;font-weight:600}
  .devbar code{background:#f3f4f6;color:#555;padding:.1rem .4rem;border-radius:4px}
  @media(max-width:720px){.features{grid-template-columns:repeat(2,1fr)}}
</style>
</head>
<body>
  <div class="hero">
    <span class="live"><span class="dot"></span> Live</span>
    <div class="ic">🛒</div>
    <h1>Stock Management System</h1>
    <p>A full-stack inventory and sales platform: track products, suppliers, purchases and sales from one dashboard.</p>
    <a class="cta" href="https://ozguryildiz-stock.vercel.app">▶  Open the live app</a>
  </div>

  <div class="features">
    <div class="feature"><div class="fi">🔐</div><div class="ft">Secure accounts</div><div class="fd">Login with roles</div></div>
    <div class="feature"><div class="fi">📦</div><div class="ft">Inventory</div><div class="fd">Products &amp; suppliers</div></div>
    <div class="feature"><div class="fi">🛒</div><div class="ft">Sales &amp; purchases</div><div class="fd">Live stock counts</div></div>
    <div class="feature"><div class="fi">📊</div><div class="ft">Dashboard</div><div class="fd">Charts &amp; KPIs</div></div>
  </div>

  <div class="devbar">
    <div><a href="/api/documents/swagger">API documentation</a> · <a href="https://github.com/yldzozgur/stock-management-app">Source code</a></div>
    Demo login <code>demo@demo.com</code> / <code>Demo1234!</code><br/>
    Built by Ozgur Yildiz · React, Node, Express, MongoDB Atlas · deployed on Vercel
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
