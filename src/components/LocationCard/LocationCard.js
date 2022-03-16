import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import BarWave from 'react-cssfx-loading/lib/BarWave';

import Header from '../Wrapper/Header/Header';
import Nav from '../Nav/Nav';
import Footer from '../Wrapper/Footer/Footer';

const LocationCard = () => {

    return (
        <>
            <Header />
            <Nav />
            <main className='location'>
                
                    <>

                    </>
            </main>
            <Footer />
        </>
    )
}

export default LocationCard;