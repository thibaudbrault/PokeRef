import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { LeftTitle } from '../../components/BaseStyles/Headings';

export const ModifiedLeftTitle = styled(LeftTitle)`
    margin-top: 5rem;
`

export const StatusMoves = styled(Link)`
    display: block;
    text-transform: capitalize;
	border-bottom: 1px solid transparent;
	cursor: pointer;
	transition: 0.3s ease-in-out;

    & p {
        display: inline-block;
        margin: 0.5rem;
        text-transform: capitalize;
        border-bottom: 1px solid transparent;
        transition: 0.3s ease-in-out;
        &:hover {
            border-bottom: 1px solid $dark;
        }
    }
`