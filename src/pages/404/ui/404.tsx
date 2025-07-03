import { useEffect } from 'react';
import styles from './NotFoundPage.module.scss';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/shared/component';

export default function NotFoundPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      const container = document.querySelector(`.${styles.container}`);
      if (container) container.classList.add(`${styles.visible}`);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const handleGoHome = () => {
    navigate('/main');
  };

  return (
    <div className={styles.page}>
      <div className={`${styles.container}`}>
        <h1 className={styles.title}>404</h1>
        <p className={styles.message}>Oops! Страница не найдена.</p>
        <p className={styles.submessage}>
          Кажется, вы забрели в неизведанные просторы интернета. Давайте вернемся!
        </p>
        <Button className={styles.button} onClick={handleGoHome}>
          На главную
        </Button>
      </div>
    </div>
  );
}
