import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Header from './Header';
import Nav from './Nav';
import Footer from './Footer';

const AbilityCard = props => {

    const { name } = useParams();
    const [ability, setAbility] = useState([])
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        axios
        .get(`https://pokeapi.co/api/v2/ability/${name}`)
        .then((results) => {
            return results.data;
        })
        .then((results) => {
            setLoading(false);
            setAbility(results);
        });
    }, []);

    console.log(ability);

    return (
        <>
            <Header />
            <Nav />
            <main className='ability'>
                <h2 className='ability_title'>{ability.name}</h2>

            </main>
            <Footer />
        </>
    )
}

export default AbilityCard;