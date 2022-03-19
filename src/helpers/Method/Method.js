import React from 'react'

function Method({toggleState, toggleTable}) {
    return (
        <nav className='method'>
            <button className={toggleState === 1 ? 'method_active' : 'method_element'} onClick={() => toggleTable(1)}><p>Level Up</p></button>
            <button className={toggleState === 2 ? 'method_active' : 'method_element'} onClick={() => toggleTable(2)}><p>TM /HM</p></button>
            <button className={toggleState === 3 ? 'method_active' : 'method_element'} onClick={() => toggleTable(3)}><p>Egg</p></button>
            <button className={toggleState === 4 ? 'method_active' : 'method_element'} onClick={() => toggleTable(4)}><p>Tutor</p></button>
            <button className={toggleState === 5 ? 'method_active' : 'method_element'} onClick={() => toggleTable(5)}><p>Evolving</p></button>
        </nav>
    )
}

export default Method