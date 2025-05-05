import { Logo } from '@/shared/component';

import styles from './header.module.scss';
import { useNavigate } from 'react-router-dom';

export function Header() {
  const navigate = useNavigate();
  return (
    <header className={styles.header}>
      <div className="container">
        <div className={styles.header__container}>
          <Logo />

          <div className={styles.non_auth__container}>
            <div onClick={() => navigate('/login')}>Login</div>/
            <div onClick={() => navigate('/register')}>Register</div>
          </div>
        </div>
      </div>
    </header>
  );
}
