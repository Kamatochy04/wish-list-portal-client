import { Button, DatePickerComponent, Input, TextArea } from '@/shared/component';
import styles from './event.module.scss';
import { OnLoadImg } from '@/shared/icons';
import { useCreateMutation } from '../api/event.api';
import { useState, ChangeEvent, FormEvent, FC, useEffect } from 'react';
import { DeleteOutletIcon } from '@/shared/icons/DeleteoutletIcon';
import { CopyLink } from '@/shared/icons/CopyLink';
import { DeletePopup } from '@/widgets';

type Props = {
  onClouse: () => void;
};

export const EventForm: FC<Props> = ({ onClouse }) => {
  const [createEvent, { isLoading }] = useCreateMutation();
  const [image, setImage] = useState<File | null>(null);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [eventDate, setEventDate] = useState<Date | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      const form = document.querySelector(`.${styles.form}`);
      if (form) form.classList.add(`${styles.visible}`);
    }, 100); // Небольшая задержка для синхронизации

    return () => clearTimeout(timer); // Очистка таймера
  }, []);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && ['image/jpeg', 'image/png'].includes(file.type)) {
      setImage(file);
    }
  };

  const handleDateChange = (date: Date | null) => {
    setEventDate(date);
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    if (eventDate) {
      formData.append('eventDate', eventDate.toISOString());
    }
    if (image) {
      formData.append('image', image);
    }

    try {
      await createEvent(formData).unwrap();
      onClouse();
    } catch (error) {
      console.error('Failed to create event:', error);
    }
  };

  const clousePopup = () => {
    setIsDeletePopupOpen(false);
    onClouse();
  };

  return (
    <>
      {isDeletePopupOpen && (
        <div className={styles.modal}>
          <DeletePopup
            eventTitle={title}
            giftTitle={''}
            onClouse={clousePopup}
            onClousePopup={() => setIsDeletePopupOpen(false)}
          />
        </div>
      )}
      <form className={`${styles.form}`} onSubmit={onSubmit}>
        <div className={styles.form__block}>
          <Input
            labelText="Event Title"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <DatePickerComponent name="date" value={eventDate} onChange={handleDateChange} />
          <TextArea
            label="Event Description"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={styles.textAreat}
          />
          <Input
            labelText="Share"
            name="share"
            value="http://siteurl/shorten_url"
            disabled
            className={styles.input}
            rightIcon={<CopyLink />}
          />
          <div className={styles.form__header}>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Saving...' : 'Save'}
            </Button>
            <Button variant="primary" className={styles.button__cancel} onClick={onClouse}>
              Cancel
            </Button>
          </div>
        </div>
        <div className={styles.form__img}>
          <div
            className={styles.form__img_block}
            style={
              image
                ? { backgroundImage: `url(${URL.createObjectURL(image)})` }
                : { background: '#c4c4c4' }
            }
          ></div>
          <label className={styles.button}>
            <input
              type="file"
              accept="image/jpeg,image/png"
              className={styles.fileInput}
              onChange={handleImageChange}
            />
            <OnLoadImg />
          </label>
          <div className={styles.form__delete} onClick={() => setIsDeletePopupOpen(true)}>
            <DeleteOutletIcon />
            <p>Delete</p>
          </div>
        </div>
      </form>
    </>
  );
};
