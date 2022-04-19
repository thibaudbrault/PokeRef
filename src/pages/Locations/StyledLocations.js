import styled from 'styled-components';
import { MethodNav } from '../../components/BaseStyles/Navbars';

export const LocationSection = styled.section`
    padding-bottom: 2.5rem;

    & p {
        font-size: 1.7rem;
        font-weight: 700;
        text-align: center;
    }
`

export const LocationNav = styled(MethodNav)`
    padding-bottom: 5rem;
`

export const LocationList = styled.ol`
    display: grid;
    justify-items: center;
    grid-template-columns: repeat(5, 1fr);
    gap: 2rem;

    & li {
        align-self: center;
        font-size: 1.5rem;
        text-transform: capitalize;

        & a {
            cursor: pointer;
            transition: 0.3s ease-in-out;
            border-bottom: 1px solid transparent;
            &:hover {
            border-bottom: 1px solid ${({ theme }) => theme.secondary};
            }
        }
    }
`