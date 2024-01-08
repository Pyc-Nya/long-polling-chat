import { addMessage, addUser, getMessages, getUsers } from './simple_db_handling.js';
import express from 'express';
import cors from 'cors';

const app = express();
const port = 8080;
app.use(cors({
  origin: 'http://localhost:3000' 
}));

app.listen(port, '192.168.0.104', () => console.log(`Server listening on port ${port}!`));
app.use(express.json());

const clients = [];
const messages = await getMessages();
const users = await getUsers();

app.get('/', (req, res) => {
  serverLog('to the homepage', "GET");
  res.status(200).send('404');
});

app.post('/sign_up', async (req, res) => {
  serverLog('sign_up', "POST");
  const userName = req.body.name;
  const newUser = await addUser(userName);
  users.push(newUser);
  res.status(200).send(JSON.stringify({ok: true, id: newUser.id}));
});

app.post('/sign_in', async (req, res) => {
  serverLog('sign_in', "POST");
  const userId = req.body.id;
  const user = users.find(user => +user.id === +userId);
  const userName = user?.name ?? null;
  res.status(200).send(JSON.stringify({ok: true, name: userName}));
});

app.get('/history', (req, res) => {
  serverLog('history', 'GET');
  res.send(JSON.stringify({ok: true, messages: messages}));
})

app.post('/new_message', async (req, res) => {
  serverLog('message', 'POST');
  console.log('clients:', clients.length);

  const userId = req.body.id;
  const message = req.body.message;
  const userName = req.body.name;
  const newMessage = await addMessage(userId, message, userName);
  messages.push(newMessage);

  while (clients.length > 0) {
    const client = clients.pop();
    if (!client.headersSent) {
      client.status(200).send(JSON.stringify({ok: true, message: message, id: userId, name: userName}));
      console.log('message sent');
    }
  }
  res.status(200).send(JSON.stringify({ok: true}));
})

app.post('/poll', (req, res) => {
  clients.push(res);
  serverLog('poll', 'POST');
  setTimeout(() => {
    if (!res.headersSent) {
      res.status(200).send(JSON.stringify({ok: true, message: null}));
    }
  }, 19 * 1000);
})




















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
