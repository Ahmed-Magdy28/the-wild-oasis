import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import type { BookingMutationType } from '../../../types';
import { createBookingAPI } from '../../../services/apiBookings';

export default function useCreateBooking() {
   const queryClient = useQueryClient();

   const {
      isPending: isCreating,
      mutate: createBooking,
      error: errorCreating,
   } = useMutation({
      mutationFn: ({ booking }: { booking: BookingMutationType }) =>
         createBookingAPI(booking),
      onSuccess: () => {
         toast.success('New booking created successfully');
         queryClient.invalidateQueries({ queryKey: ['bookings'] });
      },
      onError: (error) => {
         toast.error('Failed to create booking');
         console.error(error);
      },
   });

   return { isCreating, createBooking, errorCreating };
}
