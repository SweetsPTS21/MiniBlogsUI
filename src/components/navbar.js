import React from "react";
import {
    NavLink,
    Link,
} from "react-router-dom";
import logo from "../logo-nav.png";

function Navbar() {
    return (
        <div className="navbar">
            <div className="navbar__content">
                <div className="navbar__left">
                    <Link to="/" style={{textDecoration: "none", color: "#0573ce"}}>
                        <h2>Lolia</h2>
                    </Link>
                </div>
                <div className="navbar__right">
                    <div className="navbar__right__link">
                        <NavLink
                            exact
                            to="/"
                            className="link"
                            activeClassName="active"
                        >
                            Home
                        </NavLink>
                        <NavLink
                            exact
                            to="/about"
                            className="link"
                            activeClassName="active"
                        >
                            About
                        </NavLink>
                        <NavLink
                            exact
                            to="/contact"
                            className="link"
                            activeClassName="active"
                        >
                            Contact
                        </NavLink>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Navbar;
