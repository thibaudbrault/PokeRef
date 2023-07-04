// @ts-nocheck

import { IFormatAnalysesSets, IFormatsAnalysesSetName } from '@/types';
import { capitalize, getFormat, removeLongName } from '@/utils';
import { UseQueryResult, useQueries } from '@tanstack/react-query';
import { useState } from 'react';
import toast from 'react-hot-toast';
import styles from './Competitive.module.scss';
import { SmallLoader } from '@/components/Loader/Loader';

type Props = {
  format: string;
  name: string;
};

export function Competitive({ format, name }: Props) {
  const [toggle, setToggle] = useState<number>(0);

  const [analyses, formats, sets]: UseQueryResult<Record<string, unknown>> =
    useQueries({
      queries: [
        {
          queryKey: [`analyses`, format],
          queryFn: () =>
            getFormat(
              `https://raw.githubusercontent.com/pkmn/smogon/main/data/analyses/${format}.json`,
            ),
        },
        {
          queryKey: [`formats`],
          queryFn: () =>
            getFormat(
              `https://raw.githubusercontent.com/pkmn/smogon/main/data/formats/index.json`,
            ),
        },
        {
          queryKey: [`sets`, format],
          queryFn: () =>
            getFormat(
              `https://raw.githubusercontent.com/pkmn/smogon/main/data/sets/${format}.json`,
            ),
        },
      ],
    });

  if (
    analyses.status === `error` ||
    formats.status === `error` ||
    sets.status === `error`
  ) {
    return (
      <>
        {toast.error(`Something went wrong`, {
          style: {
            fontSize: `1.7rem`,
          },
        })}
      </>
    );
  }

  if (
    analyses.status === `loading` ||
    formats.status === `loading` ||
    sets.status === `loading`
  ) {
    return <SmallLoader />;
  }

  const pokemonAnalyses = Object.entries(analyses.data)
    .map(([pokemonAnalysesName, value]) =>
      Object.assign({ pokemonAnalysesName }, value),
    )
    .find((n) => n.pokemonAnalysesName === removeLongName(capitalize(name)));

  const pokemonSets = Object.entries(sets.data)
    .map(([pokemonSetsName, value]) =>
      Object.assign({ pokemonSetsName }, value),
    )
    .find((n) => n.pokemonSetsName === removeLongName(capitalize(name)));

  if (pokemonAnalyses && pokemonSets) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { pokemonAnalysesName, ...filteredAnalyses } =
      pokemonAnalyses as IFormatAnalysesSets;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { pokemonSetsName, ...filteredSets } =
      pokemonSets as IFormatAnalysesSets;

    if (
      Object.keys(filteredAnalyses).length > 0 &&
      Object.keys(filteredSets).length > 0
    ) {
      const formattedName = (formatName: string) => {
        return (
          Object.entries(formats.data)
            .filter((f) => f[0] === formatName && f[1])
            .flat()[1] || formatName
        );
      };

      const setsEntries = <T extends Record<string, unknown>>(
        obj: T,
      ): T[keyof T] => {
        return Object.entries(obj)[toggle][1];
      };

      const overview: string | undefined = setsEntries(
        filteredAnalyses as IFormatAnalysesSets,
      ).overview;

      const comments: string | undefined = setsEntries(
        filteredAnalyses as IFormatAnalysesSets,
      ).comments;

      const textFormatting = (str: string) =>
        str.replaceAll(`-types`, ` types`).replaceAll(`-type`, ` type`);

      const setSpecs = (
        obj: IFormatsAnalysesSetName,
        i: number,
        value: string,
      ) => {
        return Object.values(Object.entries(obj)[toggle][1])[i][value];
      };

      const wrapMoves = (
        tag: string,
        move: string | number,
        index: number,
      ): string | null => {
        if (tag === `li` && typeof move === `string`) {
          return `<${tag}>Move ${index + 1}: <b>${move}</b></${tag}>`;
        } else if (tag === `span` && typeof move === `string`) {
          return `<${tag}>${move}</${tag}>`;
        } else if (typeof move === `number`) {
          return null;
        }
      };

      const majEv = {
        hp: `Hp`,
        atk: `Atk`,
        def: `Def`,
        spa: `SpA`,
        spd: `SpD`,
        spe: `Spe`,
      };

      const detailedSets = Object.keys(
        Object.values(Object.entries(filteredSets)[toggle][1])[0],
      );

      return (
        <section className="section" id="competitive">
          <h3 className="h3">Competitive</h3>
          <nav className="methodNav">
            {Object.keys(filteredAnalyses).map((fa, i) => (
              <button
                key={fa}
                className={toggle === i ? `button_active` : ``}
                onClick={() => setToggle(i)}
              >
                <p>{formattedName(fa) as string}</p>
              </button>
            ))}
          </nav>
          <ul className={styles.list}>
            {overview && (
              <li>
                <h4 className="h4">Analysis</h4>
                <div
                  className={styles.desc}
                  dangerouslySetInnerHTML={{ __html: overview }}
                />
              </li>
            )}
            {setsEntries(filteredAnalyses as IFormatAnalysesSets).sets?.map(
              (s: IFormatsAnalysesSetName, i) => (
                <li key={s.name}>
                  <h4 className="h4">{s.name}</h4>
                  <div className={styles.specs}>
                    <ul
                      dangerouslySetInnerHTML={{
                        __html: setSpecs(filteredSets, i, `moves`).map(
                          (move: string | string[], index: number) =>
                            wrapMoves(
                              `li`,
                              Array.isArray(move)
                                ? move
                                    .map((j) => wrapMoves(`span`, j, index))
                                    .join(` / `)
                                : move,
                              index,
                            ),
                        ),
                      }}
                    />
                    {detailedSets.length > 1 &&
                      detailedSets.find(
                        (d: string) => d !== `level` && d !== `moves`,
                      ) && (
                        <ul>
                          <li>
                            {typeof setSpecs(filteredSets, i, `item`) ===
                            `string` ? (
                              <>
                                Item: <b>{setSpecs(filteredSets, i, `item`)}</b>
                              </>
                            ) : (
                              <>
                                Items:{` `}
                                <b>
                                  {setSpecs(filteredSets, i, `item`).join(
                                    ` / `,
                                  )}
                                </b>
                              </>
                            )}
                          </li>
                          <li>
                            Nature:{` `}
                            <b>
                              {typeof setSpecs(filteredSets, i, `nature`) ===
                              `string`
                                ? setSpecs(filteredSets, i, `nature`)
                                : `-`}
                            </b>
                          </li>
                          <li>
                            EVs:{` `}
                            <b>
                              {typeof setSpecs(filteredSets, i, `evs`) ===
                              `object`
                                ? Object.entries(
                                    setSpecs(filteredSets, i, `evs`),
                                  )
                                    .join(` / `)
                                    .replaceAll(`,`, ` `)
                                    .replace(
                                      /\b(?:hp|atk|def|spa|spd|spe)\b/gi,
                                      (matched) => majEv[matched],
                                    )
                                : `-`}
                            </b>
                          </li>
                        </ul>
                      )}
                  </div>
                  {s.description && (
                    <div
                      className={styles.desc}
                      dangerouslySetInnerHTML={{
                        __html: textFormatting(s.description),
                      }}
                    />
                  )}
                </li>
              ),
            )}
            {comments && (
              <li>
                <div
                  className={styles.comment}
                  dangerouslySetInnerHTML={{ __html: textFormatting(comments) }}
                />
              </li>
            )}
          </ul>
        </section>
      );
    }
  }

  if (!pokemonAnalyses || !pokemonSets) {
    return <div className="subtitle">No data available</div>;
  }
}
