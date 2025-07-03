import { Button, DropDown, Input, TextArea } from '@/shared/component';
import styles from './gift.module.scss';
import { OnLoadImg } from '@/shared/icons';
import { useState, ChangeEvent, FormEvent, FC } from 'react';
import { DeleteOutletIcon } from '@/shared/icons/DeleteoutletIcon';
import { DeletePopup } from '@/widgets';
import useAos from '@/shared/hooks/AOS';

type Props = {
  onClouse: () => void;
};

export const GiftForm: FC<Props> = ({ onClouse }) => {
  useAos();

  const [image, setImage] = useState<File | null>(null);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && ['image/jpeg', 'image/png'].includes(file.type)) {
      setImage(file);
    }
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('title', event.currentTarget.title.value);
    formData.append('description', event.currentTarget.description.value);
    formData.append('date', event.currentTarget.date.value || '');
    if (image) {
      formData.append('image', image);
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
            eventTitle={''}
            giftTitle={''}
            onClouse={() => clousePopup()}
            onClousePopup={() => setIsDeletePopupOpen(false)}
          />
        </div>
      )}
      <form className={styles.form} onSubmit={onSubmit} data-aos="fade-up">
        <div className={styles.form__block}>
          <Input labelText="Name" name="Name" />
          <TextArea label="Description" name="description" className={styles.textAreat} />
          <Input labelText="Link" name="Link" />
          <div className={styles.form__footer}>
            <Input labelText="Price" name="Price" type="number" />
            <DropDown
              label="Currency"
              placeholder={'USD/BYN/RUB'}
              items={[
                { id: 1, label: 'USD' },
                { id: 2, label: 'BYN' },
                { id: 3, label: 'RUB' },
              ]}
              onSelect={() => {}}
            />
          </div>

          <div className={styles.form__header}>
            <Button type="submit">Save</Button>
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
