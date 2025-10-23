const express = require('express');
const path = require('path');
const homeRoutes = require('./routes/home');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

// API routes
app.use('/api/home', homeRoutes);

// Health
app.get('/health', (req, res) => res.json({ status: 'ok' }));

// Serve static files in production if needed
if (process.env.NODE_ENV === 'production') {
  const clientBuildPath = path.join(__dirname, '..', 'client', 'build');
  app.use(express.static(clientBuildPath));
}

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server listening on port ${PORT}`);
});
