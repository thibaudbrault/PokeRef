import { FaChevronLeft } from '@meronex/icons/fa';
import Link, { LinkProps } from 'next/link';
import { FC, HTMLProps } from 'react';
import styles from './Button.module.scss';

type ILink = {
  title: string;
  icon?: boolean;
  className: string;
} & LinkProps &
  HTMLProps<HTMLAnchorElement>;

const LinkButton: FC<ILink> = ({ title, icon, className, ...rest }) => {
  return (
    <Link className={styles[className]} {...rest}>
      {icon && <ButtonIcon />}
      {title}
    </Link>
  );
};

const ButtonIcon = () => {
  return <FaChevronLeft />;
};

export default LinkButton;
