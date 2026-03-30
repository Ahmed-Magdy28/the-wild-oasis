import { toast } from 'react-hot-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { CabinType } from '../../../types';
import { editCabin } from '../../../services/apiCabins';

export default function useUpdateCabin() {
   const queryClient = useQueryClient();

   const {
      isPending: isEditing,
      mutate: updateCabin,
      error: errorEditing,
   } = useMutation({
      mutationFn: ({ cabin, id }: { cabin: CabinType; id: number }) =>
         editCabin(cabin, id),
      onSuccess: () => {
         toast.success('Cabin  successfully Edited');
         queryClient.invalidateQueries({ queryKey: ['cabins'] });
      },
      onError: () => {
         toast.error('Failed to Create cabin ');
         console.error(errorEditing?.message);
      },
   });

   return { isEditing, updateCabin, errorEditing };
}
