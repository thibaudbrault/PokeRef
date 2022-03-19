import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import BarWave from 'react-cssfx-loading/lib/BarWave';

import Header from '../../../components/Header/Header';
import Nav from '../../../components/Nav/Nav';
import Footer from '../../../components/Footer/Footer';

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