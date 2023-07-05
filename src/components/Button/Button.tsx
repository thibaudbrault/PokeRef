import { FaChevronLeft } from '@meronex/icons/fa';
import Link, { LinkProps } from 'next/link';
import { HTMLProps } from 'react';
import styles from './Button.module.scss';

type ILink = {
  title: string;
  icon?: boolean;
  className: string;
} & LinkProps &
  HTMLProps<HTMLAnchorElement>;

export function LinkButton({ title, icon, className, ...rest }: ILink) {
  return (
    <Link className={styles[className]} {...rest}>
      {icon && <ButtonIcon />}
      {title}
    </Link>
  );
}

const ButtonIcon = () => {
  return <FaChevronLeft />;
};
