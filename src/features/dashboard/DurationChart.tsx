import styled from 'styled-components';
import { Label, Pie, PieChart, ResponsiveContainer } from 'recharts';
import type { BookingsType } from '../../types';
import Heading from '../../ui/Heading';
import { useDarkMode } from '../../context/useDarkMode';

const ChartBox = styled.div`
   /* Box */
   background-color: var(--color-grey-0);
   border: 1px solid var(--color-grey-100);
   border-radius: var(--border-radius-md);

   padding: 2.4rem 3.2rem;
   grid-column: 3 / span 2;

   & > *:first-child {
      margin-bottom: 1.6rem;
   }

   & .recharts-pie-label-text {
      font-weight: 600;
   }

   @media (max-width: 1200px) {
      grid-column: 1 / -1;
   }

   @media (max-width: 700px) {
      padding: 2rem 1.6rem;
   }
`;

type StartDataItem = {
   duration: string;
   value: number;
   fill: string;
   stroke: string;
};

const startDataLight = [
   {
      duration: '1 night',
      value: 0,
      fill: '#ef4444',
      stroke: '#ef4444',
   },
   {
      duration: '2 nights',
      value: 0,
      fill: '#f97316',
      stroke: '#f97316',
   },
   {
      duration: '3 nights',
      value: 0,
      fill: '#eab308',
      stroke: '#eab308',
   },
   {
      duration: '4-5 nights',
      value: 0,
      fill: '#84cc16',
      stroke: '#84cc16',
   },
   {
      duration: '6-7 nights',
      value: 0,
      fill: '#22c55e',
      stroke: '#22c55e',
   },
   {
      duration: '8-14 nights',
      value: 0,
      fill: '#14b8a6',
      stroke: '#14b8a6',
   },
   {
      duration: '15-21 nights',
      value: 0,
      fill: '#3b82f6',
      stroke: '#3b82f6',
   },
   {
      duration: '21+ nights',
      value: 0,
      fill: '#a855f7',
      stroke: '#a855f7',
   },
];

const startDataDark = [
   {
      duration: '1 night',
      value: 0,
      fill: '#b91c1c',
      stroke: '#b91c1c',
   },
   {
      duration: '2 nights',
      value: 0,
      fill: '#c2410c',
      stroke: '#c2410c',
   },
   {
      duration: '3 nights',
      value: 0,
      fill: '#a16207',
      stroke: '#a16207',
   },
   {
      duration: '4-5 nights',
      value: 0,
      fill: '#4d7c0f',
      stroke: '#4d7c0f',
   },
   {
      duration: '6-7 nights',
      value: 0,
      fill: '#15803d',
      stroke: '#15803d',
   },
   {
      duration: '8-14 nights',
      value: 0,
      fill: '#0f766e',
      stroke: '#0f766e',
   },
   {
      duration: '15-21 nights',
      value: 0,
      fill: '#1d4ed8',
      stroke: '#1d4ed8',
   },
   {
      duration: '21+ nights',
      value: 0,
      fill: '#7e22ce',
      stroke: '#7e22ce',
   },
];

function prepareData(
   startData: StartDataItem[],
   stays: BookingsType | undefined,
): StartDataItem[] {
   // A bit ugly code, but sometimes this is what it takes when working with real data 😅

   function incArrayValue(arr: StartDataItem[], field: string) {
      return arr.map((obj) =>
         obj.duration === field ? { ...obj, value: obj.value + 1 } : obj,
      );
   }

   const data = (stays ?? [])
      .reduce((arr, cur) => {
         const num = cur.numNights;
         if (num === 1) return incArrayValue(arr, '1 night');
         if (num === 2) return incArrayValue(arr, '2 nights');
         if (num === 3) return incArrayValue(arr, '3 nights');
         if ([4, 5].includes(num)) return incArrayValue(arr, '4-5 nights');
         if ([6, 7].includes(num)) return incArrayValue(arr, '6-7 nights');
         if (num >= 8 && num <= 14) return incArrayValue(arr, '8-14 nights');
         if (num >= 15 && num <= 21) return incArrayValue(arr, '15-21 nights');
         if (num >= 21) return incArrayValue(arr, '21+ nights');
         return arr;
      }, startData)
      .filter((obj) => obj.value > 0);

   return data;
}

export default function DurationChart({
   confirmedStays,
   stays,
}: {
   confirmedStays: BookingsType | undefined;
   stays: BookingsType | undefined;
}) {
   void confirmedStays;
   const { isDarkMode } = useDarkMode();
   const startData = isDarkMode ? startDataDark : startDataLight;
   return (
      <ChartBox>
         <Heading as="h2">Stay duration summary</Heading>
         <ResponsiveContainer width="100%" height={220}>
            <PieChart>
               <Pie
                  data={prepareData(startData, stays)}
                  nameKey="duration"
                  dataKey="value"
                  width={'50%'}
                  height={'50%'}
                  innerRadius={80}
                  outerRadius={110}
                  cx="50%"
                  cy="50%"
                  paddingAngle={3}
               >
                  <Label />
                  {/* <Legend
                     verticalAlign="top"
                     align="right"
                     iconSize={10}
                     iconType="circle"
                     wrapperStyle={{ paddingTop: '0.5rem' }}
                  /> */}
               </Pie>
            </PieChart>
         </ResponsiveContainer>
      </ChartBox>
   );
}
