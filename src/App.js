import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

const Wrapper = lazy(() => import ('./Wrapper.js'));
const Moves = lazy(() => import ('./pages/Moves/Moves.js'));
const Abilities = lazy(() => import ('./pages/Abilities/Abilities'));
const Types = lazy(() => import ('./pages/Types/Types'));
const Items = lazy(() => import ('./pages/Items/Items'));
const Machines = lazy(() => import ('./pages/Machines/Machines'));
const Locations = lazy(() => import ('./pages/Locations/Locations'));

const PokemonCard = lazy(() => import ('./components/Pokemon/PokemonCard'));
const MoveCard = lazy(() => import ('./components/Move/MoveCard'));
const AbilityCard = lazy(() => import ('./components/Ability/AbilityCard.js'));
const TypeCard = lazy(() => import ('./components/Type/TypeCard'));
const ItemCard = lazy(() => import ('./components/Item/ItemCard'));
const LocationCard = lazy(() => import ('./components/Location/LocationCard'));
const Pikachu = lazy(() => import ('./components/Bonus/Pikachu/Pikachu'));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<p className='lazy_loading'>Welcome to PokéInfo!</p>}>
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
      </Suspense>
    </BrowserRouter>
  );
}

export default App;