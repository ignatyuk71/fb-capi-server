const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch'); // потрібен для POST-запитів
const app = express();
const port = process.env.PORT || 3000;

// 🔐 НЕ зберігай токени в коді — краще використовувати змінні середовища (у .env файлі)
const ACCESS_TOKEN = process.env.FB_ACCESS_TOKEN || 'EAAS7prt1PmcBOZC4maFzdSz0YIZAHl8BedkCRar8KT2IIFL1ZADNmDpUmePcBcAAoAq9v5xem8Jbv9BEjxvGTs3zjFxbLeiUZA5aFX4GepHU3u0tiFIuEdMLZAv6O6niDRxGPohkXCTmXvo4Pdh0XllJ3l9kSu5PRWINwdq1QGCoHalO2qOMnMOdYX3rd4WYL6eqWVtYb3CXTD2OcPVcHifr2PnjcwuaRngZDZD';
const PIXEL_ID = process.env.FB_PIXEL_ID || '1667929657386446';

// Middleware для парсингу JSON
app.use(express.json());

// Налаштування CORS
app.use(cors({
  origin: 'https://dream-v-doma.tilda.ws',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
}));

// Маршрут для PageView
app.post('/api/pageView', async (req, res) => {
  const payload = req.body;

  try {
    const fbResponse = await fetch(
      `https://graph.facebook.com/v22.0/${PIXEL_ID}/events?access_token=${ACCESS_TOKEN}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      }
    );

    const fbData = await fbResponse.json();

    if (fbResponse.ok) {
      res.status(200).json({
        status: 'success',
        fb_response: fbData,
      });
    } else {
      res.status(fbResponse.status).json({
        status: 'facebook_error',
        fb_response: fbData,
      });
    }
  } catch (error) {
    console.error('Facebook API Error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to send event to Facebook',
      error: error.message,
    });
  }
});

// Старт сервера
app.listen(port, () => {
  console.log(`✅ Server is running on port ${port}`);
});
