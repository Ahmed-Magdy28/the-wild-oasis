import { useQuery } from '@tanstack/react-query';
import { startOfDay, subDays } from 'date-fns';
import { useSearchParams } from 'react-router';
import { getBookingsAfterDate } from '../../../services/apiBookings';

export default function useRecentBookings() {
   const [searchParams] = useSearchParams();
   const numDays = !searchParams.get('last')
      ? 7
      : Number(searchParams.get('last'));

   const todayDate = startOfDay(new Date());
   const queryDate = startOfDay(subDays(todayDate, numDays)).toISOString();

   const {
      isPending: isBookingsPending,
      data: bookings,
      error: bookingsError,
   } = useQuery({
      queryFn: async () => await getBookingsAfterDate(queryDate),
      queryKey: ['bookings', `last-${queryDate}`],
   });

   return {
      isBookingsPending,
      bookings: bookings as
         | {
              created_at: string;
              totalPrice: number;
              extrasPrice: number;
           }[]
         | undefined,
      bookingsError,
   };
}
