import { Button, DropDown, Input, TextArea } from '@/shared/component';
import styles from './gift.module.scss';
// import { OnLoadImg } from '@/shared/icons';
import { useState, ChangeEvent, FormEvent, FC, useEffect } from 'react';
import { DeleteOutletIcon } from '@/shared/icons/DeleteoutletIcon';
import { DeletePopup } from '@/widgets';
import useAos from '@/shared/hooks/AOS';
import { useUpdateMutation, useGetByIdQuery, useCreateGiftMutation } from '../api/gift.api';

type Props = {
  onClouse: () => void;
  giftId?: number;
};

export const GiftForm: FC<Props> = ({ onClouse, giftId }) => {
  useAos();
  const [createGift, { isLoading: isCreating }] = useCreateGiftMutation();
  const [updateGiftMutation, { isLoading: isUpdating }] = useUpdateMutation();
  const { data: giftData, isLoading: isLoadingGift } = useGetByIdQuery(giftId!, {
    skip: !giftId,
  });

  const [image, setImage] = useState<File | null>(null);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState<number | undefined>(undefined);
  const [currency, setCurrency] = useState<'USD' | 'BYN' | 'RUB' | undefined>(undefined);
  const [externalLink, setExternalLink] = useState('');

  useEffect(() => {
    if (giftData && giftId) {
      setName(giftData.name);
      setDescription(giftData.description || '');
      setPrice(giftData.price || undefined);
      setCurrency(giftData.currency || undefined);
      setExternalLink(giftData.externalLink || '');
    }
  }, [giftData, giftId]);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && ['image/jpeg', 'image/png'].includes(file.type)) {
      setImage(file);
    }
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    if (description) formData.append('description', description);
    if (price) formData.append('price', price.toString());
    if (currency) formData.append('currency', currency);
    if (externalLink) formData.append('externalLink', externalLink);
    if (image) formData.append('image', image);

    for (const [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }

    try {
      if (giftId) {
        updateGiftMutation({ id: giftId, formData }).unwrap();
      } else {
        await createGift(formData).unwrap();
      }
      onClouse();
    } catch (error) {
      console.error(`Failed to ${giftId ? 'update' : 'create'} gift:`, error);
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
            giftTitle={name}
            onClouse={clousePopup}
            onClousePopup={() => setIsDeletePopupOpen(false)}
          />
        </div>
      )}
      <form className={styles.form} onSubmit={onSubmit} data-aos="fade-up">
        <div className={styles.form__block}>
          <Input
            labelText="Name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextArea
            label="Description"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={styles.textAreat}
          />
          <Input
            labelText="Link"
            name="externalLink"
            value={externalLink}
            onChange={(e) => setExternalLink(e.target.value)}
          />
          <div className={styles.form__footer}>
            <Input
              labelText="Price"
              name="price"
              type="number"
              value={price !== undefined ? price : ''}
              onChange={(e) => setPrice(e.target.value ? parseInt(e.target.value) : undefined)}
            />
            <DropDown
              label="Currency"
              placeholder={'USD/BYN/RUB'}
              items={[
                { id: 1, label: 'USD' },
                { id: 2, label: 'BYN' },
                { id: 3, label: 'RUB' },
              ]}
              onSelect={(item) => setCurrency(item.label as 'USD' | 'BYN' | 'RUB')}
              value={currency}
            />
          </div>

          <div className={styles.form__header}>
            <Button type="submit" disabled={isCreating || isUpdating || isLoadingGift}>
              {isCreating || isUpdating ? 'Saving...' : 'Save'}
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
                : giftData?.imagePath
                  ? { backgroundImage: `url(${giftData.imagePath})` }
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
            {/* <OnLoadImg /> */}
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
