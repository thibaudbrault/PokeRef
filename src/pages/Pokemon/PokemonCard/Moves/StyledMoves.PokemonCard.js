import styled from 'styled-components';
import { Table } from '../../../../components/BaseStyles/Table';

export const PokemonMovesSection = styled.section`
    padding-bottom: 5rem;
`

export const PokemonMovesTable = styled(Table)`
    display: ${props => props.visibility? 'table': 'none'};
`

export const PokemonMovesTd = styled.td`
    text-transform: capitalize;
`

export const PokemonMovesMachine = styled.td`
    text-transform: uppercase;
`

export const PokemonMovesEmpty = styled.td`
    display: none;
    font-size: 1.7rem;
    font-weight: 700;

    &:first-child {
        display: table-cell;
    }
`