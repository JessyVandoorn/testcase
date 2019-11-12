import * as React from "react";
import { NavLink } from "react-router-dom";
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
                    <NavLink to={'/'} className="nav-link" activeClassName="selected-link"> 
                       <li>Home</li>
                    </NavLink>
                    <NavLink to={'/Admin'} className="nav-link " activeClassName="selected-link"> 
                       <li>Admin </li> 
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
<div className="navigation">
    <input type="checkbox" id="responsive-nav" />
    <label htmlFor="responsive-nav">☰</label>
    <div className="nav-aside">
        <nav>
            <ul>
                    <NavLink to={'/'} className="nav-link" activeClassName="selected-link"> 
                       <li>Home</li>
                    </NavLink>
                    <NavLink to={'/Admin'} className="nav-link " activeClassName="selected-link"> 
                       <li>Admin </li> 
                    </NavLink>
                    <NavLink to={'/Login'} className="login-button"> 
                       <li>
                          <p>Login </p> 
                           </li> 
                    </NavLink>
            </ul>
        </nav>
    </div>

</div>

);