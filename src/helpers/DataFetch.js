// import { useState, useEffect } from 'react';
// import axios from 'axios';

// const [pokedex, setPokedex] = useState([]);
// const [next, setNext] = useState([]);
// const [offset, setOffset] = useState(0);

// useEffect(() => {
//     axios
//         .get(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=250`)
//         .then((res) => {
//             setNext(res.data.next);
//             return res.data.results;
//         })
//         .then((results) => {
//             return Promise.all(results.map((res) => axios.get(res.url)));
//         })
//         .then((results) => {
//             setPokedex(results.map((res) => res.data));
//         });
// }, [offset]);



// const [type, setType] = useState([]);

// useEffect(() => {
//     axios
//         .get('https://pokeapi.co/api/v2/type?limit=18')
//         .then((res) => {
//             return res.data.results;
//         })
//         .then((results) => {
//             return Promise.all(results.map((res) => axios.get(res.url)));
//         })
//         .then((results) => {
//             setType(results.map((res) => res.data));
//         });
// }, []);