import { GenNav } from '@/components/common/styles/Navbars';
import { genNav } from '@/utils/DataArrays';
import { removeDash } from '@/utils/Typography';
import { Dispatch, SetStateAction } from 'react';

type Props = {
    setGame: Dispatch<SetStateAction<string | null>>;
    setVersion: Dispatch<SetStateAction<string | null>>;
};

function Nav({ setGame, setVersion }: Props) {
    return (
        <GenNav>
            <ol>
                {genNav.map((g) => (
                    <li key={g.gen}>
                        <button>{g.gen}</button>
                        <div>
                            {g.details.map((gd) => (
                                <button
                                    key={gd.game}
                                    onClick={() => {
                                        setGame(gd.game);
                                        setVersion(gd.version);
                                    }}
                                >
                                    {removeDash(gd.game)}
                                </button>
                            ))}
                        </div>
                    </li>
                ))}
            </ol>
        </GenNav>
    );
}

export default Nav;
