const express = require('express');
const cors = require('cors');
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
app.post('/api/pageView', (req, res) => {
  const data = req.body;
  console.log(data);


    const eventData = {
    data: [
      {
        event_name: 'PageView',
        event_time: Math.floor(Date.now() / 1000),  // Час в форматі UNIX
        event_id: 'abc123',  // Ідентифікатор події
        user_data: {
          client_user_agent: req.headers['user-agent'], // Отримуємо user-agent
        },
      },
    ],
  };

  // Відправляємо дані на Facebook
  fetch(`https://graph.facebook.com/v12.0/${PIXEL_ID}/events?access_token=${ACCESS_TOKEN}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(eventData),
  })
    .then(fbRes => fbRes.json())
    .then(fbData => {
      // Відповідаємо клієнту про успіх
      res.status(200).json({
        status: 'success',
        fb_response: fbData,
      });
    })
    .catch(error => {
      console.error('Facebook API Error:', error);
      res.status(500).json({
        status: 'error',
        message: 'Failed to send event to Facebook',
        error: error.message,
      });
    });
});

// Старт сервера
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
