import { useQuery } from '@tanstack/react-query';
import { startOfDay, subDays } from 'date-fns';
import { useSearchParams } from 'react-router';
import { getStaysAfterDate } from '../../../services/apiBookings';
import type { BookingsType } from '../../../types';

export default function useRecentStays() {
   const [searchParams] = useSearchParams();
   const numDays = !searchParams.get('last')
      ? 7
      : Number(searchParams.get('last'));

   const todayDate = startOfDay(new Date());
   const queryDate = startOfDay(subDays(todayDate, numDays)).toISOString();

   const {
      isPending: isStaysPending,
      data: stays,
      error: staysError,
   } = useQuery({
      queryFn: async () => await getStaysAfterDate(queryDate),
      queryKey: ['stays', `last-${queryDate}`],
   });

   //   confirmed stays are the ones that are either checked-in or confirmed, because they are the ones that are currently staying in the hotel, or they are going to stay in the hotel, so they are the most relevant for the dashboard
   const confirmedStays: BookingsType | undefined = stays?.filter(
      (stay) => stay.status === 'confirmed' || stay.status === 'checked-in',
   );

   //   checked-in stays are the most relevant for the dashboard, because they are the ones that are currently staying in the hotel, and we can show their stay duration, for example
   const checkedInStays: BookingsType | undefined = stays?.filter(
      (stay) => stay.status === 'checked-in',
   );
   //    checkout stays are not really relevant for the dashboard, but we can still show them in a table or something
   const checkedOutStays: BookingsType | undefined = stays?.filter(
      (stay) => stay.status === 'checked-out',
   );

   return {
      isStaysPending,
      stays: stays as BookingsType | undefined,
      confirmedStays,
      checkedInStays,
      checkedOutStays,
      staysError,
      numDays,
   };
}
