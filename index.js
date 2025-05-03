const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;
// 🔐 НЕ зберігай токени в коді — краще використовувати змінні середовища (у .env файлі)
const ACCESS_TOKEN = process.env.FB_ACCESS_TOKEN || 'EAAS7prt1PmcBOZC4maFzdSz0YIZAHl8BedkCRar8KT2IIFL1ZADNmDpUmePcBcAAoAq9v5xem8Jbv9BEjxvGTs3zjFxbLeiUZA5aFX4GepHU3u0tiFIuEdMLZAv6O6niDRxGPohkXCTmXvo4Pdh0XllJ3l9kSu5PRWINwdq1QGCoHalO2qOMnMOdYX3rd4WYL6eqWVtYb3CXTD2OcPVcHifr2PnjcwuaRngZDZD';
const PIXEL_ID = process.env.FB_PIXEL_ID || '1667929657386446';
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
app.post('/api/pageView', (req, res) => {
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
