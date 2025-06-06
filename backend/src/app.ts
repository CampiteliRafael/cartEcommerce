import express from 'express';
import userRouter from './routes/user.routes';

const app = express();
app.use(express.json());


app.use('/api/users', userRouter);

export default app;