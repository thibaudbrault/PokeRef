import { MethodNav } from '@/components/common/styles/Navbars';
import { MainBig } from '@/components/common/styles/Sizing';
import Loader from '@/components/common/ui/Loader/Loader';
import HeadingMoves from '@/components/pages/Moves/Heading';
import { useToggleTable } from '@/components/pages/Moves/Hooks/useToggleTable';

function Moves() {
  const { results, toggle, setToggle, pageShown } = useToggleTable();

  if (results[0].status === 'error' || results[1].status === 'error') {
    return { error };
  }

  if (results[0].status === 'loading' || results[1].status === 'loading') {
    return <Loader />;
  }

  return (
    <>
      <HeadingMoves />
      <MainBig>
        <MethodNav>
          <button
            className={toggle === 1 ? `button_active` : ``}
            onClick={() => setToggle(1)}
          >
            <p>Moves</p>
          </button>
          <button
            className={toggle === 2 ? `button_active` : ``}
            onClick={() => setToggle(2)}
          >
            <p>Status</p>
          </button>
        </MethodNav>
        {pageShown()}
      </MainBig>
    </>
  );
}

export default Moves;
