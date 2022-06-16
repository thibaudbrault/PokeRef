import React, { useContext } from 'react';
import { UserContext } from '../../helpers/userContext';

import { Navigate } from 'react-router-dom';
import { MainBig } from '../../components/BaseStyles/Sizing';
import { H2 } from '../../components/BaseStyles/Headings';
import Team from './Team/Team';

function Profile() {
	const { currentUser } = useContext(UserContext);

	if (!currentUser) {
		return <Navigate to='/' />;
	};

	return (
		<MainBig>
			<H2>Create your team</H2>
			<Team />
			<Team />
			<Team />
			<Team />
			<Team />
			<Team />
		</MainBig>
	);
}

export default Profile;
