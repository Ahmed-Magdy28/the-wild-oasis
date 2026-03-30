import Button from '../../ui/Button';
import useCheckout from './hooks/useCheckout';

function CheckoutButton({ bookingId }: { bookingId: number | undefined }) {
   const { checkOut, isCheckingOut } = useCheckout();
   return (
      <Button
         $variation="primary"
         $size="small"
         disabled={isCheckingOut}
         onClick={() => checkOut(bookingId || 0)}
      >
         Check out
      </Button>
   );
}

export default CheckoutButton;
