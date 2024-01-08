// sudo service postgresql start
// sudo service postgresql status
// sudo systemctl stop postgresql
// node server.js
// sudo lsof -i :8000
// sudo kill -9 <PID>
// sudo -u postgres psql
// CREATE USER myuser WITH PASSWORD 'mypassword';
// CREATE DATABASE mydatabase;
// GRANT ALL PRIVILEGES ON DATABASE mydatabase TO myuser;
// psql -U myuser -d mydatabase
// CREATE TABLE posts (
//  id SERIAL PRIMARY KEY,
//  text TEXT NOT NULL
// );


const express = require('express');
const path = require('path');
const cors = require('cors');
const { Pool } = require('pg');
const app = express();
const port = 8000;

app.use(express.json()); // позволяет нам получать тело запроса в формате JSON
app.use(cors({
  origin: 'http://localhost:3000' // Разрешить запросы только с этого источника
}));
app.listen(port, () => console.log(`Server listening on port ${port}!`));


const pool = new Pool({
  user: 'pyc_nya', // ваше имя пользователя для postgres
  host: 'localhost',
  database: 'first_node_practice', // имя вашей базы данных
  password: 'Slidan000,', // пароль для пользователя postgres
  port: 5432, // порт для подключения к базе данных
});


app.get('/', (req, res) => {
  serverLog('to the homepage', "GET");
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});


app.get('/data', async (req, res) => {
  serverLog(`to /data`, "GET");
  try {
    const { rows } = await pool.query('SELECT * FROM posts'); // замените 'mytable' на имя вашей таблицы
    res.json(rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

app.post('/data', async (req, res) => {
  serverLog(`to /data with body: ${req.body}`, "POST");
  console.log();
  try {
    // Замените следующий текст на вашу SQL-вставку и значения
    const { text } = req.body; // предполагается, что тело запроса содержит 'mycolumn'
    const newEntry = await pool.query(
      'INSERT INTO posts(text) VALUES($1) RETURNING *', 
      [text]
    );
    res.json(newEntry.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});


const serverLog = (message, method) => {
  const timeFormatted = `${colors.bgWhite}${colors.black}${getFormattedDateTime()}${colors.reset}`;
  const methodFormatted = method === 'GET'
    ? `${colors.bgGreen}${colors.white}${method}${colors.reset}`
    : method === 'POST'
    ? `${colors.bgBlue}${colors.white}${method}${colors.reset}`
    : method;

  console.log(`${timeFormatted} ${methodFormatted} ${message}`);
};

function getFormattedDateTime() {
  const now = new Date();
  const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };
  const formattedDateTime = now.toLocaleString('ru-RU', options);
  const dateTimeForDisplay = formattedDateTime.replace(/(\d+).(\d+).(\d+), (\d+:\d+:\d+)/, "[$1.$2.$3 $4]");
  return dateTimeForDisplay;
}

const colors = {
  black: "\x1b[30m",
  white: "\x1b[90m",
  bgGrey: "\x1b[90m",
  bgGreen: "\x1b[42m",
  bgBlue: "\x1b[44m",
  bgWhite: "\x1b[47m",
  reset: "\x1b[0m"
};