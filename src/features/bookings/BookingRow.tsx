import styled from 'styled-components';
import { format, isToday } from 'date-fns';
import {
   HiArrowDownOnSquare,
   HiPencil,
   HiArrowUpOnSquare,
   HiEye,
   HiTrash,
} from 'react-icons/hi2';
import { useNavigate } from 'react-router';

import Tag from '../../ui/Tag';
import Table from '../../ui/Table';
import { formatCurrency } from '../../utils/helpers';
import { formatDistanceFromNow } from '../../utils/helpers';
import type { BookingType } from '../../types';
import Menus from '../../ui/Menus';
import Modal from '../../ui/Modal';
import { useDeleteBooking } from './hooks/useDeleteBookings';
import ConfirmDelete from '../../ui/ConfirmDelete';
import useCheckout from '../check-in-out/hooks/useCheckout';
import CreateBookingForm from './CreateBookingForm';

const Cabin = styled.div`
   font-size: 1.6rem;
   font-weight: 600;
   color: var(--color-grey-600);
   font-family: 'Sono';
`;

const Stacked = styled.div`
   display: flex;
   flex-direction: column;
   gap: 0.2rem;

   & span:first-child {
      font-weight: 500;
   }

   & span:last-child {
      color: var(--color-grey-500);
      font-size: 1.2rem;
   }
`;

const Amount = styled.div`
   font-family: 'Sono';
   font-weight: 500;
`;

function BookingRow({ booking }: { booking: BookingType }) {
   const { deleteBooking, isDeleting } = useDeleteBooking();
   const navigate = useNavigate();
   const { checkOut, isCheckingOut } = useCheckout();
   const {
      id: bookingId,
      startDate,
      endDate,
      numNights,
      // numGuests,
      totalPrice,
      status,
      guests: { fullName: guestName, email } = {
         fullName: '',
         email: '',
      },
      cabins: { name: cabinName } = { name: '' },
   } = booking;
   const statusToTagName = {
      unconfirmed: 'blue',
      'checked-in': 'green',
      'checked-out': 'silver',
   };

   return (
      <Table.Row>
         <Cabin>{cabinName}</Cabin>

         <Stacked>
            <span>{guestName}</span>
            <span>{email}</span>
         </Stacked>

         <Stacked>
            <span>
               {isToday(new Date(startDate))
                  ? 'Today'
                  : formatDistanceFromNow(startDate)}{' '}
               &rarr; {numNights} night stay
            </span>
            <span>
               {format(new Date(startDate), 'MMM dd yyyy')} &mdash;{' '}
               {format(new Date(endDate), 'MMM dd yyyy')}
            </span>
         </Stacked>

         <Tag $type={statusToTagName[status]}>{status.replace('-', ' ')}</Tag>

         <Amount>{formatCurrency(totalPrice || 0)}</Amount>
         <Modal>
            <Menus.Menu>
               <Menus.Toggle id={String(bookingId)} />

               <Menus.List id={String(bookingId)}>
                  {/* Details button */}
                  <Menus.Button
                     icon={<HiEye />}
                     onClick={() => navigate(`/bookings/${bookingId}`)}
                  >
                     See details
                  </Menus.Button>

                  {/* Edit button */}
                  <Modal.Open opensWindowName="edit">
                     <Menus.Button icon={<HiPencil />}>
                        Edit booking
                     </Menus.Button>
                  </Modal.Open>

                  {status === 'unconfirmed' && (
                     <Menus.Button
                        icon={<HiArrowDownOnSquare />}
                        onClick={() => navigate(`/check-in/${bookingId}`)}
                     >
                        Check in
                     </Menus.Button>
                  )}
                  {/* checkOut button */}
                  {status === 'checked-in' && (
                     <Menus.Button
                        icon={<HiArrowUpOnSquare />}
                        onClick={() => checkOut(bookingId || 0)}
                        disabled={isCheckingOut}
                     >
                        Check out
                     </Menus.Button>
                  )}

                  {/* Delete button */}
                  <Modal.Open opensWindowName="delete">
                     <Menus.Button icon={<HiTrash />}>
                        {isDeleting ? 'Loading...' : 'Delete'}
                     </Menus.Button>
                  </Modal.Open>
               </Menus.List>

               {/* Delete Window */}
               <Modal.Window name="delete">
                  <ConfirmDelete
                     resourceName="booking"
                     disabled={isDeleting}
                     onConfirm={() => deleteBooking(Number(bookingId))}
                  />
               </Modal.Window>
               <Modal.Window name="edit">
                  <CreateBookingForm bookingToEdit={booking} />
               </Modal.Window>
            </Menus.Menu>
         </Modal>
      </Table.Row>
   );
}

export default BookingRow;
