import { Loader } from '@/components';
import { Heading, useToggleTable } from '@/modules/items';
import toast from 'react-hot-toast';

function ItemsPage() {
  const { items, berries, toggle, setToggle, pageShown } = useToggleTable();

  if (items.status === `error` || berries.status === `error`) {
    return toast.error(`Something went wrong`, {
      style: {
        fontSize: `1.7rem`,
      },
    });
  }

  if (items.status === `loading` || berries.status === `loading`) {
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
            <p>Items</p>
          </button>
          <button
            className={toggle === 2 ? `button_active` : ``}
            onClick={() => setToggle(2)}
          >
            <p>Berries</p>
          </button>
        </nav>
        {pageShown()}
      </main>
    </>
  );
}

export default ItemsPage;
