import { forwardRef } from 'react';

import * as AvatarPrimitive from '@radix-ui/react-avatar';

import styles from './Avatar.module.scss';

const Avatar = forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>
>(({ ...props }, ref) => (
  <AvatarPrimitive.Root ref={ref} className={styles.root} {...props} />
));
Avatar.displayName = AvatarPrimitive.Root.displayName;

const AvatarImage = forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ ...props }, ref) => (
  <AvatarPrimitive.Image ref={ref} className={styles.image} {...props} />
));
AvatarImage.displayName = AvatarPrimitive.Image.displayName;

const AvatarFallback = forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>(({ ...props }, ref) => (
  <AvatarPrimitive.Fallback ref={ref} className={styles.fallback} {...props} />
));
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName;

export { Avatar, AvatarImage, AvatarFallback };
