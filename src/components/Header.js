import React from 'react'

export default function Header() {
    return (
        <header className='header'>
            <div class="header_progress">
                <div class="header_progress_container">
                    <div class="header_progress_container_inner" id="progressBar"></div>
                </div>
            </div>
            <div class="header_inner">
                <img class="header_inner_img" src="https://www.pokepedia.fr/images/8/87/Pok%C3%A9_Ball.png" alt="poke ball" />
                <img class="header_inner_img" src="https://www.pokepedia.fr/images/a/aa/Super_Ball.png" alt="super ball" />
                <img class="header_inner_img" src="https://www.pokepedia.fr/images/d/da/Hyper_Ball.png" alt="hyper ball" />
                <h1>PokéInfo</h1>
                <button class="header_inner_btn" onclick="themeFunction()">
                    <img class="header_inner_img" src="https://www.pokepedia.fr/images/4/4f/Sombre_Ball.png" alt="sombre ball" />
                </button>
                <img class="header_inner_img" src="https://www.pokepedia.fr/images/f/fd/Rapide_Ball.png" alt="rapide ball" />
                <img class="header_inner_img" src="https://www.pokepedia.fr/images/1/18/Luxe_Ball.png" alt="luxe ball" />
            </div>
        </header>
    )
}
