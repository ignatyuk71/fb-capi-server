const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();
const port = process.env.PORT || 3000;

// Middleware для парсингу JSON
app.use(express.json());
const ACCESS_TOKEN = 'EAAHpt1ZAxmGMBOzABEDWhxxZBo9EcoBm5ajU15KJFlsYdNtetbbEhHVvQoZCZAmXDI4KYZCIZB1o0rKxI6TTP9ZCLZBKMlrYTuYEHBfma1hrzaeidZAKSyyEjwxsOZB3b36VtOVPW25jOvjPoDAP7jPB1BUO9JpUX0HTj8ZAsYduUMQ9wTq8fhRli3FTZACp5U8CkOQsMwZDZD';  // Замініть на свій токен
const PIXEL_ID = '1667929657386446';  // Замініть на свій Pixel ID

// Налаштування CORS
const corsOptions = {
  origin: 'https://dream-v-doma.tilda.ws', // Замість цього вказуйте свій сайт
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));

// Маршрут для обробки POST запитів
app.post('/api/pageView', async (req, res) => {
  const data = req.body;

  console.log('📥 Received data:', JSON.stringify(data));

  try {
    const response = await axios.post(
      `https://graph.facebook.com/v18.0/${PIXEL_ID}/events?access_token=${ACCESS_TOKEN}`,
      data
    );

    console.log('✅ Sent to Facebook:', response.data);

    res.json({
      success: true,
      message: 'Event received and sent to Facebook',
      facebookResponse: response.data
    });
  } catch (error) {
    console.error('❌ Facebook API error:', error.response?.data || error.message);

    res.status(500).json({
      success: false,
      message: 'Failed to send to Facebook',
      error: error.response?.data || error.message
    });
  }
});

// Старт сервера
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});






