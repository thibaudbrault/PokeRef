import { H3 } from '@/components/common/styles/Headings';
import { MoveText } from '@/components/pages/Moves/MoveCard/Styled.MoveCard';

const version = `ultra-sun-ultra-moon`;

export const LevelMoveText = () => {
  return (
    <>
      <H3>Learned by leveling up</H3>
      <MoveText>
        Learned when the pokémon reach a certain level. Data from Pokémon{` `}
        <span>{version.replace(/-/g, ` `)}</span>. These information may vary in
        other games. Check the respective pokédex pages for details.
      </MoveText>
    </>
  );
};

export const MachinesMoveText = () => {
  return (
    <>
      <H3>Learned from a TM / HM</H3>
      <MoveText>
        Learned by using a TM or a HM. Data from Pokémon{` `}
        <span>{version.replace(/-/g, ` `)}</span>. These information may vary in
        other games. Check the respective pokédex pages for details.
      </MoveText>
    </>
  );
};

export const BreedingMoveText = () => {
  return (
    <>
      <H3>Learned from the move relearner / by breeding</H3>
      <MoveText>
        Learned via the move relearner or through breeding. Data from Pokémon
        {` `}
        <span>{version.replace(/-/g, ` `)}</span>. These information may vary in
        other games. Check the respective pokédex pages for details.
      </MoveText>
    </>
  );
};

export const TutorMoveText = () => {
  return (
    <>
      <H3>Learned from the move tutor</H3>
      <MoveText>
        Learned by going to the move tutor. Data from Pokémon{` `}
        <span>{version.replace(/-/g, ` `)}</span>. These information may vary in
        other games. Check the respective pokédex pages for details.
      </MoveText>
    </>
  );
};

export const EvolvingMoveText = () => {
  return (
    <>
      <H3>Learned when evolving</H3>
      <MoveText>
        Learned when the pokémon is evolving no matter its level. Data from
        Pokémon <span>{version.replace(/-/g, ` `)}</span>. These information may
        vary in other games. Check the respective pokédex pages for details.
      </MoveText>
    </>
  );
};
