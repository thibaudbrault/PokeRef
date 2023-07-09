import { ErrorToast, Loader } from '@/components';
import { Berries, Heading, Items, useItemsQuery } from '@/modules/items';
import * as Tabs from '@radix-ui/react-tabs';

function ItemsPage() {
  const { items, berries } = useItemsQuery();

  if (items.status === `error` || berries.status === `error`) {
    return <ErrorToast />;
  }

  if (items.status === `loading` || berries.status === `loading`) {
    return <Loader />;
  }

  return (
    <>
      <Heading />
      <Tabs.Root className="TabsRootMain" defaultValue="tab1">
        <Tabs.List
          className="TabsList"
          aria-label="Switch between items and berries"
        >
          <Tabs.Trigger value="tab1" className="TabsTrigger">
            Items
          </Tabs.Trigger>
          <Tabs.Trigger value="tab2" className="TabsTrigger">
            Berries
          </Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content className="TabsContent" value="tab1">
          <Items items={items.data} />
        </Tabs.Content>
        <Tabs.Content className="TabsContent" value="tab2">
          <Berries berries={berries.data} />
        </Tabs.Content>
      </Tabs.Root>
    </>
  );
}

export default ItemsPage;
