import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import toast from 'react-hot-toast';
import { updateCheckOutAPI } from '../../../services/apiBookings';

export default function useCheckout() {
   const queryClient = useQueryClient();
   const navigate = useNavigate();

   const { mutate: checkOut, isPending: isCheckingOut } = useMutation({
      mutationFn: (bookingId: number) => {
         return updateCheckOutAPI(
            {
               status: 'checked-out',
            },
            bookingId,
         );
      },
      onSuccess: (data) => {
         // Invalidate or refetch queries if needed
         toast.success(`Booking #${data.id} checked out successfully`);
         queryClient.invalidateQueries({ queryKey: ['booking', data.id] });
         queryClient.invalidateQueries({ queryKey: ['bookings'] });
         queryClient.invalidateQueries({ queryKey: ['today-activity'] });
         navigate(`/bookings`);
      },
      onError: () => {
         toast.error('Error checking out the guest');
      },
   });

   return { checkOut, isCheckingOut };
}
