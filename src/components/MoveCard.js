import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import BarWave from "react-cssfx-loading/lib/BarWave";

import Header from './Header';
import Nav from './Nav';
import Footer from './Footer';

const MoveCard = props => {

    const { name } = useParams();
    const navigate = useNavigate();
    const [move, setMove] = useState([])
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        axios
        .get(`https://pokeapi.co/api/v2/move/${name}`)
        .then((results) => {
            return results.data;
        })
        .then((results) => {
            setLoading(false);
            setMove(results);
        });
    }, []);

    console.log(move);

    return (
        <>
            <Header />
            <Nav />
            <main className="move">
                {loading ? (
                <BarWave width="40px" height="20px" color="#cc0000" />
                ) : (
                    <>
                        <h2>{move.name}</h2>
                        <button onClick={() => navigate("/moves")}>Go back</button>
                    </>
                )}
            </main>
            <Footer />
        </>
    )
}

export default MoveCard;