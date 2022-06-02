import React, { useContext } from 'react';
import { UserContext } from '../../helpers/userContext';
import { Navigate } from 'react-router-dom';

function Profile() {
	const { currentUser } = useContext(UserContext);

	if (!currentUser) {
		return <Navigate to='/' />;
	}

	return <div>Profile</div>;
}

export default Profile;
