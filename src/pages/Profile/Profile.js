import React, { useContext } from 'react';
import { UserContext } from '../../helpers/userContext';

import { Navigate } from 'react-router-dom';
import { MainBig } from '../../components/BaseStyles/Sizing';
import { H2 } from '../../components/BaseStyles/Headings';

function Profile() {
	const { currentUser } = useContext(UserContext);

	if (!currentUser) {
		return <Navigate to='/' />;
	};

	return (
		<MainBig>
			<H2>Coming soon !</H2>
		</MainBig>
	);
}

export default Profile;
