import * as React from 'react';
import { Link, withRouter } from 'react-router-dom';

import { auth, db } from './../firebase';
import { updateByPropertyName } from './../utils/helpers';

interface State {
    username: string;
    email: string;
    passwordOne: string;
    passwordTwo: string;
    error: { message: string } | null;
}

const initial_state: State = {
    username: '',
    email: '',
    passwordOne: '',
    passwordTwo: '',
    error: null,
};

class Register extends React.Component<any, State> {
    constructor(props: any) {
        super(props);
        this.state = {...initial_state};
    }

    onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        const {
            username,
            email,
            passwordOne,
        } = this.state;

        const {
            history,
        } = this.props;

        auth.doCreateUserWithEmailAndPassword(email, passwordOne)
            .then(authUser => {
                // Create a user in your own accessible Firebase Database too
                db.doCreateUser(authUser.uid, username, email)
                    .then(() => {
                        this.setState(() => ({...initial_state}));
                        history.push('/Admin');
                    })
                    .catch(error => {
                        this.setState(updateByPropertyName('error', error));
                    });

            })
            .catch(error => {
                this.setState(updateByPropertyName('error', error));
            });

        event.preventDefault();
    }

    render() {
        const {
            username,
            email,
            passwordOne,
            passwordTwo,
            error,
        } = this.state;

        const isInvalid =
            passwordOne !== passwordTwo ||
            passwordOne === '' ||
            username === '' ||
            email === '';

        return (
            <form onSubmit={this.onSubmit}>
                <input
                    value={username}
                    onChange={event => this.setState(updateByPropertyName('username', event.target.value))}
                    type="text"
                    placeholder="Full Name"
                />
                <input
                    value={email}
                    onChange={event => this.setState(updateByPropertyName('email', event.target.value))}
                    type="text"
                    placeholder="Email Address"
                />
                <input
                    value={passwordOne}
                    onChange={event => this.setState(updateByPropertyName('passwordOne', event.target.value))}
                    type="password"
                    placeholder="Password"
                />
                <input
                    value={passwordTwo}
                    onChange={event => this.setState(updateByPropertyName('passwordTwo', event.target.value))}
                    type="password"
                    placeholder="Confirm Password"
                />
                <button disabled={isInvalid} type="submit">
                    Sign Up
                </button>

                {error && <p>{error.message}</p>}
            </form>
        );
    }
}

const RegisterPage: React.StatelessComponent<{}> = ({history}: any) =>
    (
        <div>
            <h1>SignUp</h1>
            <Register history={history}/>
        </div>
    );

const SignUpLink = () =>
    (
        <p>
            Don't have an account?
            {' '}
            <Link to={'/Register'}>Sign Up</Link>
        </p>
    );

export default withRouter(RegisterPage);

export {
    RegisterPage,
    SignUpLink,
};