import styled from 'styled-components';
import { HiPencil, HiSquare2Stack, HiTrash } from 'react-icons/hi2';
import type { CabinType } from '../../types';
import { formatCurrency } from '../../utils/helpers';
import CreateCabinForm from './CreateCabinForm';
import { useDeleteCabin } from './hooks/useDeleteCabin';
import useCreateCabin from './hooks/useCreateCabin';
import Modal from '../../ui/Modal';
import ConfirmDelete from '../../ui/ConfirmDelete';
import Table from '../../ui/Table';
import Menus from '../../ui/Menus';

const Img = styled.img`
   display: block;
   width: 6.4rem;
   aspect-ratio: 3 / 2;
   object-fit: cover;
   object-position: center;
   /* transform: scale(1.66666) translateX(-2px); */
   transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
   font-size: 1.6rem;
   font-weight: 600;
   color: var(--color-grey-600);
   font-family: 'Sono';
`;

const Price = styled.div`
   font-family: 'Sono';
   font-weight: 600;
`;

const Discount = styled.div`
   font-family: 'Sono';
   font-weight: 500;
   color: var(--color-green-700);
`;

export default function CabinRow({ cabin }: { cabin: CabinType }) {
   const { isDeleting, deleteCabin } = useDeleteCabin();
   const { createCabin } = useCreateCabin();
   const {
      id: cabinId,
      description,
      discount,
      image,
      maxCapacity,
      name,
      regularPrice,
   } = cabin;
   function handleDuplicate() {
      createCabin({
         cabin: {
            name: `Copy of ${name}`,
            description,
            discount,
            image,
            maxCapacity,
            regularPrice,
         },
      });
   }
   return (
      <>
         <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
            <Table.Row>
               <Img
                  src={image as unknown as string}
                  alt={`${name}CabinImage`}
               />

               <Cabin>{name}</Cabin>

               <div>Fits up to {maxCapacity} guests</div>

               <Price>{formatCurrency(regularPrice)}</Price>

               {discount ? (
                  <Discount>{formatCurrency(discount)}</Discount>
               ) : (
                  <span>&mdash;</span>
               )}

               <div>
                  <Modal>
                     <Menus.Menu>
                        <Menus.Toggle id={String(cabinId)} />

                        <Menus.List id={String(cabinId)}>
                           {/* Duplicate button */}
                           <Menus.Button
                              icon={<HiSquare2Stack />}
                              onClick={handleDuplicate}
                           >
                              Duplicate
                           </Menus.Button>
                           {/* Edit button */}
                           <Modal.Open opensWindowName="edit">
                              <Menus.Button icon={<HiPencil />}>
                                 Edit
                              </Menus.Button>
                           </Modal.Open>
                           {/* Delete button */}
                           <Modal.Open opensWindowName="delete">
                              <Menus.Button icon={<HiTrash />}>
                                 {isDeleting ? 'Loading...' : 'Delete'}
                              </Menus.Button>
                           </Modal.Open>
                        </Menus.List>

                        {/* Edit Window */}
                        <Modal.Window name="edit">
                           <CreateCabinForm cabinToEdit={cabin} />
                        </Modal.Window>

                        {/* Delete Window */}
                        <Modal.Window name="delete">
                           <ConfirmDelete
                              resourceName="cabins"
                              disabled={isDeleting}
                              onConfirm={() => deleteCabin(cabinId)}
                           />
                        </Modal.Window>
                     </Menus.Menu>
                  </Modal>
               </div>
            </Table.Row>
         </Table>
      </>
   );
}
