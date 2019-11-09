import * as React from "react";
import { inject, observer } from 'mobx-react';
import { toJS } from 'mobx';
import { compose } from 'recompose';

import { db } from './../firebase';
import UserStore from './../store/userStore';

interface Props {
    userStore: UserStore;
    
}

interface Users {
    users:{};

}

    class Hello extends React.Component<Props, Users> {
        constructor(props: Props) {
            super(props);
        }
    
        componentDidMount() {
            const { userStore } = this.props;
            db.onceGetUsers().then(snapshot =>
                userStore.setUsers(snapshot.val())
            );
        }

        render() {
            const {users}:any = this.props.userStore;
            console.log(users);

            return (
                <div>
                    <h1>Home</h1>
                    <p>The Home Page is accessible by every signed in user.</p>
    
                    {Object.keys(toJS(users)).map(key =>{
                        console.log(toJS(users[key].username));
                        return(
                <section key={key}>
                    <img src="/person-icon-white.png" alt="image person" width="50" height="50"/>
                   <h3>{users[key].username}</h3> 
                   {/* <p>{users[key].email}</p> */}
                </section>
                    )})}
                </div>
            );
        }
    };

 


export default compose<Props, {}>(
    inject('userStore'),
    observer
)(Hello);
