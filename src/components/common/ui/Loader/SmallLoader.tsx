import Lottie from 'react-lottie';
import pokeballLoading from './Lotties/pokeballLoading.json';
import { SmallLoadingImg } from './StyledLoader';

function SmallLoader() {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: pokeballLoading,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  return (
    <SmallLoadingImg>
      <Lottie options={defaultOptions} height={48} width={48} />
    </SmallLoadingImg>
  );
}

export default SmallLoader;
