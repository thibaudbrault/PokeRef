import { type Dispatch, type SetStateAction } from 'react';

import * as NavigationMenu from '@radix-ui/react-navigation-menu';

import { genNav, removeDash } from '@/utils';

type Props = {
  setGame: Dispatch<SetStateAction<string | null>>;
  setVersion: Dispatch<SetStateAction<string | null>>;
};

export function GenNav({ setGame, setVersion }: Props) {
  return (
    <NavigationMenu.Root className="NavigationMenuRoot">
      <NavigationMenu.List className="NavigationMenuList">
        {genNav.map((g) => (
          <NavigationMenu.Item key={g.gen}>
            <NavigationMenu.Trigger className="NavigationMenuTrigger">
              {g.gen}
            </NavigationMenu.Trigger>
            <NavigationMenu.Content className="NavigationMenuContent">
              {g.details.map((gd) => (
                <button
                  key={gd.game}
                  onClick={() => {
                    setGame(gd.game);
                    setVersion(gd.version);
                  }}
                >
                  {removeDash(gd.game)}
                </button>
              ))}
            </NavigationMenu.Content>
          </NavigationMenu.Item>
        ))}
      </NavigationMenu.List>
      <div className="ViewportPosition">
        <NavigationMenu.Viewport className="NavigationMenuViewport" />
      </div>
    </NavigationMenu.Root>
  );
}
