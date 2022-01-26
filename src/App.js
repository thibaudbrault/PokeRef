import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Wrapper from './Wrapper';
import Moves from './pages/Moves';
import Abilities from './pages/Abilities';
import Types from './pages/Types';
import Items from './pages/Items';
import Locations from './pages/Locations';
import Games from './pages/Games';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Wrapper />} />
        <Route path="/moves" element={<Moves />} />
        <Route path="/abilities" element={<Abilities />} />
        <Route path="/types" element={<Types />} />
        <Route path="/items" element={<Items />} />
        <Route path="/locations" element={<Locations />} />
        <Route path="/games" element={<Games />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;