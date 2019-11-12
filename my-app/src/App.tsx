import * as React from 'react';
import './scss/style.scss';
import { Switch, Route, RouteComponentProps, BrowserRouter } from 'react-router-dom';
import { firebase } from "./firebase";
import Hello from './components/Hello';
import Login from './components/Login';
import Logout from './components/Logout';
import Admin from './components/Admin';
import SignUpPage from './components/Register';
import { withAuthentication } from "./firebase/withAuthentication";
import { Navigation } from "./components/Navigation";

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
      <main>
        <BrowserRouter>
        <Navigation />
        
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
