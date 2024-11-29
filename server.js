import express from "express";
import publicRoutes from "./src/routes/public.js";
import privateRoutes from "./src/routes/private.js";
import { PrismaClient } from '@prisma/client'; // Adicione essa linha

const prisma = new PrismaClient(); // Cria uma instância do Prisma Client
const app = express(); // Cria uma instância do express
app.use(express.json()); // Habilita o uso de JSON no corpo das requisições

app.use('/', publicRoutes); 
app.use('/', privateRoutes); 

app.listen(3000, () => {
   console.log('Server running on port 3000🚀');
});