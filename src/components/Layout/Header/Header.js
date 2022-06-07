import React, { useContext } from 'react';
import { UserContext } from '../../../helpers/userContext';
import profile from './Images/profile.svg';

import { H1 } from '../../BaseStyles/Headings';
import {
	HeaderBtnContainer,
	HeaderBtnCreate,
	HeaderBtnLogin,
	HeaderBtnProfile,
	HeaderBtnTheme,
	HeaderContainer,
} from './StyledHeader';

function Header({ themeToggler }) {

	const { currentUser } = useContext(UserContext);

	return (
		<HeaderContainer id='header'>
			<H1>PokéRef</H1>
			<HeaderBtnContainer>
				<HeaderBtnLogin to={`/login`}>Sign In</HeaderBtnLogin>
				<HeaderBtnCreate to={`/register`}>Sign Up</HeaderBtnCreate>
				<HeaderBtnTheme
					onClick={themeToggler}
					aria-label='Switch Theme'
				></HeaderBtnTheme>
				{currentUser && 
					<HeaderBtnProfile
						to={`/profile`}
					>
						<img src={profile} alt="Profile" />
					</HeaderBtnProfile>
				}
			</HeaderBtnContainer>
		</HeaderContainer>
	);
};

export default Header;
