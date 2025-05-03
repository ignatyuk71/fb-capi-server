const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

// Middleware для парсингу JSON
app.use(express.json());

// Налаштування CORS
const corsOptions = {
  origin: 'https://dream-v-doma.tilda.ws', // Замість цього вказуйте свій сайт
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));

// Маршрут для обробки POST запитів
app.post('/api', (req, res) => {
  const data = req.body;
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
