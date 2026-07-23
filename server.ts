import express, { type Express, type Request, type Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app: Express = express();
const port = 3000;

app.use(express.json());
app.use(express.static('public'));

app.get('/', (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, 'public/mainpage.html'));
});

app.get('/lost/petsinfo', async (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, 'public/submitPetInfo.html'));
});

app.listen(port, () => { console.log(`running at ${port}`) });
