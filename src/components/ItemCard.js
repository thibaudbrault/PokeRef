import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import BarWave from 'react-cssfx-loading/lib/BarWave';

import Header from './Header';
import Nav from './Nav';
import Footer from './Footer';

const ItemCard = () => {

    const { name } = useParams();
    const navigate = useNavigate();
    const [item, setItem] = useState([])
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        axios
        .get(`https://pokeapi.co/api/v2/item/${name}`)
        .then((results) => {
            return results.data;
        })
        .then((results) => {
            setLoading(false);
            setItem(results);
        });
    }, [name]);

    const title = `${name}`;

    useEffect(() => {
        document.title = `${title.charAt(0).toUpperCase() + title.slice(1).replace(/-/g, ' ')} | Items | PokéInfo`;
    }, [title]);

    console.log(item)

    return (
        <>
            <Header />
            <Nav />
            <main className='item'>
            {loading ? (
                <BarWave width='40px' height='20px' color='#cc0000' />
                ) : (
                    <>
                        <h2 className='item_title'>{item?.name?.replace(/-/g, ' ')}</h2>
                        <p className='item_category'>{item?.category?.name?.replace(/-/g, ' ')}</p>
                        <section className='item_container'>
                            <div className='item_container_effect'>
                                <h3 className='item_container_effect_title'>Effect</h3>
                                {item?.effect_entries?.map((ie) => 
                                    ie?.language?.name === 'en' &&
                                        <p className='item_container_effect_text'>
                                            {ie?.short_effect}
                                        </p>
                                )}
                            </div>
                            {item?.cost !== 0 && 
                                <p className='item_container_cost'>Cost : {item?.cost} Pokédollars</p>
                            }
                            {item?.held_by_pokemon?.length !== 0 &&
                                <p className='item_container_held'>Held by :
                                    {item?.held_by_pokemon?.map((ih) => 
                                        <Link
                                        to={`/pokemon/${ih?.pokemon?.name}`}
                                        key={ih?.pokemon?.name}
                                        >
                                            {ih?.pokemon?.name.replace(/-/g, ' ')}
                                        </Link>
                                    )}
                                </p>
                            }
                            <p className='item_container_fling'>When the pokémon holds <span>{item?.name?.replace(/-/g, ' ')}</span> the move <i>Fling</i> has {item?.fling_power} power.
                            {item?.fling_effect?.name !== undefined && ` The move will ${item?.fling_effect?.name?.replace(/-/g, ' ')} the target.`}
                            </p>
                        </section>

                        <section className='item_container'>
                            <h3 className='item_container_title'>Game descriptions</h3>
                            <table className='item_container_desc_table'>
                                    <tbody>
                                        {item?.flavor_text_entries?.map((ift) => 
                                            ift?.language?.name === 'en' ? (
                                                <tr className='item_container_desc_table_row'>
                                                    <th className='item_container_desc_table_row_head'>{ift?.version_group?.name?.replace(/-/g, ' ')}</th>
                                                    <td className='item_container_desc_table_row_element'>{ift?.text}</td>
                                                </tr>
                                            ) : (
                                                ''
                                            )
                                        )}
                                    </tbody>
                            </table>
                        </section>
                        <button className='back_button' onClick={() => navigate('/items')}> ᐸ Back to items</button>
                    </>
                )}
            </main>
            <Footer />
        </>
    )
}

export default ItemCard;