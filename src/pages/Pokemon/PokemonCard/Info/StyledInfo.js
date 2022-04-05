import styled from 'styled-components';
import { Table } from '../../../../components/BaseStyles/Table';

export const PokemonInfoSection = styled.section`
    padding-bottom: 5rem;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    column-gap: 4rem;
`

export const PokemonInfoTable = styled(Table)`
    & th {
        background: rgba(130, 130, 130, 0.2);
        text-transform: capitalize;
    }

    & td {
        font-size: 1.7rem;
        font-weight: 700;
        text-align: center;
        text-transform: capitalize;

        & a {
            display: inline-block;
            border-bottom: 1px solid transparent;
            transition: 0.3s ease-in-out;

            &:hover {
                border-bottom: 1px solid ${({ theme }) => theme.secondary};
            }
        }
    }
`