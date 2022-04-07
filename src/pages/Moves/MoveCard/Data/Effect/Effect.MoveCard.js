import React from 'react'
import { H3, H4 } from '../../../../../components/BaseStyles/Headings'
import { MoveCardDataList, MoveCardDataMeta, MoveCardDataStat, MoveCardDataTarget, MoveCardDataText } from '../StyledData.MoveCard'

function Effect({ move, version }) {
    return (
        <MoveCardDataList>
            <li>
                <H3>Effects</H3>

                <MoveCardDataText>
                    <span><i>{move?.name?.replace(/-/g, ' ')}</i> </span>
                    {move?.effect_entries?.map((me) => 
                        me.language.name === 'en'  &&
                            <>
                                {me?.effect
                                    .replace(/\$effect_chance/g, `${move?.meta?.ailment_chance}`)
                                    .replace('(100 - accuracy)', 100 - `${move?.accuracy}`)
                                }
                            </>
                    )} <br />
                    {move?.flavor_text_entries?.map((mf) => 
                        mf?.language?.name === 'en' && mf?.version_group?.name === version && 
                            <>
                                {mf?.flavor_text}
                            </>
                    )}
                </MoveCardDataText>

                <MoveCardDataMeta>
                    {move?.meta?.ailment?.name !== 'none' && 
                    <li>Status : <span>{move?.meta?.ailment?.name}</span></li>}
                    {move?.meta?.ailment_chance !== 0 && 
                    <li>Has a {move?.meta?.ailment_chance}% chance to {move?.meta?.ailment?.name} the target</li>}
                    {move?.meta?.crit_rate !== 0 && 
                    <li>Increase the chance of landing a critical hit by {move?.meta?.crit_rate} stage</li>}
                    {move?.meta?.drain !== 0 && 
                    <li>Drains {move?.meta?.drain}% of the damage inflicted to heal the user</li>}
                    {move?.meta?.flinch_chance !== 0 && 
                    <li>Has a {move?.meta?.flinch_chance}% of causing the target to flinch</li>}
                    {move?.meta?.healing !== 0 && 
                    <li>Recovers {move?.meta?.flinch_chance}% of the user's maximum HP</li>}
                    {move?.meta?.min_hits !== null && 
                    <li>This move hits between {move?.meta?.min_hits} and {move?.meta?.max_hits} times</li>}
                    {move?.meta?.min_turns !== null &&  move?.meta?.min_turns !== move?.meta?.max_turns &&
                    <li>
                        This move last between {move?.meta?.min_turns} and {move?.meta?.max_turns} turns
                    </li>}
                    {move?.meta?.min_turns !== null &&  move?.meta?.min_turns === move?.meta?.max_turns &&
                    <li>
                        This move last {move?.meta?.min_turns} turns
                    </li>}
                </MoveCardDataMeta>
            </li>

            <li>
                {move?.stat_changes?.length > 0 &&
                    <>
                        <H4>Stat modification</H4>
                        <MoveCardDataStat>
                            {move?.stat_changes?.map((ms) => 
                                ms?.change < 0 ? (
                                    <li>This move lower the target's <span>{ms?.stat?.name?.replace(/-/g, ' ')}</span> by {ms?.change} stage</li>
                                ) : (
                                    <li>This move raises the target's <span>{ms?.stat?.name}</span> by {ms?.change} stage</li>
                                )
                            )}
                        </MoveCardDataStat>
                    </>
                }
            </li>

            <li>
                {move?.past_values?.length > 0 &&
                    <>
                        <H4>Changes</H4>
                        <MoveCardDataStat>
                            {move?.past_values?.map((mp) => 
                                <>
                                    {mp?.power !== null && 
                                    <li>Before <span>{mp?.version_group?.name?.replace(/-/g, ' ')}</span> : <span><i>{move?.name?.replace(/-/g, ' ')}</i></span> had {mp?.power} base power</li>}
                                    {mp?.accuracy !== null && 
                                    <li>Before <span>{mp?.version_group?.name?.replace(/-/g, ' ')}</span> : <span><i>{move?.name?.replace(/-/g, ' ')}</i></span> had {mp?.accuracy} accuracy</li>}
                                    {mp?.pp !== null && 
                                    <li>Before <span>{mp?.version_group?.name?.replace(/-/g, ' ')}</span> : <span><i>{move?.name?.replace(/-/g, ' ')}</i></span> had {mp?.pp} PP</li>}
                                    {mp?.type !== null && 
                                    <li>Before <span>{mp?.version_group?.name?.replace(/-/g, ' ')}</span> : <span><i>{move?.name?.replace(/-/g, ' ')}</i></span> was {mp?.type} type</li>}
                                    
                                </>
                            )}
                        </MoveCardDataStat>
                    </>
                }
            </li>

            <li>
                <H4>Target</H4>
                <MoveCardDataTarget>{move?.target?.name.replace(/-/g, ' ')}</MoveCardDataTarget>
            </li>
        </MoveCardDataList>
    )
}

export default Effect