import Loader from '@/components/common/ui/Loader/Loader';
import { Heading, useToggleTable } from '@/modules/moves';
import toast from 'react-hot-toast';

function MovesPage() {
  const { moves, status, stats, toggle, setToggle, pageShown } =
    useToggleTable();

  if (
    moves.status === `error` ||
    status.status === `error` ||
    stats.status === `error`
  ) {
    return toast.error(`Something went wrong`, {
      style: {
        fontSize: `1.7rem`,
      },
    });
  }

  if (
    moves.status === `loading` ||
    status.status === `loading` ||
    stats.status === `loading`
  ) {
    return <Loader />;
  }

  return (
    <>
      <Heading />
      <main className="mainBig">
        <nav className="methodNav">
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
          <button
            className={toggle === 3 ? `button_active` : ``}
            onClick={() => setToggle(3)}
          >
            <p>Stats</p>
          </button>
        </nav>
        {pageShown()}
      </main>
    </>
  );
}

export default MovesPage;
