import { useEffect, useRef, useState, type ImgHTMLAttributes } from 'react'
import mediatorMark from '../../assets/brand/mediator-mark.png'
import styles from './SafeImage.module.scss'

type SafeImageProps = Omit<ImgHTMLAttributes<HTMLImageElement>, 'className' | 'onError' | 'onLoad'> & {
  className?: string
  frameClassName?: string
}

function SafeImage({ className, frameClassName, alt, src, ...imageProps }: SafeImageProps) {
  const [failedSource, setFailedSource] = useState<string | null>(null)
  const [loadedSource, setLoadedSource] = useState<string | null>(null)
  const imageRef = useRef<HTMLImageElement>(null)
  const hasFailed = failedSource === src
  const isLoaded = loadedSource === src

  useEffect(() => {
    const image = imageRef.current

    if (image?.complete && image.naturalWidth > 0) {
      setLoadedSource(src ? String(src) : null)
    }
  }, [src])

  return (
    <span
      className={`${styles.frame} ${frameClassName ?? ''}`}
      data-image-status={hasFailed ? 'fallback' : isLoaded ? 'loaded' : 'loading'}
      role={hasFailed && alt ? 'img' : undefined}
      aria-label={hasFailed && alt ? alt : undefined}
      aria-hidden={hasFailed && !alt ? true : undefined}
    >
      {hasFailed ? (
        <span className={styles.fallback} aria-hidden="true">
          <img src={mediatorMark} alt="" />
        </span>
      ) : (
        <img
          {...imageProps}
          ref={imageRef}
          className={`${styles.image} ${className ?? ''} ${isLoaded ? styles.loaded : ''}`}
          src={src}
          alt={alt}
          onLoad={() => setLoadedSource(src ? String(src) : null)}
          onError={() => setFailedSource(src ? String(src) : '')}
        />
      )}
    </span>
  )
}

export default SafeImage
