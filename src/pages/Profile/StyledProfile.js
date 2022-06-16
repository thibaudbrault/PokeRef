import styled from 'styled-components';
import { Input } from '../../components/BaseStyles/Inputs';

export const TeamGrid = styled.div`
    margin: 3rem 0;
    padding: 2rem;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    column-gap: 2rem;
    border: 1px solid ${({ theme }) => theme.secondary};
    border-radius: 5px;
`;

export const TeamColumn = styled.div`
    display: flex;
    justify-content: flex-end;
    flex-direction: column;
`;

export const TeamImg = styled.div`
    height: 100%;
    border: 1px solid ${({ theme }) => theme.secondary};
    border-radius: 5px;
`;

export const TeamAdd = styled(Input)`
    margin: 0.7rem 0;
`;