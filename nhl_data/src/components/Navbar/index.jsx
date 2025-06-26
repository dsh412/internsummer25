import React from "react";
import { Nav, NavLink, NavMenu } from "./NavbarElements";

const Navbar = () => {
    return (
        <>
            <Nav>
                <NavMenu>
                    <NavLink to="/players" activeStyle>
                        Players
                    </NavLink>
                    <NavLink to="/teams" activeStyle>
                        Teams
                    </NavLink>
                    <NavLink to="/games" activeStyle>
                        Games
                    </NavLink>
                </NavMenu>
            </Nav>
        </>
    );
};

export default Navbar;