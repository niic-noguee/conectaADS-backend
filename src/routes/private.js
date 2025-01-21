import express from "express";
import { PrismaClient } from '@prisma/client';
import auth from "../middlewares/auth.js"; // Middleware de autenticação

const router = express.Router();
const prisma = new PrismaClient();

router.use(auth); // Aplica autenticação a todas as rotas abaixo

// Rota para listar usuários
router.get('/usuarios', async (req, res) => {
   try {
      const users = await prisma.user.findMany();
      res.status(200).json({ message: 'Usuários listados com sucesso', data: users });
   } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao listar usuários', details: error.message });
   }
});

// Rota para deletar usuário
router.delete('/usuarios/:id', async (req, res) => {
   const userId = req.params.id;

   try {
      const user = await prisma.user.delete({
         where: {
            id: userId, // Certifica-se de que o id é tratado como String
         },
      });

      res.status(200).json({ message: 'Usuário deletado com sucesso', data: user });
   } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao deletar usuário', details: error.message });
   }
});

export default router; // Exporta o roteador para ser utilizado em outros arquivos
