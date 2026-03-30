import AddGuests from '../features/guests/AddGuests';
import GuestsTable from '../features/guests/GuestsTable';
import Heading from '../ui/Heading';
import Row from '../ui/Row';

function Guests() {
   return (
      <>
         <Row $type="horizontal">
            <Heading as="h1">All guests</Heading>
            {/* SearchOperation Later */}
         </Row>

         <Row>
            <GuestsTable />
            <AddGuests />
         </Row>
      </>
   );
}

export default Guests;
