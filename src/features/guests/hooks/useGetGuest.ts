import { useQuery } from '@tanstack/react-query';
import { getGuestsAPI } from '../../../services/apiGuests';

export default function useGetGuests() {
   const {
      isPending: isGettingGuests,
      data: guests,
      error,
   } = useQuery({
      queryKey: ['guests'],
      queryFn: getGuestsAPI,
   });

   return { isGettingGuests, guests, error };
}
