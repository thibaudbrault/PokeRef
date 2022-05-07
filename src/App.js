import React, { Suspense, lazy, useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import { ThemeProvider } from 'styled-components';
import { Reset } from './components/BaseStyles/Reset';
import { lightTheme, darkTheme } from './components/BaseStyles/Themes';
import Pokemon from './pages/Pokemon/Pokemon';
import styled from 'styled-components';
import NotFound from './pages/404/NotFound';

const Moves = lazy(() => import('./pages/Moves/Moves'));
const Abilities = lazy(() => import('./pages/Abilities/Abilities'));
const Types = lazy(() => import('./pages/Types/Types'));
const Items = lazy(() => import('./pages/Items/Items'));
const Machines = lazy(() => import('./pages/Machines/Machines'));
const Locations = lazy(() => import('./pages/Locations/Locations'));

const PokemonCard = lazy(() =>
	import('./pages/Pokemon/PokemonCard/PokemonCard')
);
const MoveCard = lazy(() => import('./pages/Moves/MoveCard/MoveCard'));
const AbilityCard = lazy(() =>
	import('./pages/Abilities/AbilityCard/AbilityCard')
);
const TypeCard = lazy(() => import('./pages/Types/TypeCard/TypeCard'));
const ItemCard = lazy(() => import('./pages/Items/ItemCard/ItemCard'));
const LocationCard = lazy(() =>
	import('./pages/Locations/LocationCard/LocationCard')
);
const Pikachu = lazy(() => import('./pages/Bonus/Pikachu/Pikachu'));

function App() {
	const [theme, setTheme] = useState('light');

	const setMode = (mode) => {
		window.localStorage.setItem('theme', mode);
		setTheme(mode);
	};

	const themeToggler = () => {
		theme === 'light' ? setMode('dark') : setMode('light');
	};

	useEffect(() => {
		const localTheme = window.localStorage.getItem('theme');
		localTheme && setTheme(localTheme);
	}, []);

	const LazyLoad = styled.p`
		font-size: 4rem;
		font-weight: 700;
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
	`;

	return (
		<BrowserRouter>
			<ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
				<Suspense fallback={<LazyLoad>Welcome to PokéInfo!</LazyLoad>}>
					<Layout
						themeToggler={themeToggler}
						lightTheme={lightTheme}
						darkTheme={darkTheme}
					>
						<Reset />
						<Routes>
							<Route path='/' element={<Pokemon />} />
							<Route path='/pikachu' element={<Pikachu />} />
							<Route path='/pokemon/:name' element={<PokemonCard />} />
							<Route path='/moves' element={<Moves />} />
							<Route path='/moves/:name' element={<MoveCard />} />
							<Route path='/abilities' element={<Abilities />} />
							<Route path='/abilities/:name' element={<AbilityCard />} />
							<Route path='/types' element={<Types />} />
							<Route path='/types/:name' element={<TypeCard />} />
							<Route path='/items' element={<Items />} />
							<Route path='/items/:name' element={<ItemCard />} />
							<Route path='/machines' element={<Machines />} />
							<Route path='/locations' element={<Locations />} />
							<Route path='/locations/:name' element={<LocationCard />} />
							<Route path='*' element={<NotFound />} />
						</Routes>
					</Layout>
				</Suspense>
			</ThemeProvider>
		</BrowserRouter>
	);
}

export default App;
