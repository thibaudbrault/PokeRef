import styled from 'styled-components';
import { MainBig } from '../../components/BaseStyles/Sizing';

export const NotfFoundMain = styled(MainBig)`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`

export const NotFoundImg = styled.img`
    width: 10%;
    height: 10%;
`

export const NotFoundText = styled.p`
    font-size: 2rem;
    font-weight: 700;
    &:first-of-type {
        padding-top: 3rem;
    }
`