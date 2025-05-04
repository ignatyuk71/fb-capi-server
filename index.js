const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();
const port = process.env.PORT || 3000;

// Middleware для парсингу JSON
app.use(express.json());
const ACCESS_TOKEN = 'EAAHpt1ZAxmGMBOzABEDWhxxZBo9EcoBm5ajU15KJFlsYdNtetbbEhHVvQoZCZAmXDI4KYZCIZB1o0rKxI6TTP9ZCLZBKMlrYTuYEHBfma1hrzaeidZAKSyyEjwxsOZB3b36VtOVPW25jOvjPoDAP7jPB1BUO9JpUX0HTj8ZAsYduUMQ9wTq8fhRli3FTZACp5U8CkOQsMwZDZD';  // Замініть на свій токен
const PIXEL_ID = '1667929657386446';  // Замініть на свій Pixel ID

// Конфігурація CORS — дозволяємо запити тільки з вашого сайту
const corsOptions = {
  origin: 'https://dream-v-doma.tilda.ws', // Ваш сайт
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};
app.use(cors(corsOptions)); // Підключаємо CORS middleware

// 🔧 Тестовий маршрут — просто повертає назад отримані дані (для дебагу)
app.post('/api/pageView1111', (req, res) => {
  console.log("📥 Incoming POST request"); // Лог, що прийшов запит
  const data = req.body;
  console.log('📥 Received data:', JSON.stringify(data)); // Лог отриманих даних

  // Відповідь на запит
  res.json({
    success: true,
    message: 'Event received',
    received: data
  });
});

// 🎯 Основний маршрут — обробка події PageView та надсилання до Facebook API
app.post('/api/pageView', async (req, res) => {
  console.log("📥 Incoming POST request"); // Лог запиту

  const data = req.body; // Тіло запиту, яке ми отримали з клієнта

  // Готуємо payload для Facebook
  const payload = {
    data: [
      {
        event_name: "PageView", // Назва події
        event_time: Math.floor(Date.now() / 1000), // Поточний час в UNIX-форматі
        action_source: "website", // Джерело події
        event_id: data.event_id || "event_" + Date.now(), // Унікальний ID події
        user_data: {
          client_user_agent: data.user_data?.client_user_agent || req.headers['user-agent'], // Інфо про браузер
          fbp: data.user_data?.fbp, // Facebook browser ID
          fbc: data.user_data?.fbc, // Facebook click ID
          external_id: data.user_data?.external_id || "anonymous_user" // Ідентифікатор користувача (за бажанням)
        }
      }
    ],
    test_event_code: "TEST10696" // Код тестової події для перевірки у Events Manager
  };

  try {
    // Відправляємо дані до Facebook через Conversions API
    const fbRes = await axios.post(
      `https://graph.facebook.com/v18.0/${PIXEL_ID}/events?access_token=${ACCESS_TOKEN}`,
      payload,
      { headers: { 'Content-Type': 'application/json' } }
    );

    // Логуємо відповідь від Facebook
    console.log("✅ Facebook response:", fbRes.data);

    // Відповідь клієнту
    res.json({ success: true, fb: fbRes.data });

  } catch (err) {
    // Якщо є помилка — лог і повідомлення клієнту
    console.error("❌ Facebook error:", err.response?.data || err.message);
    res.status(500).json({
      success: false,
      message: "Failed to send event to Facebook",
      error: err.response?.data || err.message
    });
  }
});

// 🚀 Запуск сервера на вказаному порту
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});