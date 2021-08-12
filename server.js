
import express from 'express';
import { bootDB } from './database';
import createRouter from './routes';

bootDB();
const PORT = process.env.PORT;
const app = express();
app.use(express.json());


createRouter(app);

app.listen(PORT, async () => {


  console.log(`Server running at http://localhost:${PORT}`);
});