import {
   HiOutlineBanknotes,
   HiOutlineBriefcase,
   HiOutlineCalendarDays,
   HiOutlineChartBar,
} from 'react-icons/hi2';
import type { BookingsType } from '../../types';
import Spinner from '../../ui/Spinner';
import Stat from './Stat';
import { formatCurrency } from '../../utils/helpers';
export default function Stats({
   bookings,
   confirmedStays,
   numDays,
   cabinCount,
}: {
   bookings:
      | {
           created_at: string;
           totalPrice: number;
           extrasPrice: number;
        }[]
      | undefined;
   confirmedStays: BookingsType | undefined;
   numDays: number;
   cabinCount: number;
}) {
   if (!bookings || !confirmedStays) return <Spinner />;

   //   1. Bookings: total number of bookings in the last 7 days (or the number of days specified in the query param).
   const numBookings = bookings.length;
   //   2. Sales: total sales in the last 7 days (or the number of days specified in the query param). This can be calculated by summing the totalPrice and extrasPrice of all bookings in the last 7 days.
   const sales = bookings.reduce(
      (total, cur) => total + cur.totalPrice + cur.extrasPrice,
      0,
   );
   //   3. Check-ins: total number of check-ins in the last 7 days (or the number of days specified in the query param). This can be calculated by counting the number of confirmed stays in the last 7 days.
   const numCheckIns = confirmedStays.length;
   //   4. Occupancy rate: percentage of occupied rooms in the last 7 days (or the number of days specified in the query param). This can be calculated by dividing the number of confirmed stays by the total number of rooms in the hotel, and multiplying by 100 to get a percentage.
   const occupation =
      confirmedStays.reduce((total, cur) => total + cur.numNights, 0) /
      (numDays * cabinCount);
   const occupationRate = occupation * 100;
   return (
      <>
         <Stat
            title="Bookings"
            color="blue"
            icon={<HiOutlineBriefcase />}
            value={numBookings}
         />
         <Stat
            title="Sales"
            color="green"
            icon={<HiOutlineBanknotes />}
            value={formatCurrency(sales)}
         />
         <Stat
            title="Check ins"
            color="indigo"
            icon={<HiOutlineCalendarDays />}
            value={numCheckIns}
         />
         <Stat
            title="Occupancy rate"
            color="yellow"
            icon={<HiOutlineChartBar />}
            value={occupationRate ? occupationRate.toFixed(1) + '%' : '0%'}
         />
      </>
   );
}
