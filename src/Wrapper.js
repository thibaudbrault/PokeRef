import React from 'react'
import Footer from './components/Footer'
import GenNav from './components/GenNav'
import Header from './components/Header'
import Nav from './components/Nav'
import Pokemon from './pages/Pokemon'

export default function Wrapper() {
    return (
        <>
            <Header />
            <Nav />
            <GenNav />
            <Pokemon />
            <Footer />
        </>
    )
}
