'use client';

import { useEffect, useRef, useState, type ChangeEvent } from 'react';
import Image from 'next/image';
import { SkipBack, SkipForward, Play, Pause, ImagePlus } from 'lucide-react';
import './about-disc-carousel.css';

type DiscPhoto = { src: string; alt: string; position: string; caption: string; transform?: string };
const originals: DiscPhoto[] = [
  { src: '/images/about/graduation-portrait.jpg', caption: 'Graduation day at UC San Diego.', alt: 'Melody at her UC San Diego graduation', position: 'center 55%' },
  { src: '/images/about/img_5523.webp', caption: 'A quiet corner, full of details.', alt: 'A warm wooden display case overlooking a green courtyard', position: 'center 62%' },
  { src: '/images/about/img_2455.webp', caption: 'Mountain views with good company.', alt: 'Two friends standing through a vehicle roof beneath green mountains and a blue sky', position: 'center 100%' },
  { src: '/images/about/img_8043.webp', caption: 'A little color for the day.', alt: 'A bouquet of pale pink, yellow, and lavender flowers', position: 'center 58%' },
  { src: '/images/about/img_4836.webp', caption: 'Waterfalls and a rainbow.', alt: 'Melody beside a waterfall and rainbow beneath a blue sky', position: 'center 100%', transform: 'translateY(-3%) scale(1.08)' },
  { src: '/images/about/img_5951.webp', caption: 'Good music, warm wood.', alt: 'Blue speakers, records, flowers, and warm wooden shelves', position: 'center 50%' },
  { src: '/images/about/img_3912.webp', caption: 'Sailboats in the evening light.', alt: 'Sailboats on blue water beside the city in evening light', position: 'center 58%' },
  { src: '/images/about/img_5939-2.webp', caption: 'Fresh from the oven.', alt: 'Chocolate chip cookies baking on a tray in a warmly lit oven', position: 'center 70%' },
  { src: '/images/about/tezza-2545-2.webp', caption: 'By the Chicago River.', alt: 'Melody by the Chicago River with boats and city architecture', position: 'center 100%' },
  { src: '/images/about/img_6166.webp', caption: 'Soft light and a quiet room.', alt: 'A warm neutral interior with a wooden pool table and pendant light', position: 'center 65%' },
  { src: '/images/about/img_3343.webp', caption: 'A day at the ballpark.', alt: 'A Yankees cap and jersey with a Taiwan flag at a baseball game', position: 'center 62%' },
  { src: '/images/about/img_5406.webp', caption: 'Sunset between the buildings.', alt: 'A bridge between modern buildings beneath a peach sunset sky', position: 'center 58%' },
  { src: '/images/about/img_4048.webp', caption: 'Glass, green space, and city views.', alt: 'Sunlit glass architecture overlooking trees and the city', position: 'center 65%' },
  { src: '/images/about/img_6287-2.webp', caption: 'Coffee for two.', alt: 'Two iced coffees in glasses with amber and green handles', position: 'center 60%' },
  { src: '/images/about/img_0368.webp', caption: 'New York after sunset.', alt: 'Melody by the waterfront with the illuminated skyline at dusk', position: 'center 100%', transform: 'translateY(-4%) scale(1.1)' },
  { src: '/images/about/img_8579.webp', caption: 'A different view of the Manhattan Bridge.', alt: 'Manhattan Bridge framed by a brick archway', position: 'center 53%' },
];
const total = originals.length;
const openPhotos = () => new Promise<IDBDatabase>((resolve, reject) => {
  const request = indexedDB.open('melody-photo-discs-curated', 1);
  request.onupgradeneeded = () => request.result.createObjectStore('photos');
  request.onsuccess = () => resolve(request.result);
  request.onerror = () => reject(request.error);
});

