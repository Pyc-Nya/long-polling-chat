import { makeAutoObservable } from "mobx";

class UserData {
  userData = {};

  constructor() {
    makeAutoObservable(this);
  }

  setUserData = (id, name) => {
    this.userData = {id: id, name: name};
  }

  resetUserData = () => {
    this.userData = {};
  }
}

class Active {
  active = 'auth';

  constructor() {
    makeAutoObservable(this);
  }

  setActiveSignUp = () => {
    this.active = 'signUp';
  }

  setActiveSignIn = () => {
    this.active = 'signIn';
  }

  setActiveWrongId = () => {
    this.active = 'wrongId';
  }

  setActiveChat = () => {
    this.active = 'chat';
  }

  setActiveAuth = () => {
    this.active = 'auth';
  }
}

export const UserDataStore = new UserData();
export const ActiveStore = new Active();
