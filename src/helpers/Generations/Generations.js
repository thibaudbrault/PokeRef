import React, { useState, useEffect } from 'react';
import { buttonData } from './Data/Data';
import Button from './Button/Button';

const Generations = (props) => {

    const [game, setGame] = useState('red');
    const [version, setVersion] = useState('red-blue');

    return (
        buttonData.map((b) => {
            <Button
                pokemonIdMax={b.pokemonIdMax}
                speciesIdMax={b.speciesIdMaxd}
                game={b.game}
                version={b.version}
                title={b.title}
                setGame={b.setGame}
                setVersion={b.setVersion}
            />
        })
    )
}

export default Generations