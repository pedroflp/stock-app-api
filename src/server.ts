import express, { Request, Response } from 'express';

const app = express();

app.get('/', (rep: Request, res: Response) => {
  return res.send('📦 Estoque...');
});

app.listen(3333);