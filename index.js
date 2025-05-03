const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "https://dream-v-doma.tilda.ws"); // дозволяє доступ тільки з цього домену
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS"); // дозволяє ці методи
  res.header("Access-Control-Allow-Headers", "Content-Type"); // дозволяє ці заголовки
  next(); // Перехід до наступного обробника запиту
});
app.use(bodyParser.json()); // Для розбору JSON в тілі запиту

// Маршрут для обробки PageView події
aapp.post('/api/pageView', (req, res) => {
  console.log('Request received at /api/pageView');
  const eventData = req.body;

  if (!eventData || !eventData.data) {
    return res.status(400).json({ error: 'Missing event data' });
  }

  console.log('Received PageView event data:', JSON.stringify(eventData));
  res.status(200).json({ message: 'PageView event data received successfully' });
});



// Запуск сервера
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
