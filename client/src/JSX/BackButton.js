import { observer } from 'mobx-react';
import { UserDataStore, ActiveStore } from '../stores';

const BackButon = observer(() => {
  return (
    <div className="sign__back-button" 
      onClick={() => {
        ActiveStore.setActiveAuth()
        UserDataStore.resetUserData();
        console.log('userData:', UserDataStore.userData);
      }}>
      back
    </div>
  )
});

export default BackButon;