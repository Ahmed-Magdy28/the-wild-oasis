import type { Dispatch, SetStateAction } from 'react';

export type BookingType = {
   id?: number;
   created_at: string;
   startDate: string;
   endDate: string;
   numNights: number;
   numGuests: number;
   totalPrice: number;
   status: 'unconfirmed' | 'checked-in' | 'checked-out';
   cabinId?: number;
   cabinPrice?: number;
   extrasPrice?: number;
   guestId?: number;
   hasBreakfast?: boolean;
   observations?: string;
   isPaid?: boolean;
   guests: {
      fullName: string;
      email: string;
      country?: string;
      countryFlag?: string;
      nationalID?: string;
   };
   cabins: { name: string };
};

export type BookingMutationType = Omit<BookingType, 'guests' | 'cabins'>;

export type BookingsType = BookingType[];

export type CabinType = {
   id?: number;
   name: string;
   maxCapacity: number;
   regularPrice: number;
   discount: number;
   image: FileList | string;
   description: string;
};

export type CabinsType = CabinType[];

export type GuestType = {
   id?: number;
   fullName: string;
   email: string;
   nationality: string;
   nationalID: string;
   countryFlag: string;
   phoneNumber?: string;
};
export type GuestsType = GuestType[];

export type SettingsType = {
   minBookingLength: number;
   maxBookingLength: number;
   maxGuestsPerBooking: number;
   breakfastPrice: number;
};

export type settingKeyType =
   | 'minBookingLength'
   | 'maxBookingLength'
   | 'maxGuestsPerBooking'
   | 'breakfastPrice';

export type ModalContextType = {
   close: () => void;
   open: Dispatch<SetStateAction<string>>;
   openName: string;
};

export interface MenuContextType {
   openId: string;
   close: () => void;
   open: (id: string) => void;
   position: { x: number; y: number } | undefined;
   setPosition: React.Dispatch<
      React.SetStateAction<{ x: number; y: number } | undefined>
   >;
}
