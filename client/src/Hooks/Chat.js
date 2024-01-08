import { UserDataStore } from '../stores';
import { useState, useEffect } from 'react'

const useChat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const handleEnterUp = (e) => {
    if (e.key === 'Enter') {
      sendMessage(input)
    }
  }

  async function poll() {
    try {
      let r = await fetch('http://192.168.0.104:8080/poll', {method: "POST"});
      let d = await r.json();

      if (d.ok) {
        const newMessage = {id: d.id, name: d.name, message: d.message}
        if (d.message !== null) {
          console.log('messages:', messages);
          setMessages(prevMessages => [...prevMessages, newMessage]);
        }
        setTimeout(poll, 1000);
      } else {
        throw new Error('failed to poll')
      }
    } catch (error) {
      console.error(error.message);
    }
  }

  async function sendMessage(message) {
    const newMessage = {id: UserDataStore.userData.id, name: UserDataStore.userData.name, message: message}
    let r = await fetch('http://192.168.0.104:8080/new_message', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      }, 
      body: JSON.stringify(newMessage)
    });
    let d = await r.json();
    setInput('');
    console.log('messages:', messages);
  }

  async function fetchHistory() {
    let r = await fetch('http://192.168.0.104:8080/history');
    let d = await r.json();
    console.log('d.messages', d.messages);
    setMessages(d.messages);
  }

  useEffect(() => {
    fetchHistory()
    poll();
  }, []);

  return {
    messages, 
    handleEnterUp,
    setInput,
    input,
  }
}

export { useChat }
