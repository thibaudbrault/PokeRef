import { useState, type Dispatch, type SetStateAction, useEffect } from 'react';

import * as Label from '@radix-ui/react-label';
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import Select, { type SingleValue } from 'react-select';
import { v4 as uuidv4 } from 'uuid';

import { useMediaQuery } from '@/hooks';
import { IGenNav, IOptions, genNav, removeDash } from '@/utils';

import styles from './Nav.module.scss';

type Props = {
  game: string;
  setGame: Dispatch<SetStateAction<string>>;
  setVersion?: Dispatch<SetStateAction<string | null>>;
};

export function GenNav({ game, setGame, setVersion }: Props) {
  const isBreakpoint = useMediaQuery(890);
  const [selected, setSelected] = useState<IOptions | null>(null);

  const getOptionsForGame = (game: string) => {
    for (const gen of genNav) {
      for (const option of gen.options) {
        if (option.label === game) {
          return option;
        }
      }
    }
    return null;
  };

  const handleSelect = (option: SingleValue<IOptions>) => {
    if (option) {
      setSelected(option);
      setGame(option.label);
      if (setVersion) {
        setVersion(option.value);
      }
    }
  };

  const handleClick = (gd: IGenNav['options'][0]) => {
    setGame(gd.label);
    if (setVersion) {
      setVersion(gd.value);
    }
  };

  useEffect(() => {
    const options = getOptionsForGame(game);
    setSelected(options);
  }, []);

  return isBreakpoint ? (
    <section className={styles.genNav}>
      <div className={styles.dropdown}>
        <Label.Root htmlFor="generation">Game</Label.Root>
        <Select
          key={selected?.value}
          name="generation"
          id="generation"
          value={selected}
          className="dropdown"
          classNamePrefix="select"
          options={genNav}
          placeholder="Select"
          onChange={(option) => {
            handleSelect(option as IOptions);
          }}
        />
      </div>
    </section>
  ) : (
    <NavigationMenu.Root className="NavigationMenuRoot">
      <NavigationMenu.List className="NavigationMenuList">
        {genNav.map((g) => (
          <NavigationMenu.Item key={uuidv4()}>
            <NavigationMenu.Trigger className="NavigationMenuTrigger">
              {g.label}
            </NavigationMenu.Trigger>
            <NavigationMenu.Content className="NavigationMenuContent">
              {g.options.map((gd) => (
                <button key={gd.label} onClick={() => handleClick(gd)}>
                  {removeDash(gd.label)}
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
