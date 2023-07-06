import Image, { ImageProps } from 'next/image';
import { useState } from 'react';

interface ImageWithFallbackProps extends ImageProps {
  fallbackSrc: string;
}

export function ImageWithFallback(props: ImageWithFallbackProps) {
  const { src, fallbackSrc, ...rest } = props;
  const [imgSrc, setImgSrc] = useState(src);

  return (
    <Image
      {...rest}
      src={imgSrc}
      alt={``}
      onError={() => {
        setImgSrc(fallbackSrc);
      }}
    />
  );
}
