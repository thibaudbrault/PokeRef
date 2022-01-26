import React from 'react';
import axios from 'axios';
import BarWave from "react-cssfx-loading/lib/BarWave";

import Header from '../components/Header';
import Nav from '../components/Nav';
import Footer from '../components/Footer';

export default function Items() {
    return (
        <>
            <Header />
            <Nav />
            <main className="items">
                
            </main>
            <Footer />
        </>
  )
}
