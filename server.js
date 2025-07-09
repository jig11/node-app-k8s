// server.js
const express = require('express');
const os = require('os');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send(`Hello from Node.js running in Kubernetes! pod : ${os.hostname()} `);
});

let healthy = true;
app.get('/healthz', (req, res) => {
  if(healthy)
  {
    res.status(200).send('Healthy');
  } 
  else
  {
    res.status(500).send('Unhealthy');
  }
});

app.get('/toggle-health', (req, res) => {
  healthy = !healthy;
  res.send(`Health status toggled. Current: ${healthy ? 'Healthy' : 'Unhealthy'}`);
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
});
