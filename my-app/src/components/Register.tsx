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
        console.log(event);
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
                console.log(authUser);
                // Create a user in your own accessible Firebase Database too
                if(authUser.user !== null){
                    db.doCreateUser(authUser.user.uid, username, email)
                    .then(() => {
                        this.setState(() => ({...initial_state}));
                        history.push('/Admin');
                    })
                    .catch(error => {
                        this.setState(updateByPropertyName('error', error));
                    });
                }
                

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
            <section className="inloggen">
                <form onSubmit={this.onSubmit} className="form-login">
                <p className='error'></p>
                <div className="input-field">
                <label htmlFor="name">Full name</label>
                <input
                    value={username}
                    onChange={event => this.setState(updateByPropertyName('username', event.target.value))}
                    type="text"
                    placeholder="Full Name"
                    id="id"
                />
                </div>
                <div className="input-field">
                    <label htmlFor="email">E-mail</label>
                    <input
                    value={email}
                    onChange={event => this.setState(updateByPropertyName('email', event.target.value))}
                    type="text"
                    placeholder="Email Address"
                    id="email"
                />
                </div>
                <div className="input-field">
                    <label htmlFor="passwordone">Password</label>
                    <input
                    value={passwordOne}
                    onChange={event => this.setState(updateByPropertyName('passwordOne', event.target.value))}
                    type="password"
                    placeholder="Password"
                    id="passwordone"
                />
                </div>
                <div className="input-field">
                    <label htmlFor="passwordtwo">Confirm password</label>
                    <input
                    value={passwordTwo}
                    onChange={event => this.setState(updateByPropertyName('passwordTwo', event.target.value))}
                    type="password"
                    placeholder="Confirm Password"
                    id="passwordtwo"
                />
                </div>
                <div className="button-next button-next--primary">
                    <button disabled={isInvalid} type="submit">
                        Sign Up <i className="arrow right"></i>
                    </button>
                </div>
                

                {error && <p>{error.message}</p>}
            </form>
            </section>
            
        );
    }
}

const SignUpPage: React.StatelessComponent<{}> = ({history}: any) =>
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

export default withRouter(SignUpPage);

export {
    Register,
    SignUpLink,
};