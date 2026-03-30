import styled from 'styled-components';
import { HiPencil, HiTrash } from 'react-icons/hi2';

import Table from '../../ui/Table';
import type { GuestType } from '../../types';
import Menus from '../../ui/Menus';
import Modal from '../../ui/Modal';
import ConfirmDelete from '../../ui/ConfirmDelete';
import { useDeleteGuest } from './hooks/useDeleteGuest';
import { Flag } from '../../ui/Flag';
import CreateGuestForm from './CreateGuestForm';

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

function GuestsRow({ guest }: { guest: GuestType }) {
   const { deleteGuest, isDeleting } = useDeleteGuest();
   const {
      id: guestId,
      fullName: guestName,
      email,
      nationalID,
      countryFlag,
   } = guest;

   return (
      <Table.Row>
         <Stacked>
            <span>{guestName}</span>
         </Stacked>

         <Stacked>
            <span>{email}</span>
         </Stacked>
         <Stacked>
            <span>{nationalID}</span>
         </Stacked>
         <Stacked>
            <Flag src={countryFlag} alt={`Flag of a country`} />
         </Stacked>
         <Stacked>
            <span>{guest.phoneNumber}</span>
         </Stacked>

         <Modal>
            <Menus.Menu>
               <Menus.Toggle id={String(guestId)} />

               <Menus.List id={String(guestId)}>
                  {/* Details button */}

                  <Modal.Open opensWindowName="edit">
                     <Menus.Button icon={<HiPencil />}>Edit guest</Menus.Button>
                  </Modal.Open>

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
                     resourceName="guest"
                     disabled={isDeleting}
                     onConfirm={() => deleteGuest(Number(guestId))}
                  />
               </Modal.Window>
               <Modal.Window name="edit">
                  <CreateGuestForm guestToEdit={guest} />
               </Modal.Window>
            </Menus.Menu>
         </Modal>
      </Table.Row>
   );
}

export default GuestsRow;
