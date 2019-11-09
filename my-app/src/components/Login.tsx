import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { auth } from './../firebase';
import { updateByPropertyName } from './../utils/helpers';

interface State {   
    email: string;
    password: string;
    error: {message: string}|null;
}

const initial_state = {
    email: '',
    password: '',
    error: null,
};

class Login extends React.Component<any, State> {
    constructor(props: any) {
        super(props);
        this.state = {...initial_state};
    }

    onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        const {
            email,
            password,
        } = this.state;

        const {
            history,
        } = this.props;

        auth.doSignInWithEmailAndPassword(email, password)
            .then(() => {
                this.setState(() => ({...initial_state}));
                history.push('/Admin');
            })
            .catch(error => {
                this.setState(updateByPropertyName('error', error));
            });

        event.preventDefault();
    }

    public render() {
        const {
            email,
            password,
            error,
        } = this.state;

        const isInvalid =
            password === '' ||
            email === '';

        return (
            <form onSubmit={this.onSubmit}>
                <input
                    value={email}
                    onChange={event => this.setState(updateByPropertyName('email', event.target.value))}
                    type="text"
                    placeholder="Email Address"
                />
                <input
                    value={password}
                    onChange={event => this.setState(updateByPropertyName('password', event.target.value))}
                    type="password"
                    placeholder="Password"
                />
                <button disabled={isInvalid} type="submit">
                    Sign In
                </button>

                {error && <p>{error.message}</p>}
            </form>
        )
    }
};

const LoginPage: React.StatelessComponent<{}> = ({history}: any) =>
    (
        <div>
            <h1>Login</h1>
            <LoginPage />
        </div>
    );

export default withRouter(Login);
export {LoginPage}