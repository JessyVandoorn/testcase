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
    
        componentDidMount() {
            const { userStore } = this.props;
            db.onceGetUsers().then(snapshot =>
                userStore.setUsers(snapshot.val())
            );
        }

        render() {
            const {users}:any = this.props.userStore;

            return (
                <div>
                    <h1>Home</h1>
                    <p>The Home Page is accessible by every signed in user.</p>
    
                    {Object.keys(toJS(users)).map(key =>
                <section key={key}>
                    <img src="/person-icon-white.png" alt="image person" width="50" height="50"/>
                   <h3>{users[key].username}</h3> 
                </section>
                    )}
                </div>
            );
        }
    };

export default compose<Props, {}>(
    inject('userStore'),
    observer
)(Hello);
