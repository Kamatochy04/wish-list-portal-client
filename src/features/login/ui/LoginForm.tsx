import { Button, Input, Logo } from '@/shared/component';
import { GoogleIcon, TwitterIcon, FacebookIcon } from '@/shared/icons/index';
import { MediaTab } from '@/widgets';
import { useForm, SubmitHandler } from 'react-hook-form';
import { IRegisterForm } from '../schema/loginSchema';
import styles from './loginForm.module.scss';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginSchema } from '../schema/loginSchema';
import { useLoginMutation } from '../api/login.api';
import { setCredentials } from '@/features/user/slice/userSlice';
import { zodResolver } from '@hookform/resolvers/zod';

export function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<IRegisterForm>({
    defaultValues: { email: '', password: '', terms: false },
    resolver: zodResolver(loginSchema),
  });

  const [login] = useLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<IRegisterForm> = async (data) => {
    try {
      await login({ email: data.email, password: data.password })
        .unwrap()
        .then((response) => {
          localStorage.setItem('token', response.token);
          dispatch(setCredentials(response.user));
          navigate('/main');
        });
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
        <div className={styles.form__terms}>
          <input
            type="checkbox"
            id="terms"
            {...register('terms')}
            className={styles.form__checkbox}
          />
          <label htmlFor="terms" className={styles.form__label}>
            I agree to the terms and conditions
          </label>
          {errors.terms && <p className={styles.form__error}>{errors.terms.message}</p>}
        </div>
      </div>

      <Button className={styles.button} disabled={isSubmitting} type="submit">
        {isSubmitting ? 'Loading...' : 'Sign In'}
      </Button>
    </form>
  );
}
