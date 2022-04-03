import styled from 'styled-components';
import { TName } from '../../components/BaseStyles/Table';

export const TNameItems = styled(TName)`
    display: table-cell;

    & div {
        display: flex;
        align-items: center;
        justify-content: center;

        & span {
            padding-left: 0.5rem;
            cursor: pointer;
        }
    }
`

export const TEffectItems = styled.td`
    text-transform: none;
`

export const TCategoryItems = styled.td`
    text-transform: capitalize;
`