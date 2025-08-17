// app.js
const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const hbs = require('hbs');

dotenv.config();
require('./config/db')();

const app = express();

// Render corre detrás de proxy
app.set('trust proxy', 1);

const allowedOrigins = [
  process.env.FRONTEND_URL,             // p.ej. https://delfina-store-front.vercel.app
  'http://localhost:5173',
  'https://delfina-store-front.vercel.app',
  'https://delfina-store-front-57fs8dbe6-delfinastores-projects.vercel.app/' // por si acaso, sin barra final
].filter(Boolean);

app.use(cors({
  origin: (origin, cb) => {
    // permitir Postman/cURL (sin Origin) y orígenes válidos
    if (!origin || allowedOrigins.includes(origin)) return cb(null, true);
    return cb(new Error('CORS bloqueado para ' + origin));
  },
  credentials: true,
  methods: ['GET','POST','PUT','PATCH','DELETE','OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// ---- Middlewares base ----
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ---- Estáticos ----
app.use(express.static('public'));
// si servís imágenes subidas por backend (ojo: no persiste en plan free)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ---- HBS (si usás vistas server-side) ----
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
hbs.registerHelper('multiplicar', (a, b) => a * b);

// ---- Rutas API ----
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/productos', require('./routes/api.routes'));
app.use('/api/carrito', require('./routes/carrito.routes'));

// ---- Vistas (si las usás) ----
app.use('/', require('./routes/views.routes'));

// ---- Healthcheck ----
app.get('/health', (_req, res) => res.json({ ok: true }));

// ---- Arranque ----
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
