import Head from 'next/head';
import React from 'react'

type Props = {
    name: string;
}

function HeadingPokemon({ name }: Props) {
    return (
        <Head>
            <title>
                {`${name
                    ?.replace(/-/g, ` `)
                    .replace(/(^\w|\s\w)/g, (m) =>
                        m.toUpperCase(),
                    )}  | Pokémon | PokéRef`}
            </title>
            <meta name="description" content={`Find every details about ${name}`} />
            <meta property="og:title" content={`${name} | Pokémon | PokéRef`} />
            <meta
                property="og:description"
                content={`Find every details about ${name}`}
            />
            <meta
                property="og:url"
                content={`https://pokeref.app/pokemon/${name}`}
            />
            <meta property="og:type" content="website" />
        </Head>
    )
}

export default HeadingPokemon