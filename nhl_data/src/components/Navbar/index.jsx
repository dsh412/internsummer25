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
                    <NavLink to="/" className="nav-link" activeclassname="active">Home</NavLink>
                    <NavLink to="/players" className="nav-link" activeclassname="active">Players</NavLink>
                    <NavLink to="/teams" className="nav-link" activeclassname="active">Teams</NavLink>
                    <NavLink to="/games" className="nav-link" activeclassname="active">Games</NavLink>
                </div>
            </nav>
        </>
    );
}

