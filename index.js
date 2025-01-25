import express, { json } from 'express';
import publicRoutes from './routes/public.js'
import privateRoutes from './routes/privat.js'
import auth from './middlewares/auth.js';
import cors from 'cors'

const PORT = process.env.PORT || 3001;

// Permitir todas as origens
app.use(cors());

// Ou, se quiser permitir apenas a origem específica
app.use(cors({
  origin: 'http://localhost:5173',
}));

const app = express();
app.use(express.json());

app.use('/', publicRoutes)
app.use('/', auth, privateRoutes)



app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));