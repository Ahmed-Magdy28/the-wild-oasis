import styled from 'styled-components';
import { eachDayOfInterval, format, isSameDay, subDays } from 'date-fns';
import {
   AreaChart,
   Area,
   CartesianGrid,
   Tooltip,
   YAxis,
   XAxis,
   ResponsiveContainer,
} from 'recharts';
import DashboardBox from './DashboardBox';
import Heading from '../../ui/Heading';
import { useDarkMode } from '../../context/useDarkMode';

const StyledSalesChart = styled(DashboardBox)`
   grid-column: 1 / -1;

   /* Hack to change grid line colors */
   & .recharts-cartesian-grid-horizontal line,
   & .recharts-cartesian-grid-vertical line {
      stroke: var(--color-grey-300);
   }
`;

export default function SalesChart({
   bookings,
   numDays,
}: {
   bookings:
      | {
           created_at: string;
           totalPrice: number;
           extrasPrice: number;
        }[]
      | undefined;
   numDays: number;
}) {
   const { isDarkMode } = useDarkMode();

   const allDays = eachDayOfInterval({
      start: subDays(new Date(), numDays - 1),
      end: new Date(),
   });
   const data = allDays.map((day) => {
      const label = format(day, 'MMM dd');
      const totalSales =
         bookings
            ?.filter((booking) => isSameDay(day, new Date(booking.created_at)))
            .reduce((total, cur) => total + cur.totalPrice, 0) || 0;
      const extrasSales =
         bookings
            ?.filter((booking) => isSameDay(day, new Date(booking.created_at)))
            .reduce((total, cur) => total + cur.extrasPrice, 0) || 0;

      return {
         label,
         totalSales,
         extrasSales,
      };
   });

   const colors = isDarkMode
      ? {
           totalSales: { stroke: '#4f46e5', fill: '#4f46e5' },
           extrasSales: { stroke: '#22c55e', fill: '#22c55e' },
           text: '#e5e7eb',
           background: '#18212f',
        }
      : {
           totalSales: { stroke: '#4f46e5', fill: '#c7d2fe' },
           extrasSales: { stroke: '#16a34a', fill: '#dcfce7' },
           text: '#374151',
           background: '#fff',
        };
   return (
      <StyledSalesChart title="Sales in the last 30 days">
         <Heading as="h2">
            Sales from {format(allDays.at(0) as Date, 'MMM dd yyyy')} &mdash;{' '}
            {format(allDays.at(-1) as Date, 'MMM dd yyyy')}
         </Heading>

         <ResponsiveContainer height={300} width="100%">
            <AreaChart data={data} responsive>
               <XAxis
                  dataKey="label"
                  tick={{ fill: colors.text }}
                  tickLine={{ stroke: colors.text }}
               />
               <YAxis
                  unit="$"
                  tick={{ fill: colors.text }}
                  tickLine={{ stroke: colors.text }}
               />
               <CartesianGrid strokeDasharray="4" />
               <Tooltip contentStyle={{ backgroundColor: colors.background }} />
               <Area
                  dataKey="totalSales"
                  type="monotone"
                  stroke={colors.totalSales.stroke}
                  fill={colors.totalSales.fill}
                  strokeWidth={2}
                  name="Total Sales"
                  unit="$"
               />
               <Area
                  dataKey="extrasSales"
                  type="monotone"
                  stroke={colors.extrasSales.stroke}
                  fill={colors.extrasSales.fill}
                  strokeWidth={2}
                  name="Extras Sales"
                  unit="$"
               />
            </AreaChart>
         </ResponsiveContainer>
      </StyledSalesChart>
   );
}
