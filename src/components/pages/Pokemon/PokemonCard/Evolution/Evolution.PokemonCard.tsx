import { H3 } from '@/components/common/styles/Headings';
import SmallLoader from '@/components/common/ui/Loader/SmallLoader';
import { IEvolutionChain } from '@/types/Evolution/EvolutionChain';
import { IPokemon } from '@/types/Pokemon/Pokemon';
import { getAllEvo } from '@/utils/DataFetch';
import { removeDash } from '@/utils/Typography';
import { FaChevronRight } from '@meronex/icons/fa';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import toast from 'react-hot-toast';
import {
  PokemonEvolution,
  PokemonEvolutionBase,
  PokemonEvolutionContainer,
  PokemonEvolutionElement,
  PokemonEvolutionFinal,
  PokemonEvolutionSection,
  PokemonEvolutionStages,
  PokemonEvolutionText,
} from './Styled.Evolution.PokemonCard';

type Props = {
  evolution: IEvolutionChain;
  name: string;
};

function Evolution({ evolution, name }: Props) {
  const {
    isLoading,
    isError,
    error,
    data: evo,
  }: UseQueryResult<IPokemon[], Error> = useQuery({
    queryKey: [`evos`, name],
    queryFn: () => getAllEvo(evolution),
    enabled: !!evolution,
  });

  if (isError) {
    return toast.error(`Something went wrong: ${error.message}`);
  }

  if (isLoading) {
    return <SmallLoader />;
  }

  return (
    <PokemonEvolutionSection id="evolution">
      <H3>Evolution chain</H3>
      <PokemonEvolutionContainer>
        <PokemonEvolutionBase>
          <div>
            <>
              {evo?.map(
                (e: IPokemon) =>
                  e?.name === evolution?.chain?.species?.name && (
                    <Image
                      key={e.name}
                      src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${e.id}.png`}
                      alt=""
                      width={96}
                      height={96}
                    />
                  ),
              )}
              <Link
                href={{
                  pathname: `/pokemon/[name]`,
                  query: { name: evolution?.chain?.species?.name },
                }}
              >
                {removeDash(evolution?.chain?.species?.name)}
              </Link>
            </>
          </div>
        </PokemonEvolutionBase>
        {evolution?.chain?.evolves_to?.length !== 0 && (
          <PokemonEvolution>
            <PokemonEvolutionStages>
              {evolution?.chain?.evolves_to?.map((ee) => (
                <PokemonEvolutionElement key={evolution?.chain?.species?.name}>
                  <div>
                    {ee?.evolution_details?.map((eed) => (
                      <>
                        {eed.gender &&
                          (eed.gender === 1 ? (
                            <PokemonEvolutionText>
                              <span> Female</span>
                            </PokemonEvolutionText>
                          ) : (
                            <PokemonEvolutionText>
                              <span> Male</span>
                            </PokemonEvolutionText>
                          ))}
                        {eed.trigger.name === `trade` && !eed.held_item && (
                          <PokemonEvolutionText>Trade</PokemonEvolutionText>
                        )}
                        {eed.held_item && eed.trigger.name === `trade` && (
                          <PokemonEvolutionText>
                            Trade holding
                            <span>
                              {` `}
                              {removeDash(eed.held_item.name)}
                            </span>
                          </PokemonEvolutionText>
                        )}
                        {eed.held_item && eed.trigger.name === `level-up` && (
                          <PokemonEvolutionText>
                            Level up holding{` `}
                            <span>
                              {` `}
                              {removeDash(eed.held_item.name)}
                            </span>
                            {` `}
                            during the <span> {eed.time_of_day}</span>
                          </PokemonEvolutionText>
                        )}
                        {eed.item && (
                          <PokemonEvolutionText>
                            Use{` `}
                            <span> {removeDash(eed.item.name)}</span>
                          </PokemonEvolutionText>
                        )}
                        {eed.known_move && (
                          <PokemonEvolutionText>
                            Learn{` `}
                            <span>
                              {` `}
                              {removeDash(eed.known_move.name)}
                            </span>
                          </PokemonEvolutionText>
                        )}
                        {eed.known_move_type && eed.min_affection && (
                          <PokemonEvolutionText>
                            Level up with{` `}
                            <span> {eed.min_affection}+ affection</span>
                            {` `}
                            while knowing a{` `}
                            <span>
                              {` `}
                              {removeDash(eed.known_move_type.name)}
                            </span>
                            {` `}
                            type move
                          </PokemonEvolutionText>
                        )}
                        {eed.known_move_type && eed.min_happiness && (
                          <PokemonEvolutionText>
                            Level up with{` `}
                            <span> {eed.min_happiness}+ happiness</span>
                            {` `}
                            while knowing a{` `}
                            <span>
                              {` `}
                              {removeDash(eed.known_move_type.name)}
                            </span>
                            {` `}
                            type move
                          </PokemonEvolutionText>
                        )}
                        {eed.location && (
                          <PokemonEvolutionText>
                            Level up at{` `}
                            <span>
                              {` `}
                              {removeDash(eed.location.name)}
                            </span>
                          </PokemonEvolutionText>
                        )}
                        {eed.min_beauty && (
                          <PokemonEvolutionText>
                            Level up with{` `}
                            <span> {eed.min_beauty}+ beauty</span>
                          </PokemonEvolutionText>
                        )}
                        {eed.min_happiness && eed.time_of_day !== `` && (
                          <PokemonEvolutionText>
                            Level up with{` `}
                            <span> {eed.min_happiness}+ happiness</span> during
                            the <span> {eed.time_of_day}</span>
                          </PokemonEvolutionText>
                        )}
                        {eed.min_happiness && eed.time_of_day === `` && (
                          <PokemonEvolutionText>
                            Level up with{` `}
                            <span> {eed.min_happiness}+ happiness</span>
                          </PokemonEvolutionText>
                        )}
                        {eed.min_level &&
                          eed.time_of_day === `` &&
                          !eed.party_type &&
                          !eed.relative_physical_stats &&
                          eed.turn_upside_down === false && (
                            <PokemonEvolutionText>
                              Level <span> {eed.min_level}</span>
                            </PokemonEvolutionText>
                          )}
                        {eed.min_level && eed.time_of_day !== `` && (
                          <PokemonEvolutionText>
                            Level <span> {eed.min_level}</span> during the{` `}
                            <span> {eed.time_of_day}</span>
                          </PokemonEvolutionText>
                        )}
                        {eed.needs_overworld_rain === true && (
                          <PokemonEvolutionText>
                            Level <span> {eed.min_level}</span> while{` `}
                            <span>raining</span>
                          </PokemonEvolutionText>
                        )}
                        {eed.party_species && (
                          <PokemonEvolutionText>
                            Level up with a{` `}
                            <span>
                              {` `}
                              {removeDash(eed.party_species.name)}
                            </span>
                            {` `}
                            in the party
                          </PokemonEvolutionText>
                        )}
                        {eed.party_type && (
                          <PokemonEvolutionText>
                            Level <span> {eed.min_level}</span> with a{` `}
                            <span> {eed.party_type.name}</span> type pokémon in
                            the party
                          </PokemonEvolutionText>
                        )}
                        {eed.relative_physical_stats && (
                          <PokemonEvolutionText>
                            Level <span> {eed.min_level}</span> with
                            <span>
                              {eed.relative_physical_stats === 1
                                ? ` Attack > Defense`
                                : eed.relative_physical_stats === 0
                                  ? ` Attack = Defense`
                                  : ` Defense > Attack`}
                            </span>
                          </PokemonEvolutionText>
                        )}
                        {eed.trade_species && (
                          <PokemonEvolutionText>
                            Trade with <span> {eed.trade_species.name}</span>
                          </PokemonEvolutionText>
                        )}
                        {eed.turn_upside_down === true && (
                          <PokemonEvolutionText>
                            Level <span> {eed.min_level} </span> while{` `}
                            <span>holding the console upside-down</span>
                          </PokemonEvolutionText>
                        )}
                        {eed.trigger.name === `shed` && (
                          <PokemonEvolutionText>
                            Level <span>20</span> with an{` `}
                            <span>empty slot in the party</span> and an{` `}
                            <span>extra PokéBall</span>
                          </PokemonEvolutionText>
                        )}
                        {eed.trigger.name === `take-damage` && (
                          <PokemonEvolutionText>
                            Travel{` `}
                            <span>under the stone bridge in Dusty Bowl</span>
                            {` `}
                            after taking at least <span>49 HP in damage</span>
                            {` `}
                            without fainting
                          </PokemonEvolutionText>
                        )}
                      </>
                    ))}
                    <FaChevronRight />
                  </div>
                  <div>
                    {evo?.map(
                      (e: IPokemon) =>
                        e.name === ee.species.name && (
                          <Image
                            key={e.name}
                            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${e.id}.png`}
                            alt=""
                            width={96}
                            height={96}
                          />
                        ),
                    )}
                    <Link
                      href={{
                        pathname: `/pokemon/[name]`,
                        query: { name: ee.species.name },
                      }}
                    >
                      {removeDash(ee.species.name)}
                    </Link>
                  </div>
                </PokemonEvolutionElement>
              ))}
            </PokemonEvolutionStages>
            {evolution?.chain?.evolves_to?.map(
              (ee) =>
                ee?.evolves_to?.length !== 0 && (
                  <PokemonEvolutionFinal key={ee.species.name}>
                    {ee?.evolves_to?.map((eee) => (
                      <PokemonEvolutionStages key={ee.species.name}>
                        <PokemonEvolutionElement>
                          <div>
                            {eee?.evolution_details?.map((eeed) => (
                              <>
                                {eeed.gender &&
                                  (eeed.gender === 1 ? (
                                    <PokemonEvolutionText>
                                      <span> Female</span>
                                    </PokemonEvolutionText>
                                  ) : (
                                    <PokemonEvolutionText>
                                      <span> Male</span>
                                    </PokemonEvolutionText>
                                  ))}
                                {eeed.trigger.name === `trade` &&
                                  !eeed.held_item && (
                                    <PokemonEvolutionText>
                                      Trade
                                    </PokemonEvolutionText>
                                  )}
                                {eeed.held_item &&
                                  eeed.trigger.name === `trade` && (
                                    <PokemonEvolutionText>
                                      Trade holding
                                      <span>
                                        {` `}
                                        {removeDash(eeed.held_item.name)}
                                      </span>
                                    </PokemonEvolutionText>
                                  )}
                                {eeed.held_item &&
                                  eeed.trigger.name === `level-up` && (
                                    <PokemonEvolutionText>
                                      Level up holding{` `}
                                      <span>
                                        {` `}
                                        {removeDash(eeed.held_item.name)}
                                      </span>
                                      {` `}
                                      during the{` `}
                                      <span> {eeed.time_of_day}</span>
                                    </PokemonEvolutionText>
                                  )}
                                {eeed.item && (
                                  <PokemonEvolutionText>
                                    Use{` `}
                                    <span>
                                      {` `}
                                      {removeDash(eeed.item.name)}
                                    </span>
                                  </PokemonEvolutionText>
                                )}
                                {eeed.known_move && (
                                  <PokemonEvolutionText>
                                    Learn{` `}
                                    <span>
                                      {` `}
                                      {removeDash(eeed.known_move.name)}
                                    </span>
                                  </PokemonEvolutionText>
                                )}
                                {eeed.known_move_type && eeed.min_affection && (
                                  <PokemonEvolutionText>
                                    Level up with{` `}
                                    <span>
                                      {` `}
                                      {eeed.min_affection}+ affection
                                    </span>
                                    {` `}
                                    while knowing a{` `}
                                    <span>
                                      {` `}
                                      {eeed.known_move_type.name.replace(
                                        /-/g,
                                        ` `,
                                      )}
                                    </span>
                                    {` `}
                                    type move
                                  </PokemonEvolutionText>
                                )}
                                {eeed.known_move_type && eeed.min_happiness && (
                                  <PokemonEvolutionText>
                                    Level up with{` `}
                                    <span>
                                      {` `}
                                      {eeed.min_happiness}+ happiness
                                    </span>
                                    {` `}
                                    while knowing a{` `}
                                    <span>
                                      {` `}
                                      {eeed.known_move_type.name.replace(
                                        /-/g,
                                        ` `,
                                      )}
                                    </span>
                                    {` `}
                                    type move
                                  </PokemonEvolutionText>
                                )}
                                {eeed.location && (
                                  <PokemonEvolutionText>
                                    Level up at{` `}
                                    <span>
                                      {` `}
                                      {removeDash(eeed.location.name)}
                                    </span>
                                  </PokemonEvolutionText>
                                )}
                                {eeed.min_beauty && (
                                  <PokemonEvolutionText>
                                    Level up with{` `}
                                    <span> {eeed.min_beauty}+ beauty</span>
                                  </PokemonEvolutionText>
                                )}
                                {eeed.min_happiness && eeed.time_of_day !== `` && (
                                  <PokemonEvolutionText>
                                    Level up with{` `}
                                    <span>
                                      {` `}
                                      {eeed.min_happiness}+ happiness
                                    </span>
                                    {` `}
                                    during the{` `}
                                    <span> {eeed.time_of_day}</span>
                                  </PokemonEvolutionText>
                                )}
                                {eeed.min_happiness && eeed.time_of_day === `` && (
                                  <PokemonEvolutionText>
                                    Level up with{` `}
                                    <span>
                                      {` `}
                                      {eeed.min_happiness}+ happiness
                                    </span>
                                  </PokemonEvolutionText>
                                )}
                                {eeed.min_level &&
                                  eeed.time_of_day === `` &&
                                  !eeed.party_type &&
                                  !eeed.relative_physical_stats &&
                                  eeed.turn_upside_down === false && (
                                    <PokemonEvolutionText>
                                      Level <span> {eeed.min_level}</span>
                                    </PokemonEvolutionText>
                                  )}
                                {eeed.min_level && eeed.time_of_day !== `` && (
                                  <PokemonEvolutionText>
                                    Level <span> {eeed.min_level}</span> during
                                    the <span> {eeed.time_of_day}</span>
                                  </PokemonEvolutionText>
                                )}
                                {eeed.needs_overworld_rain === true && (
                                  <PokemonEvolutionText>
                                    Level <span> {eeed.min_level}</span> while
                                    {` `}
                                    <span>raining</span>
                                  </PokemonEvolutionText>
                                )}
                                {eeed.party_species && (
                                  <PokemonEvolutionText>
                                    Level up with a{` `}
                                    <span>
                                      {` `}
                                      {eeed.party_species.name.replace(
                                        /-/g,
                                        ` `,
                                      )}
                                    </span>
                                    {` `}
                                    in the party
                                  </PokemonEvolutionText>
                                )}
                                {eeed.party_type && (
                                  <PokemonEvolutionText>
                                    Level <span> {eeed.min_level}</span> with a
                                    {` `}
                                    <span> {eeed.party_type.name}</span> type
                                    pokémon in the party
                                  </PokemonEvolutionText>
                                )}
                                {eeed.relative_physical_stats && (
                                  <PokemonEvolutionText>
                                    Level <span> {eeed.min_level}</span> with
                                    <span>
                                      {eeed.relative_physical_stats === 1
                                        ? ` Attack > Defense`
                                        : eeed.relative_physical_stats === 0
                                          ? ` Attack = Defense`
                                          : ` Defense > Attack`}
                                    </span>
                                  </PokemonEvolutionText>
                                )}
                                {eeed.trade_species && (
                                  <PokemonEvolutionText>
                                    Trade with{` `}
                                    <span> {eeed.trade_species.name}</span>
                                  </PokemonEvolutionText>
                                )}
                                {eeed.turn_upside_down === true && (
                                  <PokemonEvolutionText>
                                    Level <span> {eeed.min_level} </span> while
                                    {` `}
                                    <span>holding the console upside-down</span>
                                  </PokemonEvolutionText>
                                )}
                                {eeed.trigger.name === `shed` && (
                                  <PokemonEvolutionText>
                                    Level <span>20</span> with an{` `}
                                    <span>empty slot in the party</span> and an
                                    {` `}
                                    <span>extra PokéBall</span>
                                  </PokemonEvolutionText>
                                )}
                                {eeed.trigger.name === `take-damage` && (
                                  <PokemonEvolutionText>
                                    Travel{` `}
                                    <span>
                                      under the stone bridge in Dusty Bowl
                                    </span>
                                    {` `}
                                    after taking at least{` `}
                                    <span>49 HP in damage</span> without
                                    fainting
                                  </PokemonEvolutionText>
                                )}
                              </>
                            ))}
                            <FaChevronRight />
                          </div>
                          <div>
                            {evo?.map(
                              (e: IPokemon) =>
                                e.name === eee.species.name && (
                                  <Image
                                    key={e.name}
                                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${e.id}.png`}
                                    alt=""
                                    width={96}
                                    height={96}
                                  />
                                ),
                            )}
                            <Link
                              href={{
                                pathname: `/pokemon/[name]`,
                                query: { name: eee.species.name },
                              }}
                            >
                              {removeDash(eee.species.name)}
                            </Link>
                          </div>
                        </PokemonEvolutionElement>
                      </PokemonEvolutionStages>
                    ))}
                  </PokemonEvolutionFinal>
                ),
            )}
          </PokemonEvolution>
        )}
      </PokemonEvolutionContainer>
    </PokemonEvolutionSection>
  );
}

export default Evolution;
