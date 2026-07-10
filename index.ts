import { type Request, type Response } from 'express';

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});
