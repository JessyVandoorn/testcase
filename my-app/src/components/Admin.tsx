import * as React from 'react';
import { RouteComponentProps, withRouter, Link } from 'react-router-dom';
import { withAuthorization } from "./../firebase/withAuthorization";
import SignOutButton from './Logout';
import { AuthUserContext } from "./../firebase/AuthUserContext";
import { string } from 'prop-types';
import { db, auth } from './../firebase';

interface State {
    username: string;
    error: { message: string } | null;
}

const initial_state: State = {
    username: '',
    error: null,
}


class AdminPage extends React.Component<RouteComponentProps, State> {
    constructor(props: RouteComponentProps) {
        super(props);
        this.state = {...initial_state};
    }

    public static propKey(propertyName: string, value: string): object {
        return {[propertyName]: value};
    }

    public setStateWithEvent(event: any, columnType:string): void {
        this.setState(AdminPage.propKey(columnType, (event.target as any).value));
    }

    public onSubmit = (event: any) => {
        const {username}: any = this.state;
        const user:any = auth.currentUser();

        const {
            history,
        } = this.props;

        db.updateUser(user.uid, username)
        .then(() => {
            this.setState(() => ({...initial_state}));
            history.push('/Admin');
        })
        .catch(error => {
            this.setState(AdminPage.propKey('error', error));
        });

        event.preventDefault();
    }
    

    public render() {
        const {username}:any = this.state;
        return (
            <AuthUserContext.Consumer>
                {authUser => {
                    console.log(authUser);
                    return(
            <div>
                <h2>Account: {(authUser as any).email}</h2>
                <p>edit</p>
                <form onSubmit={event => this.onSubmit(event)}>
                    <label htmlFor="">Change username
                        <input type="text" value={username} onChange={event => this.setStateWithEvent(event, "username")}/>
                    </label>
                    <button type="submit">Change username</button>
                </form>
                <div>
                    <label htmlFor="">
                        search
                        <input type="text"/>
                    </label>
                    <input type="submit"/>
                </div>
                <div>
                    <p>Remove</p>
                    <button>Remove</button>
                </div>
                <p>Add</p>
                <p>
            Add another user
            {' '}
            <Link to={'/Register'}>Sign Up</Link>
        </p>
        <SignOutButton />
            </div>
                )}}
            </AuthUserContext.Consumer>
        )
    }

    
};


const authCondition = (authUser: any) => !!authUser;

export const Admin = withAuthorization(authCondition)(AdminPage);