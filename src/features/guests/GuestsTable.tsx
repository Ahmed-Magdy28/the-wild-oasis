import Table from '../../ui/Table';
import Menus from '../../ui/Menus';
import Empty from '../../ui/Empty';
import Spinner from '../../ui/Spinner';
import type { GuestType } from '../../types';
import Pagination from '../../ui/Pagination';
import useGetGuests from './hooks/useGetGuest';
import GuestsRow from './GuestsRow';

function GuestsTable() {
   const { isGettingGuests, guests } = useGetGuests();
   if (isGettingGuests) return <Spinner />;
   if (!guests?.length) return <Empty resource="Guests" />;
   return (
      <Menus>
         <Table columns="1.5fr 1.5fr 1.5fr 1.5fr 1.5fr 0.1fr">
            <Table.Header>
               <div>full name</div>
               <div>email</div>
               <div>NationalID</div>
               <div>Country flag</div>
               <div>Phone number</div>
            </Table.Header>
            <Table.Body
               data={guests}
               render={(guest: GuestType) => (
                  <GuestsRow key={guest.id} guest={guest} />
               )}
            />
            <Table.Footer>
               <Pagination count={0} />
            </Table.Footer>
         </Table>
      </Menus>
   );
}

export default GuestsTable;
