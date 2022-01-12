import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Wrapper from './Wrapper';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Wrapper />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;