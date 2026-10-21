'use client';

import { useEffect, useRef } from 'react';

export function LoopingDemo({ name, label, captionId, folder = 'instagram' }: { name: string; label: string; captionId: string; folder?: 'instagram' | 'mapsocial' }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let visible = false;
    let disposed = false;
    const sync = () => {
      if (!motion.matches && visible && document.visibilityState === 'visible') {
        video.play().then(() => {
          if (disposed || motion.matches || !visible || document.visibilityState !== 'visible') video.pause();
        }).catch(() => { /* The poster remains if the browser blocks autoplay. */ });
      } else video.pause();
    };
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; sync(); }, { threshold: .1 });
    observer.observe(video);
    motion.addEventListener('change', sync);
    document.addEventListener('visibilitychange', sync);
    return () => {
      disposed = true;
      observer.disconnect();
      motion.removeEventListener('change', sync);
      document.removeEventListener('visibilitychange', sync);
      video.pause();
    };
  }, [name, folder]);

  return <video ref={ref} className="looping-demo-video" loop muted playsInline preload="none" disablePictureInPicture disableRemotePlayback controlsList="nodownload nofullscreen noremoteplayback" tabIndex={-1} poster={`/images/${folder}/${name}-poster.webp`} aria-label={label} aria-describedby={captionId} style={{ maskImage: `url(/images/${folder}/${name}-mask.png)`, WebkitMaskImage: `url(/images/${folder}/${name}-mask.png)` }}>
    <source src={`/videos/${folder}/${name}.mp4`} type="video/mp4"/>
  </video>;
}
