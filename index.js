const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Додаткові заголовки вручну (CORS)
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "https://dream-v-doma.tilda.ws");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  
  if (req.method === "OPTIONS") {
    return res.sendStatus(200); // важливо для preflight
  }

  next();
});

app.use(express.json());

app.post('/api/pageView', (req, res) => {
  console.log('📄 PageView:', req.body);
  res.sendStatus(200);
});

app.post('/api/addToCart', (req, res) => {
  console.log('🛒 AddToCart:', req.body);
  res.sendStatus(200);
});

app.post('/api/purchase', (req, res) => {
  console.log('💰 Purchase:', req.body);
  res.sendStatus(200);
});

app.post('/api/initiateCheckout', (req, res) => {
  console.log('🧾 InitiateCheckout:', req.body);
  res.sendStatus(200);
});

app.post('/api/viewContent', (req, res) => {
  console.log('👁️ ViewContent:', req.body);
  res.sendStatus(200);
});

app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});
