import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router';
import { getBooking } from '../../../services/apiBookings';
import type { BookingType } from '../../../types';

export function useGetBooking() {
   // Implementation for fetching a single booking
   const { bookingId } = useParams<{ bookingId: string }>();
   const {
      isPending: isGettingBooking,
      data,
      error,
   } = useQuery<BookingType | undefined>({
      queryKey: ['booking', bookingId],
      queryFn: () => getBooking(bookingId),
      retry: false,
   });
   return { isGettingBooking, booking: data, error };
}
