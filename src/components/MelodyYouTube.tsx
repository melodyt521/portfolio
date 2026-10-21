'use client';
import { useEffect, useRef } from 'react';

export type YouTubePlayer = {
 playVideo: () => void;
 pauseVideo: () => void;
 seekTo: (seconds: number, allowSeekAhead: boolean) => void;
 cueVideoById: (options: { videoId: string; startSeconds: number }) => void;
 loadVideoById: (options: { videoId: string; startSeconds: number }) => void;
 getPlayerState: () => number;
 destroy: () => void;
};
type YouTubeAPI = { Player: new (element: HTMLElement, options: Record<string, unknown>) => YouTubePlayer };
type YouTubeWindow = Window & { YT?: YouTubeAPI; onYouTubeIframeAPIReady?: () => void };
let apiPromise: Promise<YouTubeAPI> | undefined;
function loadAPI() {
 const target = window as YouTubeWindow;
 if (target.YT?.Player) return Promise.resolve(target.YT);
 if (!apiPromise) apiPromise = new Promise<YouTubeAPI>((resolve, reject) => {
  const previous = target.onYouTubeIframeAPIReady;
  target.onYouTubeIframeAPIReady = () => { previous?.(); if (target.YT) resolve(target.YT); };
  const script = document.createElement('script');
  script.src = 'https://www.youtube.com/iframe_api';
  script.onerror = () => { apiPromise = undefined; reject(new Error('YouTube unavailable')); };
  document.head.appendChild(script);
 });
 return apiPromise;
}
export function MelodyYouTube({ onReady, onState, onError }: { onReady: (player: YouTubePlayer | null) => void; onState: (state: number) => void; onError: () => void }) {
 const host = useRef<HTMLDivElement>(null);
 useEffect(() => {
  let disposed = false;
  let player: YouTubePlayer | undefined;
  void loadAPI().then(API => {
   if (disposed || !host.current) return;
   const mount = document.createElement('div');
   host.current.appendChild(mount);
   player = new API.Player(mount, {
    width: '100%', height: '270', videoId: 'yEtU5tzZMkY',
    playerVars: { start: 67, controls: 0, playsinline: 1, rel: 0, origin: window.location.origin },
    events: {
     onReady: () => { if (!disposed && player) onReady(player); },
     onStateChange: (event: { data: number }) => { if (!disposed) onState(event.data); },
     onError: () => { if (!disposed) onError(); },
     onAutoplayBlocked: () => { if (!disposed) onError(); },
    },
   });
  }).catch(() => { if (!disposed) onError(); });
  return () => { disposed = true; onReady(null); player?.destroy(); };
 }, [onReady, onState, onError]);
 return <div className="melody-video-player" ref={host}/>;
}
