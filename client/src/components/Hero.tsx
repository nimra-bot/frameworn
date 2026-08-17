import styles from './Hero.module.css';

export default function Hero() {
  const today = new Date().toLocaleDateString('en-US', { day: '2-digit', month: 'long', year: 'numeric' });

  return (
    <section id="home" className={styles.hero}>
      <img className={styles.bg} src="https://picsum.photos/seed/frameworn-hero/1600/2000?grayscale" alt="Editorial fashion model" />
      <div className={styles.overlay} />

      <div className={styles.topRow}>
        <div className={styles.date}>{today}</div>
      </div>

      <div className={styles.content}>
        <p className={styles.caption}>
          Hero section design and idea reflecting minimal, editorial fashion with a monochrome identity.
        </p>
        <h1 className={styles.headline}>Iconic<br />Fashion</h1>
      </div>

      <div className={styles.scrollHint}>Scroll to explore</div>
    </section>
  );
}
