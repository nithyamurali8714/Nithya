const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname)));

app.get('/api/endpoint', (req, res) => {
  const { from, to, date, mode } = req.query;
  if (!from || !to || !date || !mode) {
    return res.status(400).json({ error: 'Missing required query parameters' });
  }

  const plan = {
    message: 'Trip Planned Successfully!',
    from,
    to,
    date,
    mode,
    recommendations: {
      route: 'Safe route suggested',
      hotels: 'Best hotels recommended',
      support: 'Emergency support enabled'
    }
  };

  res.json(plan);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
