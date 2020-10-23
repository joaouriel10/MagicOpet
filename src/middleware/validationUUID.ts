import {Request, Response, NextFunction} from 'express';


export default function validationUuid(request: Request, response: Response, next: NextFunction): any {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    return response.status(400).json({ status: "false", message: "Favor enviar um Authorization com um uuid no header" });
  }

  if (authHeader !== '9fc982d0-8c55-4ec6-81d8-7efa5410b0bf') {
    return response.status(400).json({ status: "false", message: "Favor enviar um Authorization com um uuid no header (UUID está no README)" });
  }

  next();
}
