import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';

import { UserContext } from '../../../helpers/userContext';
import { signOut } from 'firebase/auth';
import { auth } from '../../../firebase-config';

import { H1 } from '../../BaseStyles/Headings';
import {
	HeaderBtnContainer,
	HeaderBtnCreate,
	HeaderBtnLogin,
	HeaderBtnLogOut,
	HeaderBtnProfile,
	HeaderBtnTheme,
	HeaderContainer,
} from './StyledHeader';
import { BsMoonStars, BsSun } from 'react-icons/bs'

function Header({ themeToggler, theme }) {

	const { currentUser } = useContext(UserContext);

	const logOut = async () => {
		try {
			await signOut(auth)
			return <Navigate to='/' />
		} catch {
			alert(`Ho-Oh ! It looks like we can't log you out. Please check your internet connection and try again.`)
		}
	}

	return (
		<HeaderContainer id='header'>
			<H1>PokéRef</H1>
			<HeaderBtnContainer>
				{!currentUser ? (
						<>
							<HeaderBtnLogin to={`/login`}>Sign In</HeaderBtnLogin>
							<HeaderBtnCreate to={`/register`}>Sign Up</HeaderBtnCreate>
						</>
					) : (
						<>
							<HeaderBtnLogOut onClick={logOut}>Log Out</HeaderBtnLogOut>
							<HeaderBtnProfile to={`/profile`}>Profile</HeaderBtnProfile>
						</>
					)
				}
				<HeaderBtnTheme
					onClick={themeToggler}
					aria-label='Switch Theme'
				>
					{theme === 'dark' ? <BsSun /> : <BsMoonStars />}
				</HeaderBtnTheme>
			</HeaderBtnContainer>
		</HeaderContainer>
	);
};

export default Header;
