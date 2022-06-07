import React from 'react';
import { NavLink } from 'react-router-dom';
import { MainNav, MainNavList } from './StyledNav';

function Nav() {
	return (
		<MainNav>
			<MainNavList>
				<li>
					<NavLink
						to='/'
						style={({ isActive }) => {
							return {
								color: isActive ? '#cc0000' : '',
							};
						}}
					>
						Pokémon
					</NavLink>
				</li>

				<li>
					<NavLink
						to='/moves'
						style={({ isActive }) => {
							return {
								color: isActive ? '#cc0000' : '',
							};
						}}
					>
						Moves
					</NavLink>
				</li>

				<li>
					<NavLink
						to='/abilities'
						style={({ isActive }) => {
							return {
								color: isActive ? '#cc0000' : '',
							};
						}}
					>
						Abilities
					</NavLink>
				</li>

				<li>
					<NavLink
						to='/types'
						style={({ isActive }) => {
							return {
								color: isActive ? '#cc0000' : '',
							};
						}}
					>
						Types
					</NavLink>
				</li>

				<li>
					<NavLink
						to='/items'
						style={({ isActive }) => {
							return {
								color: isActive ? '#cc0000' : '',
							};
						}}
					>
						Items
					</NavLink>
				</li>

				<li>
					<NavLink
						to='/machines'
						style={({ isActive }) => {
							return {
								color: isActive ? '#cc0000' : '',
							};
						}}
					>
						Machines
					</NavLink>
				</li>

				<li>
					<NavLink
						to='/locations'
						style={({ isActive }) => {
							return {
								color: isActive ? '#cc0000' : '',
							};
						}}
					>
						Locations
					</NavLink>
				</li>
			</MainNavList>
		</MainNav>
	);
};

export default Nav;
