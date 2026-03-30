import { useSearchParams } from 'react-router';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getBookings } from '../../../services/apiBookings';
import { max_rows_per_page } from '../../../utils/config';

export default function useGetBookings() {
   const queryClient = useQueryClient();
   const [searchParams] = useSearchParams();

   // filter bookings by status from the URL search params
   const filterValue = searchParams.get('status');
   const filter =
      !filterValue || filterValue === 'all'
         ? null
         : { field: 'status', value: filterValue };

   // Sorting
   const sortByRaw = searchParams.get('sortBy') || 'startDate-desc';
   const [field, direction] = sortByRaw.split('-');
   const sortBy = { field, direction };

   // Pagination
   const page = !searchParams.get('page')
      ? 1
      : Number(searchParams.get('page'));

   const {
      isPending: isGettingBookings,
      data: { data: bookings, count } = { data: [], count: 0 },
      error,
   } = useQuery({
      queryKey: ['bookings', filter, sortBy, page],
      queryFn: () => getBookings({ filter, sortBy, page }),
   });

   // Pre-fetching
   const pageCount = Math.ceil((count || 0) / max_rows_per_page);

   // previous page
   if (page > 1)
      queryClient.prefetchQuery({
         queryKey: ['bookings', filter, sortBy, page - 1],
         queryFn: () => getBookings({ filter, sortBy, page: page - 1 }),
      });

   // next page
   if (page < pageCount)
      queryClient.prefetchQuery({
         queryKey: ['bookings', filter, sortBy, page + 1],
         queryFn: () => getBookings({ filter, sortBy, page: page + 1 }),
      });

   return { isGettingBookings, bookings, count, error };
}
