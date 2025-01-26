import express, { json } from 'express';
import publicRoutes from './routes/public.js'
import privateRoutes from './routes/privat.js'
import auth from './middlewares/auth.js';
const cors = require('cors');



const app = express();
app.use(express.json());

app.use('/', publicRoutes)
app.use('/', auth, privateRoutes)
app.use(cors());


app.listen({
    host: '0.0.0.0',
    port: process.env.PORT ? Number(process.env.PORT) : 3000,
}).then(() => {
    console.log(`Servidor rodando na porta ${PORT}`)
});