import * as React from "react";
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { useObserver } from 'mobx-react-lite';
import { storeContext } from './context';

class Hello extends React.Component<RouteComponentProps> {
    constructor(props: RouteComponentProps) {
        super(props);
    }

    public render() {
        return (
            <section>
                <header>
                    <h2>List of Registerd users</h2>
                </header>
                <div>
                    <section>
                        <img src="/person-icon-white.png" alt="image person" width="50" height="50"/>
                        <h3>user name</h3>
                    </section>
                </div>
            </section>
        )
    }
};

export default withRouter(Hello);