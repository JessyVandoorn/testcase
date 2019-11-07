import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

class Admin extends React.Component<RouteComponentProps> {
    constructor(props: RouteComponentProps) {
        super(props);
    }

    public render() {
        return (
            <div>
                <p>edit</p>
                <p>search</p>
                <p>remove</p>
                <p>Add</p>
            </div>
        )
    }
};

export default withRouter(Admin);