import { observer } from 'mobx-react';
import { useSign } from '../Hooks/Sign';
import { UserDataStore, ActiveStore } from '../../stores';
import BackButon from './BackButton';

const Sign = observer(() => {
  const { input, setInput, handleClick, handleEnterUp, } = useSign();

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
        <div className="sign__confirm-button sign-button" 
          onClick={handleClick}>
          Send
        </div>
        <BackButon />
      </div>
    </div>
  );
})

export default Sign