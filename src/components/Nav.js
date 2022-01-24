import React from 'react';
import { Link } from "react-router-dom";


export default function Nav() {
    return (
        <nav className="nav">
            <div className="nav_inner">
                <ul className="nav_inner_ul">
                    <li className="nav_inner_ul_li"><Link className="nav_inner_ul_li_link" to="/">Pokemon</Link></li>
                    <li className="nav_inner_ul_li"><Link className="nav_inner_ul_li_link" to="/moves">Moves</Link></li>
                    <li className="nav_inner_ul_li"><Link className="nav_inner_ul_li_link" to="/abilities">Abilities</Link></li>
                    <li className="nav_inner_ul_li"><Link className="nav_inner_ul_li_link" to="/types">Types</Link></li>
                    <li className="nav_inner_ul_li"><Link className="nav_inner_ul_li_link" to="/items">Items</Link></li>
                    <li className="nav_inner_ul_li"><Link className="nav_inner_ul_li_link" to="/locations">Locations</Link></li>
                    <li className="nav_inner_ul_li"><Link className="nav_inner_ul_li_link" to="/games">Games</Link></li>
                </ul>
            </div>
        </nav>
    )
}
