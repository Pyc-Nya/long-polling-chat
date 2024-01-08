import { observer } from 'mobx-react';
import { UserDataStore, ActiveStore } from '../../stores';

const BackButon = observer(() => {
  return (
    <div className="sign__back-button sign-button" 
      onClick={() => {
        ActiveStore.setActiveAuth()
        UserDataStore.resetUserData();
        console.log('userData:', UserDataStore.userData);
      }}>
      Back
    </div>
  )
});

export default BackButon;