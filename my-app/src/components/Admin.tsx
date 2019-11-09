import * as React from 'react';
import { RouteComponentProps, withRouter, Link } from 'react-router-dom';
import { withAuthorization } from "./../firebase/withAuthorization";

class AdminPage extends React.Component<RouteComponentProps> {
    constructor(props: RouteComponentProps) {
        super(props);
    }

    public render() {
        return (
            <div>
                <p>edit</p>
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
        <button>
            <Link to={'/Logout'}>Logout</Link>
        </button>
            </div>
        )
    }
};


const authCondition = (authUser: any) => !!authUser;

export const Admin = withAuthorization(authCondition)(AdminPage);