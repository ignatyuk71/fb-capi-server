// server.js

const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

// Використовуємо middleware для парсингу JSON
app.use(express.json());

// Додаємо CORS, щоб дозволити запити з вашого сайту
const corsOptions = {
  origin: 'https://dream-v-doma.tilda.ws', // Дозволяємо доступ тільки з вашого домену
  methods: ['GET', 'POST'], // Дозволяємо лише GET та POST запити
  allowedHeaders: ['Content-Type', 'Authorization'], // Дозволяємо лише певні заголовки
};

app.use(cors(corsOptions));
app.use(bodyParser.json());



const PIXEL_ID = '1667929657386446';
const ACCESS_TOKEN = 'EAAHpt1ZAxmGMBO1ZCZCQxb2moZBha8p6P6ZB7audYL3OgM9i81xU0lvZAC5SRXewVhpno24CMnVIYevh3UYuSvzlBL8J8lWxyu203UksuchowA0lSI5X8LZAkU4vvbAKa8jZBZAKXwAQkkTLtq0mRQWIkDB1gBCfLlpOE9VbgTXTlhNxV7WvsQFHR492XtDLMbiZBaFgZDZD';


// Маршрут для обробки POST запитів
app.post('/api/pageView11', (req, res) => {
  const data = req.body; // Дані, які прийшли з запиту
  console.log(data);


  
  // Відповідь на запит
  res.status(200).json({
    status: 'success',
    message: 'POST request received',
    data: data,
  });
});




// Логування події
const logEventData = (eventData) => {
    console.log('Event Data---:', JSON.stringify(eventData, null, 2));
};

// Відправка події в Facebook
const sendToFacebook = async (eventData) => {
    const url = `https://graph.facebook.com/v22.0/${PIXEL_ID}/events?access_token=${ACCESS_TOKEN}`;
    try {
        const response = await axios.post(url, eventData);
        console.log('Event sent to Facebook:', response.data);
    } catch (error) {
        console.error('Error sending event to Facebook:', error.response?.data || error.message);
    }
};

// Маршрут для отримання події PageView
app.post('/api/pageView', (req, res) => {
  const eventData = req.body;  // Отримуємо дані з тіла запиту
  console.log('Received Event Data:', eventData);

  // Логуємо отримані дані
  logEventData(eventData);

  // Відправляємо дані у Facebook (якщо потрібно)
  sendToFacebook(eventData);

  // Відповідаємо клієнту, що все пройшло успішно
  res.status(200).send({ status: 'Received and processed' });
});





// Старт сервера
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
