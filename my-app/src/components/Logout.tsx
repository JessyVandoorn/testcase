import * as React from 'react';

import { auth } from './../firebase';

const SignOutButton: React.StatelessComponent<{}> = () =>
    (
        <button
            type="button"
            onClick={auth.doSignOut}
            className="login-button">
            <p>Sign Out</p>
        </button>
    );

export default SignOutButton;