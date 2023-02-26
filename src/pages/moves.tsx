import { MethodNav } from '@/components/common/styles/Navbars';
import { MainBig } from '@/components/common/styles/Sizing';
import Loader from '@/components/common/ui/Loader/Loader';
import HeadingMoves from '@/components/pages/Moves/Heading';
import { useToggleTable } from '@/components/pages/Moves/Hooks/useToggleTable';
import { getMoves, getStats, getStatus } from '@/utils/DataFetch';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

function Moves() {
  const { moves, status, stats, toggle, setToggle, pageShown } =
    useToggleTable();

  if (
    moves.status === `error` ||
    status.status === `error` ||
    stats.status === `error`
  ) {
    return toast.error(`Something went wrong`);
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
          <button
            className={toggle === 3 ? `button_active` : ``}
            onClick={() => setToggle(3)}
          >
            <p>Stats</p>
          </button>
        </MethodNav>
        {pageShown()}
      </MainBig>
    </>
  );
}

export default Moves;

export async function getStaticProps() {
  const queryClient = new QueryClient();

  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: [`moves`],
      queryFn: getMoves,
    }),
    queryClient.prefetchQuery({
      queryKey: [`status`],
      queryFn: getStatus,
    }),
    queryClient.prefetchQuery({
      queryKey: [`stats`],
      queryFn: getStats,
    }),
  ]);
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}
