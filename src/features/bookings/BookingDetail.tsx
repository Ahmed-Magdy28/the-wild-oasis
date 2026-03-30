import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router';

import BookingDataBox from './BookingDataBox';
import Row from '../../ui/Row';
import Heading from '../../ui/Heading';
import Tag from '../../ui/Tag';
import ButtonGroup from '../../ui/ButtonGroup';
import Button from '../../ui/Button';
import ButtonText from '../../ui/ButtonText';

import { useMoveBack } from '../../hooks/useMoveBack';
import { useGetBooking } from './hooks/useGetBooking';
import Spinner from '../../ui/Spinner';
import useCheckout from '../check-in-out/hooks/useCheckout';
import Modal from '../../ui/Modal';
import ConfirmDelete from '../../ui/ConfirmDelete';
import { useDeleteBooking } from './hooks/useDeleteBookings';
import Empty from '../../ui/Empty';

const HeadingGroup = styled.div`
   display: flex;
   gap: 2.4rem;
   align-items: center;
   flex-wrap: wrap;
`;

function BookingDetail() {
   const { booking, isGettingBooking } = useGetBooking();
   const { checkOut, isCheckingOut } = useCheckout();
   const { deleteBooking, isDeleting } = useDeleteBooking();
   const { bookingId } = useParams();
   const navigate = useNavigate();
   const moveBack = useMoveBack();

   const status = booking?.status;
   const statusToTagName = {
      unconfirmed: 'blue',
      'checked-in': 'green',
      'checked-out': 'silver',
   };
   if (isGettingBooking) return <Spinner />;
   if (!booking) return <Empty resource={`booking ${bookingId}`} />;

   return (
      <>
         <Row $type="horizontal">
            <HeadingGroup>
               <Heading as="h1">Booking #{bookingId}</Heading>
               <Tag $type={statusToTagName[status || 'checked-in']}>
                  {status?.replace('-', ' ')}
               </Tag>
            </HeadingGroup>
            <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
         </Row>

         <BookingDataBox booking={booking} />

         <ButtonGroup>
            <Modal>
               <Modal.Open opensWindowName="delete">
                  <Button $variation="danger">
                     {isDeleting ? 'Loading...' : 'Delete booking'}
                  </Button>
               </Modal.Open>

               {/* Delete Window */}
               <Modal.Window name="delete">
                  <ConfirmDelete
                     resourceName="booking"
                     disabled={isDeleting}
                     onConfirm={() => {
                        deleteBooking(Number(bookingId), {
                           onSettled: () => navigate(-1),
                        });
                     }}
                  />
               </Modal.Window>
            </Modal>
            {status === 'unconfirmed' && (
               <Button onClick={() => navigate(`/check-in/${bookingId}`)}>
                  Check in
               </Button>
            )}

            {status === 'checked-in' && (
               <Button
                  onClick={() => checkOut(Number(bookingId))}
                  disabled={isCheckingOut}
               >
                  Check out
               </Button>
            )}
            <Button $variation="secondary" onClick={moveBack}>
               Back
            </Button>
         </ButtonGroup>
      </>
   );
}

export default BookingDetail;
