import { type ButtonHTMLAttributes, forwardRef } from 'react';

import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import styles from './Button.module.scss';

const button = cva(styles.base, {
  variants: {
    intent: {
      back: styles.back,
      primary: styles.primary,
      secondary: styles.secondary,
    },
  },
});

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof button> {
  asChild?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, intent, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : `button`;
    return (
      <Comp className={button({ intent, className })} ref={ref} {...props} />
    );
  },
);

Button.displayName = `Button`;
