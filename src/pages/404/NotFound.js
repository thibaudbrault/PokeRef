import React from 'react';
import { NotfFoundMain, NotFoundImg, NotFoundText } from './StyledNotFound';

function NotFound() {
	return (
		<NotfFoundMain>
			<NotFoundImg
				src='https://upload.wikimedia.org/wikipedia/commons/6/62/MissingNo.png'
				alt='MissingNo'
			/>
			<NotFoundText>Oops !</NotFoundText>
			<NotFoundText>The URL entered doesn't exist</NotFoundText>
			<NotFoundText>Use the links above to find your way back</NotFoundText>
		</NotfFoundMain>
	);
}

export default NotFound;
