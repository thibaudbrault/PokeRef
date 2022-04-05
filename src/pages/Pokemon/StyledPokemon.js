import styled from 'styled-components';

export const PokedexDropdown = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    & label {
        font-size: 1.5rem;
        margin-bottom: 0.5rem;
        justify-self: flex-start;
    }

    & select {
        width: 10vw;
        padding: 0.5rem;
        color: ${({ theme }) => theme.secondary};
        background: transparent;
        border: 1px solid ${({ theme }) => theme.secondary};
        border-radius: 5px;
        transition: 0.3s ease-in-out;

        &:focus {
            border: 1px solid ${({ theme }) => theme.red};
        }

        & option {
            color: ${({ theme }) => theme.secondary};
            background: ${({ theme }) => theme.main};
        }
    }
`

export const PokedexList = styled.ol`
    & div {
        & div {
            display: flex;
            align-items: center;
            justify-content: center;
            flex-wrap: wrap;
        }
    }
`

export const PokedexElement = styled.li`
    width: 20rem;
    height: 30rem;
    margin: 3rem;
    padding: 2rem 3rem;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    background: rgba(255, 255, 255, 0.4);
    border: 1px solid transparent;
    border-radius: 25px;
    text-align: center;
    transition: 0.3s ease-in-out;

    & h2 {
        font-size: 1.5rem;
        font-family: 'Press start 2P';
        text-transform: capitalize;
        cursor: pointer;
        transition: 0.3s ease-in-out;
        &:hover {
            color: ${({ theme }) => theme.red};
        }
    }

    & p {
        font-size: 1.3rem;
    }

    &:hover {
        transform: scale(1.05);
    }

    &:nth-child(even) {
        &:hover {
            border-radius: 10px 50px;
        }
    }
    
    &:nth-child(odd) {
        &:hover {
            border-radius: 50px 10px;
        }
    }
`

export const SpriteNormal = styled.img`
    position: relative;
    top: 0;
    left: 0;
    transition: 0.3s ease-in-out;
`

export const SpriteShiny = styled.img`
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0;
    transition: 0.3s ease-in-out;
`

export const PokedexImage = styled.div`
    position: relative;
    margin: 0 auto;
    
    &:hover ${SpriteShiny} {
        opacity: 1;
    }
`

export const PokedexTypes = styled.div`
    position: relative;
    width: 100%;
    height: 40%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    font-size: 1.3rem;

    & div {
        width: 100%;
        margin-bottom: 1rem;
        padding: 0.5rem;
        border-radius: 5px;
        text-transform: uppercase;
        text-align: center;
        text-shadow: 1px 1px 2px rgba(0,0,0,.7);
        color: #c4c4c4;
        border: 1px solid rgba($color: #161616, $alpha: 0.2);

        & img {
            height: 1.5rem;
            max-height: 1.5rem;
        }

        & a {
            padding-left: 0.5rem;
            font-family: 'Press start 2P';
        }
    }
`

export const Loading = styled.p`
    width: 100%;
    margin: 3rem 0;
    text-align: center;
    font-size: 1.7rem;
    font-weight: 700;
`