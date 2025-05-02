// server.js

const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

// Використовуємо middleware для парсингу JSON
app.use(express.json());

// Додаємо CORS, щоб дозволити запити з вашого сайту
const corsOptions = {
  origin: 'https://dream-v-doma.tilda.ws', // Дозволяємо доступ тільки з вашого домену
  methods: ['GET', 'POST'], // Дозволяємо лише GET та POST запити
  allowedHeaders: ['Content-Type', 'Authorization'], // Дозволяємо лише певні заголовки
};

app.use(cors(corsOptions));

// Маршрут для обробки POST запитів
app.post('/api/pageView', (req, res) => {
  const data = req.body; // Дані, які прийшли з запиту
  console.log(data);

  // Відповідь на запит
  res.status(200).json({
    status: 'success',
    message: 'POST request received',
    data: data,
  });
});

// Старт сервера
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
