import { Button, DropDown, Input } from '@/shared/component';
import styles from './accauntInfo.module.scss';
import { useState, useEffect } from 'react';
import { useUpdateUserSettingsMutation } from '@/features/user/api/user.api';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/app/store/store';
import { Currency } from '@/shared/entities/entities';
import { resetAccauntInfo, UserAccauntInfo } from '@/features/user/slice/userSlice';

export default function AccountInfo() {
  const [updateUserSettings, { isLoading: isUpdating }] = useUpdateUserSettingsMutation();
  const userInfo = useSelector(
    (state: RootState): UserAccauntInfo => ({
      name: state.user.name || '',
      email: state.user.email,
      currency: state.user.currency,
      password: state.user.password,
    }),
  );
  const dispatch = useDispatch();

  const [isShowPassword, setIsShowPassword] = useState(false);
  const [currency, setCurrency] = useState(userInfo.currency || 'RUB');
  const [oldPassword, setOldPassword] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');

  // eslint-disable-next-line no-undef
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await updateUserSettings({
        email: userInfo.email,
        name: userInfo.name,
        currency: userInfo.currency,
        password: isShowPassword && password ? password : undefined,
      }).unwrap();
    } catch (error) {
      console.error('Failed to update settings:', error);
    }
  };

  const handleCancel = () => {
    setCurrency(userInfo.currency || 'RUB');
    setOldPassword('');
    setPassword('');
    setRepeatPassword('');
    setIsShowPassword(false);
  };

  return (
    <div className={styles.page}>
      <div className="container">
        <form className={styles.form} onSubmit={handleSubmit}>
          <h3 className={styles.info}>Account info</h3>
          <div className={styles.container}>
            <Input
              labelText="Name"
              value={userInfo.name}
              onChange={(e) => dispatch(resetAccauntInfo({ ...userInfo, name: e.target.value }))}
            />
            <Input
              labelText="Email"
              value={userInfo.email}
              onChange={(e) => dispatch(resetAccauntInfo({ ...userInfo, email: e.target.value }))}
            />
            <p
              className={styles.change__password}
              onClick={() => setIsShowPassword(!isShowPassword)}
            >
              Change password
            </p>
            {isShowPassword && (
              <div className={styles.wrapper}>
                <Input
                  labelText="Old Password"
                  type="password"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                />
                <Input
                  labelText="Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Input
                  labelText="Repeat password"
                  type="password"
                  value={repeatPassword}
                  onChange={(e) =>
                    dispatch(resetAccauntInfo({ ...userInfo, password: e.target.value }))
                  }
                />
              </div>
            )}
            <DropDown
              placeholder="BYN/USD/RUB"
              label="Currency"
              items={[
                { label: 'USD', id: 1 },
                { label: 'BYN', id: 2 },
                { label: 'RUB', id: 3 },
              ]}
              value={currency}
              onSelect={(item) => setCurrency(item.label as Currency)}
            />
          </div>
          <div className={styles.form__footer}>
            <Button type="submit" className={styles.button} disabled={isUpdating}>
              {isUpdating ? 'Saving...' : 'Save'}
            </Button>
            <Button
              type="button"
              className={`${styles.button} ${styles.button__cancel}`}
              onClick={handleCancel}
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
