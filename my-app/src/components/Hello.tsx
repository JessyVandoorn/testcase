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

    class HelloPage extends React.Component<Props, Users> {
    
        componentDidMount() {
            const { userStore } = this.props;
            db.onceGetUsers().then(snapshot =>
                userStore.setUsers(snapshot.val())
            );
        }

        render() {
            const {users}:any = this.props.userStore;

            return (
                <div className="projecten marginElements">
                    <h1 className="projecten-title">Overview registered users</h1>
                <section className="project-item">

                
                    {Object.keys(toJS(users)).map(key =>
                <article key={key} className="flexUsers">
                    <img src="/person-icon-white.png" alt="image person" width="50" height="50"/>
                    <div className="projectitem-content flexUsers">
                        <h3 className="projectitem-title">{users[key].username}</h3> 
                        <p>{users[key].email}</p>
                    </div>
                   
                </article>
                    )}
                    </section>
                </div>
            );
        }
    };


export default compose<Props, {}>(
    inject('userStore'),
    observer
)(HelloPage);;
