import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { deleteGuestAPI } from '../../../services/apiGuests';

export function useDeleteGuest() {
   const queryClient = useQueryClient();
   const { isPending: isDeleting, mutate: deleteGuest } = useMutation({
      mutationFn: deleteGuestAPI,
      onSuccess: () => {
         toast.success('Guest successfully deleted');

         queryClient.invalidateQueries({ queryKey: ['guests'] });
      },
      onError: (err) => toast.error(err.message),
   });
   return { isDeleting, deleteGuest };
}
