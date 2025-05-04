const express = require('express');
const axios = require('axios'); // Для надсилання запитів до Facebook API
const app = express();
const port = process.env.PORT || 3000;

// Для парсингу JSON даних
app.use(express.json());

// Ваш access_token для Facebook Conversions API
const ACCESS_TOKEN = 'EAAHpt1ZAxmGMBO1sWXommeck8lQv0xNDoKtx4hGCb5aGLqPqQQuxbzmI5aEfZA38JhF26LO4cMHpsKSUfdZCkVqa2cRRQDjfkhvqZCYz7u84tFlFLFjmTzNTA8BZCUOIIPfvx7p2QAiwMzDswH4dbZBECT4nDLZBmXDGaY9pHo3m14ZAgJ5h8OVKZBAZCwNnkCSdr4QAZDZD'; // Замініть на ваш access token
const PIXEL_ID = '1667929657386446'; // Замініть на ваш Pixel ID

// Маршрут для обробки POST запитів
app.post('/api/pageView', async (req, res) => {
  const eventData = req.body;

  // Додавання обов'язкового поля event_time (час події)
  if (!eventData.data || eventData.data.length === 0) {
    return res.status(400).json({
      success: false,
      message: 'Data is required in the request body.'
    });
  }

  // Додавання event_time для кожної події
  eventData.data.forEach((event) => {
    if (!event.event_time) {
      event.event_time = Math.floor(Date.now() / 1000); // Час події в секундах
    }
  });

  // Виведення отриманих даних для відладки
  console.log('📥 Received event data:', JSON.stringify(eventData));

  try {
    // Надсилання події до Facebook Conversions API
    const response = await axios.post(
      `https://graph.facebook.com/v12.0/${PIXEL_ID}/events`,
      eventData,
      {
        params: {
          access_token: ACCESS_TOKEN,
        },
      }
    );

    // Відповідь від Facebook API
    console.log('📡 Facebook API Response:', response.data);

    return res.json({
      success: true,
      message: 'Event successfully sent to Facebook',
      facebook_response: response.data,
    });
  } catch (error) {
    // Обробка помилок
    console.error('❌ Error sending data to Facebook:', error.message);

    return res.status(500).json({
      success: false,
      message: 'Failed to send event to Facebook',
      error: error.response ? error.response.data : error.message,
    });
  }
});

// Запуск сервера
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
