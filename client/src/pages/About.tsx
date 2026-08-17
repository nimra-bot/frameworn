import { Link } from 'react-router-dom';
import styles from './About.module.css';

export default function About() {
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <span className={styles.eyebrow}>The Frameworn Story</span>

        <h1>
          Style that
          <br />
          feels like you.
        </h1>

        <p>
          Frameworn is a modern fashion store built around clean design,
          effortless style, and pieces made for everyday confidence.
        </p>
      </section>

      <section className={styles.story}>
        <div className={styles.label}>01 — ABOUT US</div>

        <div className={styles.content}>
          <h2>Fashion without the noise.</h2>

          <p>
            We believe great style does not have to be complicated. Frameworn
            brings together carefully selected fashion pieces designed for
            people who appreciate simplicity, quality, and individuality.
          </p>

          <p>
            From everyday essentials and outerwear to accessories and
            statement pieces, our collection is built around a modern
            monochrome aesthetic that feels timeless rather than temporary.
          </p>

          <p>
            Every piece has a purpose. We focus on creating a collection that
            is easy to explore, easy to wear, and easy to make your own.
          </p>
        </div>
      </section>

      <section className={styles.philosophy}>
        <span className={styles.eyebrow}>Our Philosophy</span>

        <h2>
          Less noise.
          <br />
          More style.
        </h2>

        <p>
          Frameworn is about expressing yourself without following every
          trend. Clean silhouettes, versatile pieces, and confident choices
          are at the heart of what we do.
        </p>
      </section>

      <section className={styles.cta}>
        <span className={styles.eyebrow}>Explore the collection</span>

        <h2>Find your frame.</h2>

        <Link to="/#shop" className={styles.button}>
          Shop Collection
        </Link>
      </section>
    </main>
  );
}

