const express = require('express');
const socketIo = require('socket.io');
const http = require('http');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// MongoDB connection
mongoose.connect('mongodb+srv://<username>:<password>@cluster0.mongodb.net/mydatabase?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log("MongoDB connected successfully!");
})
.catch(err => {
  console.log("MongoDB connection error:", err);
});
// MongoDB Schema for Organization, Teams, and Members
const orgSchema = new mongoose.Schema({
  name: String,
  teams: [{
    name: String,
    members: [{
      name: String,
      imagePath: String,
    }],
  }],
});

const Organization = mongoose.model('Organization', orgSchema);

// Middleware
app.use(cors()); // To allow requests from other devices (i.e., your phone)
app.use(express.json()); // To parse incoming JSON

// API to fetch all organizations
app.get('/api/organizations', async (req, res) => {
  try {
    const organizations = await Organization.find();
    res.json(organizations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// API to create a new organization
app.post('/api/organizations', async (req, res) => {
  try {
    const newOrg = new Organization(req.body);
    await newOrg.save();
    io.emit('organizationCreated', newOrg); // Emit event for real-time sync
    res.status(201).json(newOrg);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// API to add a team to an organization
app.post('/api/organizations/:orgId/teams', async (req, res) => {
  try {
    const org = await Organization.findById(req.params.orgId);
    org.teams.push(req.body);
    await org.save();
    io.emit('teamCreated', org); // Emit event for real-time sync
    res.status(201).json(org);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// API to add a member to a team
app.post('/api/teams/:teamId/members', async (req, res) => {
  try {
    const org = await Organization.findOne({ 'teams._id': req.params.teamId });
    const team = org.teams.id(req.params.teamId);
    team.members.push(req.body);
    await org.save();
    io.emit('memberCreated', org); // Emit event for real-time sync
    res.status(201).json(team);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Listening to server
server.listen(5000, '0.0.0.0', () => {
  console.log('Server is running on http://0.0.0.0:5000');
});
