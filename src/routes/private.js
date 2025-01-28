import express from "express";
import { PrismaClient } from "@prisma/client";
import auth from "../middlewares/auth.js";
import path from "path";

const router = express.Router();
const prisma = new PrismaClient();
const __dirname = path.resolve();

// Middleware de autenticação
router.use(auth);

// Rotas...
router.get("/usuarios", async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.status(200).json({ message: "Usuários listados com sucesso", data: users });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao listar usuários", details: error.message });
  }
});

router.delete("/usuarios/:id", async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await prisma.user.delete({
      where: { id: userId },
    });
    res.status(200).json({ message: "Usuário deletado com sucesso", data: user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao deletar usuário", details: error.message });
  }
});

router.get("/guias.html", (req, res) => {
  const filePath = path.join(__dirname, "guias.html");
  res.sendFile(filePath);
});

export default router;
