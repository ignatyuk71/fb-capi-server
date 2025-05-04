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
app.post('/api/pageView1111', (req, res) => {
  console.log("📥 Incoming POST request");
  const data = req.body;

  console.log('📥 Received data:', JSON.stringify(data));
res.json({
    success: true,
    message: 'Event received',
    received: data
  });
});



app.post('/api/pageView', async (req, res) => {
  console.log("📥 Incoming POST request");

  const data = req.body;
  console.log("📥 Received data:", JSON.stringify(data));

  const payload = {
    data: [
      {
        event_name: "PageView",
        event_time: Math.floor(Date.now() / 1000),
        action_source: "website",
        event_id: data.event_id || "event_" + Date.now(),
        user_data: {
          client_user_agent: data.user_data?.client_user_agent || req.headers['user-agent'],
          fbp: data.user_data?.fbp,
          fbc: data.user_data?.fbc,
          external_id: data.user_data?.external_id || "anonymous_user"
        }
      }
    ],
    test_event_code: "TEST10696"
  };

  try {
    const fbRes = await axios.post(
      `https://graph.facebook.com/v18.0/${PIXEL_ID}/events?access_token=${ACCESS_TOKEN}`,
      payload,
      { headers: { 'Content-Type': 'application/json' } }
    );

    console.log("✅ Facebook response:", fbRes.data);
    res.json({ success: true, fb: fbRes.data });

  } catch (err) {
    console.error("❌ Facebook error:", err.response?.data || err.message);
    res.status(500).json({
      success: false,
      message: "Failed to send event to Facebook",
      error: err.response?.data || err.message
    });
  }
});








// Старт сервера
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});