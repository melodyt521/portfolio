'use client';
import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import { soundtracks as tracks } from '@/data/soundtrack';
import './project-music.css';
import { MelodyYouTube, type YouTubePlayer } from './MelodyYouTube';
const melodyIndex = tracks.length;
const youtubeVideo = { videoId: 'yEtU5tzZMkY', startSeconds: 67 };

const ProjectMusicContext = createContext({
  isPlaying: false,
  playbackError: null as string | null,
  activeProjectSlug: 'mapsocial',
  playProject: (slug: string) => { void slug; },
  toggleMusic: (slug?: string) => { void slug; },
  nextTrack: () => {},
  previousTrack: () => {},
});
export function useProjectMusic() { return useContext(ProjectMusicContext); }

export function ProjectMusicProvider({ children }: { children: ReactNode }) {
  const audioRefs = useRef<(HTMLAudioElement | null)[]>([]);
  const trackIndexRef = useRef(0);
  const youtubeRef = useRef<YouTubePlayer | null>(null);
  const pendingYouTube = useRef(false);
  const youtubeAtStart = useRef(true);
  const [youtubeEnabled, setYouTubeEnabled] = useState(false);
  const [trackIndex, setTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const pathname = usePathname();

  const playTrack = useCallback((index: number, restart = false) => {
    const nextIndex = (index + tracks.length + 1) % (tracks.length + 1);
    if (nextIndex === melodyIndex) {
      const changed = trackIndexRef.current !== melodyIndex;
      trackIndexRef.current = melodyIndex;
      setTrackIndex(melodyIndex);
      setError(null);
      audioRefs.current.forEach(audio => { if (audio) { audio.pause(); audio.currentTime = 0; } });
      setYouTubeEnabled(true);
      pendingYouTube.current = true;
      if (youtubeRef.current) {
        if ((changed || restart) && !youtubeAtStart.current) youtubeRef.current.seekTo(youtubeVideo.startSeconds, true);
        youtubeRef.current.playVideo();
      }
      return;
    }
    pendingYouTube.current = false;
    youtubeRef.current?.pauseVideo();
    youtubeRef.current?.cueVideoById(youtubeVideo);
    youtubeAtStart.current = true;
    const audio = audioRefs.current[nextIndex];
    if (!audio) { setError('Soundtrack unavailable.'); return; }
    const changed = trackIndexRef.current !== nextIndex;
    trackIndexRef.current = nextIndex;
    setTrackIndex(nextIndex);
    setError(null);
    // Each track keeps its own preloaded element: switching never reloads a source.
    audioRefs.current.forEach((other, otherIndex) => {
      if (other && otherIndex !== nextIndex) { other.pause(); other.currentTime = 0; }
    });
    if (restart || changed) audio.currentTime = 0;
    // Called only by explicit player/disc actions; scroll and hover never affect playback.
    void audio.play().catch((reason: unknown) => {
      if (trackIndexRef.current !== nextIndex || (reason instanceof DOMException && reason.name === 'AbortError')) return;
      setError('Playback could not start. Press Play to try again.');
    });
  }, []);
  const playProject = useCallback((slug: string) => {
    const index = slug === 'melody' ? melodyIndex : tracks.findIndex(track => track.projectSlug === slug);
    if (index !== -1) playTrack(index);
    else {
      pendingYouTube.current = false;
      youtubeRef.current?.pauseVideo();
      youtubeRef.current?.cueVideoById(youtubeVideo);
    youtubeAtStart.current = true;
      audioRefs.current.forEach(audio => { if (audio) { audio.pause(); audio.currentTime = 0; } });
      setIsPlaying(false);
      setError('Soundtrack coming soon.');
    }
  }, [playTrack]);
  const toggleMusic = useCallback((slug?: string) => {
    const requestedIndex = slug === 'melody' ? melodyIndex : tracks.findIndex(track => track.projectSlug === slug);
    if (requestedIndex === melodyIndex && trackIndexRef.current === melodyIndex) {
      if (youtubeRef.current?.getPlayerState() === 1 || pendingYouTube.current) {
        pendingYouTube.current = false;
        youtubeRef.current?.pauseVideo();
        setIsPlaying(false);
      } else playTrack(melodyIndex);
      return;
    }
    if (slug && requestedIndex === -1) { playProject(slug); return; }
    if (requestedIndex !== -1 && requestedIndex !== trackIndexRef.current) playTrack(requestedIndex);
    else if (audioRefs.current[trackIndexRef.current] && !audioRefs.current[trackIndexRef.current]!.paused) audioRefs.current[trackIndexRef.current]!.pause();
    else playTrack(requestedIndex === -1 ? trackIndexRef.current : requestedIndex);
  }, [playTrack, playProject]);
  const nextTrack = useCallback(() => playTrack(trackIndexRef.current + 1, true), [playTrack]);
  const previousTrack = useCallback(() => playTrack(trackIndexRef.current - 1, true), [playTrack]);
  const stopMusic = useCallback(() => {
    pendingYouTube.current = false;
    youtubeRef.current?.pauseVideo();
    youtubeRef.current?.cueVideoById(youtubeVideo);
    youtubeAtStart.current = true;
    audioRefs.current.forEach(audio => { if (audio) { audio.pause(); audio.currentTime = 0; } });
    setIsPlaying(false);
    setError(null);
  }, []);
  useEffect(() => {
    if (pathname === '/' || pathname === '/about') setYouTubeEnabled(true);
    if ((pathname === '/about' || pathname === '/') && trackIndexRef.current === melodyIndex) return;
    stopMusic();
    if (pathname === '/') {
      trackIndexRef.current = 0;
      setTrackIndex(0);

    }
  }, [pathname, stopMusic]);
  useEffect(() => {
    const audios = audioRefs.current;
    return () => { audios.forEach(audio => { if (audio) { audio.pause(); audio.currentTime = 0; } }); };
  }, []);

  const youtubeReady = useCallback((player: YouTubePlayer | null) => {
    youtubeRef.current = player;
    if (player) {
      player.cueVideoById(youtubeVideo);
      youtubeAtStart.current = true;
      if (pendingYouTube.current && trackIndexRef.current === melodyIndex) player.playVideo();
    }
  }, []);
  const youtubeState = useCallback((state: number) => {
    if (trackIndexRef.current !== melodyIndex) return;
    if (state === 1) { youtubeAtStart.current = false; pendingYouTube.current = false; setIsPlaying(true); setError(null); }
    if (state === 2 || state === 0) { pendingYouTube.current = false; setIsPlaying(false); }
  }, []);
  const youtubeError = useCallback(() => {
    if (trackIndexRef.current !== melodyIndex) return;
    pendingYouTube.current = false;
    setIsPlaying(false);
    setError('YouTube could not start. Press Play or use the video player to try again.');
  }, []);
  return <ProjectMusicContext.Provider value={{ isPlaying, playbackError: error, activeProjectSlug: trackIndex === melodyIndex ? 'melody' : tracks[trackIndex].projectSlug, playProject, toggleMusic, nextTrack, previousTrack }}>
    {children}
    {youtubeEnabled && <section className="melody-video persistent-melody-video section-shell" hidden={trackIndex !== melodyIndex || (pathname !== '/' && pathname !== '/about')} aria-label="Melody soundtrack"><p>Melody’s soundtrack · Starts at 1:07</p><button type="button" className="melody-playback-toggle" onClick={() => toggleMusic('melody')}>{isPlaying ? 'Pause music' : 'Play music'}</button><MelodyYouTube onReady={youtubeReady} onState={youtubeState} onError={youtubeError}/></section>}
    {tracks.map((track, index) => <audio key={track.projectSlug} ref={element => { audioRefs.current[index] = element; }} src={track.src} preload={pathname === '/' ? 'auto' : 'none'} loop hidden aria-hidden="true" onPlay={() => { if (trackIndexRef.current === index) setIsPlaying(true); }} onPause={() => { if (trackIndexRef.current === index) setIsPlaying(false); }} onEnded={() => { if (trackIndexRef.current === index) setIsPlaying(false); }} onError={() => { if (trackIndexRef.current === index) { setIsPlaying(false); setError('Soundtrack unavailable.'); } }}/>) }
  </ProjectMusicContext.Provider>;
}
