import React from 'react';
import { Link } from 'react-router-dom';


function themeFunction() {
    var element = document.getElementById('root');
    element.classList.toggle("dark");
};

const Header = () => {
    return (
        <header className='header' id='header'>
            <div className="header_progress">
                <div className="header_progress_container">
                    <div className="header_progress_container_inner" id="progressBar"></div>
                </div>
            </div>
            <div className="header_inner">
                <img className="header_inner_img" src="https://www.pokepedia.fr/images/8/87/Pok%C3%A9_Ball.png" alt="poke ball" />
                <img className="header_inner_img" src="https://www.pokepedia.fr/images/a/aa/Super_Ball.png" alt="super ball" />
                <img className="header_inner_img" src="https://www.pokepedia.fr/images/d/da/Hyper_Ball.png" alt="hyper ball" />
                <h1>PokéInfo</h1>
                <button className="header_inner_btn" onClick={themeFunction}>
                    <img className="header_inner_img" src="https://www.pokepedia.fr/images/4/4f/Sombre_Ball.png" alt="sombre ball" />
                </button>
                <Link
                    className='header_inner_link'
                    to={`/pikachu`}
                >
                    <img className="header_inner_img" src="https://www.pokepedia.fr/images/f/fd/Rapide_Ball.png" alt="rapide ball" />
                </Link>
                <img className="header_inner_img" src="https://www.pokepedia.fr/images/1/18/Luxe_Ball.png" alt="luxe ball" />
            </div>
        </header>
    )
}

export default Header