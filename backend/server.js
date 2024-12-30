const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(express.json()); // Parse incoming JSON requests

// In-memory storage for organizations data
let organizations = []; // Initially empty

// Default Route for Root URL
app.get('/', (req, res) => {
  res.send('Welcome to the Organizations API. Use /api/organizations for data.'); // Add this route
});

// GET API Endpoint - Fetch all organizations data
app.get('/api/organizations', (req, res) => {
  console.log('Sending organizations data:', JSON.stringify(organizations, null, 2));
  res.json(organizations); // Send organizations data as JSON response
});

// POST API Endpoint - Update organizations data
app.post('/api/organizations', (req, res) => {
  console.log('Received data:', JSON.stringify(req.body, null, 2));
  organizations = req.body; // Update organizations data
  res.status(200).json({ message: "Data received and updated successfully" });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
