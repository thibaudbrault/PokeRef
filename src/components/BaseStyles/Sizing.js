import styled from 'styled-components';

export const MainSmall = styled.main`
	max-width: 1300px;
	margin: 0 auto;
	padding: 5rem;

	.cssfx-bar-wave {
		margin: 0 auto;
	}
`;

export const MainBig = styled.main`
	max-width: 1700px;
	margin: 0 auto;
	padding: 5rem;

	.cssfx-bar-wave {
		margin: 0 auto;
	}
`;

export const ModifiedMainBig = styled(MainBig)`
	margin-bottom: 5rem;

	.cssfx-bar-wave {
		margin: 0 auto;
	}
`;