import { promises as fs } from 'fs';

const PATH_TO_USERS = 'simple_chat_data/users.json';
const PATH_TO_MESSAGES = 'simple_chat_data/messages.json';

// Получение всех пользователей
async function getUsers() {
  try {
    const data = await fs.readFile(PATH_TO_USERS, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error(err);
    return [];
  }
}

// Добавление нового пользователя
async function addUser(name) {
  const users = await getUsers();
  const lastId = users.length > 0 ? users[users.length - 1].id : 0;
  const newUser = { id: lastId + 1, name: name };
  users.push(newUser);

  try {
    await fs.writeFile(PATH_TO_USERS, JSON.stringify(users, null, 2));
    return newUser;
  } catch (err) {
    console.error(err);
  }
}

// Получение всех сообщений
async function getMessages() {
  try {
    const data = await fs.readFile(PATH_TO_MESSAGES, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error(err);
    return [];
  }
}

// Добавление нового сообщения
async function addMessage(userId, message, name) {
  const messages = await getMessages();
  const newMessage = { id: userId, name: name, message: message };
  messages.push(newMessage);

  try {
    await fs.writeFile(PATH_TO_MESSAGES, JSON.stringify(messages, null, 2));
    return newMessage;
  } catch (err) {
    console.error(err);
  }
}

export {
  addMessage,
  addUser,
  getMessages,
  getUsers,
}
