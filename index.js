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

// Конфігурація Facebook API
const ACCESS_TOKEN = 'EAAS7prt1PmcBOZC4maFzdSz0YIZAHl8BedkCRar8KT2IIFL1ZADNmDpUmePcBcAAoAq9v5xem8Jbv9BEjxvGTs3zjFxbLeiUZA5aFX4GepHU3u0tiFIuEdMLZAv6O6niDRxGPohkXCTmXvo4Pdh0XllJ3l9kSu5PRWINwdq1QGCoHalO2qOMnMOdYX3rd4WYL6eqWVtYb3CXTD2OcPVcHifr2PnjcwuaRngZDZD'; // 🔁 Замінити на твій дійсний токен
const PIXEL_ID = '1667929657386446';         // 🔁 Замінити на твій ідентифікатор Pixel

// Маршрут для PageView
app.post('/api/pageView', async (req, res) => {
  try {
    const payload = req.body;

    const fbResponse = await fetch(
      `https://graph.facebook.com/v22.0/${PIXEL_ID}/events?access_token=${ACCESS_TOKEN}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      }
    );

    const fbData = await fbResponse.json();

    res.status(200).json({
      status: 'success',
      fb_response: fbData,
    });
  } catch (error) {
    console.error('Facebook API Error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to send event to Facebook',
    });
  }
});

// Старт сервера
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
