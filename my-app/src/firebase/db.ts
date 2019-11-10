import { db } from './firebase';

// User API

export const doCreateUser = (id: string, username: string, email: string) =>
  db.ref(`users/${id}`).set({
    username,
    email,
  });

export const onceGetUsers = () =>
  db.ref('users').once('value');

// Other db APIs ...
export const updateUser = (id: string, username: string) =>
  db.ref(`users/${id}`).update({
    username
  });

//remove user
export const deleteUser = (id: string) => 
db.ref(`users/${id}`).remove();

//search for users
export const searchUser = (value: string) => 
db.ref('users').equalTo(`${value}`).once('value');