import * as React from 'react';
import './App.css';
import { Switch,Redirect, Route, withRouter, RouteComponentProps, Link } from 'react-router-dom';
import { firebase } from "./firebase";
import Hello from './components/Hello';
import Login from './components/Login';
import Logout from './components/Logout';
import {Admin} from './components/Admin';
import SignUpPage from './components/Register';
import { withAuthentication } from "./firebase/withAuthentication";

class AppComponent extends React.Component<RouteComponentProps<any>> {
  constructor(props: any) {
    super(props);

    this.state = {
      authUser: null
    };
  }

  public componentDidMount() {
    firebase.auth.onAuthStateChanged(authUser => {
      authUser
        ? this.setState(() => ({ authUser }))
        : this.setState(() => ({ authUser: null }));
    });
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
          <Route path="/Logout" component={Logout} />
        </Switch>
      </div>
    );
  }
}
export const App = withAuthentication(AppComponent);
