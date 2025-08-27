import { LoginForm } from '@/features';
import styles from './loginPage.module.scss';
import { Logo } from '@/shared/component';

export default function SendEmailPage() {
  return (
    <div className={styles.page}>
      <div className="container">
        <div className={styles.page__container}>
          <div className={styles.text}>
            <Logo />
          </div>
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
