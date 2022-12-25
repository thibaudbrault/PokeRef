import React from 'react';
import {
  MoveLink,
  MoveList,
  MoveTypes,
} from '@/components/pages/Moves/MoveCard/Styled.MoveCard';
import { Pokemon } from '@/types/types';
import { Type } from '@/components/common/styles/Themes';
import Image from 'next/image';

type Props = {
  pokedex?: Pokemon.Pokemon[];
  moveName: string;
  version: string;
  toggle: number;
};

function Content({ pokedex, moveName, version, toggle }: Props) {
  const conditionFilter = (pmv) => {
    if (toggle === 0) {
      return (
        pmv.move_learn_method.name === `level-up` && pmv.level_learned_at > 1
      );
    } else if (toggle === 1) {
      return (
        pmv.move_learn_method.name === `machine` && pmv.level_learned_at === 0
      );
    } else if (toggle === 2) {
      return (
        pmv.move_learn_method.name === `egg` ||
        (pmv.move_learn_method.name === `level-up` &&
          pmv.level_learned_at === 1)
      );
    } else if (toggle === 3) {
      return pmv.move_learn_method.name === `tutor`;
    } else if (toggle === 4) {
      return (
        pmv.move_learn_method.name === `level-up` && pmv.level_learned_at === 0
      );
    }
  };

  return (
    <MoveList>
      {pokedex?.map((p) =>
        p.moves.map(
          (pm) =>
            pm.move.name.includes(moveName) &&
            pm.version_group_details.map(
              (pmv) =>
                pmv.version_group.name.includes(version) &&
                conditionFilter(pmv) && (
                  <li key={p.name}>
                    <Image
                      src={p.sprites.front_default}
                      alt={p.name}
                      width={96}
                      height={96}
                    />
                    <MoveLink
                      href={{
                        pathname: `/pokemon/[name]`,
                        query: { name: p.name },
                      }}
                      key={p.name}
                    >
                      {p.name.replace(/-/g, ` `)}
                    </MoveLink>
                    <p>Level {pmv.level_learned_at}</p>
                    <MoveTypes>
                      {p.types?.map((pt) => (
                        <Type id={pt.type.name} key={pt.type.name}>
                          <Image alt={pt.type.name} width={15} height={15} />
                          <span>{pt.type.name}</span>
                        </Type>
                      ))}
                    </MoveTypes>
                  </li>
                ),
            ),
        ),
      )}
    </MoveList>
  );
}

export default Content;