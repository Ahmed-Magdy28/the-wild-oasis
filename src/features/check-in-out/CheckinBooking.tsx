import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import styled from 'styled-components';
import BookingDataBox from '../bookings/BookingDataBox';

import Row from '../../ui/Row';
import Heading from '../../ui/Heading';
import ButtonGroup from '../../ui/ButtonGroup';
import Button from '../../ui/Button';
import ButtonText from '../../ui/ButtonText';
import Spinner from '../../ui/Spinner';

import { useMoveBack } from '../../hooks/useMoveBack';
import { useGetBooking } from '../bookings/hooks/useGetBooking';
import Checkbox from '../../ui/Checkbox';
import { formatCurrency } from '../../utils/helpers';
import useCheckin from './hooks/useCheckin';
import useSettings from '../settings/hooks/useSettings';

const Box = styled.div`
   /* Box */
   background-color: var(--color-grey-0);
   border: 1px solid var(--color-grey-100);
   border-radius: var(--border-radius-md);
   padding: 2.4rem 4rem;

   @media (max-width: 900px) {
      padding: 1.6rem;
   }
`;

function CheckinBooking() {
   const { booking, isGettingBooking } = useGetBooking();
   const [confirmPaid, setConfirmPaid] = useState<boolean>(false);
   const [addBreakfast, SetaddBreakfast] = useState<boolean>(false);
   const { isCheckingIn, checkIn } = useCheckin();

   useEffect(() => {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (booking?.isPaid) setConfirmPaid(booking?.isPaid);
      if (booking?.hasBreakfast) SetaddBreakfast(true);
   }, [booking?.isPaid, booking?.hasBreakfast]);
   const { settings, isGettingSettings } = useSettings();

   const moveBack = useMoveBack();
   const { bookingId } = useParams();

   if (isGettingBooking || isGettingSettings) return <Spinner />;
   if (!booking) return;
   if (!settings) return;

   const optionalBreakfastPrice =
      settings.breakfastPrice * booking.numNights * booking.numGuests;
   const totalWithBreakfast =
      (booking?.totalPrice ?? 0) + optionalBreakfastPrice;

   function handleCheckin() {
      if (!confirmPaid) return;
      if (!bookingId) return;

      if (addBreakfast) {
         checkIn({
            bookingId,
            breakfast: {
               hasBreakfast: true,
               extrasPrice: optionalBreakfastPrice,
               totalPrice: totalWithBreakfast,
            },
         });
      } else {
         checkIn({ bookingId });
      }
   }

   return (
      <>
         <Row $type="horizontal">
            <Heading as="h1">Check in booking #{bookingId}</Heading>
            <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
         </Row>
         <BookingDataBox booking={booking} />
         {!booking.hasBreakfast && (
            <Box>
               <Checkbox
                  checked={addBreakfast}
                  onChange={() => {
                     SetaddBreakfast((addBreakfast) => !addBreakfast);
                     setConfirmPaid(false);
                  }}
                  id="breakfast"
                  disabled={booking?.hasBreakfast}
               >
                  Want to add breakfast for{' '}
                  {formatCurrency(optionalBreakfastPrice)}
               </Checkbox>
            </Box>
         )}
         <Box>
            <Checkbox
               checked={confirmPaid}
               onChange={() => setConfirmPaid((confirmPaid) => !confirmPaid)}
               id="price"
               disabled={booking?.isPaid}
            >
               I confirm that {booking.guests.fullName} has paid the total
               amount of{' '}
               {!addBreakfast
                  ? formatCurrency(booking.totalPrice)
                  : `${formatCurrency(booking.totalPrice + optionalBreakfastPrice)} (${formatCurrency(booking.totalPrice)} cabin + ${formatCurrency(optionalBreakfastPrice)} breakfast)`}
            </Checkbox>
         </Box>

         <ButtonGroup>
            <Button
               onClick={handleCheckin}
               disabled={!confirmPaid || isCheckingIn}
            >
               {isCheckingIn ? 'loading...' : `Check in booking #${bookingId}`}
            </Button>
            <Button $variation="secondary" onClick={moveBack}>
               Back
            </Button>
         </ButtonGroup>
      </>
   );
}

export default CheckinBooking;
