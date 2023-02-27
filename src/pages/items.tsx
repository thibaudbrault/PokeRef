import { MethodNav } from '@/components/common/styles/Navbars';
import { MainBig } from '@/components/common/styles/Sizing';
import Loader from '@/components/common/ui/Loader/Loader';
import HeadingItems from '@/components/pages/Items/Heading';
import { useToggleTable } from '@/components/pages/Items/Hooks/useToggleTable';
import { getBerries, getItems } from '@/utils/DataFetch';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

function ItemsPage() {
  const { items, berries, toggle, setToggle, pageShown } = useToggleTable();

  if (items.status === `error` || berries.status === `error`) {
    return toast.error(`Something went wrong`);
  }

  if (items.status === `loading` || berries.status === `loading`) {
    return <Loader />;
  }

  return (
    <>
      <HeadingItems />
      <MainBig>
        <MethodNav>
          <button
            className={toggle === 1 ? `button_active` : ``}
            onClick={() => setToggle(1)}
          >
            <p>Items</p>
          </button>
          <button
            className={toggle === 2 ? `button_active` : ``}
            onClick={() => setToggle(2)}
          >
            <p>Berries</p>
          </button>
        </MethodNav>
        {pageShown()}
      </MainBig>
    </>
  );
}

export default ItemsPage;

export async function getStaticProps() {
  const queryClient = new QueryClient();

  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: [`items`],
      queryFn: getItems,
    }),
    queryClient.prefetchQuery({
      queryKey: [`berries`],
      queryFn: getBerries,
    }),
  ]);
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}
