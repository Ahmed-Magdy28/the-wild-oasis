import styled from 'styled-components';
import useRecentBookings from './hooks/useRecentBookings';
import Spinner from '../../ui/Spinner';
import useRecentStays from './hooks/useRecentStays';
import Stats from './Stats';
import useGetCabins from '../cabins/hooks/useGetCabins';
import SalesChart from './SalesChart';
import DurationChart from './DurationChart';
import TodayActivity from '../check-in-out/TodayActivity';

const StyledDashboardLayout = styled.div`
   display: grid;
   grid-template-columns: 1fr 1fr 1fr 1fr;
   grid-template-rows: auto 34rem auto;
   gap: 2.4rem;

   @media (max-width: 1200px) {
      grid-template-columns: 1fr 1fr;
      grid-template-rows: auto;
   }

   @media (max-width: 700px) {
      grid-template-columns: 1fr;
   }
`;
export default function DashboardLayout() {
   const { isBookingsPending, bookings, bookingsError } = useRecentBookings();
   const { isStaysPending, confirmedStays, staysError, numDays, stays } =
      useRecentStays();
   const { cabins, error, isGettingCabins } = useGetCabins();
   if (isBookingsPending || isStaysPending || isGettingCabins)
      return <Spinner />;
   if (bookingsError || staysError || error)
      return (
         <div>
            Error:{' '}
            {bookingsError?.message || staysError?.message || error?.message}
         </div>
      );

   return (
      <StyledDashboardLayout>
         <Stats
            bookings={bookings}
            numDays={numDays}
            confirmedStays={confirmedStays}
            cabinCount={cabins?.length || 0}
         />
         <TodayActivity />
         <DurationChart confirmedStays={confirmedStays} stays={stays} />
         <SalesChart bookings={bookings} numDays={numDays} />
      </StyledDashboardLayout>
   );
}
