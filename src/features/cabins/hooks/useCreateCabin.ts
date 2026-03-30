import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { createCabin as createCabinApi } from '../../../services/apiCabins';
import type { CabinType } from '../../../types';

export default function useCreateCabin() {
   const queryClient = useQueryClient();

   const {
      isPending: isCreating,
      mutate: createCabin,
      error: errorCreating,
   } = useMutation({
      mutationFn: ({ cabin }: { cabin: CabinType }) => createCabinApi(cabin),
      onSuccess: () => {
         toast.success('New cabin created successfully');
         queryClient.invalidateQueries({ queryKey: ['cabins'] });
      },
      onError: () => {
         toast.error('Failed to Create cabin ');
         console.error(errorCreating);
      },
   });

   return { isCreating, createCabin, errorCreating };
}
