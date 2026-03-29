import express from 'express';
import dotenv from 'dotenv';
import { connectToDatabase, closeDatabaseConnection } from './db/index.js';
import productRoutes from './routes/productRoutes.js';
import { errorHandler } from './middleware/errorMiddleware.js';

dotenv.config();
const app = express();
app.use(express.json());


app.use('/products', productRoutes);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

async function startServer() {
    try {
        await connectToDatabase();
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    } catch (error) {
        console.error('Не удалось запустить сервер:', error.message);
        process.exit(1);
    }
}

startServer();

process.on('SIGINT', async () => {
    console.log('Завершение работы приложения');
    await closeDatabaseConnection();
    process.exit(0);
});

