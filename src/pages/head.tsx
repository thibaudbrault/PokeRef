import React from 'react'

function Head() {
    return (
        <>
            <meta name='theme-color' content='#c4c4c4' />
            <meta
                name='keywords'
                content='pokemon, Pokemon, info, pokedex, Pokedex, pokeinfo, database, pokeapi, moves, abilities, evolutions, locations, items, types'
            />
            <meta name='googlebot-news' content='noindex, nosnippet' />
            <link
                rel='apple-touch-icon'
                sizes='180x180'
                href='/favicons/apple-touch-icon.png'
            />
            <link
                rel='icon'
                type='image/png'
                sizes='32x32'
                href='/favicons/favicon-32x32.png'
            />
            <link
                rel='icon'
                type='image/png'
                sizes='16x16'
                href='/favicons/favicon-16x16.png'
            />
            <link rel='manifest' href='/manifest.json' />
            <link
                rel='shortcut icon'
                href='/favicons/favicon.ico'
                type='image/x-icon'
            />
            <link rel='preconnect' href='https://fonts.googleapis.com' />
            <link rel='preconnect' href='https://fonts.gstatic.com' />
            <link
                href='https://fonts.googleapis.com/css2?family=Press+Start+2P&family=Quicksand:wght@400;700&display=swap'
                rel='stylesheet'
            />
        </>
    )
}

export default Head