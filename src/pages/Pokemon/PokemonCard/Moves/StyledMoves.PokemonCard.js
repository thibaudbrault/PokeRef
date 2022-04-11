import styled from 'styled-components';
import { Table } from '../../../../components/BaseStyles/Table';

export const PokemonMovesSection = styled.section`
    padding-bottom: 5rem;
`

export const PokemonCardTable = styled(Table)`
    display: ${props => props.visibility? 'table': 'none'};
`

export const PokemonMovesTd = styled.td`
    text-transform: capitalize;
`

export const PokemonMovesEmpty = styled.p`
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.7rem;
    font-weight: 700;
`