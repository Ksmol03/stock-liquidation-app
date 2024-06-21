import express from 'express';
import cookieParser from 'cookie-parser';
import { router as apiRouter } from './routes/api.router.js';

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cookieParser());
app.use(express.json())

app.use('/api', apiRouter);

app.listen(PORT, () => {
    console.log(`App is listening on http://localhost:${PORT}`)
})