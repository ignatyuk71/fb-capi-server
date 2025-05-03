const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors({
  origin: 'https://dream-v-doma.tilda.ws',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type']
}));

// ДОДАЙ обробку preflight-запитів:
app.options('*', cors());

app.use(express.json());

app.post('/api/pageView', (req, res) => {
  console.log('PageView data:', req.body);
  res.sendStatus(200);
});
