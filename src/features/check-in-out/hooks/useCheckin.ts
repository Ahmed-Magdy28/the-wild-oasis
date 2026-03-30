import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import toast from 'react-hot-toast';
import { updateCheckInAPI } from '../../../services/apiBookings';

export default function useCheckin() {
   const queryClient = useQueryClient();
   const navigate = useNavigate();
   const { mutate: checkIn, isPending: isCheckingIn } = useMutation({
      mutationFn: ({
         bookingId,
         breakfast,
      }: {
         bookingId: string;
         breakfast?: {
            hasBreakfast: boolean;
            extrasPrice: number;
            totalPrice: number;
         };
      }) => {
         if (breakfast) {
            return updateCheckInAPI(
               {
                  status: 'checked-in',
                  isPaid: true,
                  hasBreakfast: breakfast.hasBreakfast,
                  extrasPrice: breakfast.extrasPrice,
                  totalPrice: breakfast.totalPrice,
               },
               bookingId,
            );
         } else
            return updateCheckInAPI(
               {
                  status: 'checked-in',
                  isPaid: true,
               },
               bookingId,
            );
      },
      onSuccess: (data) => {
         // Invalidate or refetch queries if needed
         toast.success(`Booking #${data.id} checked in successfully`);
         queryClient.invalidateQueries({ queryKey: ['booking', data.id] });
         queryClient.invalidateQueries({ queryKey: ['bookings'] });
         queryClient.invalidateQueries({ queryKey: ['today-activity'] });

         navigate(`/bookings`);
      },
      onError: () => {
         toast.error('Error checking in the guest');
      },
   });

   return { checkIn, isCheckingIn };
}
