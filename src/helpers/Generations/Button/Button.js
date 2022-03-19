import React from 'react';

const CustomButton = (props) => {

    const { game, version, title, setGame, setVersion } = props;
    const onClick = () => {
        setGame(game);
        setVersion(version);
    }

    return (
        <button onClick={onClick}>{title}</button>
    )
}