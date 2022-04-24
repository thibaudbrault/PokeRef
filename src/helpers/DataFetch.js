import { useState, useEffect } from 'react';
import axios from 'axios';

export function usePokedex(url) {

    const [pokedex, setPokedex] = useState([]);
    const [next, setNext] = useState([]);

    useEffect(() => {
        axios
            .get(url)
            .then((res) => {
                setNext(res.data.next);
                return res.data.results;
            })
            .then((results) => {
                return Promise.all(results.map((res) => axios.get(res.url)));
            })
            .then((results) => {
                setPokedex(results.map((res) => res.data));
            });
    }, [url]);

    return {pokedex, next}
}

export function usePokemon(url) {

    const [pokemon, setPokemon] = useState([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		setLoading(true);
		axios
			.get()
			.then((results) => {
				return results.data;
			})
			.then((results) => {
				setLoading(false);
				setPokemon(results);
			});
	}, [url]);

    return { pokemon, loading }
}

export function useSpecies(url) {

    const [species, setSpecies] = useState([]);

	useEffect(() => {
		axios
			.get(url)
			.then((results) => {
				return results.data;
			})
			.then((results) => {
				setSpecies(results);
			});
	}, [url]);

    return { species }
}

export function useMoves(url) {

    const [moves, setMoves] = useState([]);

	useEffect(() => {
		axios
			.get(url)
			.then((res) => {
				return res.data.results;
			})
			.then((results) => {
				return Promise.all(results.map((res) => axios.get(res.url)));
			})
			.then((results) => {
				setMoves(results.map((res) => res.data));
			});
	}, [url]);

    return { moves }
}

export function useTypes(url) {

    const [types, setTypes] = useState([]);

    useEffect(() => {
        axios
            .get(url)
            .then((res) => {
                return res.data.results;
            })
            .then((results) => {
                return Promise.all(results.map((res) => axios.get(res.url)));
            })
            .then((results) => {
                setTypes(results.map((res) => res.data));
            });
    }, [url]);

    return {types}
}