import { useEffect, useRef } from 'react';
import styles from './EditorialMarquee.module.css';
import type { Product } from '../types/Product';

interface Props {
  products: Product[];
}

export default function EditorialMarquee({ products }: Props) {
  const stageRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const offset = useRef(0);
  const halfWidth = useRef(0);
  const dragging = useRef(false);
  const lastX = useRef(0);

  const items = products.length ? products.slice(0, 14) : [];
  const doubled = [...items, ...items]; // duplicated for seamless loop

  useEffect(() => {
    if (trackRef.current) {
      halfWidth.current = trackRef.current.scrollWidth / 2;
    }
  }, [products]);

  useEffect(() => {
    let frame: number;
    const loop = () => {
      if (!dragging.current && halfWidth.current > 0) {
        offset.current -= 0.5;
        if (offset.current <= -halfWidth.current) {
          offset.current += halfWidth.current;
        }
      }
      if (trackRef.current) {
        trackRef.current.style.transform = `translateX(${offset.current}px)`;
      }
      frame = requestAnimationFrame(loop);
    };
    frame = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const down = (x: number) => {
      dragging.current = true;
      lastX.current = x;
      stage.classList.add(styles.dragging);
    };
    const move = (x: number) => {
      if (!dragging.current || halfWidth.current === 0) return;
      offset.current += x - lastX.current;
      lastX.current = x;
      if (offset.current <= -halfWidth.current) offset.current += halfWidth.current;
      if (offset.current > 0) offset.current -= halfWidth.current;
    };
    const up = () => {
      dragging.current = false;
      stage.classList.remove(styles.dragging);
    };

    const onMouseDown = (e: MouseEvent) => down(e.clientX);
    const onMouseMove = (e: MouseEvent) => move(e.clientX);
    const onTouchStart = (e: TouchEvent) => down(e.touches[0].clientX);
    const onTouchMove = (e: TouchEvent) => move(e.touches[0].clientX);

    stage.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', up);
    stage.addEventListener('touchstart', onTouchStart, { passive: true });
    stage.addEventListener('touchmove', onTouchMove, { passive: true });
    stage.addEventListener('touchend', up);

    return () => {
      stage.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', up);
      stage.removeEventListener('touchstart', onTouchStart);
      stage.removeEventListener('touchmove', onTouchMove);
      stage.removeEventListener('touchend', up);
    };
  }, []);

  return (
    <section className={styles.section} id="gallery">
      <div className="container">
        <div className={styles.head}>
          <span className="eyebrow">The Full Edit, In Motion</span>
          <h2 className={styles.title}>Editorial Marquee</h2>
          <p className={styles.sub}>Drag the strip. Every frame, a look.</p>
        </div>
      </div>

      <div className={styles.stage} ref={stageRef}>
        <div className={styles.track} ref={trackRef}>
          {doubled.map((p, i) => (
            <div key={`${p._id}-${i}`} className={styles.item}>
              <img src={p.image} alt={p.name} loading="lazy" draggable={false} />
              <div className={styles.tag}>
                <span>{p.category}</span>
                <span>${p.price}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.hint}>◌ drag left or right</div>
    </section>
  );
}
