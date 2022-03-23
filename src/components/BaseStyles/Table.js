import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const Table = styled.table`
    display: table;
	width: 100%;
	text-align: center;
	border: 1px solid rgba(130, 130, 130, 0.2);
	border-collapse: collapse;
	border-left: none;
	border-right: none;
	table-layout: fixed;

	& th {
		padding: 1.5rem;
		font-size: 1.5rem;
		border: 1px solid rgba(130, 130, 130, 0.2);
		border-collapse: collapse;
		vertical-align: middle;
	}

	& td {
		padding: 1.5rem;
		font-size: 1.5rem;
		border: 1px solid rgba(130, 130, 130, 0.2);
		border-collapse: collapse;
		border-left: none;
		border-right: none;
		vertical-align: middle;
	}
`

export const THead = styled.thead`
	background: ${props => props.theme.colors.dark};
	color: ${props => props.theme.colors.light};
	font-size: 1.7rem;
	font-weight: 700;
	text-transform: capitalize;
`

export const TRow = styled.tr`
	&:hover {
		background: rgba(130, 130, 130, 0.2);
	}
`

export const TName = styled.td`
	text-transform: capitalize;
	font-size: 1.7rem;
	font-weight: 700;
`

export const TLink = styled(Link)`
	text-transform: capitalize;
	border-bottom: 1px solid transparent;
	cursor: pointer;
	transition: 0.3s ease-in-out;
	&:hover {
		border-bottom: 1px solid ${props => props.theme.colors.dark};
	}
`

export const TEffect = styled.td`
	text-align: center;

	& span {
		display: none;
		&:first-child {
			display: block;
		}
	}
`