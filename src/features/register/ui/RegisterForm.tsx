import { Button, Checkbox, Input, Logo } from '@/shared/component';

import { GoogleIcon, TwitterIcon, FacebookIcon } from '@/shared/icons/index';
import { MediaTab } from '@/widgets';

import { useForm, SubmitHandler } from 'react-hook-form';

import { defaultFormValues, IRegisterForm } from '../types/registerForm';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema } from '../schema/registerShame';
import { useNavigate } from 'react-router-dom';

import styles from './registerForm.module.scss';

export function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IRegisterForm>({
    defaultValues: defaultFormValues,
    resolver: zodResolver(registerSchema),
  });

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<IRegisterForm> = () => {
    console.log(errors);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <Logo />
      <h3 className={styles.form__title}>Join to us</h3>
      <p className={styles.form__link}>
        Already have an account? <span onClick={() => navigate('/login')}>Login</span>
      </p>

      <p className={styles.form__way}>Registed with:</p>

      <div className={styles.form__way_container}>
        <MediaTab text={'Google'}>
          <GoogleIcon />
        </MediaTab>
        <MediaTab text={'Facebook'}>
          <FacebookIcon />
        </MediaTab>
        <MediaTab text={'Twitter'}>
          <TwitterIcon />
        </MediaTab>
      </div>

      <div className={styles.form__separator}>
        <span className={styles.line}></span>or<span className={styles.line}></span>
      </div>

      <div className={styles.form__container}>
        <Input labelText="Name" {...register('name')} erroText={errors.name?.message} />
        <Input labelText="Email" {...register('email')} erroText={errors.email?.message} />
        <Input
          labelText="Password"
          {...register('password')}
          erroText={errors.password?.message}
          type="password"
        />
        <Input
          labelText="Repeat password "
          {...register('repeat_password')}
          erroText={errors.repeat_password?.message}
          type="password"
        />
        <span className={styles.form__footer}>
          <p>
            I accept the <span>term of service</span>
          </p>
          <Checkbox />
        </span>
      </div>

      <Button className={styles.button}>Register</Button>
    </form>
  );
}
