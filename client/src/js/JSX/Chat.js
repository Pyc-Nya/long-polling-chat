import { observer } from 'mobx-react';
import { ActiveStore, UserDataStore } from '../../stores';
import BackButon from "./BackButton"
import { useChat } from '../Hooks/Chat';


const Chat = observer(() => {
  const {
    messages, 
    handleEnterUp,
    setInput,
    input,
    messagesEndRef,
    handleClick
  } = useChat();

  return (
    <div className="chat">
      <div className='chat__title'>
        <div onClick={ActiveStore.setActiveAuth} className="chat__back">✖</div>
        <div className='chat__chat'>Chat</div>
        <div className='chat__user'>User: {UserDataStore.userData.name}</div>
      </div>
      <div className='chat__messages-container'>
        <div className='chat__messages'>
          {messages.map((message, index) => 
            <div key={index} className={`chat__message message ${message.id === UserDataStore.userData.id ? 'message_user' : ''}`}>
              {message.id !== UserDataStore.userData.id &&
              <div className="message__sender">
                {message.name}
              </div>
              }
              <div className='message__text'>
                {message.message}
              </div>
            </div>
          )}
          <div ref={messagesEndRef}></div>
        </div>
      </div>
      <div className='chat__input-container'>
        <input 
          value={input}
          placeholder='Enter your message...' 
          type="text" 
          className="chat__input"
          onKeyUp={handleEnterUp}
          onChange={(e) => setInput(e.target.value)} />
          <div onClick={handleClick} className="chat__send-button">
            &gt;
          </div>
      </div>
    </div>
  )
});

export default Chat;
