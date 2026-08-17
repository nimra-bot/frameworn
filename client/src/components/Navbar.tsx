import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

interface Props {
  onCartClick: () => void;
}

export default function Navbar({ onCartClick }: Props) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const { user, logout } = useAuth();
  const { count } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);

    window.addEventListener('scroll', onScroll);

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  const handleCart = () => {
    closeMenu();
    onCartClick();
  };

  const handleLogout = () => {
    logout();
    closeMenu();
  };

  return (
    <>
      <header
        className={`${styles.nav} ${
          scrolled ? styles.scrolled : ''
        }`}
      >
        <div className={styles.inner}>

          <Link to="/" className={styles.logo} onClick={closeMenu}>
            Frameworn
          </Link>

          <nav className={styles.links}>
            <a href="/#home">Home</a>
            <a href="/#gallery">Gallery</a>
            <a href="/#shop">Shop</a>
            <a href="/#contact">Contact</a>
          </nav>

          <div className={styles.actions}>

            {user ? (
              <>
                <span className={styles.userName}>
                  Hi, {user.name.split(' ')[0]}
                </span>

                <button
                  className={styles.textBtn}
                  onClick={handleLogout}
                >
                  Log out
                </button>
              </>
            ) : (
              <Link to="/login" className={styles.textBtn}>
                Log in
              </Link>
            )}

            <button
              className="btn-outline"
              onClick={onCartClick}
            >
              Bag ({count})
            </button>

            <button
              className={`${styles.hamburger} ${
                menuOpen ? styles.menuActive : ''
              }`}
              aria-label="Menu"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? '×' : '☰'}
            </button>

          </div>
        </div>
      </header>

      {/* Hamburger Menu */}
      <div
        className={`${styles.menuOverlay} ${
          menuOpen ? styles.overlayShow : ''
        }`}
        onClick={closeMenu}
      />

      <aside
        className={`${styles.menu} ${
          menuOpen ? styles.menuShow : ''
        }`}
      >

        <div className={styles.menuHead}>
          <span>Menu</span>

          <button
            className={styles.closeMenu}
            onClick={closeMenu}
          >
            ×
          </button>
        </div>

        <div className={styles.menuLinks}>

          <a href="/#home" onClick={closeMenu}>
            Home
          </a>

          <a href="/#shop" onClick={closeMenu}>
            Shop
          </a>

          <a href="/#gallery" onClick={closeMenu}>
            Gallery
          </a>

          <a href="/#contact" onClick={closeMenu}>
            Contact
          </a>

          <button onClick={handleCart}>
            Cart <span>({count})</span>
          </button>

          {user && (
            <Link to="/orders" onClick={closeMenu}>
              Order History
            </Link>
          )}

          {user ? (
            <button onClick={handleLogout}>
              Log out
            </button>
          ) : (
            <>
              <Link to="/login" onClick={closeMenu}>
                Log in
              </Link>

              <Link to="/signup" onClick={closeMenu}>
                Create Account
              </Link>
            </>
          )}

        </div>

        <div className={styles.menuBottom}>
          <span>Frameworn</span>
          <small>Wear your own story.</small>
        </div>

      </aside>
    </>
  );
}