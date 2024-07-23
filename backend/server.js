const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const client = require('./database.js'); 

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());

app.post('/api/workouts', async (req, res) => {
  const { exercise, weight, sets, reps } = req.body;

  try {
    const result = await client.query(
      'INSERT INTO workouts (exercise, weight, sets, reps) VALUES ($1, $2, $3, $4) RETURNING *',
      [exercise, weight, sets, reps]
    );
    res.status(200).json({ message: 'Workout data received successfully', workout: result.rows[0] });
  } catch (error) {
    console.error('Error saving workout data:', error);
    res.status(500).json({ message: 'Failed to save workout data' });
  }
});

app.get('/api/workouts', async (req, res) => {
  try{
    const result = await client.query('SELECT * FROM workouts');
    res.status(200).json(result.rows);

  } catch(error){
    console.error('Error fetching workout data: ', error);
    res.status(500).json({ message: "Failed to fetch workout dat "});
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

process.on('SIGTERM', () => {
  client.end(err => {
    console.log('Client disconnected');
    if (err) {
      console.error('Error during disconnection', err.stack);
    }
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  client.end(err => {
    console.log('Client disconnected');
    if (err) {
      console.error('Error during disconnection', err.stack);
    }
    process.exit(0);
  });
});