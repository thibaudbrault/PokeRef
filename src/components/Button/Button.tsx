import { FaChevronLeft } from '@meronex/icons/fa';
import Link, { LinkProps } from 'next/link';
import { HTMLProps, Ref, forwardRef } from 'react';
import styles from './Button.module.scss';

type ILink = {
  title: string;
  icon?: boolean;
  className: string;
  ref?: Ref<HTMLAnchorElement>;
} & LinkProps &
  HTMLProps<HTMLAnchorElement>;

export const LinkButton = forwardRef<HTMLAnchorElement, ILink>(
  ({ title, icon, className, ...rest }, ref) => {
    return (
      <Link className={styles[className]} ref={ref} {...rest}>
        {icon && <ButtonIcon />}
        {title}
      </Link>
    );
  },
);

const ButtonIcon = () => {
  return <FaChevronLeft />;
};
