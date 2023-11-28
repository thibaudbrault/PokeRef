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
    size: {
      fit: styles.fit,
      medium: styles.medium,
      large: styles.large,
    },
    logo: {
      withLogo: styles.logo,
    },
  },
  defaultVariants: {
    size: `medium`,
  },
});

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof button> {
  asChild?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, intent, size, logo, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : `button`;
    return (
      <Comp
        className={button({ intent, size, logo, className })}
        ref={ref}
        {...props}
      />
    );
  },
);

Button.displayName = `Button`;
