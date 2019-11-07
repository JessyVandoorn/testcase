import * as React from "react";
import * as ReactDOM from "react-dom";

import { Hello } from "./components/Hello";
import './App.css';

const App: React.FC = () => {
  return (
    <div className="App">
      <Hello />
    </div>
  );
}

export default App;
