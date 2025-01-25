import express from 'express'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const prisma = new PrismaClient()
const router = express.Router()
const jwt_secret = process.env.JWT_SECRET
const app = express()


import path from 'path';
import { fileURLToPath } from 'url';

// Configuração do __dirname para módulos ESm
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



//      CAMINHO DOS ARQUIVOS
app.use(express.static('../src'))

//ROTA INICIAL
app.get('/', (req, res) => {
    res.send.json({message: 'deu certo'});
});

//CADASTRO
router.post('/cadastro', async (req, res) => {
    try{
        const user = req.body
    
        const salt = await bcrypt.genSalt(10)//NIVEL DE DIICULDADE
        const hashPassword = await bcrypt.hash(user.password, salt)//CRYPTOGRAFANDO COM A DIFICULDADE 10
    
        const ud = await prisma.user.create({
            data: {
                email:  user.email,
                name:   user.name,
                password:  hashPassword,
                idade: user.idade,
                cidade: user.cidade
            }
        })
        res.status(201).json(ud)
    }catch{
        res.status(500).json( {menssage: "erro no servirdor"})
    }

})

//ROTA DE LOGIN
router.post('/login', async (req, res) => {
    try {
        const userInfo = req.body
        //BUSCAR O USUARIO NO DB
        const user = await prisma.user.findUnique({
            where: {name: userInfo.name},
        })

        //VERIFICA SE EXISTE NO DB
        if(!user) {
            return res.status(404).json({ message: 'Usuario não encontrado'})
        }

        //COMPARA AS SENHAS DO DB COM A DO USUARIO
        const ismash = await bcrypt.compare(userInfo.password, user.password)
        if(!ismash){
            res.status(400).json({message: 'senha invalida'})
        }

        //GERRAR O TOKEN JWT
        const token = jwt.sign({id: user.id}, jwt_secret, {expiresIn: '1d'})

        res.status(200).json(token)
    } catch{
        res.status(500)
    }
})



export default router