export function AboutDiscCarousel() {
  const [active, setActive] = useState(0);
  const [spinning, setSpinning] = useState(true);
  const [uploads, setUploads] = useState<Record<number, string>>({});
  const [error, setError] = useState('');
  const input = useRef<HTMLInputElement>(null);
  const urls = useRef<string[]>([]);
  const strip = useRef<HTMLDivElement>(null);
  const drag = useRef({ pointer: -1, start: 0, scroll: 0, moved: false, photo: null as number | null });
  const [dragging, setDragging] = useState(false);
  function select(index: number) { setActive(index); }
  const move = (step: number) => { setActive(value => (value + step + total) % total); };

  useEffect(() => {
    let cancelled = false;
    const objectUrls = urls.current;
    void openPhotos().then(db => {
      const request = db.transaction('photos').objectStore('photos').openCursor();
      request.onsuccess = () => {
        const cursor = request.result;
        if (cursor && !cancelled) {
          const url = URL.createObjectURL(cursor.value as Blob);
          urls.current.push(url);
          setUploads(value => ({ ...value, [Number(cursor.key)]: url }));
          cursor.continue();
        } else db.close();
      };
    }).catch(() => {});
    return () => { cancelled = true; objectUrls.forEach(url => URL.revokeObjectURL(url)); };
  }, []);

  async function addPhoto(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file) return;
    if (!file.type.startsWith('image/')) { setError('Choose an image file.'); return; }
    const index = active;
    try {
      const db = await openPhotos();
      await new Promise<void>((resolve, reject) => {
        const transaction = db.transaction('photos', 'readwrite');
        transaction.objectStore('photos').put(file, index);
        transaction.oncomplete = () => { db.close(); resolve(); };
        transaction.onerror = () => { db.close(); reject(transaction.error); };
      });
      const url = URL.createObjectURL(file);
      urls.current.push(url);
      setUploads(value => ({ ...value, [index]: url }));
      setError('');
    } catch { setError('This browser could not save the photo. Please try again.'); }
  }

  return <section className={`about-discs section-shell${spinning ? '' : ' is-motion-paused'}`} aria-label="Photo disc carousel" aria-roledescription="carousel" onKeyDown={event => {
    if (event.target instanceof HTMLInputElement) return;
    drag.current.moved = false;
    if (event.key === 'ArrowLeft') { event.preventDefault(); move(-1); }
    if (event.key === 'ArrowRight') { event.preventDefault(); move(1); }
    if (event.key === 'Home') { event.preventDefault(); select(0); }
    if (event.key === 'End') { event.preventDefault(); select(total - 1); }
  }}>
    <div className="about-discs-heading"><span className="eyebrow">A FEW MOMENTS ON REPEAT</span><span className="disc-counter" aria-live="polite">{String(active + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}</span></div>
    <div ref={strip} className={`about-discs-stage${dragging ? ' is-dragging' : ''}`} aria-label="Drag to browse photos"
      onPointerDown={event => {
        drag.current.moved = false;
        if (event.button !== 0) return;
        const disc = (event.target as HTMLElement).closest<HTMLButtonElement>('[data-photo-index]');
        drag.current = { pointer: event.pointerId, start: event.clientX, scroll: active, moved: false, photo: disc ? Number(disc.dataset.photoIndex) : null };
      }}
      onPointerMove={event => {
        const gesture = drag.current;
        if (gesture.pointer !== event.pointerId) return;
        const delta = event.clientX - gesture.start;
        if (!gesture.moved && Math.abs(delta) > 10) {
          gesture.moved = true;
          setDragging(true);
          event.currentTarget.setPointerCapture(event.pointerId);
        }
        if (gesture.moved) {
          event.preventDefault();
          const next = gesture.scroll - Math.round(delta / 95);
          setActive(((next % total) + total) % total);
        }
      }}
      onPointerUp={event => {
        if (drag.current.pointer !== event.pointerId) return;
        // Use the pressed disc, even if the overlapping stack moves before release.
        if (!drag.current.moved && drag.current.photo !== null) select(drag.current.photo);
        drag.current.pointer = -1;
        setDragging(false);
        if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
      }}
      onPointerCancel={() => { drag.current.pointer = -1; setDragging(false); }}
      onLostPointerCapture={() => { drag.current.pointer = -1; setDragging(false); }}
      onClickCapture={event => {
        if (drag.current.moved) {
          drag.current.moved = false;
          event.preventDefault();
          event.stopPropagation();
        }
      }}>
      {originals.map((original, index) => {
        let offset = (index - active + total) % total;
        if (offset > total / 2) offset -= total;
        const visible = Math.abs(offset) <= 2;
        const photo: DiscPhoto = uploads[index] ? { src: uploads[index], alt: `Melody’s photo, disc ${index + 1}`, position: 'center 55%', caption: 'Another moment on repeat.' } : original;
        return <button key={original.src} data-photo-index={index} className={`about-photo-disc${index === active ? ' is-current' : ''}`} style={{ '--offset': offset, '--distance': Math.abs(offset), zIndex: total - Math.abs(offset), visibility: visible ? 'visible' : 'hidden' } as React.CSSProperties} tabIndex={visible ? 0 : -1} aria-label={`View photo ${index + 1}${index === active ? ', selected' : ''}`} aria-current={index === active ? 'true' : undefined} aria-describedby={index === active ? 'photo-disc-caption' : undefined} onClick={event => { if (event.detail === 0) select(index); }}>
          <span className="photo-disc-face"><Image src={photo.src} alt={photo.alt} style={{ objectPosition: photo.position, transform: photo.transform }} width={600} height={600} sizes="(max-width:600px) 265px, 440px" unoptimized={photo.src.startsWith('blob:')} draggable={false}/></span>
          <span className="photo-disc-hub" aria-hidden="true"/>
          <span className="photo-disc-number" aria-hidden="true">SIDE {String(index + 1).padStart(2, '0')}</span>
        </button>;
      })}
    </div>
    <p className="photo-disc-caption" id="photo-disc-caption" aria-live="polite">Moments I keep on repeat.</p>
    <div className="about-discs-controls">
      <div className="disc-transport" role="group" aria-label="Photo playback controls">
        <button className="disc-carousel-arrow" onClick={() => move(-1)} aria-label="Previous photo"><SkipBack size={18}/></button>
        <button className="disc-carousel-arrow disc-slideshow-toggle" onClick={() => setSpinning(value => !value)} aria-label={spinning ? 'Pause disc animation' : 'Play disc animation'} aria-pressed={spinning}>{spinning ? <Pause size={19}/> : <Play size={19}/>}</button>
        <button className="disc-carousel-arrow" onClick={() => move(1)} aria-label="Next photo"><SkipForward size={18}/></button>
      </div>
      <div className="photo-disc-progress"><input type="range" min={0} max={total - 1} step={1} value={active} onChange={event => select(Number(event.target.value))} aria-label="Photo progress" aria-valuetext={`Photo ${active + 1} of ${total}`} style={{ '--photo-progress': `${total > 1 ? active / (total - 1) * 100 : 100}%` } as React.CSSProperties}/></div>
    </div>
    <div className="about-discs-upload"><button className="text-link" onClick={() => input.current?.click()}><ImagePlus size={16}/>{uploads[active] || originals[active] ? 'Change this photo' : 'Add a photo'}</button><p>Added photos stay in this browser.</p><input ref={input} type="file" accept="image/*" onChange={addPhoto} aria-label="Choose a photo for the selected disc" hidden/>{error && <p role="alert">{error}</p>}</div>
  </section>;
}
