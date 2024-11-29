import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

// Middleware para verificar se o usuário está autenticado
const auth = (req, res, next) => {
   const token = req.headers.authorization;

   if (!token) {
      return res.status(401).json({ error: 'Acesso negado' });
   }

   try {
      const decoded = jwt.verify(token.replace('Bearer ', ''), JWT_SECRET);

      req.userId = decoded.id;
   } catch (error) {
      return res.status(401).json({ error: 'Token Inválido' });
   }
   next(); 
};

export default auth;