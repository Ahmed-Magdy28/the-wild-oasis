import { useEffect } from 'react';
import { differenceInCalendarDays } from 'date-fns';
import { useForm, useWatch } from 'react-hook-form';
import Form from '../../ui/Form';
import type { BookingMutationType, BookingType } from '../../types';
import Spinner from '../../ui/Spinner';
import FormRow from '../../ui/FormRow';
import Button from '../../ui/Button';
import useCreateBooking from './hooks/useCreateBookings';
import useUpdateBooking from './hooks/useUpdateBookings';
import useGetGuests from '../guests/hooks/useGetGuest';
import useGetCabins from '../cabins/hooks/useGetCabins';
import useSettings from '../settings/hooks/useSettings';

function getBookingDefaults(
   bookingToEdit?: BookingType,
): Partial<BookingMutationType> {
   return {
      startDate: bookingToEdit?.startDate ?? '',
      endDate: bookingToEdit?.endDate ?? '',
      numNights: bookingToEdit?.numNights ?? 0,
      numGuests: bookingToEdit?.numGuests ?? 1,
      totalPrice: bookingToEdit?.totalPrice ?? 0,
      status: bookingToEdit?.status ?? 'unconfirmed',
      cabinId: bookingToEdit?.cabinId,
      cabinPrice: bookingToEdit?.cabinPrice ?? 0,
      extrasPrice: bookingToEdit?.extrasPrice ?? 0,
      guestId: bookingToEdit?.guestId,
      hasBreakfast: bookingToEdit?.hasBreakfast ?? false,
      observations: bookingToEdit?.observations ?? '',
      isPaid: bookingToEdit?.isPaid ?? false,
   };
}

