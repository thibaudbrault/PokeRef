/* eslint-disable react/no-unescaped-entities */
import { Bold, Capitalize, H3, H4 } from '@/components/common/styles/Headings';
import { IMove } from '@/types/Moves/Move';
import { removeDash } from '@/utils/Typography';
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

function Effect({ move, version }: Props) {
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
            ?.effect.replace(/\$effect_chance/g, `${move.meta.ailment_chance}`)
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
              <Bold>Status</Bold> :{` `}
              <Capitalize>{move.meta.ailment.name}</Capitalize>
            </li>
          )}
          {move?.meta?.ailment_chance !== 0 && (
            <li>
              Has a {move.meta.ailment_chance}% chance to{` `}
              {move.meta.ailment.name} the target
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
          {move?.meta?.min_hits !== null && (
            <li>
              This move hits between {move.meta.min_hits} and{` `}
              {move.meta.max_hits} times
            </li>
          )}
          {move?.meta?.min_turns !== null &&
            move.meta.min_turns !== move.meta.max_turns && (
              <li>
                This move last between {move.meta.min_turns} and{` `}
                {move.meta.max_turns} turns
              </li>
            )}
          {move?.meta?.min_turns !== null &&
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
                    This move lower the target's{` `}
                    <Capitalize>{removeDash(ms.stat.name)}</Capitalize> by{` `}
                    {ms.change} stage
                  </li>
                ) : (
                  <li key={ms.stat.name}>
                    This move raises the target's{` `}
                    <Capitalize>{ms.stat.name}</Capitalize>
                    {` `}
                    by {ms.change} stage
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
                  {mp.power !== null && (
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
                  {mp.accuracy !== null && (
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
                  {mp.pp !== null && (
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
                  {mp.type?.name !== null && (
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
        <MoveCardDataTarget>{removeDash(move.target.name)}</MoveCardDataTarget>
      </li>
    </MoveCardDataList>
  );
}

export default Effect;
