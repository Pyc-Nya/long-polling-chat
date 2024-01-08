import { UserDataStore, ActiveStore } from '../../stores';
import { useState, useEffect } from 'react'
import { toJS } from 'mobx';

const useSign = () => {
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
    let r = await fetch('http://localhost:8080/sign_up', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({name: name})
    });
    let d = await r.json();
    UserDataStore.setUserData(+d.id, name)
    ActiveStore.setActiveChat();
    console.log('userData:', toJS(UserDataStore));
  }

  async function handleSignIn(id) {
    let r = await fetch('http://localhost:8080/sign_in', {
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
      console.log('userData:', toJS(UserDataStore));
    } else {
      ActiveStore.setActiveWrongId();
    }
  }

  return {
    input,
    setInput,
    handleClick,
    handleEnterUp,
  }
}

export { useSign }