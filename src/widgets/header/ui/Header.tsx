import { Logo } from '@/shared/component';
import styles from './header.module.scss';
import { useNavigate } from 'react-router-dom';
import { UserIcon } from '@/shared/icons/UserIcon';
import { useEffect, useState } from 'react';

export function Header() {
  const navigate = useNavigate();
  const [isAuth, setIsAuth] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      setIsAuth(true);
    } else {
      setIsAuth(false);
    }
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className={styles.header}>
      <div className="container">
        <div className={styles.header__container}>
          <Logo />
          <div className={styles.menuToggle} onClick={toggleMenu}>
            <span></span>
            <span></span>
            <span></span>
          </div>
          {isAuth ? (
            <aside
              className={`${styles.auth__container} ${isMenuOpen ? styles.auth__container_open : ''}`}
            >
              <div className={styles.auth__content} onClick={() => navigate('/accaunt-info')}>
                <p>Settings</p>
                <div className={styles.userName}>
                  <UserIcon />
                  <p>User name</p>
                </div>
                <p className={styles.logout}>Logout</p>
              </div>
            </aside>
          ) : (
            <aside
              className={`${styles.non_auth__container} ${
                isMenuOpen ? styles.non_auth__container_open : ''
              }`}
            >
              <div onClick={() => navigate('/login')}>Login</div>/
              <div onClick={() => navigate('/register')}>Register</div>
            </aside>
          )}
        </div>
      </div>
    </header>
  );
}
