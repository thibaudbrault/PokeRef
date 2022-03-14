import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Wrapper from './Wrapper';
import Moves from './pages/Moves';
import Abilities from './pages/Abilities';
import Types from './pages/Types';
import Items from './pages/Items';
import Machines from './pages/Machines';
import Locations from './pages/Locations';

import PokemonCard from './components/PokemonCard';
import MoveCard from './components/MoveCard';
import AbilityCard from './components/AbilityCard';
import TypeCard from './components/TypeCard';
import ItemCard from './components/ItemCard';
import LocationCard from './components/LocationCard';
import Pikachu from './components/Pikachu';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Wrapper />} />
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
    </BrowserRouter>
  );
}

export default App;