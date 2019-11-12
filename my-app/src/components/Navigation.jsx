import * as React from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthUserContext } from "../firebase/AuthUserContext";
import SignOutButton from "./Logout";

export const Navigation = () => (
<AuthUserContext.Consumer>
    {authUser => (authUser ?
    <NavigationAuth /> :
    <NavigationNonAuth />)}
</AuthUserContext.Consumer>
);

const NavigationAuth = () => (
<div className="navigation">
    <input type="checkbox" id="responsive-nav" />
    <label htmlFor="responsive-nav">☰</label>
    <div className="nav-aside">
        <nav>
            <ul>
                <li>
                    <NavLink to={'/'} className="nav-link" activeClassName="selected-link"> 
                       <li>Home</li>
                    </NavLink>
                </li>
                    <NavLink to={'/Admin'} className="nav-link " activeClassName="selected-link"> 
                       <li>Admin </li> 
                    </NavLink>
                    <NavLink to={'/Login'} className="nav-link " activeClassName="selected-link">
                       <li>Login</li> 
                        </NavLink>
                <li>
                    <SignOutButton />
                </li>
            </ul>
        </nav>
    </div>

</div>

);

const NavigationNonAuth = () => (
<ul>
    <li>
        <Link to={'/Admin'}>Landing </Link> </li> <li>
        <Link to={'/Login'}>Sign In</Link> </li> </ul> 
);