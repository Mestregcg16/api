import jwt from 'jsonwebtoken'

import express from 'express';



const app = express();
app.use(express.json());


const jwt_secret = process.env.jwt_secret

const auth = (req, res, next) => {
    const token = req.headers.authorization

    if(!token) {
        return res.status(401).json({ message: 'Acesso Negado!'})
    }

    try {
        const decoded = jwt.verify(token.replace('Bearer ', ''), jwt_secret)
        console.log(decoded)
        req.userId = decoded.id
        next()
    } catch (error) {
        return res.status(401).json({ message: 'Token Invalido!'})
    }
   
}


export default auth