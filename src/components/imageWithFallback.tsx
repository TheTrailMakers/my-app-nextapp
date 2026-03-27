"use client";

import { useState } from "react";
import Image, { ImageProps } from "next/image";

interface ImageWithFallbackProps extends Omit<ImageProps, "src"> {
  fallbackSrc?: string;
  src?: string | null;
}

export function ImageWithFallback({
  src,
  fallbackSrc = "/placeholder.jpg",
  alt,
  ...rest
}: ImageWithFallbackProps) {
  const [error, setError] = useState(false);
  const [prevSrc, setPrevSrc] = useState(src);

  if (src !== prevSrc) {
    setPrevSrc(src);
    setError(false);
  }

  const imageSrc = error || !src ? fallbackSrc : src;

  return (
    <Image
      {...rest}
      src={imageSrc as string}
      alt={alt || ""}
      onError={() => {
        setError(true);
      }}
    />
  );
}
