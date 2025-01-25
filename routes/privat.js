import express from 'express'
import { PrismaClient } from '@prisma/client'

const router = express.Router()
const prisma = new PrismaClient()

router.get('/listar-usuarios', async (req, res) => {
    try {
        const user = await prisma.user.findMany({ omit: { password: true}})
       
        res.status(200).json({ message: 'USUARIOS LISTADOS', user})
    } catch (error) {
        res.status(500).json({ message:'FALHA NO SERVIDOR'})
    }
})
//CATALOGo
router.get('/catalogo', async (req, res) => {
    try {
        const jogos = await prisma.user.findMany()
    } catch (error) {
        res.status(500).json({message: 'não foi possiel listar os jogos'})
    }
})
router.get('/JogoDaVelha', async (req, res) => {
    
})

export default router