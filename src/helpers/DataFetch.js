import { useState, useEffect } from 'react';
import axios from 'axios';

// Fetch all pokemon

export function usePokedex(url) {

    const [pokedex, setPokedex] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        axios
            .get(url)
            .then((res) => {
                return res.data.results;
            })
            .then((results) => {
                return Promise.all(results.map((res) => axios.get(res.url)));
            })
            .then((results) => {
                setLoading(false);
                setPokedex(results.map((res) => res.data));
            });
    }, [url]);

    return {pokedex, loading}
}

// Fetch all moves

export function useMoves(url) {

    const [moves, setMoves] = useState([]);
    const [loading, setLoading] = useState(false);

	useEffect(() => {
        setLoading(true);
		axios
			.get(url)
			.then((res) => {
				return res.data.results;
			})
			.then((results) => {
				return Promise.all(results.map((res) => axios.get(res.url)));
			})
			.then((results) => {
                setLoading(false);
				setMoves(results.map((res) => res.data));
			});
	}, [url]);

    return { moves, loading }
}

// Fetch all abilities

export function useAbilities(url) {

	const [abilities, setAbilities] = useState([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		setLoading(true);
		axios
			.get(url)
			.then((res) => {
				return res.data.results;
			})
			.then((results) => {
				return Promise.all(results.map((res) => axios.get(res.url)));
			})
			.then((results) => {
				setLoading(false);
				setAbilities(results.map((res) => res.data));
			});
	}, [url]);

	return { abilities, loading }
}

// Fetch all status

export function useStatus(url) {

	const [status, setStatus] = useState([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		setLoading(true)
		axios
			.get(url)
			.then((res) => {
				return res.data.results;
			})
			.then((results) => {
				return Promise.all(results.map((res) => axios.get(res.url)));
			})
			.then((results) => {
				setLoading(false)
				setStatus(results.map((res) => res.data));
			});
	}, [url]);

	return { status, loading }
}

// Fetch all types

export function useTypes(url) {

    const [types, setTypes] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        axios
            .get(url)
            .then((res) => {
                return res.data.results;
            })
            .then((results) => {
                return Promise.all(results.map((res) => axios.get(res.url)));
            })
            .then((results) => {
                setLoading(false);
                setTypes(results.map((res) => res.data));
            });
    }, [url]);

    return { types, loading }
}

// Fetch all machines

export function useMachines(url) {

    const [machines, setMachine] = useState([]);
    const [loading, setLoading] = useState(false);

	useEffect(() => {
        setLoading(true);
		axios
			.get(url)
			.then((res) => {
				return res.data.results;
			})
			.then((results) => {
				return Promise.all(results.map((res) => axios.get(res.url)));
			})
			.then((results) => {
                setLoading(false);
				setMachine(results.map((res) => res.data));
			});
	}, [url]);

    return { machines, loading }
}

// Fetch all items

export function useItems(url) {

	const [items, setItems] = useState([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		setLoading(true);
		axios
			.get(url)
			.then((res) => {
				return res.data.results;
			})
			.then((results) => {
				return Promise.all(results.map((res) => axios.get(res.url)));
			})
			.then((results) => {
				setLoading(false);
				setItems(results.map((res) => res.data));
			});
	}, [url]);

	return { items, loading }
}



// Fetch single pokemon

export function usePokemon(url) {

    const [pokemon, setPokemon] = useState([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		setLoading(true);
		axios
			.get(url)
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

// Fetch single move

export function useMove(url) {

    const [move, setMove] = useState([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		setLoading(true);
		axios
			.get(url)
			.then((results) => {
				return results.data;
			})
			.then((results) => {
				setLoading(false);
				setMove(results);
			});
	}, [url]);

    return { move, loading }
}

// Fetch single ability

export function useAbility(url) {
	
	const [ability, setAbility] = useState([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		setLoading(true);
		axios
			.get(url)
			.then((results) => {
				return results.data;
			})
			.then((results) => {
				setLoading(false);
				setAbility(results);
			});
	}, [url]);

	return { ability, loading }
}

// Fetch single pokemon species

export function useSpecies(url) {

    const [species, setSpecies] = useState([]);
    const [loading, setLoading] = useState(false);

	useEffect(() => {
		setLoading(true);
		axios
			.get(url)
			.then((results) => {
				return results.data;
			})
			.then((results) => {
				setLoading(false);
				setSpecies(results);
			});
	}, [url]);

    return { species, loading }
}

// Fetch location for a single pokemon

export function useLocation(url) {

    const [location, setLocation] = useState([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		setLoading(true);
		axios
			.get(url)
			.then((results) => {
				return results.data;
			})
			.then((results) => {
				setLoading(false);
				setLocation(results);
			});
	}, [url]);

    return { location, loading }
}

// Fetch evolution chain of a single pokemon

export function useEvolution(url) {

    const [evolution, setEvolution] = useState([]);
    const [loading, setLoading] = useState(false);

	useEffect(() => {
		setLoading(true);
		axios
			.get(url)
			.then((results) => {
				return results.data;
			})
			.then((results) => {
				setLoading(false);
				setEvolution(results);
			});
	}, [url]);

    return { evolution, loading }
}

// Fetch single type

export function useType(url) {

	const [type, setType] = useState([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		setLoading(true);
		axios
			.get(url)
			.then((results) => {
				return results.data;
			})
			.then((results) => {
				setLoading(false);
				setType(results);
			});
	}, [url]);

	return { type, loading }
}

// Fetch single item

export function useItem(url) {

	const [item, setItem] = useState([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		setLoading(true);
		axios
			.get(url)
			.then((results) => {
				return results.data;
			})
			.then((results) => {
				setLoading(false);
				setItem(results);
			});
	}, [url]);

	return { item, loading }
}