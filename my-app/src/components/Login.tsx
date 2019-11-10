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
            <div>
                <h3 className="h3 mb-3 font-weight-normal">Login</h3>
                <form onSubmit={this.onSubmit} className="form-signin">
                <input
                    value={email}
                    onChange={event => this.setState(updateByPropertyName('email', event.target.value))}
                    type="text"
                    placeholder="Email Address"
                    id="inputEmail" className="form-control" 
                />
                <input
                    value={password}
                    onChange={event => this.setState(updateByPropertyName('password', event.target.value))}
                    type="password"
                    placeholder="Password" className="form-control" 
                />
                <button disabled={isInvalid} type="submit" className="btn btn-lg btn-primary btn-block">
                    Sign In
                </button>

                {error && <p>{error.message}</p>}
            </form>
            <p>
            Don't have an account?
            {' '}
            <Link to={'/Register'}>Sign Up</Link>
        </p>
            </div>
            
        )
    }
};


export default withRouter(Login);