import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Wrapper from './Wrapper';
import Moves from './pages/Moves';
import Abilities from './pages/Abilities';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Wrapper />} />
        <Route path="/moves" element={<Moves />} />
        <Route path="/abilities" element={<Abilities />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;