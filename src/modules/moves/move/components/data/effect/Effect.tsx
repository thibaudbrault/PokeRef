/* eslint-disable react/no-unescaped-entities */
import { Bold, Capitalize, H3, H4 } from '@/components/common/styles/Headings';
import SmallLoader from '@/components/common/ui/Loader/SmallLoader';
import { IDescription, IMove, IMoveTarget } from '@/types';
import { getMoveTarget, removeDash } from '@/utils';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import {
  MoveCardDataList,
  MoveCardDataMeta,
  MoveCardDataStat,
  MoveCardDataTarget,
  MoveCardDataText,
} from '../Styled.Data.MoveCard';

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
    return toast.error(`Something went wrong: ${error?.message}`, {
      style: {
        fontSize: `1.7rem`,
      },
    });
  }

  if (isLoading) {
    return <SmallLoader />;
  }

  return (
    <MoveCardDataList>
      <li>
        <H3>Effects</H3>

        <MoveCardDataText>
          <Capitalize>
            <i>{removeDash(move?.name)}</i>
            {` `}
          </Capitalize>
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
        </MoveCardDataText>

        <MoveCardDataMeta>
          {move?.meta.ailment?.name !== `none` && (
            <li>
              <p>
                <Bold>Status</Bold> :{` `}
                <Capitalize>{move.meta.ailment.name}</Capitalize>
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
        </MoveCardDataMeta>
      </li>

      <li>
        {move.stat_changes.length > 0 && (
          <>
            <H4>Stat modification</H4>
            <MoveCardDataStat>
              {move.stat_changes?.map((ms) =>
                ms.change < 0 ? (
                  <li key={ms.stat.name}>
                    This move{` `}
                    {move.meta.stat_chance !== 0 &&
                      `has a ${move.meta.stat_chance}% chance to`}
                    {` `}
                    lower the target's{` `}
                    <Capitalize>{removeDash(ms.stat.name)}</Capitalize> by{` `}
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
                    <Capitalize>{ms.stat.name}</Capitalize>
                    {` `}
                    by {Math.abs(ms.change)} stage
                  </li>
                ),
              )}
            </MoveCardDataStat>
          </>
        )}
      </li>

      <li>
        {move.past_values.length > 0 && (
          <>
            <H4>Changes</H4>
            <MoveCardDataStat>
              {move.past_values?.map((mp) => (
                <>
                  {mp.power && (
                    <li>
                      Before{` `}
                      <Capitalize>
                        {removeDash(mp.version_group.name)}
                      </Capitalize>
                      {` `}:{` `}
                      <Capitalize>
                        <i>{removeDash(move.name)}</i>
                      </Capitalize>
                      {` `}
                      had {mp.power} base power
                    </li>
                  )}
                  {mp.accuracy && (
                    <li>
                      Before{` `}
                      <Capitalize>
                        {removeDash(mp.version_group.name)}
                      </Capitalize>
                      {` `}:{` `}
                      <Capitalize>
                        <i>{removeDash(move.name)}</i>
                      </Capitalize>
                      {` `}
                      had {mp.accuracy} accuracy
                    </li>
                  )}
                  {mp.pp && (
                    <li>
                      Before{` `}
                      <Capitalize>
                        {removeDash(mp.version_group.name)}
                      </Capitalize>
                      {` `}:{` `}
                      <Capitalize>
                        <i>{removeDash(move.name)}</i>
                      </Capitalize>
                      {` `}
                      had {mp.pp} PP
                    </li>
                  )}
                  {mp.type && (
                    <li>
                      Before{` `}
                      <Capitalize>
                        {removeDash(mp.version_group.name)}
                      </Capitalize>
                      {` `}:{` `}
                      <Capitalize>
                        <i>{removeDash(move.name)}</i>
                      </Capitalize>
                      {` `}
                      was {mp.type?.name} type
                    </li>
                  )}
                </>
              ))}
            </MoveCardDataStat>
          </>
        )}
      </li>

      <li>
        <H4>Target</H4>
        <MoveCardDataTarget>
          {
            filteredTarget(move.target.name)?.descriptions.find(
              (td: IDescription) => td.language.name === `en`,
            )?.description
          }
        </MoveCardDataTarget>
      </li>
    </MoveCardDataList>
  );
}
