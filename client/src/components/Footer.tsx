import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer} id="contact">
      <div className="container">
        <div className={styles.top}>
          <div>
            <div className={styles.logo}>Frameworn</div>

            <p className={styles.tag}>
              Iconic fashion, framed in monochrome. A curated edit for those
              who dress with intent.
            </p>
          </div>

          <div className={styles.cols}>

            {/* SHOP */}
            <div className={styles.col}>
              <h4>Shop</h4>

              <a href="/#shop">New Arrivals</a>
              <a href="/#shop">Outerwear</a>
              <a href="/#shop">Accessories</a>
            </div>

            {/* STUDIO */}
            <div className={styles.col}>
              <h4>Studio</h4>

              <a href="/about">About</a>
              <a href="/#gallery">Gallery</a>
              <a href="#contact">Contact</a>
            </div>

            {/* CONNECT */}
            <div className={styles.col}>
              <h4>Connect</h4>

              <a
                href="https://www.instagram.com/nimra11689"
                target="_blank"
                rel="noopener noreferrer"
              >
                Instagram
              </a>

              <a
                href="https://pin.it/74YEe1BOT"
                target="_blank"
                rel="noopener noreferrer"
              >
                Pinterest
              </a>

              <a href="mailto:nimrakhaliq77@gmail.com">
                Gmail
              </a>
            </div>

          </div>
        </div>

        <div className={styles.bottom}>
          <span>
            © {new Date().getFullYear()} Frameworn. All rights reserved.
          </span>

          <span>
            Built with React, TypeScript &amp; MongoDB
          </span>
        </div>
      </div>
    </footer>
  );
}
