import { useForm, useWatch } from 'react-hook-form';
import Form from '../../ui/Form';
import type { GuestType } from '../../types';
import Spinner from '../../ui/Spinner';
import useCreateGuest from './hooks/useCreateGuest';
import FormRow from '../../ui/FormRow';
import Button from '../../ui/Button';
import useUpdateGuest from './hooks/useUpdateGuest';
import NationalitySelector from '../../ui/NationalitySelector';

export default function CreateGuestForm({
   guestToEdit,
   onCloseModal,
}: {
   guestToEdit?: GuestType;
   onCloseModal?: () => void;
}) {
   const editId = guestToEdit?.id;
   const isEditSession = Boolean(editId);
   const { createGuest, errorCreating, isCreating } = useCreateGuest();
   const { updateGuest, isEditing } = useUpdateGuest();
   const { register, handleSubmit, reset, formState, setValue, control } =
      useForm<GuestType>({
         defaultValues: guestToEdit?.id ? guestToEdit : {},
      });
   const nationality = useWatch({ control, name: 'nationality' });

   const isLoading = isEditing || isCreating;
   if (errorCreating) return <div>Failed to create guest</div>;
   if (isCreating) return <Spinner />;
   const { errors } = formState;

   function onSubmit(guest: GuestType) {
      if (isEditSession)
         updateGuest(
            { guest, id: editId! },
            {
               onSuccess: () => {
                  reset();
                  onCloseModal?.();
               },
            },
         );
      else
         createGuest(
            { guest },
            {
               onSuccess: () => {
                  reset();
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
         <FormRow label="Full name" error={errors?.fullName?.message}>
            <input
               type="text"
               id="fullName"
               disabled={isLoading}
               {...register('fullName')}
            />
         </FormRow>
         <FormRow label="Email address" error={errors?.email?.message}>
            <input
               type="email"
               id="email"
               disabled={isLoading}
               {...register('email')}
            />
         </FormRow>
         <FormRow label="National ID" error={errors?.nationalID?.message}>
            <input
               type="text"
               id="nationalID"
               disabled={isLoading}
               {...register('nationalID')}
            />
         </FormRow>
         <FormRow label="Nationality" error={errors?.nationality?.message}>
            <NationalitySelector
               id="nationality"
               value={nationality}
               disabled={isLoading}
               onChange={({ name, flag }) => {
                  setValue('nationality', name, { shouldDirty: true });
                  setValue('countryFlag', flag, { shouldDirty: true });
               }}
            />
         </FormRow>
         <FormRow label="Phone Number" error={errors?.phoneNumber?.message}>
            <input
               type="text"
               id="phoneNumber"
               disabled={isLoading}
               {...register('phoneNumber')}
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
                    ? 'Edit guest'
                    : 'Create new guest'}
            </Button>
         </FormRow>
      </Form>
   );
}
