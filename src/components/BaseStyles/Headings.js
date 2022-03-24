import styled from 'styled-components';

export const H1 = styled.h1`
    padding: 0 1rem;
    font-family: 'Press start 2P';
    font-size: 6rem;
    letter-spacing: 3px;
    text-shadow: rgb(22, 22, 22) -2px -2px 0px, rgb(22, 22, 22) 2px -2px 0px, rgb(22, 22, 22) -2px 2px 0px, rgb(22, 22, 22) 2px 2px 0px;
`

export const Title = styled.h2`
    margin-bottom: 1.5rem;
    font-size: 3.5rem;
    font-family: 'Press start 2P';
	text-transform: capitalize;
    text-align: center;
	text-shadow: rgb(22, 22, 22) -1px -1px 0px, rgb(22, 22, 22) 1px -1px 0px, rgb(22, 22, 22) -1px 1px 0px, rgb(22, 22, 22) 1px 1px 0px;
`

export const LeftTitle = styled(Title)`
    text-align: left;
`

export const Subtitle = styled.p`
    font-size: 1.3rem;
    text-transform: uppercase;
    letter-spacing: 0.1rem;
    text-align: center;
`

export const H3 = styled.h3`
    margin: 0 0 1rem;
	font-size: 3.5rem;
	font-weight: 700;
	text-transform: capitalize;
`

export const H4 = styled.h4`
    margin: 0 0 1rem;
	font-size: 2.5rem;
	font-weight: 700;
	text-transform: capitalize;
`