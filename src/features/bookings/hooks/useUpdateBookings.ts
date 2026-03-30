import { toast } from 'react-hot-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { BookingMutationType } from '../../../types';
import { updateBookingAPI } from '../../../services/apiBookings';

export default function useUpdateBooking() {
   const queryClient = useQueryClient();

   const {
      isPending: isEditing,
      mutate: updateBooking,
      error: errorEditing,
   } = useMutation({
      mutationFn: ({
         booking,
         id,
      }: {
         booking: BookingMutationType;
         id: number;
      }) => updateBookingAPI(booking, id),
      onSuccess: () => {
         toast.success('Booking successfully edited');
         queryClient.invalidateQueries({ queryKey: ['bookings'] });
      },
      onError: (error) => {
         toast.error('Failed to update booking');
         console.error(error);
      },
   });

   return { isEditing, updateBooking, errorEditing };
}
