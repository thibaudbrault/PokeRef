import styled from 'styled-components';
import { LeftTitle } from '../Common/Headings';
import { DamageClass } from '../Common/Themes';

export const ModifiedLeftTitle = styled(LeftTitle)`
  margin-top: 5rem;
`;

export const MovesSection = styled.section`
  display: ${(props) => (props.visibility ? `block` : `none`)};
`;

export const StatusMoves = styled.td`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  & a {
    margin: 0.5rem;
    display: inline-block;
    text-transform: capitalize;
    border-bottom: 1px solid transparent;
    transition: 0.3s ease-in-out;

    &:hover {
      border-bottom: 1px solid ${({ theme }) => theme.secondary};
    }
  }
`;

export const TCategory = styled(DamageClass)`
  & div {
    display: flex;
    align-items: center;
    justify-content: center;

    & span {
      padding-left: 0.5rem;
    }
  }
`;

export const TType = styled.td`
  & div {
    display: inline;
    padding: 0.7rem 1.5rem;
    border-radius: 5px;
    text-transform: uppercase;
    text-align: center;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.7);
    color: #c4c4c4;

    & a {
      cursor: pointer;
      & img {
        display: inline-block;
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
  }
`;
