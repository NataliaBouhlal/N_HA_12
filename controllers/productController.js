import { getDb } from '../db/index.js';
import { ObjectId } from 'mongodb';

export async function getAllProducts(req, res, next) {
    try {
        const db = getDb();
        const products = await db.collection('products').find().toArray();
        res.json(products);
    } catch (error) {
        next(error);
    }
}

export async function getProductById(req, res, next) {
    try {
        const db = getDb();
        const { id } = req.params;
        const product = await db.collection('products').findOne({ _id: new ObjectId(id) });

        if (!product) return res.status(404).json({ message: 'Product not found' });
        res.json(product);
    } catch (error) {
        next(error);
    }
}

export async function createProduct(req, res, next) {
    try {
        const db = getDb();
        const { name, price, description } = req.body;
        const result = await db.collection('products').insertOne({ name, price, description });
        res.status(201).json({ id: result.insertedId });
    } catch (error) {
        next(error);
    }
}

export async function updateProduct(req, res, next) {
    try {
        const db = getDb();
        const { id } = req.params;
        const { name, price, description } = req.body;

        const result = await db.collection('products').updateOne(
            { _id: new ObjectId(id) },
            { $set: { name, price, description } }
        );

        if (result.matchedCount === 0) return res.status(404).json({ message: 'Product not found' });
        res.json({ message: 'Updated' });
    } catch (error) {
        next(error);
    }
}

export async function deleteProduct(req, res, next) {
    try {
        const db = getDb();
        const { id } = req.params;

        const result = await db.collection('products').deleteOne({ _id: new ObjectId(id) });
        if (result.deletedCount === 0) return res.status(404).json({ message: 'Product not found' });
        res.json({ message: 'Deleted' });
    } catch (error) {
        next(error);
    }
}