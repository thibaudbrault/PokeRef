import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BarWave from "react-cssfx-loading/lib/BarWave";

export default function Pokemon() {

    // gen 1 start

    const [pokemon1, setPokemon1] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        axios
        .get("https://pokeapi.co/api/v2/pokemon?limit=151")
        .then((res) => {
            return res.data.results;
        })
        .then((results) => {
            return Promise.all(results.map((res) => axios.get(res.url)));
        })
        .then((results) => {
            setLoading(false);
            setPokemon1(results.map((res) => res.data));
        });
    }, []);

    // gen 1 end

    // gen 2 start

    const [pokemon2, setPokemon2] = useState([]);

    useEffect(() => {
        axios
        .get("https://pokeapi.co/api/v2/pokemon?limit=135&offset=251")
        .then((res) => {
            return res.data.results;
        })
        .then((results) => {
            return Promise.all(results.map((res) => axios.get(res.url)));
        })
        .then((results) => {
            setPokemon2(results.map((res) => res.data));
        });
    }, []);

    // gen 2 end

    // gen 3 start

    const [pokemon3, setPokemon3] = useState([]);

    useEffect(() => {
        axios
        .get("https://pokeapi.co/api/v2/pokemon?limit=135&offset=251")
        .then((res) => {
            return res.data.results;
        })
        .then((results) => {
            return Promise.all(results.map((res) => axios.get(res.url)));
        })
        .then((results) => {
            setPokemon3(results.map((res) => res.data));
        });
    }, []);

    // gen 3 end

    // gen 4 start

    const [pokemon4, setPokemon4] = useState([]);

    useEffect(() => {
        axios
        .get("https://pokeapi.co/api/v2/pokemon?limit=107&offset=386")
        .then((res) => {
            return res.data.results;
        })
        .then((results) => {
            return Promise.all(results.map((res) => axios.get(res.url)));
        })
        .then((results) => {
            setPokemon4(results.map((res) => res.data));
        });
    }, []);

    // gen 4 end

    // gen 5 start

    const [pokemon5, setPokemon5] = useState([]);

    useEffect(() => {
        axios
        .get("https://pokeapi.co/api/v2/pokemon?limit=156&offset=493")
        .then((res) => {
            return res.data.results;
        })
        .then((results) => {
            return Promise.all(results.map((res) => axios.get(res.url)));
        })
        .then((results) => {
            setPokemon5(results.map((res) => res.data));
        });
    }, []);

    // gen 5 end

    // gen 6 start

    const [pokemon6, setPokemon6] = useState([]);

    useEffect(() => {
        axios
        .get("https://pokeapi.co/api/v2/pokemon?limit=72&offset=649")
        .then((res) => {
            return res.data.results;
        })
        .then((results) => {
            return Promise.all(results.map((res) => axios.get(res.url)));
        })
        .then((results) => {
            setPokemon6(results.map((res) => res.data));
        });
    }, []);

    // gen 6 end

    // gen 7 start

    const [pokemon7, setPokemon7] = useState([]);

    useEffect(() => {
        axios
        .get("https://pokeapi.co/api/v2/pokemon?limit=88&offset=721")
        .then((res) => {
            return res.data.results;
        })
        .then((results) => {
            return Promise.all(results.map((res) => axios.get(res.url)));
        })
        .then((results) => {
            setPokemon7(results.map((res) => res.data));
        });
    }, []);

    // gen 7 end

    // gen 8 start

    const [pokemon8, setPokemon8] = useState([]);

    useEffect(() => {
        axios
        .get("https://pokeapi.co/api/v2/pokemon?limit=180&offset=809")
        .then((res) => {
            return res.data.results;
        })
        .then((results) => {
            return Promise.all(results.map((res) => axios.get(res.url)));
        })
        .then((results) => {
            setPokemon8(results.map((res) => res.data));
        });
    }, []);

    // gen 8 end

    return (
        <>
            <main className='pokedex'>
                {loading ? (
                    <BarWave width="40px" height="20px" color="#cc0000" />
                ) : (
                    <>
                        <div className="pokedex_generation" id='gen1'>
                        <h2 className="pokedex_title">Generation 1</h2>
                            <ol className='pokedex_container'>
                                {pokemon1.map((p1) => (
                                    <li key={p1.name} className='pokedex_container_inner'>
                                        <div className='pokedex_container_inner_image'>
                                            <img className='pokedex_container_inner_image_sprite' src={p1.sprites.front_default} alt={p1.name} loading="lazy" />
                                            <img className='pokedex_container_inner_image_shiny' src={p1.sprites.front_shiny} alt={p1.name} loading="lazy" />
                                        </div>
                                        <p>#{p1.id.toString().padStart(3, '0')}</p>
                                        <h2>{p1.name}</h2>
                                        <div className="pokedex_container_inner_types">
                                            {p1.types.map((pt) => (
                                                <div id={pt.type.name} className='pokedex_container_inner_types_element'>
                                                    <img alt={pt.type.name} />
                                                    <span>{pt.type.name}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </li>
                                ))}
                            </ol>
                        </div>

                        <div className="pokedex_generation" id='gen2'>
                            <h2 className="pokedex_title">Generation 2</h2>
                            <ol className='pokedex_container'>
                                {pokemon2.map((p2) => (
                                    <li key={p2.name} className='pokedex_container_inner'>
                                        <div className='pokedex_container_inner_image'>
                                            <img className='pokedex_container_inner_image_sprite' src={p2.sprites.front_default} alt={p2.name} loading="lazy" />
                                            <img className='pokedex_container_inner_image_shiny' src={p2.sprites.front_shiny} alt={p2.name} loading="lazy" />
                                        </div>
                                        <p>#{p2.id.toString().padStart(3, '0')}</p>
                                        <h2>{p2.name}</h2>
                                        <div className="pokedex_container_inner_types">
                                            {p2.types.map((pt) => (
                                                <div id={pt.type.name} className='pokedex_container_inner_types_element'>
                                                    <img alt={pt.type.name} />
                                                    <span>{pt.type.name}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </li>
                                ))}
                            </ol>
                        </div>
                        
                        <div className="pokedex_generation" id='gen3'>
                            <h2 className="pokedex_title">Generation 3</h2>
                            <ol className='pokedex_container'>
                                {pokemon3.map((p3) => (
                                    <li key={p3.name} className='pokedex_container_inner'>
                                        <div className='pokedex_container_inner_image'>
                                            <img className='pokedex_container_inner_image_sprite' src={p3.sprites.front_default} alt={p3.name} loading="lazy" />
                                            <img className='pokedex_container_inner_image_shiny' src={p3.sprites.front_shiny} alt={p3.name} loading="lazy" />
                                        </div>
                                        <p>#{p3.id.toString().padStart(3, '0')}</p>
                                        <h2>{p3.name}</h2>
                                        <div className="pokedex_container_inner_types">
                                            {p3.types.map((pt) => (
                                                <div id={pt.type.name} className='pokedex_container_inner_types_element'>
                                                    <img alt={pt.type.name} />
                                                    <span>{pt.type.name}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </li>
                                ))}
                            </ol>
                        </div>

                        <div className="pokedex_generation" id='gen4'>
                            <h2 className="pokedex_title">Generation 4</h2>
                            <ol className='pokedex_container'>
                                {pokemon4.map((p4) => (
                                    <li key={p4.name} className='pokedex_container_inner'>
                                        <div className='pokedex_container_inner_image'>
                                            <img className='pokedex_container_inner_image_sprite' src={p4.sprites.front_default} alt={p4.name} loading="lazy" />
                                            <img className='pokedex_container_inner_image_shiny' src={p4.sprites.front_shiny} alt={p4.name} loading="lazy" />
                                        </div>
                                        <p>#{p4.id.toString().padStart(3, '0')}</p>
                                        <h2>{p4.name}</h2>
                                        <div className="pokedex_container_inner_types">
                                            {p4.types.map((pt) => (
                                                <div id={pt.type.name} className='pokedex_container_inner_types_element'>
                                                    <img alt={pt.type.name} />
                                                    <span>{pt.type.name}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </li>
                                ))}
                            </ol>
                        </div>

                        <div className="pokedex_generation" id='gen5'>
                            <h2 className="pokedex_title">Generation 5</h2>
                            <ol className='pokedex_container'>
                                {pokemon5.map((p5) => (
                                    <li key={p5.name} className='pokedex_container_inner'>
                                        <div className='pokedex_container_inner_image'>
                                            <img className='pokedex_container_inner_image_sprite' src={p5.sprites.front_default} alt={p5.name} loading="lazy" />
                                            <img className='pokedex_container_inner_image_shiny' src={p5.sprites.front_shiny} alt={p5.name} loading="lazy" />
                                        </div>
                                        <p>#{p5.id.toString().padStart(3, '0')}</p>
                                        <h2>{p5.name}</h2>
                                        <div className="pokedex_container_inner_types">
                                            {p5.types.map((pt) => (
                                                <div id={pt.type.name} className='pokedex_container_inner_types_element'>
                                                    <img alt={pt.type.name} />
                                                    <span>{pt.type.name}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </li>
                                ))}
                            </ol>
                        </div>

                        <div className="pokedex_generation" id='gen6'>
                            <h2 className="pokedex_title">Generation 6</h2>
                            <ol className='pokedex_container'>
                                {pokemon6.map((p6) => (
                                    <li key={p6.name} className='pokedex_container_inner'>
                                        <div className='pokedex_container_inner_image'>
                                            <img className='pokedex_container_inner_image_sprite' src={p6.sprites.front_default} alt={p6.name} loading="lazy" />
                                            <img className='pokedex_container_inner_image_shiny' src={p6.sprites.front_shiny} alt={p6.name} loading="lazy" />
                                        </div>
                                        <p>#{p6.id.toString().padStart(3, '0')}</p>
                                        <h2>{p6.name}</h2>
                                        <div className="pokedex_container_inner_types">
                                            {p6.types.map((pt) => (
                                                <div id={pt.type.name} className='pokedex_container_inner_types_element'>
                                                    <img alt={pt.type.name} />
                                                    <span>{pt.type.name}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </li>
                                ))}
                            </ol>
                        </div>

                        <div className="pokedex_generation" id='gen7'>
                            <h2 className="pokedex_title">Generation 7</h2>
                            <ol className='pokedex_container'>
                                {pokemon7.map((p7) => (
                                    <li key={p7.name} className='pokedex_container_inner'>
                                        <div className='pokedex_container_inner_image'>
                                            <img className='pokedex_container_inner_image_sprite' src={p7.sprites.front_default} alt={p7.name} loading="lazy" />
                                            <img className='pokedex_container_inner_image_shiny' src={p7.sprites.front_shiny} alt={p7.name} loading="lazy" />
                                        </div>
                                        <p>#{p7.id.toString().padStart(3, '0')}</p>
                                        <h2>{p7.name}</h2>
                                        <div className="pokedex_container_inner_types">
                                            {p7.types.map((pt) => (
                                                <div id={pt.type.name} className='pokedex_container_inner_types_element'>
                                                    <img alt={pt.type.name} />
                                                    <span>{pt.type.name}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </li>
                                ))}
                            </ol>
                        </div>

                        <div className="pokedex_generation" id='gen8'>
                            <h2 className="pokedex_title">Generation 8</h2>
                            <ol className='pokedex_container'>
                                {pokemon8.map((p8) => (
                                    <li key={p8.name} className='pokedex_container_inner'>
                                        <div className='pokedex_container_inner_image'>
                                            <img className='pokedex_container_inner_image_sprite' src={p8.sprites.front_default} alt={p8.name} loading="lazy" />
                                            <img className='pokedex_container_inner_image_shiny' src={p8.sprites.front_shiny} alt={p8.name} loading="lazy" />
                                        </div>
                                        <p>#{p8.id.toString().padStart(3, '0')}</p>
                                        <h2>{p8.name}</h2>
                                        <div className="pokedex_container_inner_types">
                                            {p8.types.map((pt) => (
                                                <div id={pt.type.name} className='pokedex_container_inner_types_element'>
                                                    <img alt={pt.type.name} />
                                                    <span>{pt.type.name}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </li>
                                ))}
                            </ol>
                        </div>
                    </>
                )}
            </main>
        </>
    )
}