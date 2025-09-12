import { Request, Response, NextFunction } from "express";
import { verifyJwt } from "../utils/jwt.utils";

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        res.status(401).send('Acesso não autorizado: Token não fornecido ou malformado.');
        return;
    }

    const token = authHeader.split(' ')[1];

    const { decoded, expired } = verifyJwt(token);

    if (expired) {
        res.status(401).send('Acesso não autorizado: Token expirado.');
        return;
    }

    if (!decoded) { 
        res.status(401).send('Acesso não autorizado: Token inválido.');
        return;
     }

     res.locals.user = decoded;

     return next();
}

export default authMiddleware;