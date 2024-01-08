import { observer } from 'mobx-react';
import { UserDataStore } from '../stores';
import BackButon from "./BackButton"
import { useChat } from '../Hooks/Chat';


const Chat = observer(() => {
  const {
    messages, 
    handleEnterUp,
    setInput,
    input,
  } = useChat();

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

export default Chat;
