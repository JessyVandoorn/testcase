import * as React from "react";
import { RouteComponentProps, withRouter } from 'react-router-dom';

class Hello extends React.Component<RouteComponentProps> {
    constructor(props: RouteComponentProps) {
        super(props);
    }

    public render() {
        return (
            <ul>
                <li>Person A</li>
                <li>Person B</li>
            </ul>
        )
    }
};

export default withRouter(Hello);