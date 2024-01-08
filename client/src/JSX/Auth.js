import { observer } from 'mobx-react';
import { UserDataStore, ActiveStore } from '../stores';

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

export default Auth