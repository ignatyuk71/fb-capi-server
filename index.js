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
app.post('/api/pageView', (req, res) => {
  const data = req.body;

  console.log('Received data:', JSON.stringify(data));

  const eventData = {
    "data": [
      {
        "action_source": "website",
        "event_id": 111112245,
        "event_name": "PageView",
        "event_time": Math.floor(Date.now() / 1000), // Поточний час
        "user_data": {
          "client_user_agent": data.userAgent || "Mozilla/5.0 (iPhone; CPU iPhone OS 13_3_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.5 Mobile/15E148 Safari/604.1",
          "em": "f660ab912ec121d1b1e928a0bb4bc61b15f5ad44d5efdc4e1c92a25e99b8e44a" 
        }
      }
    ],
    "test_event_code": "TEST39582"
  };

  console.log('eventData to send:', JSON.stringify(eventData));

  // Відправка події до Facebook Pixel через Facebook Conversions API
  axios.post(`https://graph.facebook.com/v12.0/${PIXEL_ID}/events?access_token=${ACCESS_TOKEN}`, eventData)
    .then(response => {
      console.log('Facebook response:', response.data);
      res.status(200).json({ success: true, message: 'Event sent successfully' });
    })
    .catch(error => {
      console.error('Error sending to Facebook:', error);
      res.status(500).json({ success: false, message: 'Error sending event' });
    });
});

// Старт сервера
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
