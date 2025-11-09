const express = require('express');
const cors = require('cors');
require('dotenv').config(); // Make sure this is at the top
const { sequelize } = require('./models'); // Import sequelize instance
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

// Middleware
app.use(cors()); // Allows your React frontend to talk to this server
app.use(express.json()); // Parses incoming JSON requests

// Add io to the request object
app.use((req, res, next) => {
  req.io = io;
  next();
});

// Import Routes
const authRoutes = require('./routes/auth');
const leadRoutes = require('./routes/leadRoutes'); // <-- THIS LINE IS UNCOMMENTED
const activityRoutes = require('./routes/activityRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const startScheduler = require('./scheduler');

// Use Routes
app.use('/api/auth', authRoutes);
app.use('/api/leads', leadRoutes); // <-- THIS LINE IS UNCOMMENTED
app.use('/api/activities', activityRoutes);
app.use('/api/dashboard', dashboardRoutes);

// Test Route
app.get('/', (req, res) => {
  res.send('CRM Backend is running!');
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
  try {
    // Test the database connection
    await sequelize.authenticate();
    console.log('Database connected successfully.');
    startScheduler(io); // Start the scheduler
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
});