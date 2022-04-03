import React, { Suspense, lazy, useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from './components/Layout/Layout';
import { ThemeProvider } from 'styled-components';
import { Reset } from './components/BaseStyles/Reset';
import { Fonts } from './components/BaseStyles/Fonts';
import { lightTheme, darkTheme } from './components/BaseStyles/Themes';
import Pokemon from './pages/Pokemon/Pokemon';

const Moves = lazy(() => import ('./pages/Moves/Moves'));
const Abilities = lazy(() => import ('./pages/Abilities/Abilities'));
const Types = lazy(() => import ('./pages/Types/Types'));
const Items = lazy(() => import ('./pages/Items/Items'));
const Machines = lazy(() => import ('./pages/Machines/Machines'));
const Locations = lazy(() => import ('./pages/Locations/Locations'));

const PokemonCard = lazy(() => import ('./pages/Pokemon/PokemonCard/PokemonCard'));
const MoveCard = lazy(() => import ('./pages/Moves/MoveCard/MoveCard'));
const AbilityCard = lazy(() => import ('./pages/Abilities/AbilityCard/AbilityCard'));
const TypeCard = lazy(() => import ('./pages/Types/TypeCard/TypeCard'));
const ItemCard = lazy(() => import ('./pages/Items/ItemCard/ItemCard'));
const LocationCard = lazy(() => import ('./pages/Locations/LocationCard/LocationCard'));
const Pikachu = lazy(() => import ('./components/Bonus/Pikachu/Pikachu'));


function App() {

  const [theme, setTheme] = useState('light');

  const setMode = mode => {
    window.localStorage.setItem('theme', mode)
    setTheme(mode)
  };

  const themeToggler = () => {
      theme === 'light' ? setMode('dark') : setMode('light')
  }

  useEffect(() => {
    const localTheme = window.localStorage.getItem('theme');
    localTheme && setTheme(localTheme)
  }, []);

  return (
    <BrowserRouter>
      <ThemeProvider
          theme={theme === 'light' ? lightTheme : darkTheme}
        >
        <Layout
          themeToggler={themeToggler}
          lightTheme={lightTheme}
          darkTheme={darkTheme}
        >
          <Reset />
          <Fonts />
          <Suspense fallback={<p className='lazy_loading'>Welcome to PokéInfo!</p>}>
            <Routes>
              <Route path="/" element={<Pokemon />} />
              <Route path="/pikachu" element={<Pikachu />} />
              <Route path="/pokemon/:name" element={<PokemonCard />} />
              <Route path="/moves" element={<Moves />} />
              <Route path="/moves/:name" element={<MoveCard />} />
              <Route path="/abilities" element={<Abilities />} />
              <Route path="/abilities/:name" element={<AbilityCard />} />
              <Route path="/types" element={<Types />} />
              <Route path ="/types/:name" element={<TypeCard />} />
              <Route path="/items" element={<Items />} />
              <Route path="/items/:name" element={<ItemCard />} />
              <Route path="/machines" element={<Machines />} />
              <Route path="/locations" element={<Locations />} />
              <Route path="/locations/:name" element={<LocationCard />} />
            </Routes>
          </Suspense>
        </Layout>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;