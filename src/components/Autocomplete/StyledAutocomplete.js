import styled from 'styled-components';
import { TLink } from '../BaseStyles/Table';

export const AutocompleteContainer = styled.div`
	width: 100%;
	position: relative;
	z-index: 99;

	& ul {
		width: 100%;
		position: absolute;
		top: 0;
		left: 0;
		background: ${({ theme }) => theme.secondary};
		color: ${({ theme }) => theme.main};
		border-radius: 5px;

		& li {
			display: flex;
			align-items: center;
			justify-content: space-around;
			padding: 0.5rem 0;
		}
	}
`;

export const AutocompleteLink = styled(TLink)`
	font-size: 1.7rem;
	&:hover {
		border-bottom: 1px solid ${({ theme }) => theme.main};
	}
`;

export const AutocompleteId = styled.span`
	font-size: 1.7rem;
`;
