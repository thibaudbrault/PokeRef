import React from 'react';
import Link from 'next/link';
import { Auth, ThemeSupa } from '@supabase/auth-ui-react'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'

import { H1 } from '../../BaseStyles/Headings';
import {
	HeaderBtnConnect,
	HeaderBtnContainer,
	HeaderBtnTheme,
	HeaderContainer,
} from './StyledHeader';
import RiMoonClearLine from '@meronex/icons/ri/RiMoonClearLine';
import RiSunLine from '@meronex/icons/ri/RiSunLine';

function Header({ themeToggler, theme }) {

	const session = useSession()
	const supabase = useSupabaseClient()

	return (
		<HeaderContainer id='header'>
			<H1>PokéRef</H1>
			<HeaderBtnContainer>
				<HeaderBtnTheme onClick={themeToggler} aria-label='Switch Theme'>
					{theme === 'dark' ? <RiSunLine /> : <RiMoonClearLine />}
				</HeaderBtnTheme>
				{session ? (
					<>
						<button onClick={signOut}>Log Out</button>
						<Link href='/profile'>Profile</Link>
					</>
				) : (
					<HeaderBtnConnect>
						<Link href='/login' passHref>
							Login
						</Link>
						<Link href='/register'>Register</Link>
					</HeaderBtnConnect>
				)}
			</HeaderBtnContainer>
		</HeaderContainer>
	);
}

export default Header;
