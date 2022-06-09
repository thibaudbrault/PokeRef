import React, { useContext } from 'react';
import { UserContext } from '../../helpers/userContext';
import { Navigate } from 'react-router-dom';
import { MainBig } from '../../components/BaseStyles/Sizing';

function Profile() {
	const { currentUser } = useContext(UserContext);

	if (!currentUser) {
		return <Navigate to='/' />;
	}

	return (
		<MainBig>
			<h1>Profile</h1>
		</MainBig>
	);
}

export default Profile;
