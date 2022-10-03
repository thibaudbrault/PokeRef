import React from 'react';
import Image from 'next/image';
import { LoadingImg } from './StyledLoader';

function Loader() {
	return (
		<LoadingImg>
			<Image src={'/pokeball.svg'} alt='' width={192} height={192} />
		</LoadingImg>
	);
}

export default Loader;
