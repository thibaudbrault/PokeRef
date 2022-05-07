import styled from 'styled-components';

const size = {
	xs: '400px',
	sm: '650px',
	md: '890px',
	lg: '1150px'
};

export const device = {
	xs: `(max-width: ${size.xs})`,
	sm: `(max-width: ${size.sm})`,
	md: `(max-width: ${size.md})`,
	lg: `(max-width: ${size.lg})`
};
  

export const MainSmall = styled.main`
	max-width: 1300px;
	margin: 0 auto;
	padding: 5rem;

	@media ${device.sm} { 
		padding: 3rem 0 5rem;
	}
`;

export const MainBig = styled.main`
	max-width: 1700px;
	margin: 0 auto;
	padding: 5rem;

	@media ${device.sm} { 
		padding: 3rem;
	}
`;

export const ModifiedMainBig = styled(MainBig)`
	margin-bottom: 5rem;

`;
