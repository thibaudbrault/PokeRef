import { Player } from '@lottiefiles/react-lottie-player';
import pokeballLoading from './Lotties/pokeballLoading.json';
import { SmallLoadingImg } from './StyledLoader';

function SmallLoader() {
  return (
    <SmallLoadingImg>
      <Player
        autoplay
        loop
        src={pokeballLoading}
        style={{ height: '48px', width: '48px' }}
      />
    </SmallLoadingImg>
  );
}

export default SmallLoader;
