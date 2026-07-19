import express, { type Express, type Request, type Response } from 'express';
import { getInfo } from './getInfo.ts';

const app: Express = express();
const port = 3000;

app.use(express.json());
app.use(express.static('public'));

app.get('/', (req: Request, res: Response) => {
	res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.get('/lost/petsinfo', async (req: Request, res: Response) => {
	const { data, error } = await getInfo();
	if (error) {
  		res.status(500).json({ error: error.message });
  		return;
	}
	res.json(data);
});

app.listen(port, () => { console.log(`running at ${port}`) });
