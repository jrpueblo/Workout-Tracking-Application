const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const client = require('./database.js'); 

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Adding workouts
app.post('/api/workouts', async (req, res) => {
  const { exercise, weight, sets, reps } = req.body;
  weight = weight + " lbs";

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

// Fetching workouts
app.get('/api/workouts', async (req, res) => {
  try{
    const result = await client.query('SELECT * FROM workouts');
    res.status(200).json(result.rows);

  } catch(error){
    console.error('Error fetching workout data: ', error);
    res.status(500).json({ message: "Failed to fetch workout dat "});
  }
});

// Submitting workouts to archive
app.post('/api/archive', async (req, res) => {
  try{

    // Begin Transaction
    await client.query('BEGIN');

    // Get workouts
    const dailyWorkout = await client.query('SELECT * FROM workouts');
    const dailyWorkoutList = dailyWorkout.rows;

    if(dailyWorkoutList.length > 0){
      const today = new Date().toISOString().split('T')[0];

      // Transfer workouts into archive table
      await client.query('INSERT INTO arhive (date, ')
    }


    const client = await pool.connect();
    res.status(200).json(result.rows);
  } catch(error){
    // Abort the all the queries if error 
    await client.query('ROLLBACK');
    console.error('Error archiving workouts: ', error);
    res.status(500).json({ message: 'Failed to archive workouts' });
  }
});

// Fetching dates for archive drop down
app.get('/api/archive/dates', async (req, res) => {
  try{
    const result = await client.query('SELECT date FROM archive');
    res.status(200).json(result.rows);

  } catch(error){
    console.error('Error fetching archived workout data: ', error);
    res.status(500).json({ message: "Failed to fetch archived workout data "});
  }
});

// Fetching archived workouts
app.get('/api/archive', async (req, res) => {
  try{
    const result = await client.query('SELECT * FROM archive');
    res.status(200).json(result.rows);

  } catch(error){
    console.error('Error fetching archived workout data: ', error);
    res.status(500).json({ message: "Failed to fetch archived workout data "});
  }
});

/// Fetch workouts by specific date
app.get('/api/archive/date/:date', async (req, res) => {
  const { date } = req.params;
  try {
    // Use the ::date cast to compare only the date part
    const result = await client.query('SELECT * FROM archive WHERE date::date = $1::date', [date]);
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error fetching workouts for date: ', error);
    res.status(500).json({ message: "Failed to fetch workouts for the specified date." });
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