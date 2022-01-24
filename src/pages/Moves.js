import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BarWave from "react-cssfx-loading/lib/BarWave";

import Header from '../components/Header';
import Nav from '../components/Nav';
import Footer from '../components/Footer';

export default function Moves() {

  const [moves, setMoves] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
      setLoading(true);
      axios
      .get("https://pokeapi.co/api/v2/move?limit=826")
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
  }, []);

  console.log(moves);

  return (
      <>
          <Header />
          <Nav />
          <main className='moves'>
            {loading ? (
              <BarWave width="40px" height="20px" color="#cc0000" />
            ) : (
              <table className='moves_table'>
                  <thead className='moves_table_head'>
                      <tr className='moves_table_head_row'>
                          <th className='moves_table_head_row_element'>Name</th>
                          <th className='moves_table_head_row_element'>Effect</th>
                      </tr>
                  </thead>
                  <tbody className='moves_table_body'>
                          {moves.map((m) => (
                          <tr key={m.name} className='moves_table_body_row'>
                              <td className='moves_table_body_row_name'>{m.name}</td>
                              <td className='moves_table_body_row_effect'>{m.id}</td>
                          </tr>
                          ))}
                  </tbody>
              </table>
            )}
          </main>
          <Footer />
      </>
  )
}
