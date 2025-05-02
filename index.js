const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Middleware для парсингу JSON
app.use(express.json());

// Маршрут для обробки POST запитів
app.post('/api', (req, res) => {
    const data = req.body; // Дані, які прийшли з запиту
    console.log(data);

    // Відповідь на запит
    res.status(200).json({
        status: 'success',
        message: 'POST request received',
        data: data
    });
});

// Старт сервера
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
