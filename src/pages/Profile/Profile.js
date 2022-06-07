import React, { useContext } from 'react';
import { UserContext } from '../../helpers/userContext';
import { Navigate } from 'react-router-dom';
import { MainBig } from '../../components/BaseStyles/Sizing';

import { signOut } from 'firebase/auth';
import { auth } from '../../firebase-config';

function Profile() {
	const { currentUser } = useContext(UserContext);

	if (!currentUser) {
		return <Navigate to='/' />;
	}

	const logOut = async () => {
		try {
			await signOut(auth)
			return <Navigate to='/' />
		} catch {
			alert(`Ho-Oh ! It looks like we can't log you out. Please check your internet connection and try again.`)
		}
	}

	return (
		<MainBig>
			<h1>Profile</h1>
			<button onClick={logOut}>Log Out</button>
		</MainBig>
	);
}

export default Profile;
