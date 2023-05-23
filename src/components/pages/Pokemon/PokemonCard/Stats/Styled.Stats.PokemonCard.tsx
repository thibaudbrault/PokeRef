import { device } from '@/components/common/styles/Sizing';
import { FullWidthTable } from '@/components/common/styles/Table';
import styled from 'styled-components';

export const PokemonStatsCircles = styled.div`
  margin: 3rem 0 0;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 1rem;
  height: 15rem;

  & .CircularProgressbar {
    height: 100%;

    &-trail {
      stroke: ${({ theme }) => theme.secondary} !important;
    }

    &-path {
      stroke: ${({ theme }) => theme.red} !important;
    }

    &-text {
      fill: ${({ theme }) => theme.secondary} !important;
      font-size: 1.3rem !important;
      font-weight: 600 !important;
    }
  }

  @media ${device.lg} {
    height: 30rem;
    row-gap: 3rem;
    grid-template-columns: repeat(3, 1fr);
  }

  @media ${device.sm} {
    height: 45rem;
    row-gap: 4rem;
    grid-template-columns: 1fr 1fr;

    & .CircularProgressbar {
      &-text {
        font-size: 2rem;
      }
    }
  }
`;

export const PokemonStatsTotal = styled.p`
  margin: 2rem 0;
  font-size: 1.7rem;
`;

export const PokemonStatsDetails = styled.details`
  & summary {
    width: fit-content;
    margin-bottom: 2rem;
    font-size: 2.3rem;
    font-weight: 600;
    text-transform: capitalize;
    cursor: pointer;
  }
`;

export const PokemonCalcTable = styled(FullWidthTable)`
  border-bottom: none;
  & th {
    color: ${({ theme }) => theme.secondary};
    font-size: 1.7rem;
    font-weight: 600;
    text-transform: capitalize;
    background: rgba(130, 130, 130, 0.2);
  }

  & tr:last-of-type {
    & td {
      border-bottom: none;
      padding-bottom: 0;
    }
  }

  & td {
    & input,
    select {
      width: 100%;
      padding: 0.7rem;
      background: transparent;
      color: ${({ theme }) => theme.secondary};
      border: 1px solid ${({ theme }) => theme.secondary};
      border-radius: 5px;
      outline: none;

      &::placeholder {
        color: ${({ theme }) => theme.secondary};
        opacity: 1;
      }

      &:focus {
        border: 1px solid ${({ theme }) => theme.red};
      }
    }

    & input[type='number'] {
      appearance: textfield;
      -moz-appearance: textfield;

      &::-webkit-inner-spin-button,
      ::-webkit-outer-spin-button {
        -webkit-appearance: textfield;
      }
    }

    & select {
      width: 80%;
      margin: 0 auto;

      & option {
        text-transform: capitalize;
        background: ${({ theme }) => theme.main};
        color: ${({ theme }) => theme.secondary};
      }
    }

    & button {
      background: ${({ theme }) => theme.secondary};
      color: ${({ theme }) => theme.main};
      border: 1px solid transparent;
      border-radius: 5px;
      padding: 1rem 1.5rem;
      font-size: 1.7rem;
      font-weight: 600;
      transition: 0.3s ease-in-out;

      &:hover {
        color: ${({ theme }) => theme.secondary};
        background: ${({ theme }) => theme.main};
        border: 1px solid ${({ theme }) => theme.secondary};
      }

      &:active {
        transform: scale(0.98);
      }
    }
  }
`;

export const PokemonStatsResults = styled(FullWidthTable)`
  & td {
    border-left: 1px solid rgba(130, 130, 130, 0.2);
    border-right: 1px solid rgba(130, 130, 130, 0.2);
  }
`;
