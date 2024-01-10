import { useEffect } from "react";
import { UserDataStore, ActiveStore } from "../../stores"
import { toJS } from "mobx";

const useApp = () => {
  useEffect(() => {
    if (localStorage.length > 0) {
      const id = localStorage.getItem('id');
      const name = localStorage.getItem('name');
      UserDataStore.setUserData(+id, name);
      ActiveStore.setActiveChat();
      console.log('userData:', toJS(UserDataStore));
    }
  }, []);
  return;
}

export { useApp };