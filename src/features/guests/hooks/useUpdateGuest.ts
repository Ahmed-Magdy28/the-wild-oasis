import { toast } from 'react-hot-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { GuestType } from '../../../types';
import { editGuestAPI } from '../../../services/apiGuests';

export default function useUpdateGuest() {
   const queryClient = useQueryClient();

   const {
      isPending: isEditing,
      mutate: updateGuest,
      error: errorEditing,
   } = useMutation({
      mutationFn: ({ guest, id }: { guest: GuestType; id: number }) =>
         editGuestAPI(guest, id),
      onSuccess: () => {
         toast.success('Guest  successfully Edited');
         queryClient.invalidateQueries({ queryKey: ['guests'] });
      },
      onError: () => {
         toast.error('Failed to Update guest ');
         console.error(errorEditing?.message);
      },
   });

   return { isEditing, updateGuest, errorEditing };
}
