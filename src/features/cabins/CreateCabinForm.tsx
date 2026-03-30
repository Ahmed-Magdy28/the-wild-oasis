import { useForm } from 'react-hook-form';
import Input from '../../ui/Input';
import Form from '../../ui/Form';
import Button from '../../ui/Button';
import FileInput from '../../ui/FileInput';
import Textarea from '../../ui/Textarea';
import type { CabinType } from '../../types';
import FormRow from '../../ui/FormRow';
import useUpdateCabin from './hooks/useUpdateCabin';
import useCreateCabin from './hooks/useCreateCabin';

function CreateCabinForm({
   cabinToEdit,
   onCloseModal,
}: {
   cabinToEdit?: CabinType;
   onCloseModal?: () => void;
}) {
   const editId = cabinToEdit?.id;
   const isEditSession = Boolean(editId);
   const { createCabin, isCreating } = useCreateCabin();
   const { isEditing, updateCabin } = useUpdateCabin();

   const isLoading = isEditing || isCreating;
   const { register, handleSubmit, reset, formState } = useForm<CabinType>({
      defaultValues: cabinToEdit?.id ? cabinToEdit : {},
   });
   const { errors } = formState;

   function onSubmit(cabin: CabinType) {
      if (isEditSession)
         updateCabin(
            { cabin, id: editId! },
            {
               onSuccess: () => {
                  reset();
                  onCloseModal?.();
               },
            },
         );
      else
         createCabin(
            { cabin },
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
         <FormRow label="Cabin name" error={errors?.name?.message}>
            <Input
               type="text"
               id="name"
               disabled={isLoading}
               {...register('name', { required: 'Name is required' })}
            />
         </FormRow>

         <FormRow label="Max capacity" error={errors?.maxCapacity?.message}>
            <Input
               type="number"
               id="maxCapacity"
               disabled={isLoading}
               {...register('maxCapacity', {
                  required: 'Max capacity is required',
                  min: {
                     value: 1,
                     message: 'Capacity should at least 1',
                  },
               })}
            />
         </FormRow>

         <FormRow label="Regular price" error={errors?.regularPrice?.message}>
            <Input
               type="number"
               id="regularPrice"
               disabled={isLoading}
               {...register('regularPrice', {
                  required: 'Regular price is required',
                  min: {
                     value: 1,
                     message: 'regularPrice should at least 1',
                  },
               })}
            />
         </FormRow>

         <FormRow label="Discount" error={errors?.discount?.message}>
            <Input
               type="number"
               id="discount"
               disabled={isLoading}
               defaultValue={0}
               {...register('discount', {
                  required: 'Discount price is required',
                  validate: (value, formValues) =>
                     value <= formValues.regularPrice ||
                     'Discount should be less than regular price',
               })}
            />
         </FormRow>

         <FormRow
            label="Description for website"
            error={errors?.description?.message}
         >
            <Textarea
               id="description"
               disabled={isLoading}
               defaultValue=""
               {...register('description', {
                  required: 'Description is required',
               })}
            />
         </FormRow>

         <FormRow label="Cabin photo" error={errors?.image?.message}>
            <FileInput
               id="image"
               disabled={isLoading}
               type="file"
               accept="image/*"
               {...register('image', {
                  required: isEditSession ? false : 'Image is required',
               })}
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
                    ? 'Edit cabin'
                    : 'Create new cabin'}
            </Button>
         </FormRow>
      </Form>
   );
}

export default CreateCabinForm;
