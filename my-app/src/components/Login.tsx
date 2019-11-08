import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

class Login extends React.Component<RouteComponentProps> {
    constructor(props: RouteComponentProps) {
        super(props);
    }

    public render() {
        return (
            <form action="">
                <fieldset>
                    <input type="text"/>
                    <label htmlFor="">Email
                        <input type="email"/>
                    </label>
                    <button type="submit">Send</button>
                </fieldset>
            </form>
        )
    }
};

export default withRouter(Login);