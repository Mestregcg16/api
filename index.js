import express, { json } from 'express';
import publicRoutes from './routes/public.js'
import privateRoutes from './routes/privat.js'
import auth from './middlewares/auth.js';

const PORT = process.env.PORT || 3000;


const app = express();
app.use(express.json());

app.use('/', publicRoutes)
app.use('/', auth, privateRoutes)



app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));