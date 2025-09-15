import React, { useEffect, useRef, useState } from 'react';

interface RevealProps extends React.HTMLAttributes<HTMLDivElement> {
  asChild?: boolean;
  threshold?: number;
  once?: boolean;
  animateClassName?: string; // additional animation utility e.g. animate-fade-up
}

/**
 * Reveal component: wraps content and adds `is-visible` class when it enters viewport.
 * Uses IntersectionObserver. Respects prefers-reduced-motion (no transform flash).
 */
export const Reveal: React.FC<RevealProps> = ({
  children,
  className = '',
  threshold = 0.15,
  once = true,
  animateClassName = 'animate-fade-up',
  ...rest
}) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setVisible(true);
      return;
    }

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setVisible(true);
            if (once) obs.disconnect();
          } else if (!once) {
            setVisible(false);
          }
        });
      },
      { threshold }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold, once]);

  return (
    <div
      ref={ref}
      className={`reveal ${visible ? `is-visible ${animateClassName}` : ''} ${className}`}
      {...rest}
    >
      {children}
    </div>
  );
};
