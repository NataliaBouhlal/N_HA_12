import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

let client;
let db;

export async function connectToDatabase() {
    const mongoUrl = process.env.MONGO_URL;
    const dbName = process.env.DB_NAME;

    if (!mongoUrl || !dbName) throw new Error('MONGO_URL или DB_NAME не заданы');

    client = new MongoClient(mongoUrl);
    await client.connect();
    db = client.db(dbName);
    console.log('MongoDB подключена:', dbName);
}

export function getDb() {
    if (!db) throw new Error('База данных ещё не подключена');
    return db;
}

export async function closeDatabaseConnection() {
    if (client) await client.close();
    console.log('Соединение с MongoDB закрыто');
}