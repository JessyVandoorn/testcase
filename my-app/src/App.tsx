import * as React from "react";
import * as ReactDOM from "react-dom";

import { Hello } from "./components/Hello";
import { Login } from "./components/Login";
import { Admin } from "./components/Admin";

import './App.css';

const App: React.FC = () => {
  return (
    <div className="App">
      <Hello />
      <Login />
      <Admin />
    </div>
  );
}

export default App;
