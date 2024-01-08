import { useState, useEffect } from 'react'
import { observer } from 'mobx-react';
import { UserDataStore, ActiveStore } from './stores';

const App = observer(() => {
  return (
    <>
    <div className="container">
      {ActiveStore.active === 'auth' && <Auth />}
      {(ActiveStore.active === 'signIn' || ActiveStore.active ==='signUp') && <Sign />}
      {ActiveStore.active === 'wrongId' && <WrongId />}
      {ActiveStore.active === 'chat' && <Chat />}
    </div>
    </>
  );
})

export default App;

const Auth = observer(() => {
  return (
    <div className="auth">
      <div className="auth__sign-in" onClick={ActiveStore.setActiveSignIn}>
        Sign in
      </div>
      <div className="auth__sign-up"  onClick={ActiveStore.setActiveSignUp}>
        Sign up
      </div>
    </div>
  )
})

const Sign = observer(() => {
  const [input, setInput] = useState('');

  const handleClick = () => {
    if (input !== '') {
      (ActiveStore.active === 'signUp') ? handleSignUp(input) : handleSignIn(input)
    }
  }

  const handleEnterUp = (e) => {
    if (e.key === 'Enter') {
      handleClick()
    }
  }

  async function handleSignUp(name) {
    let r = await fetch('http://192.168.0.104:8080/sign_up', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({name: name})
    });
    let d = await r.json();
    UserDataStore.setUserData(+d.id, name)
    ActiveStore.setActiveChat();
  }

  async function handleSignIn(id) {
    let r = await fetch('http://192.168.0.104:8080/sign_in', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      }, 
      body: JSON.stringify({id: id})
    });
    let d = await r.json();
    if (d.name !== null) {
      UserDataStore.setUserData(+id, d.name)
      ActiveStore.setActiveChat();
    } else {
      ActiveStore.setActiveWrongId();
    }
  }

  return (
    <div className="sign">
      <div className="sign__input-container">
        <input 
          value={input}
          type="text" 
          className="sign__input" 
          placeholder={`Enter your ${ActiveStore.active === 'signUp' ? 'name' : 'id'}`}
          onKeyUp={handleEnterUp} 
          onChange={(e) => setInput(e.target.value)} />
        <div className="sign__confirm-button" 
          onClick={handleClick}>
          &gt;
        </div>
        <BackButon />
      </div>
    </div>
  );
})

function WrongId() {
  return (
    <div className="wrong-id">
      It seems like user with such id does not exist
      <BackButon />
    </div>
  )
}

const Chat = observer(() => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  console.log('userData:', UserDataStore.userData);
  console.log('messages:', messages);

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
        if (d.message !== null) setMessages(prevMessages => [...prevMessages, newMessage]);
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
    setMessages([...messages, newMessage]);
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

  return (
    <div className="chat">
      chat (you are {UserDataStore.userData.name})
      {messages.map((message, index) => 
        <div key={index} className="message">
          <div className={`message__text ${message.id === UserDataStore.userData.id ? 'message__text_user' : ''}`}>
            {message.message}
            {message.id !== UserDataStore.userData.id &&
            <div className="message__sender">
              {message.name}
            </div>
            }
          </div>
        </div>
      )}
      <input 
        value={input}
        placeholder='Enter your message...' 
        type="text" 
        className="chat__input"
        onKeyUp={handleEnterUp}
        onChange={(e) => setInput(e.target.value)} />
      <BackButon />
    </div>
  )
});

const BackButon = observer(() => {
  return (
    <div className="sign__back-button" 
      onClick={() => {
        ActiveStore.setActiveAuth()
        UserDataStore.resetUserData();
      }}>
      back
    </div>
  )
});
