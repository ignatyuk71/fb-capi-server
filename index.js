const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors()); // Дозволяє доступ з інших доменів
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

// Маршрут для обробки інших подій (наприклад, AddToCart, Purchase і т.д.)
app.post('/api/addToCart', (req, res) => {
  const eventData = req.body;

  if (!eventData || !eventData.data) {
    return res.status(400).json({ error: 'Missing event data' });
  }

  console.log('Received AddToCart event data:', JSON.stringify(eventData));

  // Тут можна обробити або відправити дані до Facebook API
  res.status(200).json({ message: 'AddToCart event data received successfully' });
});

// Запуск сервера
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
