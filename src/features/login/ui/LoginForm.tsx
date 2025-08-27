import { Button, Input, Logo } from '@/shared/component';
import { GoogleIcon, TwitterIcon, FacebookIcon } from '@/shared/icons/index';
import { MediaTab } from '@/widgets';
import { useForm, SubmitHandler } from 'react-hook-form';
import { defaultFormValues, IRegisterForm } from '../types/loginForm';
import styles from './loginForm.module.scss';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginSchema } from '../schema/loignShame';
import { useLoginMutation } from '../api/login.api';
import { setCredentials } from '@/features/user/slice/userSlice';
import { zodResolver } from '@hookform/resolvers/zod';

export function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<IRegisterForm>({
    defaultValues: defaultFormValues,
    resolver: zodResolver(loginSchema),
  });

  const [login, { isLoading }] = useLoginMutation();

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<IRegisterForm> = async (data) => {
    try {
      login({ email: data.email, password: data.password })
        .unwrap()
        .then(() => navigate('/main'));
    } catch (error: any) {
      setError('root', {
        type: 'manual',
        message: error.data?.error || 'Failed to login. Please check your credentials.',
      });
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <Logo />
      <h3 className={styles.form__title}>Welcome back</h3>
      <p className={styles.form__link}>
        New here? <span onClick={() => navigate('/register')}>Create an account</span>
      </p>

      {errors.root && <p className={styles.form__error}>{errors.root.message}</p>}

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
      </div>

      <Button className={styles.button} disabled={isLoading} type="submit">
        Sign In
      </Button>
    </form>
  );
}
