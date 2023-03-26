import { MdAdd, MdRemove } from '@meronex/icons/ios'
import { useState } from 'react'
import { PokemonContents } from './Styled.Contents.PokemonCard'

function Contents() {

    const [contentsOpen, setContentsOpen] = useState<boolean>(false)

    return (
        <PokemonContents>
            <div>
                <p>Table of contents</p>
                <button
                    onClick={() => setContentsOpen(!contentsOpen)}
                >
                    {contentsOpen ? (
                        <MdAdd />
                    ) : (
                        <MdRemove />
                    )}
                </button>
            </div>
            {contentsOpen && (
                <ol>
                    <li>hello</li>
                </ol>
            )}
        </PokemonContents>
    )
}

export default Contents