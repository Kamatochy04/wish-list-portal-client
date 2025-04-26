import { RegisterForm } from '@/features';
import styles from './registerPage.module.scss';
import { Logo } from '@/shared/component';

export default function RegisterPage() {
  return (
    <div className={styles.page}>
      <div className="container">
        <div className={styles.page__container}>
          <div className={styles.text}>
            <Logo />
          </div>
          <RegisterForm />
        </div>
      </div>
    </div>
  );
}
