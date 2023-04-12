import { Router } from 'express';

export const RutaDefault = Router();

RutaDefault.get('/', (_req, _res) => {
  _res.send("Bienvenido a mi api para chat! Chat (Usuario, Mensaje) (MongoDB)");
});