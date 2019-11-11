import * as React from 'react';
import { withRouter, Link } from 'react-router-dom';
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
            <section className="inloggen">
                <h3 className=" inlog-title">Login</h3>
                <form onSubmit={this.onSubmit} className="form-login">
                    <div className="input-field">
                    <label htmlFor="email">E-mail</label>
                    <input
                    value={email}
                    onChange={event => this.setState(updateByPropertyName('email', event.target.value))}
                    type="text"
                    placeholder="Email Address"
                    id="email" className=" input-field" 
                />
                    </div>
                <div className="input-field">
                <label htmlFor="password">Password</label>
                <input
                    value={password}
                    onChange={event => this.setState(updateByPropertyName('password', event.target.value))}
                    type="password"
                    placeholder="Password" className="input-field" id="password"
                />
                </div>
                <div className=" button-next button-next--primary">
                    <input type="submit" disabled={isInvalid} value="Login"/><i className="arrow right"></i>
                </div>
                

                {error && <p>{error.message}</p>}
            </form>
            <p className="paswoordvergeten">
            Don't have an account?
            {' '}
            <Link to={'/Register'}>Sign Up</Link>
        </p>
            </section>
            
        )
    }
};


export default withRouter(Login);