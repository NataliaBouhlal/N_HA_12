export function validateProduct(req, res, next) {
    const { name, price, description } = req.body;

    if (!name || typeof name !== 'string') {
        return res.status(400).json({ message: 'Поле name обязательно и должно быть строкой' });
    }
    if (!price || typeof price !== 'number') {
        return res.status(400).json({ message: 'Поле price обязательно и должно быть числом' });
    }
    if (!description || typeof description !== 'string') {
        return res.status(400).json({ message: 'Поле description обязательно и должно быть строкой' });
    }

    next();
}