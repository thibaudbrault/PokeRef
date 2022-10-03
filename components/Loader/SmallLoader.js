import React from 'react';
import Image from 'next/image';
import { SmallLoadingImg } from './StyledLoader';

function SmallLoader() {
	return (
		<SmallLoadingImg>
			<Image src={'/pokeball.svg'} alt='' width={48} height={48} />
		</SmallLoadingImg>
	);
}

export default SmallLoader;
