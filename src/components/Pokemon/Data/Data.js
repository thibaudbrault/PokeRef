import React from 'react';
import List from './List/List';
import Sprite from './Sprite/Sprite';
import Table from './Table/Table';

function Data() {

    return (
        <section className='pokemon_data'>
            <div className='pokemon_data_container'>
                <List />
                <Table />
            </div>
            <div className='pokemon_data_more'>
                <Sprite />
            </div>
        </section>
    )
}

export default Data