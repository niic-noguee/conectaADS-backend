import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient(); // Cria uma instância do Prisma Client
const router = express.Router(); // Cria uma instância de um roteador do express

const JWT_SECRET = process.env.JWT_SECRET; 

// Rota para cadastrar usuário
router.post('/cadastro', async (req, res) => { 
   try {
      const user = req.body;

      const salt = await bcrypt.genSalt(10); // Gera um salt para a criptografia
      const hashPassword = await bcrypt.hash(user.password, salt); // Criptografa a senha

      const userDB = await prisma.user.create({ 
         data: {
            email: user.email,
            name: user.name,
            password: hashPassword,
         },
      });
      res.status(201).json(userDB);
   } catch (error) {
      console.error(error);
    res.status(500).json({ error: 'Erro interno do servidor: ' + error.message }); 
   }
});

// Rota para logar usuário
router.post('/login', async (req, res) => {
   try {
      const userInfor = req.body;

      const user = await prisma.user.findUnique({
         where: {
            email: userInfor.email,
         },
      });

      if (!user) {
         return res.status(404).json({ error: 'Usuário não encontrado' });
      }

      const validPassword = await bcrypt.compare(userInfor.password, user.password);

      if (!validPassword) {
         return res.status(400).json({ error: 'Senha inválida' });
      }

      const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '30d' }); // Gera um token de autenticação que deixa o usuario logado por 30 dias

      res.status(200).json({ message: 'Login efetuado com sucesso', token: token });
   } catch (error) {
      console.error(error);
    res.status(500).json({ error: 'Erro interno do servidor: ' + error.message }); 
   }
});

export default router; // Exporta o roteador para ser utilizado em outros arquivos
