import React from "react";
import { FaBars } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import "./NavbarElements.css";

export default function Navbar() {
    return (
        <>
            <nav className="nav">
                <div className="bars">
                    < FaBars />
                </div>
                <div className="nav-menu">
                    <NavLink to="/" className="nav-link" activeClassName="active">Home</NavLink>
                    <NavLink to="/players" className="nav-link" activeClassName="active">Players</NavLink>
                    <NavLink to="/teams" className="nav-link" activeClassName="active">Teams</NavLink>
                    <NavLink to="/games" className="nav-link" activeClassName="active">Games</NavLink>
                </div>
            </nav>
        </>
    );
}

