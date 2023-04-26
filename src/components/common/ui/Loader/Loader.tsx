import Lottie from 'react-lottie';
import pokeballLoading from './Lotties/pokeballLoading.json';
import { LoadingImg } from './StyledLoader';

function Loader() {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: pokeballLoading,
    rendererSettings: {
      preserveAspectRatio: `xMidYMid slice`,
    },
  };

  return (
    <LoadingImg>
      <Lottie options={defaultOptions} height={192} width={192} />
    </LoadingImg>
  );
}

export default Loader;
