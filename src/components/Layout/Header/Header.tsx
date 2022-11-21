import React from 'react';
import Link from 'next/link';
import { Auth, ThemeSupa } from '@supabase/auth-ui-react'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'

import { H1 } from '../../Common/Headings';
import {
	HeaderBtnConnect,
	HeaderBtnContainer,
	HeaderBtnTheme,
	HeaderContainer,
} from './StyledHeader';
import RiMoonClearLine from '@meronex/icons/ri/RiMoonClearLine';
import RiSunLine from '@meronex/icons/ri/RiSunLine';

type Props = {
	themeToggler: () => void;
	theme: string;
}

function Header({ themeToggler, theme }: Props) {

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
						<button>Log Out</button>
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
