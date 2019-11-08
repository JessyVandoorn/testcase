import * as React from 'react';
import './App.css';
import { Switch, Route, withRouter, RouteComponentProps, Link } from 'react-router-dom';
import Hello from './components/Hello';
import Login from './components/Login';
import Admin from './components/Admin';
import EditCustomer from './components/users/Edit';

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
          <Route path={'/'} exact component={Hello} />
          <Route path={'/Login'} exact component={Login} />
          <Route path={'/Admin'} exact component={Admin} />
          <Route path={'/edit/:id'} exact component={EditCustomer} />
        </Switch>
      </div>
    );
  }
}
export default withRouter(App);
