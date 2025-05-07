// Імпортуємо необхідні бібліотеки
require('dotenv').config(); // Завантажує .env змінні

const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();
const port = process.env.PORT || 3000;

// Додаємо middleware для автоматичного парсингу JSON-запитів
app.use(express.json());

// 🔐 Facebook Conversions API: токен доступу та ID пікселя
const ACCESS_TOKEN = process.env.ACCESS_TOKEN;
const PIXEL_ID = process.env.PIXEL_ID;

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
  const event = req.body?.data?.[0] || {};
  const user = event.user_data || {};

  const ip =
    req.headers['x-forwarded-for']?.split(',')[0] ||
    req.socket?.remoteAddress ||
    null;

  const payload = {
    data: [
      {
        event_name: event.event_name || "PageView",
        event_time: event.event_time || Math.floor(Date.now() / 1000),
        action_source: event.action_source || "website",
        event_id: event.event_id || "event_" + Date.now(),
        user_data: {
          client_user_agent: user.client_user_agent || req.headers['user-agent'],
          fbp: user.fbp,
          fbc: user.fbc,
          external_id: user.external_id || "anonymous_user",
          client_ip_address: ip
        }
      }
    ],
    test_event_code: req.body?.test_event_code || "TEST10696"
    
  };

 // ✅ Виводимо у консоль перед відправкою
  // console.log('📦 eventData to send:', JSON.stringify(payload, null, 2));

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

// 🛒 ViewContent маршрут
app.post('/api/viewContent', async (req, res) => {
  console.log("📥 Incoming POST request: ViewContent");

  const data = req.body;
  const event = req.body?.data?.[0] || {};
  const user = event.user_data || {};
  const custom = event.custom_data || {};

  const ip =
    req.headers['x-forwarded-for']?.split(',')[0] ||
    req.socket?.remoteAddress ||
    null;

  const payload = {
    data: [
      {
        event_name: event.event_name || "ViewContent",
        event_time: event.event_time || Math.floor(Date.now() / 1000),
        action_source: event.action_source || "website",
        event_id: event.event_id || "event_" + Date.now(),
        event_source_url: event.event_source_url || req.headers.referer || "",
        user_data: {
          client_user_agent: user.client_user_agent || req.headers['user-agent'],
          fbp: user.fbp,
          fbc: user.fbc,
          external_id: user.external_id || "anonymous_user",
          client_ip_address: ip
        },
        custom_data: {
          content_ids: custom.content_ids || [],
          content_name: custom.content_name || "",
          content_type: custom.content_type || "product",
          content_category: custom.content_category || "",
          contents: custom.contents || [],
          value: custom.value || 0,
          currency: custom.currency || "PLN"
        }
      }
    ],
    test_event_code: req.body?.test_event_code || "TEST10696"
  };

  console.log('📦 ViewContent payload to send:', JSON.stringify(payload, null, 2));

// 🚀 Запуск сервера на вказаному порту
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
