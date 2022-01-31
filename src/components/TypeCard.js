import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import BarWave from "react-cssfx-loading/lib/BarWave";

import Header from './Header';
import Nav from './Nav';
import Footer from './Footer';

const TypeCard = () => {

    const { name } = useParams();
    const navigate = useNavigate();
    const [type, setType] = useState([])
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        axios
        .get(`https://pokeapi.co/api/v2/type/${name}`)
        .then((results) => {
            return results.data;
        })
        .then((results) => {
            setLoading(false);
            setType(results);
        });
    }, [name]);

    console.log(type);

    return (
        <>
            <Header />
            <Nav />
            <main className="type">
                {loading ? (
                <BarWave width="40px" height="20px" color="#cc0000" />
                ) : (
                    <>
                        <h2 className='type_title'>{type.name}</h2>
                        <button onClick={() => navigate("/types")}>Go back</button>
                    </>
                )}
            </main>
            <Footer />
        </>
    )
}

export default TypeCard;