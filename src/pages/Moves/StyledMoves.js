import styled from 'styled-components';
import { LeftTitle } from '../../components/BaseStyles/Headings';

export const ModifiedLeftTitle = styled(LeftTitle)`
    margin-top: 5rem;
`

export const MovesSection = styled.section`
    display: ${props => props.visibility? 'block': 'none'};
`

export const StatusMoves = styled.td`
    & a {
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
                border-bottom: 1px solid ${({ theme }) => theme.secondary};
            }
        }
    }
`

export const TCategory = styled.td`
    & div {
        display: flex;
        align-items: center;
        justify-content: center;

        & img {
            width: 2rem;
        }
    }
`

export const TType = styled.td`
    & a {
        display: inline;
        padding: 0.7rem 1.5rem;
        border-radius: 5px;
        text-transform: uppercase;
        text-align: center;
        text-shadow: 1px 1px 2px rgba(0,0,0,.7);
        color: #c4c4c4;
        border: 1px solid rgba($color: #161616, $alpha: 0.2);

        & img {
            width: 1.5rem;
            vertical-align: middle;
            cursor: pointer;
        }
        & span {
            font-family: 'Press start 2P';
            font-size: 1rem;
            padding-left: 0.5rem;
            vertical-align: middle;
            cursor: pointer;
        }
    }
`