import { useRef, useState } from 'react';

import Button from '../../ui/Button';
import FileInput from '../../ui/FileInput';
import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import useUser from './hooks/useUser';
import useUpdateUser from './hooks/useUpdateUser';

function UpdateUserDataForm({ onCloseModal }: { onCloseModal?: () => void }) {
   const { user } = useUser();
   const email = user?.email ?? '';
   const currentFullName = user?.user_metadata?.fullName ?? '';

   const [fullName, setFullName] = useState(currentFullName);
   const [avatar, setAvatar] = useState<File | null>(null);
   const avatarInputRef = useRef<HTMLInputElement | null>(null);
   const { updateUser, isUpdating } = useUpdateUser();

   function handleSuccess() {
      setAvatar(null);
      if (avatarInputRef.current) avatarInputRef.current.value = '';
      onCloseModal?.();
   }

   function handleSubmit(e: React.SubmitEvent) {
      e.preventDefault();
      if (!fullName) return;
      if (avatar) {
         updateUser({ fullName, avatar }, { onSuccess: handleSuccess });
      } else {
         updateUser({ fullName }, { onSuccess: handleSuccess });
      }
   }
   function handleCancel() {
      setFullName(currentFullName);
      setAvatar(null);
      if (avatarInputRef.current) avatarInputRef.current.value = '';
      onCloseModal?.();
   }

   return (
      <Form onSubmit={handleSubmit} type={onCloseModal ? 'modal' : 'regular'}>
         <FormRow label="Email address">
            <Input value={email} disabled />
         </FormRow>
         <FormRow label="Full name">
            <Input
               type="text"
               value={fullName}
               disabled={isUpdating}
               onChange={(e) => setFullName(e.target.value)}
               id="fullName"
            />
         </FormRow>
         <FormRow label="Avatar image">
            <FileInput
               ref={avatarInputRef}
               id="avatar"
               accept="image/*"
               disabled={isUpdating}
               onChange={(e) => setAvatar(e.target.files?.[0] ?? null)}
            />
         </FormRow>
         <FormRow>
            <Button type="reset" $variation="secondary" onClick={handleCancel}>
               Cancel
            </Button>
            <Button disabled={isUpdating}>Update account</Button>
         </FormRow>
      </Form>
   );
}

export default UpdateUserDataForm;
