import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Abilities from './pages/Abilities';
import Wrapper from './Wrapper';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Wrapper />} />
        <Route path="/abilities" element={<Abilities />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;