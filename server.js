import express from "express";
import cors from "cors"
import publicRoutes from "./src/routes/public.js";
import privateRoutes from "./src/routes/private.js";
import { PrismaClient } from '@prisma/client'; 

const prisma = new PrismaClient(); 
const app = express(); 
app.use(cors()); 
app.use(express.json()); 
app.use('/', publicRoutes); 
app.use('/', privateRoutes); 

app.listen(3000, () => {
   console.log('Server running on port 3000🚀');
});