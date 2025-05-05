import { Button, DatePicker, Input, TextArea } from '@/shared/component';
import styles from './event.module.scss';

export const EventForm = () => {
  return (
    <form>
      <div className={styles.form__block}>
        <Input labelText="Event Title" />
        <DatePicker label="label" />
        <TextArea label="Event Description" />
        <div className={styles.form__header}>
          <Button>Save</Button>
          <Button variant="primary" className={styles.button__cancel}>
            Cancel
          </Button>
        </div>
      </div>
    </form>
  );
};
