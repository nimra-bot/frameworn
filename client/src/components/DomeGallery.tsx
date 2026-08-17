import { useEffect, useRef } from 'react';
import styles from './DomeGallery.module.css';
import type { Product } from '../types/Product';

interface Props {
  products: Product[];
}

// Distributes N points evenly on a sphere surface (Fibonacci sphere)
function spherePoints(count: number) {
  const points: { rx: number; ry: number }[] = [];
  const goldenAngle = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2; // 1 -> -1
    const theta = goldenAngle * i;
    const radiusAtY = Math.sqrt(1 - y * y);
    const x = Math.cos(theta) * radiusAtY;
    const z = Math.sin(theta) * radiusAtY;
    const ry = Math.atan2(x, z) * (180 / Math.PI);
    const rx = -Math.asin(y) * (180 / Math.PI);
    points.push({ rx, ry });
  }
  return points;
}

export default function DomeGallery({ products }: Props) {
  const stageRef = useRef<HTMLDivElement>(null);
  const domeRef = useRef<HTMLDivElement>(null);
  const rotation = useRef({ x: -8, y: 0 });
  const dragging = useRef(false);
  const lastPointer = useRef({ x: 0, y: 0 });
  const autoRotate = useRef(true);

  useEffect(() => {
    let frame: number;
    const loop = () => {
      if (autoRotate.current && !dragging.current) {
        rotation.current.y += 0.08;
      }
      if (domeRef.current) {
        domeRef.current.style.transform = `rotateX(${rotation.current.x}deg) rotateY(${rotation.current.y}deg)`;
      }
      frame = requestAnimationFrame(loop);
    };
    frame = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const down = (x: number, y: number) => {
      dragging.current = true;
      autoRotate.current = false;
      lastPointer.current = { x, y };
      stage.classList.add(styles.dragging);
    };
    const move = (x: number, y: number) => {
      if (!dragging.current) return;
      const dx = x - lastPointer.current.x;
      const dy = y - lastPointer.current.y;
      rotation.current.y += dx * 0.35;
      rotation.current.x = Math.max(-70, Math.min(70, rotation.current.x - dy * 0.35));
      lastPointer.current = { x, y };
    };
    const up = () => {
      dragging.current = false;
      stage.classList.remove(styles.dragging);
      setTimeout(() => { autoRotate.current = true; }, 1400);
    };

    const onMouseDown = (e: MouseEvent) => down(e.clientX, e.clientY);
    const onMouseMove = (e: MouseEvent) => move(e.clientX, e.clientY);
    const onTouchStart = (e: TouchEvent) => down(e.touches[0].clientX, e.touches[0].clientY);
    const onTouchMove = (e: TouchEvent) => move(e.touches[0].clientX, e.touches[0].clientY);

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

  const items = products.slice(0, 18);
  const points = spherePoints(items.length || 1);
  const radius = 230;

  return (
    <section className={styles.section} id="gallery">
      <div className="container">
        <div className={styles.head}>
          <span className="eyebrow">The Collection, In The Round</span>
          <h2 className={styles.title}>Dome Gallery</h2>
          <p className={styles.sub}>Drag to rotate. Every angle, a new look.</p>
        </div>
      </div>

      <div className={styles.stage} ref={stageRef}>
        <div className={styles.dome} ref={domeRef}>
          {items.map((p, i) => {
            const pt = points[i];
            return (
              <div
                key={p._id || i}
                className={styles.item}
                style={{ transform: `rotateY(${pt.ry}deg) rotateX(${pt.rx}deg) translateZ(${radius}px)` }}
              >
                <img src={p.image} alt={p.name} loading="lazy" />
              </div>
            );
          })}
        </div>
      </div>
      <div className={styles.hint}>◌ drag anywhere on the sphere</div>
    </section>
  );
}
