import * as React from 'react';

import { auth } from './../firebase';

const SignOutButton: React.StatelessComponent<{}> = () =>
    (
        <a
            type="button"
            onClick={auth.doSignOut}
            className="login-button">
            <p>Sign Out</p>
        </a>
    );

export default SignOutButton;