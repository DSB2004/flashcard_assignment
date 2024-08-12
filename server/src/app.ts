import express from 'express'
import cors from 'cors'
import FLASHCARD_ROUTER from './routes/flashcard.routes';
import AUTH_ROUTER from './routes/auth.routes';


const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}));


app.use('/api/auth', AUTH_ROUTER);
app.use('/api/flashcard', FLASHCARD_ROUTER);




export default app;