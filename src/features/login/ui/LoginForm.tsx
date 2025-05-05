import { Button, Checkbox, Input, Logo } from '@/shared/component';
import { GoogleIcon, TwitterIcon, FacebookIcon } from '@/shared/icons/index';
import { MediaTab } from '@/widgets';
import { useForm, SubmitHandler } from 'react-hook-form';
import { defaultFormValues, IRegisterForm } from '../types/loginForm';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from '../schema/loignShame';
import styles from './loginForm.module.scss';
import { useNavigate } from 'react-router-dom';

export function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IRegisterForm>({
    defaultValues: defaultFormValues,
    resolver: zodResolver(loginSchema),
  });

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<IRegisterForm> = () => {
    console.log(errors);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <Logo />
      <h3 className={styles.form__title}>Welcome back</h3>
      <p className={styles.form__link}>
        New here? <span onClick={() => navigate('/register')}>Create an account</span>
      </p>

      <p className={styles.form__way}>Sign in with:</p>

      <div className={styles.form__way_container}>
        <MediaTab text="Google">
          <GoogleIcon />
        </MediaTab>
        <MediaTab text="Facebook">
          <FacebookIcon />
        </MediaTab>
        <MediaTab text="Twitter">
          <TwitterIcon />
        </MediaTab>
      </div>

      <div className={styles.form__separator}>
        <span className={styles.line}></span>or<span className={styles.line}></span>
      </div>

      <div className={styles.form__container}>
        <Input labelText="Email" {...register('email')} erroText={errors.email?.message} />
        <Input
          labelText="Password"
          {...register('password')}
          erroText={errors.password?.message}
          type="password"
        />

        <div className={styles.form__footer}>
          <span>Forgot password?</span>
          <p>Remember me</p>
          <Checkbox />
        </div>
      </div>

      <Button className={styles.button}>Sign In</Button>
    </form>
  );
}
