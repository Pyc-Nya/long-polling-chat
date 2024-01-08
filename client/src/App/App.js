import { observer } from 'mobx-react';
import { ActiveStore } from '../stores';
import Auth from '../JSX/Auth';
import Sign from '../JSX/Sign';
import WrongId from '../JSX/WrongId';
import Chat from '../JSX/Chat';

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
