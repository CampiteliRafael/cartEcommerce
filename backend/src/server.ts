import app from './app';
import connectDB from './config/db';

const PORT = process.env.PORT || 3001;

const startServer = async () => {
    await connectDB();
    app.listen(PORT, () => {
        console.log(`Servidor rodando na porta ${PORT}`);
    });
};

startServer();