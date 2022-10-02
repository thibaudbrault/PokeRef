import React from 'react';
import Link from 'next/link';
import { MainNav, MainNavList } from './StyledNav';
import { useRouter } from 'next/router';

function Nav() {
	const router = useRouter();

	return (
		<MainNav>
			<MainNavList>
				<li>
					<Link
						href='/'
					>
						Pokémon
					</Link>
				</li>

				<li>
					<Link
						href='/moves'
					>
						Moves
					</Link>
				</li>

				<li>
					<Link
						href='/abilities'
					>
						Abilities
					</Link>
				</li>

				<li>
					<Link
						href='/types'
					>
						Types
					</Link>
				</li>

				<li>
					<Link
						href='/items'
					>
						Items
					</Link>
				</li>

				<li>
					<Link
						href='/machines'
					>
						Machines
					</Link>
				</li>

				<li>
					<Link
						href='/locations'
					>
						Locations
					</Link>
				</li>
			</MainNavList>
		</MainNav>
	);
}

export default Nav;
