import * as React from 'react';
import './App.css';
import { Switch,Redirect, Route, withRouter, RouteComponentProps, Link } from 'react-router-dom';
import { firebase } from "./firebase";
import Hello from './components/Hello';
import Login from './components/Login';
import Admin from './components/Admin';
import SignUpPage from './components/Register';

class App extends React.Component<RouteComponentProps<any>> {
  constructor(props: any) {
    super(props);
  }


  public render() {
    return (
      <div>
        <nav>
          <ul>
            <li>
              <Link to={'/'}> Home </Link>
            </li>
            <li>
              <Link to={'/Admin'}> Admin </Link>
            </li>
            <li>
              <Link to={'/Login'}> Login </Link>
            </li>
          </ul>
        </nav>
        <Switch>
          <Route  path={'/'} exact component={Hello} />
          <Route exact={true} path={'/Login'} component={Login} />
          <Route exact={true} path={'/Register'} component={SignUpPage} />
          <Route path="/Admin" component={Admin} />
        </Switch>
      </div>
    );
  }
}
export default withRouter(App);
