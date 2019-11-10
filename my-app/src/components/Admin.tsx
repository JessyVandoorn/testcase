import * as React from 'react';
import { RouteComponentProps, Link } from 'react-router-dom';
import { withAuthorization } from "./../firebase/withAuthorization";
import SignOutButton from './Logout';
import { AuthUserContext } from "./../firebase/AuthUserContext";
import { db, auth } from './../firebase';
import { UserList } from "./UserList";

interface State {
    username: string;
    value: string;
    error: { message: string } | null;
    users?: any;
}

const initial_state: State = {
    username: '',
    value: '',
    error: null,
    users: null,
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

    private handleDelete = (event: React.MouseEvent<HTMLButtonElement>) => {
        const {error} = this.state;
        const user:any = auth.currentUser();

        const {
            history,
        } = this.props;

        user.delete()
            .then(() => {
                db.deleteUser(user)
                    .then(() => {
                        history.push('/');
                    })
                    .catch((error: string) => {
                        this.setState(AdminPage.propKey('error', error));
                    });
                })
                
            .catch((error: string) => {
                this.setState(AdminPage.propKey('error', error));
            });

            event.preventDefault();
    }

    public handleSearch = (event: any) => {
        //function
       const {value}: any = this.state;
  
        if(value !== ""){
            db.searchUser(value).on('value', snapshot => {
                this.setState(() => ({users: snapshot.val()}));
               });
        } else {
            this.setState(() => ({users: null}));
        }
   
    
       event.preventDefault();
    }
    

    public render() {
        const {username, value, users}:any = this.state;

        return (
            <AuthUserContext.Consumer>
                {authUser => {
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
                   <form action="">
                       <label htmlFor="">Search in database of logged in users
                        <input type="search" value={value} onChange={event => this.setStateWithEvent(event, "value")}/>
                       </label>
                       <button onClick={this.handleSearch}>Search</button>
                   </form>
                   {!!users && <UserList users={users} />}

                </div>
                <div>
                    <p>Remove</p>
                    <button onSubmit={this.handleDelete}>Delete user</button>
                </div>
                <p>Add</p>
                <p>
            Add another user
            {' '}
            <Link to={'/Register'}>Add User</Link>
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