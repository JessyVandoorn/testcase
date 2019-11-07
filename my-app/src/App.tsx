import * as React from "react";
import * as ReactDOM from "react-dom";
import { Switch, Route, withRouter, RouteComponentProps, Link, Router,  } from 'react-router-dom';

import { Hello } from "./components/Hello";
import { Login } from "./components/Login";
import { Admin } from "./components/Admin";

import './App.css';

class App extends React.Component {
  render() {
    return (
        <div>
          <nav>
            <ul>
                <Link to='/'> <li>Hello </li></Link>
                <Link to='/Login'> <li>Login</li> </Link>
                <Link to='/Admin'><li> Admin </li> </Link>
            </ul>
        </nav>
          <Switch>
            <Route exact path="/" component={Hello} />
            <Route exact path="/Login" component={Login} />
            <Route exact path="/Admin" component={Admin} />
          </Switch>
        </div>
    );
  }
}

export default App;
