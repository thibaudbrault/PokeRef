import React from 'react';
import { NavLink } from "react-router-dom";


const Nav = () => {
    return (
        <nav className="nav">
            <div className="nav_inner">
                <ul className="nav_inner_ul">
                    <li className="nav_inner_ul_li">
                        <NavLink className="nav_inner_ul_li_link" to="/"
                            style={({ isActive }) => {
                                return {
                                    color: isActive ? "#cc0000" : ""
                                };
                            }}>
                            Pokémon
                        </NavLink>
                    </li>
                    <li className="nav_inner_ul_li">
                        <NavLink className="nav_inner_ul_li_link" to="/moves"
                            style={({ isActive }) => {
                                return {
                                    color: isActive ? "#cc0000" : ""
                                };
                            }}>
                            Moves
                        </NavLink>
                    </li>
                    <li className="nav_inner_ul_li">
                        <NavLink className="nav_inner_ul_li_link" to="/abilities"
                            style={({ isActive }) => {
                                return {
                                    color: isActive ? "#cc0000" : ""
                                };
                            }}>
                            Abilities
                        </NavLink>
                    </li>
                    <li className="nav_inner_ul_li">
                        <NavLink className="nav_inner_ul_li_link" to="/types"
                            style={({ isActive }) => {
                                return {
                                    color: isActive ? "#cc0000" : ""
                                };
                            }}>
                            Types
                        </NavLink>
                    </li>
                    <li className="nav_inner_ul_li">
                        <NavLink className="nav_inner_ul_li_link" to="/items"
                            style={({ isActive }) => {
                                return {
                                    color: isActive ? "#cc0000" : ""
                                };
                            }}>
                            Items
                        </NavLink>
                    </li>
                    <li className="nav_inner_ul_li">
                        <NavLink className="nav_inner_ul_li_link" to="/machines"
                            style={({ isActive }) => {
                                return {
                                    color: isActive ? "#cc0000" : ""
                                };
                            }}>
                            Machines
                        </NavLink>
                    </li>
                    <li className="nav_inner_ul_li">
                        <NavLink className="nav_inner_ul_li_link" to="/locations"
                            style={({ isActive }) => {
                                return {
                                    color: isActive ? "#cc0000" : ""
                                };
                            }}>
                            Locations
                        </NavLink>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default Nav