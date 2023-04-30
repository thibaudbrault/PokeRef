import pokeballLoading from './Lotties/pokeballLoading.json';
import { LoadingImg } from './StyledLoader';
import { Player } from '@lottiefiles/react-lottie-player';

function Loader() {
  return (
    <LoadingImg>
      <Player
        autoplay
        loop
        src={pokeballLoading}
        style={{ height: `192px`, width: `192px` }}
      />
    </LoadingImg>
  );
}

export default Loader;
