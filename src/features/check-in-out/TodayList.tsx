import styled from 'styled-components';
import TodayItem from './TodayItem';
import type { BookingsType } from '../../types';

const StyledTodayList = styled.ul`
   overflow: scroll;
   overflow-x: hidden;

   /* Removing scrollbars for webkit, firefox, and ms, respectively */
   &::-webkit-scrollbar {
      width: 0 !important;
   }
   scrollbar-width: none;
   -ms-overflow-style: none;
`;

export default function TodayList({
   todayStays,
}: {
   todayStays: BookingsType;
}) {
   return (
      <StyledTodayList>
         {todayStays.map((activity) => (
            <TodayItem key={activity.id} todayActivity={activity} />
         ))}
      </StyledTodayList>
   );
}
