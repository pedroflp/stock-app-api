import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AuthKey } from '../config/AuthKey';

interface TokenPayload {
  id: string,
  iat: number,
  exp: number,
}

export default async function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.sendStatus(401).json({ message: "Autenticação Falha!"} )
  }

  const token = authorization.replace('Bearer', '').trim()

  try {
    const data = jwt.verify(token, AuthKey);

    const { id } = data as TokenPayload;
    req.userId = id
    
    return next();
  } catch {
    return res.sendStatus(401)
  }

}
