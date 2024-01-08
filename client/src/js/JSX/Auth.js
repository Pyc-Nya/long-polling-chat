import { observer } from 'mobx-react';
import { UserDataStore, ActiveStore } from '../../stores';

const Auth = observer(() => {
  return (
    <div className="auth">
      <div className="auth__sign" onClick={ActiveStore.setActiveSignIn}>
        Sign in
      </div>
      <div className="auth__sign"  onClick={ActiveStore.setActiveSignUp}>
        Sign up
      </div>
    </div>
  )
})

export default Auth