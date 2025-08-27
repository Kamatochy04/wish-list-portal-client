export enum Currency {
  USD = 'USD',
  BYN = 'BYN',
  RUB = 'RUB',
}

export interface User {
  id: number;
  email: string;
  password: string;
  name: string;
  currency: Currency;
  createdAt: Date;
  updatedAt: Date;
}

export interface Event {
  id: number;
  title: string;
  userId: number;
  description?: string | null;
  eventDate?: Date | null;
  imagePath?: string | null;
  createdAt: Date;
  updatedAt: Date;
  publicUrl?: string | null;
  publicUrlExpiration?: Date | null;
  user: User;
  gifts: Gift[];
}

export interface Gift {
  id: number;
  name: string;
  eventId?: number | null;
  userId: number;
  description?: string | null;
  imagePath?: string | null;
  price?: number | null;
  currency?: Currency | null;
  externalLink?: string | null;
  createdAt: Date;
  updatedAt: Date;
  isReserved: boolean;
  event?: Event | null;
  user: User;
  reservations: GiftReservation[];
}

export interface GiftReservation {
  id: number;
  giftId: number;
  userId: number;
  name?: string | null;
  email: string;
  code: string;
  isConfirmed: boolean;
  createdAt: Date;
  gift: Gift;
  user: User;
}