export default function CreateBookingForm({
   bookingToEdit,
   onCloseModal,
}: {
   bookingToEdit?: BookingType;
   onCloseModal?: () => void;
}) {
   const editId = bookingToEdit?.id;
   const isEditSession = Boolean(editId);
   const { createBooking, errorCreating, isCreating } = useCreateBooking();
   const { updateBooking, isEditing } = useUpdateBooking();
   const { guests, isGettingGuests } = useGetGuests();
   const { cabins, isGettingCabins } = useGetCabins();
   const { settings, isGettingSettings } = useSettings();
   const { register, handleSubmit, reset, formState, setValue, control } =
      useForm<BookingMutationType>({
         defaultValues: getBookingDefaults(bookingToEdit),
      });

   const selectedCabinId = useWatch({ control, name: 'cabinId' });
   const startDate = useWatch({ control, name: 'startDate' });
   const endDate = useWatch({ control, name: 'endDate' });
   const numGuests = useWatch({ control, name: 'numGuests' }) || 1;
   const hasBreakfast = useWatch({ control, name: 'hasBreakfast' });

   const selectedCabin = cabins?.find(
      (cabin) => cabin.id === Number(selectedCabinId),
   );
   const numNights =
      startDate && endDate
         ? Math.max(
              differenceInCalendarDays(new Date(endDate), new Date(startDate)),
              0,
           )
         : 0;
   const cabinPricePerNight = Math.max(
      (selectedCabin?.regularPrice ?? 0) - (selectedCabin?.discount ?? 0),
      0,
   );
   const cabinPrice = cabinPricePerNight * numNights;
   const extrasPrice =
      hasBreakfast && settings
         ? settings.breakfastPrice * numGuests * numNights
         : 0;
   const totalPrice = cabinPrice + extrasPrice;

   useEffect(() => {
      setValue('numNights', numNights);
      setValue('cabinPrice', cabinPrice);
      setValue('extrasPrice', extrasPrice);
      setValue('totalPrice', totalPrice);
   }, [cabinPrice, extrasPrice, numNights, setValue, totalPrice]);

   const isLoading =
      isEditing ||
      isCreating ||
      isGettingGuests ||
      isGettingCabins ||
      isGettingSettings;

   if (errorCreating) return <div>Failed to create booking</div>;
   if (isLoading) return <Spinner />;

   const { errors } = formState;

   function onSubmit(booking: BookingMutationType) {
      if (isEditSession)
         updateBooking(
            { booking, id: editId! },
            {
               onSuccess: () => {
                  reset();
                  onCloseModal?.();
               },
            },
         );
      else
         createBooking(
            { booking },
            {
               onSuccess: () => {
                  reset(getBookingDefaults());
                  onCloseModal?.();
               },
            },
         );
   }

   return (
      <Form
         onSubmit={handleSubmit(onSubmit)}
         type={onCloseModal ? 'modal' : 'regular'}
      >
         <FormRow label="Guest" error={errors?.guestId?.message}>
            <select
               id="guestId"
               disabled={isLoading}
               {...register('guestId', {
                  required: 'Guest is required',
                  valueAsNumber: true,
               })}
            >
               <option value="">Select guest...</option>
               {guests?.map((guest) => (
                  <option key={guest.id} value={guest.id}>
                     {guest.fullName}
                  </option>
               ))}
            </select>
         </FormRow>

         <FormRow label="Cabin" error={errors?.cabinId?.message}>
            <select
               id="cabinId"
               disabled={isLoading}
               {...register('cabinId', {
                  required: 'Cabin is required',
                  valueAsNumber: true,
               })}
            >
               <option value="">Select cabin...</option>
               {cabins?.map((cabin) => (
                  <option key={cabin.id} value={cabin.id}>
                     {cabin.name}
                  </option>
               ))}
            </select>
         </FormRow>

         <FormRow label="Start date" error={errors?.startDate?.message}>
            <input
               type="date"
               id="startDate"
               disabled={isLoading}
               {...register('startDate', {
                  required: 'Start date is required',
               })}
            />
         </FormRow>

         <FormRow label="End date" error={errors?.endDate?.message}>
            <input
               type="date"
               id="endDate"
               disabled={isLoading}
               {...register('endDate', {
                  required: 'End date is required',
                  validate: (value) =>
                     !startDate ||
                     new Date(value) > new Date(startDate) ||
                     'End date must be after the start date',
               })}
            />
         </FormRow>

         <FormRow label="Guests count" error={errors?.numGuests?.message}>
            <input
               type="number"
               id="numGuests"
               min={1}
               max={selectedCabin?.maxCapacity}
               disabled={isLoading}
               {...register('numGuests', {
                  required: 'Number of guests is required',
                  valueAsNumber: true,
                  min: {
                     value: 1,
                     message: 'At least 1 guest is required',
                  },
                  validate: (value) =>
                     !selectedCabin ||
                     value <= selectedCabin.maxCapacity ||
                     `Cabin capacity is ${selectedCabin.maxCapacity}`,
               })}
            />
         </FormRow>

         <FormRow label="Status" error={errors?.status?.message}>
            <select
               id="status"
               disabled={isLoading}
               {...register('status', { required: 'Status is required' })}
            >
               <option value="unconfirmed">Unconfirmed</option>
               <option value="checked-in">Checked in</option>
               <option value="checked-out">Checked out</option>
            </select>
         </FormRow>

         <FormRow label="Number of nights" error={errors?.numNights?.message}>
            <input
               type="number"
               id="numNights"
               readOnly
               disabled={isLoading}
               {...register('numNights', { valueAsNumber: true })}
            />
         </FormRow>

         <FormRow label="Cabin price" error={errors?.cabinPrice?.message}>
            <input
               type="number"
               id="cabinPrice"
               readOnly
               disabled={isLoading}
               {...register('cabinPrice', { valueAsNumber: true })}
            />
         </FormRow>

         <FormRow label="Breakfast" error={errors?.hasBreakfast?.message}>
            <input
               type="checkbox"
               id="hasBreakfast"
               disabled={isLoading}
               {...register('hasBreakfast')}
            />
         </FormRow>

         <FormRow label="Extras price" error={errors?.extrasPrice?.message}>
            <input
               type="number"
               id="extrasPrice"
               readOnly
               disabled={isLoading}
               {...register('extrasPrice', { valueAsNumber: true })}
            />
         </FormRow>

         <FormRow label="Total price" error={errors?.totalPrice?.message}>
            <input
               type="number"
               id="totalPrice"
               readOnly
               disabled={isLoading}
               {...register('totalPrice', { valueAsNumber: true })}
            />
         </FormRow>

         <FormRow label="Paid" error={errors?.isPaid?.message}>
            <input
               type="checkbox"
               id="isPaid"
               disabled={isLoading}
               {...register('isPaid')}
            />
         </FormRow>

         <FormRow label="Observations" error={errors?.observations?.message}>
            <textarea
               id="observations"
               rows={4}
               disabled={isLoading}
               {...register('observations')}
            />
         </FormRow>

         <FormRow>
            <Button
               $variation="secondary"
               type="reset"
               onClick={() => onCloseModal?.()}
            >
               Cancel
            </Button>
            <Button disabled={isLoading}>
               {isLoading
                  ? 'Loading....'
                  : isEditSession
                    ? 'Update booking'
                    : 'Create booking'}
            </Button>
         </FormRow>
      </Form>
   );
}
