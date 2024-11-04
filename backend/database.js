const { Client } = require('pg');
require('dotenv').config();

const client = new Client({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'postgres',
  port: process.env.DB_PORT || 5432,
  password: process.env.DB_PASSWORD || 'MiyukiKazuya@1',
  database: process.env.DB_NAME || 'postgres',
});

client.connect(err => {
  if (err) {
    console.error('Connection error', err.stack);
  } else {
    console.log('Connected to the database');
  }
});

// Gracefully close the database connection when the application exits
process.on('SIGINT', async () => {
  await client.end();
  console.log('Database connection closed');
  process.exit(0);
});

module.exports = client;

