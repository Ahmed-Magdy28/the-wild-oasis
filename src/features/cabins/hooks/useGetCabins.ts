import { useQuery } from '@tanstack/react-query';
import { getCabins } from '../../../services/apiCabins';

export default function useGetCabins() {
   const {
      isPending: isGettingCabins,
      data: cabins,
      error,
   } = useQuery({
      queryKey: ['cabins'],
      queryFn: getCabins,
   });

   return { isGettingCabins, cabins, error };
}
