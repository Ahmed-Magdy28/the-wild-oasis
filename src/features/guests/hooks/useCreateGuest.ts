import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import type { GuestType } from '../../../types';
import { createGuestAPI } from '../../../services/apiGuests';

export default function useCreateGuest() {
   const queryClient = useQueryClient();

   const {
      isPending: isCreating,
      mutate: createGuest,
      error: errorCreating,
   } = useMutation({
      mutationFn: ({ guest }: { guest: GuestType }) => createGuestAPI(guest),
      onSuccess: () => {
         toast.success('New guest created successfully');
         queryClient.invalidateQueries({ queryKey: ['guests'] });
      },
      onError: (error) => {
         toast.error('Failed to Create guest ');
         console.error(error);
      },
   });

   return { isCreating, createGuest, errorCreating };
}
