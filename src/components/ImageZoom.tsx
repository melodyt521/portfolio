'use client';

import { useRef, type MouseEvent, type ReactNode } from 'react';
import { X } from 'lucide-react';

export function ImageZoom({ src, alt, children }: { src: string; alt: string; children: ReactNode }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLAnchorElement>(null);
  const close = () => dialog.current?.close();
  const open = (event: MouseEvent<HTMLAnchorElement>) => {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    if (!dialog.current?.showModal) return;
    event.preventDefault();
    dialog.current.showModal();
  };

  return <>
    <a ref={trigger} className="image-zoom-trigger" href={src} aria-label={`Enlarge: ${alt}`} aria-haspopup="dialog" onClick={open}>{children}</a>
    <dialog ref={dialog} className="image-zoom-dialog" aria-label={`Enlarged image: ${alt}`} onClick={event => { if (event.target === event.currentTarget) close(); }} onClose={() => trigger.current?.focus({ preventScroll: true })}>
      <section className="image-zoom-panel">
        <div className="image-zoom-toolbar"><p>{alt}</p><button type="button" onClick={close} aria-label="Close enlarged image" autoFocus><X size={22}/></button></div>
        <div className="image-zoom-content">{children}</div>
      </section>
    </dialog>
  </>;
}
