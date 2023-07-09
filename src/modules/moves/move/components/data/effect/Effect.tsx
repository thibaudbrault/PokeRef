import { ErrorToast, SmallLoader } from '@/components';
import { IDescription, IMove, IMoveTarget } from '@/types';
import { getMoveTarget, removeDash } from '@/utils';
import { UseQueryResult, useQuery } from '@tanstack/react-query';
import styles from '../Data.module.scss';

type Props = {
  move: IMove;
  version: string;
};

export function Effect({ move, version }: Props) {
  const {
    isLoading,
    isError,
    error,
    data: target,
  }: UseQueryResult<IMoveTarget[], Error> = useQuery({
    queryKey: [`target`],
    queryFn: getMoveTarget,
  });

  const filteredTarget = (condition: string) => {
    return target?.find((t: IMoveTarget) => t.name === condition);
  };

  if (isError) {
    return <ErrorToast error={error} />;
  }

  if (isLoading) {
    return <SmallLoader />;
  }

  return (
    <ul className={styles.list}>
      <li>
        <h3 className="h3">Effects</h3>

        <p className={styles.text}>
          <span className="capitalize">
            <i>{removeDash(move?.name)}</i>
            {` `}
          </span>
          {move.effect_entries
            ?.find((me) => me.language.name === `en`)
            ?.short_effect.replace(
              /\$effect_chance/g,
              `${move.meta.stat_chance || move.meta.ailment_chance}`,
            )
            .replace(`(100 - accuracy)`, (100 - move.accuracy).toString())
            .toLowerCase()}
          <br />
          {move.flavor_text_entries
            ?.find(
              (mf) =>
                mf.language.name === `en` && mf.version_group.name === version,
            )
            ?.flavor_text.replace(/(?<=(?:^|[.?!])\W*)[a-z]/g, (i) =>
              i.toUpperCase(),
            )}
        </p>

        <ul className={styles.meta}>
          {move?.meta.ailment?.name !== `none` && (
            <li>
              <p>
                <span className="bold">Status</span> :{` `}
                <span className="capitalize">{move.meta.ailment.name}</span>
              </p>
              <p>
                {move?.meta?.ailment_chance !== 0 && (
                  <span>
                    Has a {move.meta.ailment_chance}% chance to{` `}
                    {move.meta.ailment.name} the target
                  </span>
                )}
              </p>
            </li>
          )}
          {move?.meta?.crit_rate !== 0 && (
            <li>
              Increase the chance of landing a critical hit by{` `}
              {move.meta.crit_rate} stage
            </li>
          )}
          {move?.meta?.drain !== 0 && (
            <li>
              Drains {move.meta.drain}% of the damage inflicted to heal the user
            </li>
          )}
          {move?.meta?.flinch_chance !== 0 && (
            <li>
              Has a {move.meta.flinch_chance}% of causing the target to flinch
            </li>
          )}
          {move?.meta?.healing !== 0 && (
            <li>
              Recovers {move.meta.flinch_chance}% of the user's maximum HP
            </li>
          )}
          {move?.meta?.min_hits && (
            <li>
              This move hits between {move.meta.min_hits} and{` `}
              {move.meta.max_hits} times
            </li>
          )}
          {move?.meta?.min_turns &&
            move.meta.min_turns !== move.meta.max_turns && (
              <li>
                This move last between {move.meta.min_turns} and{` `}
                {move.meta.max_turns} turns
              </li>
            )}
          {move?.meta?.min_turns &&
            move.meta.min_turns === move.meta.max_turns && (
              <li>This move last {move.meta.min_turns} turns</li>
            )}
        </ul>
      </li>

      <li>
        {move.stat_changes.length > 0 && (
          <>
            <h4 className="h4">Stat modification</h4>
            <ul className={styles.stat}>
              {move.stat_changes?.map((ms) =>
                ms.change < 0 ? (
                  <li key={ms.stat.name}>
                    This move{` `}
                    {move.meta.stat_chance !== 0 &&
                      `has a ${move.meta.stat_chance}% chance to`}
                    {` `}
                    lower the target's{` `}
                    <span className="capitalize">
                      {removeDash(ms.stat.name)}
                    </span>
                    {` `}
                    by{` `}
                    {Math.abs(ms.change)} stage
                  </li>
                ) : (
                  <li key={ms.stat.name}>
                    This move{` `}
                    {move.meta.stat_chance !== 0
                      ? `has a ${move.meta.stat_chance}% chance to raise`
                      : `raises`}
                    {` `}
                    the target's{` `}
                    <span className="capitalize">{ms.stat.name}</span>
                    {` `}
                    by {Math.abs(ms.change)} stage
                  </li>
                ),
              )}
            </ul>
          </>
        )}
      </li>

      <li>
        {move.past_values.length > 0 && (
          <>
            <h4 className="h4">Changes</h4>
            <ul className={styles.stat}>
              {move.past_values?.map((mp) => (
                <>
                  {mp.power && (
                    <li>
                      Before{` `}
                      <span className="capitalize">
                        {removeDash(mp.version_group.name)}
                      </span>
                      {` `}:{` `}
                      <span className="capitalize">
                        <i>{removeDash(move.name)}</i>
                      </span>
                      {` `}
                      had {mp.power} base power
                    </li>
                  )}
                  {mp.accuracy && (
                    <li>
                      Before{` `}
                      <span className="capitalize">
                        {removeDash(mp.version_group.name)}
                      </span>
                      {` `}:{` `}
                      <span className="capitalize">
                        <i>{removeDash(move.name)}</i>
                      </span>
                      {` `}
                      had {mp.accuracy} accuracy
                    </li>
                  )}
                  {mp.pp && (
                    <li>
                      Before{` `}
                      <span className="capitalize">
                        {removeDash(mp.version_group.name)}
                      </span>
                      {` `}:{` `}
                      <span className="capitalize">
                        <i>{removeDash(move.name)}</i>
                      </span>
                      {` `}
                      had {mp.pp} PP
                    </li>
                  )}
                  {mp.type && (
                    <li>
                      Before{` `}
                      <span className="capitalize">
                        {removeDash(mp.version_group.name)}
                      </span>
                      {` `}:{` `}
                      <span className="capitalize">
                        <i>{removeDash(move.name)}</i>
                      </span>
                      {` `}
                      was {mp.type?.name} type
                    </li>
                  )}
                </>
              ))}
            </ul>
          </>
        )}
      </li>

      <li>
        <h4 className="h4">Target</h4>
        <p className={styles.target}>
          {
            filteredTarget(move.target.name)?.descriptions.find(
              (td: IDescription) => td.language.name === `en`,
            )?.description
          }
        </p>
      </li>
    </ul>
  );
}
