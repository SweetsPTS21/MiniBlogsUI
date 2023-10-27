import React from "react";
import {
    NavLink,
    Link,
} from "react-router-dom";

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
                            exact="true"
                            to="/"
                            className="link"
                            activeclassname="active"
                        >
                            Home
                        </NavLink>
                        <NavLink
                            exact="true"
                            to="/about"
                            className="link"
                            activeclassname="active"
                        >
                            About
                        </NavLink>
                        <NavLink
                            exact="true"
                            to="/contact"
                            className="link"
                            activeclassname="active"
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
