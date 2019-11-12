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
            <section className=" home marginElements">
                <div className="header">
                {/* <img src="/person-icon-white.png" alt="image person" width="50" height="50"/> */}
                <h2 >Account: {(authUser as any).email}</h2>
                <section className="login-button flexButton">
                <p className="paswoordvergeten evenementen login-button ">
            <Link to={'/Register'}>Add a new user</Link>
        </p>
        
<SignOutButton />

                    <button onSubmit={this.handleDelete} className="uitlog-button">Delete user</button>
                    
                </section>
                </div>
                
                <form onSubmit={event => this.onSubmit(event)} className=" inloggen form-login maaklocatie">
                    <div className="input-field">
                    <label htmlFor="" >Change username</label>
                        <input type="text" value={username} onChange={event => this.setStateWithEvent(event, "username")} className=" input-field" />
                        </div>
                    <button type="submit" className=" button-next button-next--primary">Change username</button>
                    
                    
                </form>
                <div className="project">
                   <form action="" className="form-login">
                       <div className="input-field search">
                       <label htmlFor="">Search in database of logged in users</label>
                        <input type="search" value={value} onChange={event => this.setStateWithEvent(event, "value")} className="searchbar-input"/>
                       
                       </div>
                       
                       <button onClick={this.handleSearch} className=" button-next button-next--primary">Search</button>
                   </form>
                   {!!users && <UserList users={users} />}

                </div>
        
            </section>
                )}}
            </AuthUserContext.Consumer>
        )
    }

    
};


const authCondition = (authUser: any) => !!authUser;
const Admin = withAuthorization(authCondition)(AdminPage);

export default Admin;