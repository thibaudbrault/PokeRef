/* eslint-disable react/no-unescaped-entities */
import type { Dispatch, SetStateAction } from 'react';

import * as NavigationMenu from '@radix-ui/react-navigation-menu';

import type { IMove } from '@/types';

type Props = {
  move: IMove;
  setVersion: Dispatch<SetStateAction<string>>;
};

export function Nav({ move, setVersion }: Props) {
  return (
    <NavigationMenu.Root className="NavigationMenuRoot">
      <NavigationMenu.List className="NavigationMenuList">
        {move?.generation?.name === `generation-i` && (
          <NavigationMenu.Item>
            <NavigationMenu.Trigger className="NavigationMenuTrigger">
              Gen I
            </NavigationMenu.Trigger>
            <NavigationMenu.Content className="NavigationMenuContent">
              <button onClick={() => setVersion(`red-blue`)}>Red / Blue</button>
              <button onClick={() => setVersion(`yellow`)}>Yellow</button>
            </NavigationMenu.Content>
          </NavigationMenu.Item>
        )}
        {(move?.generation?.name === `generation-i` ||
          move?.generation?.name === `generation-ii`) && (
          <NavigationMenu.Item>
            <NavigationMenu.Trigger className="NavigationMenuTrigger">
              Gen II
            </NavigationMenu.Trigger>
            <NavigationMenu.Content className="NavigationMenuContent">
              <button onClick={() => setVersion(`gold-silver`)}>
                Gold / Silver
              </button>
              <button onClick={() => setVersion(`crystal`)}>Crystal</button>
            </NavigationMenu.Content>
          </NavigationMenu.Item>
        )}
        {(move?.generation?.name === `generation-i` ||
          move?.generation?.name === `generation-ii` ||
          move?.generation?.name === `generation-iii`) && (
          <NavigationMenu.Item>
            <NavigationMenu.Trigger className="NavigationMenuTrigger">
              Gen III
            </NavigationMenu.Trigger>
            <NavigationMenu.Content className="NavigationMenuContent">
              <button onClick={() => setVersion(`ruby-sapphire`)}>
                Ruby / Sapphire
              </button>
              <button onClick={() => setVersion(`emerald`)}>Emerald</button>
              <button onClick={() => setVersion(`firered-greenleaf`)}>
                Fire Red / Green Leaf
              </button>
            </NavigationMenu.Content>
          </NavigationMenu.Item>
        )}
        {(move?.generation?.name === `generation-i` ||
          move?.generation?.name === `generation-ii` ||
          move?.generation?.name === `generation-iii` ||
          move?.generation?.name === `generation-iv`) && (
          <NavigationMenu.Item>
            <NavigationMenu.Trigger className="NavigationMenuTrigger">
              Gen IV
            </NavigationMenu.Trigger>
            <NavigationMenu.Content className="NavigationMenuContent">
              <button onClick={() => setVersion(`diamond-pearl`)}>
                Diamond / Pearl
              </button>
              <button onClick={() => setVersion(`platinum`)}>Platinum</button>
              <button onClick={() => setVersion(`heartgold-soulsilver`)}>
                Heart Gold / Soul Silver
              </button>
            </NavigationMenu.Content>
          </NavigationMenu.Item>
        )}
        {(move?.generation?.name === `generation-i` ||
          move?.generation?.name === `generation-ii` ||
          move?.generation?.name === `generation-iii` ||
          move?.generation?.name === `generation-iv` ||
          move?.generation?.name === `generation-v`) && (
          <NavigationMenu.Item>
            <NavigationMenu.Trigger className="NavigationMenuTrigger">
              Gen V
            </NavigationMenu.Trigger>
            <NavigationMenu.Content className="NavigationMenuContent">
              <button onClick={() => setVersion(`black-white`)}>
                Black / White
              </button>
              <button onClick={() => setVersion(`black-2-white-2`)}>
                Black 2 / White 2
              </button>
            </NavigationMenu.Content>
          </NavigationMenu.Item>
        )}
        {(move?.generation?.name === `generation-i` ||
          move?.generation?.name === `generation-ii` ||
          move?.generation?.name === `generation-iii` ||
          move?.generation?.name === `generation-iv` ||
          move?.generation?.name === `generation-v` ||
          move?.generation?.name === `generation-vi`) && (
          <NavigationMenu.Item>
            <NavigationMenu.Trigger className="NavigationMenuTrigger">
              Gen VI
            </NavigationMenu.Trigger>
            <NavigationMenu.Content className="NavigationMenuContent">
              <button onClick={() => setVersion(`x-y`)}>X / Y</button>
              <button onClick={() => setVersion(`omega-ruby-alpha-sapphire`)}>
                Omega Ruby / Alpha Sapphire
              </button>
            </NavigationMenu.Content>
          </NavigationMenu.Item>
        )}
        {(move?.generation?.name === `generation-i` ||
          move?.generation?.name === `generation-ii` ||
          move?.generation?.name === `generation-iii` ||
          move?.generation?.name === `generation-iv` ||
          move?.generation?.name === `generation-v` ||
          move?.generation?.name === `generation-vi` ||
          move?.generation?.name === `generation-vii`) && (
          <NavigationMenu.Item>
            <NavigationMenu.Trigger className="NavigationMenuTrigger">
              Gen VII
            </NavigationMenu.Trigger>
            <NavigationMenu.Content className="NavigationMenuContent">
              <button onClick={() => setVersion(`sun-moon`)}>Sun / Moon</button>
              <button onClick={() => setVersion(`ultra-sun-ultra-moon`)}>
                Ultra Sun / Ultra Moon
              </button>
              <button
                onClick={() => setVersion(`lets-go-pikachu-lets-go-eevee`)}
              >
                Let's Go Pikachu / Let's Go Eevee
              </button>
            </NavigationMenu.Content>
          </NavigationMenu.Item>
        )}
        {(move?.generation?.name === `generation-i` ||
          move?.generation?.name === `generation-ii` ||
          move?.generation?.name === `generation-iii` ||
          move?.generation?.name === `generation-iv` ||
          move?.generation?.name === `generation-v` ||
          move?.generation?.name === `generation-vi` ||
          move?.generation?.name === `generation-vii` ||
          move?.generation?.name === `generation-viii`) && (
          <NavigationMenu.Item>
            <NavigationMenu.Trigger className="NavigationMenuTrigger">
              Gen VIII
            </NavigationMenu.Trigger>
            <NavigationMenu.Content className="NavigationMenuContent">
              <button onClick={() => setVersion(`sword-shield`)}>
                Sword / Shield
              </button>
            </NavigationMenu.Content>
          </NavigationMenu.Item>
        )}
      </NavigationMenu.List>
      <div className="ViewportPosition">
        <NavigationMenu.Viewport className="NavigationMenuViewport" />
      </div>
    </NavigationMenu.Root>
  );
}
