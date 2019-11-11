import * as React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import { Switch, Route, RouteComponentProps, NavLink, BrowserRouter } from 'react-router-dom';
import { firebase } from "./firebase";
import Hello from './components/Hello';
import Login from './components/Login';
import Logout from './components/Logout';
import Admin from './components/Admin';
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
    const {authUser}:any = this.state;

    return (
      <main>
        <BrowserRouter>
        <nav >
          <ul className="nav justify-content-end">
            <li className="nav-item">
              <NavLink to={'/'} className="nav-link" activeClassName=""> Home </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to={'/Admin'} className="nav-link " activeClassName="active-link"> Admin </NavLink>
            </li>
            <li className="nav-item">
              {authUser === null ?  <NavLink to={'/Login'} className="nav-link " activeClassName="active-link"> Login </NavLink> :  <NavLink to={'/Logout'} className="nav-link " activeClassName="active-link"> Logout </NavLink> }
            </li>
          </ul>
        </nav>
        
        <Switch>
          <Route  path={'/'} exact={true} component={Hello} />
          <Route exact={true} path={'/Login'} component={Login} />
          <Route exact={true} path={'/Register'} component={SignUpPage} />
          <Route path="/Admin" exact={true} component={Admin} />
          <Route path="/Logout" exact={true} component={Logout} />
        </Switch>
        </BrowserRouter>
      </main>
    );
  }
}


const App = withAuthentication(AppComponent)

export default App;
