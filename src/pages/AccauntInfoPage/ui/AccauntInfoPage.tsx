import { Button, DropDown, Input } from '@/shared/component';
import styles from './accauntInfo.module.scss';
import { useState } from 'react';

export default function AccauntInfo() {
  const [isShowPassword, setIsShowPassword] = useState(false);
  return (
    <div className={styles.page}>
      <div className="container">
        <form className={styles.form}>
          <h3 className={styles.info}>Account info</h3>
          <div className={styles.container}>
            <Input labelText="Name" />
            <Input labelText="Email" />

            <p
              className={styles.change__password}
              onClick={() => setIsShowPassword(!isShowPassword)}
            >
              Change password
            </p>
            {isShowPassword ? (
              <div className={styles.wrapper}>
                <Input labelText="Old Password" />
                <Input labelText="Password" />
                <Input labelText="Repeat password " />
              </div>
            ) : null}

            <DropDown
              placeholder={'BYN/USD/RUR'}
              label="Currency"
              items={[
                { label: 'USD', id: 1 },
                { label: 'BYN', id: 2 },
                { label: 'RUR', id: 3 },
              ]}
              onSelect={() => {}}
            />
          </div>

          <div className={styles.form__footer}>
            <Button className={`${styles.button}`}>Save</Button>
            <Button className={`${styles.button} ${styles.button__cancel}`}>Cancel</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
