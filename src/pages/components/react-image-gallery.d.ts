declare module 'react-image-gallery' {
    import { ReactNode, CSSProperties } from 'react';
  
    interface GalleryImage {
      original: string;
      thumbnail?: string;
      description?: string | ReactNode;
      originalAlt?: string;
      thumbnailAlt?: string;
      originalTitle?: string;
      thumbnailTitle?: string;
    }
  
    interface ReactImageGalleryProps {
      items: GalleryImage[];
      showThumbnails?: boolean;
      showBullets?: boolean;
      showFullscreenButton?: boolean;
      showPlayButton?: boolean;
      showIndex?: boolean;
      indexSeparator?: string;
      disableThumbnailScroll?: boolean;
      disableKeyDown?: boolean;
      disableSwipe?: boolean;
      useBrowserFullscreen?: boolean;
      preventDefaultTouchmoveEvent?: boolean;
      onErrorImageURL?: string;
      maxRows?: number;
      slideInterval?: number;
      slideDuration?: number;
      slideOnThumbnailOver?: boolean;
      onClick?: (event: React.MouseEvent<HTMLElement>, index: number) => void;
      onImageLoad?: (event: React.SyntheticEvent<HTMLImageElement>, index: number) => void;
      onThumbnailClick?: (event: React.MouseEvent<HTMLElement>, index: number) => void;
      onThumbnailError?: (event: React.SyntheticEvent<HTMLImageElement>, index: number) => void;
      onSwipe?: (event: React.TouchEvent<HTMLElement>, direction: string, distance: number) => void;
      onBeforeSlide?: (currentItem: GalleryImage) => void;
      onScreenChange?: (fullScreenElement: Element) => void;
      onPause?: () => void;
      onPlay?: () => void;
      onClickThumbnail?: (index: number) => void;
      onTouchMove?: (event: React.TouchEvent<HTMLElement>) => void;
      onTouchEnd?: (event: React.TouchEvent<HTMLElement>) => void;
      onTouchStart?: (event: React.TouchEvent<HTMLElement>) => void;
      onImageError?: (event: React.SyntheticEvent<HTMLImageElement>) => void;
      renderCustomControls?: () => ReactNode;
      renderLeftNav?: (onClick: () => void, disabled: boolean) => ReactNode;
      renderRightNav?: (onClick: () => void, disabled: boolean) => ReactNode;
      renderPlayPauseButton?: (onClick: () => void, isPlaying: boolean) => ReactNode;
      renderFullscreenButton?: (onClick: () => void, isFullscreen: boolean) => ReactNode;
      renderItem?: (item: GalleryImage) => ReactNode;
      renderThumbInner?: (item: GalleryImage) => ReactNode;
      stopPropagation?: boolean;
      startIndex?: number;
      autoPlay?: boolean;
      lazyLoad?: boolean;
      infinite?: boolean;
      showNav?: boolean;
      isRTL?: boolean;
      canClose?: boolean;
      onClose?: () => void;
      customControls?: ReactNode[];
      renderCustomControls?: () => ReactNode;
      header?: ReactNode;
      footer?: ReactNode;
      width?: number;
      height?: number;
      useTranslate3D?: boolean;
      isMobile?: boolean;
      styles?: { [key: string]: CSSProperties };
      onSlide?: (currentIndex: number) => void;
    }
  
    class ReactImageGallery extends React.Component<ReactImageGalleryProps> {}
  
    export default ReactImageGallery;
  }
  