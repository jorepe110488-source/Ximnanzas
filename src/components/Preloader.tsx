import { useEffect, useRef, useState } from 'react';
import { animate } from 'animejs';

export function Preloader() {
  const [visible, setVisible] = useState(true);
  const overlayRef = useRef<HTMLDivElement>(null);
  const orbitRef = useRef<HTMLSpanElement>(null);
  const progressBarRef = useRef<HTMLSpanElement>(null);
  const progressValueRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const timeout = window.setTimeout(() => setVisible(false), 350);
      return () => window.clearTimeout(timeout);
    }

    const orbit = orbitRef.current;
    const progressBar = progressBarRef.current;
    if (!orbit || !progressBar) return;

    const progress = { value: 0 };
    const animations = [
      animate(orbit, {
        rotate: 360,
        duration: 1800,
        ease: 'linear',
      }),
      animate(progressBar, {
        scaleX: [0, 1],
        duration: 1350,
        ease: 'inOut(3)',
      }),
      animate(progress, {
        value: 100,
        duration: 1350,
        ease: 'out(3)',
        onUpdate: () => {
          if (progressValueRef.current) {
            progressValueRef.current.textContent = Math.round(progress.value).toString().padStart(2, '0');
          }
        },
        onComplete: () => {
          const overlay = overlayRef.current;
          if (!overlay) return;

          animations.push(animate(overlay, {
            opacity: [1, 0],
            duration: 450,
            delay: 120,
            ease: 'in(3)',
            onComplete: () => setVisible(false),
          }));
        },
      }),
    ];

    return () => animations.forEach((animation) => animation.revert());
  }, []);

  if (!visible) return null;

  return (
    <div
      ref={overlayRef}
      className="preloader"
      role="status"
      aria-label="Cargando Ximnanzas"
      aria-live="polite"
    >
      <div className="preloader-content">
        <div className="preloader-mark" aria-hidden="true">
          <span ref={orbitRef} className="preloader-orbit" />
          <span className="preloader-mark-core">X</span>
        </div>
        <p className="preloader-brand">XIMNANZAS</p>
        <p className="preloader-caption">Preparando tu futuro</p>
        <div className="preloader-progress" aria-hidden="true">
          <span ref={progressBarRef} className="preloader-progress-bar" />
        </div>
        <span className="preloader-value" aria-hidden="true">
          <span ref={progressValueRef}>00</span>
          <span>%</span>
        </span>
      </div>
    </div>
  );
}
