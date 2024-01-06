const express = require('express');
const path = require('path');
const app = express();
const port = 8080;

app.listen(port, '192.168.0.102', () => console.log(`Server listening on port ${port}!`));
app.use(express.json());
app.use(express.static('../simple_chat'));

const clients = [];
const messages = [];

app.get('/', (req, res) => {
  serverLog('to the homepage', "GET");
  res.sendFile(path.join(__dirname, '..', 'simple_chat', 'simple_chat.html'));
});

app.get('/history', (req, res) => {
  serverLog('history', 'GET');
  res.send(JSON.stringify({ok: true, messages: messages}));
})

app.post('/new_message', (req, res) => {
  messages.push(req.body.message);
  serverLog('message', 'POST');
  console.log('clients:', clients.length);

  while (clients.length > 0) {
    const client = clients.pop();
    if (!client.headersSent) {
      client.status(200).send(JSON.stringify({ok: true, message: req.body.message}));
      console.log('message sent');
    }
  }
  res.status(200).send(JSON.stringify({ok: true}));
})

app.get('/poll', (req, res) => {
  clients.push(res);
  serverLog('poll', 'GET');
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
