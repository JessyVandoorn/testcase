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