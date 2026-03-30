import { useQuery } from '@tanstack/react-query';
import { getStaysTodayActivityAPI } from '../../../services/apiBookings';
import type { BookingsType } from '../../../types';

export default function useTodayActivity() {
   const { isPending: isTodayActivityPending, data: todayActivity } = useQuery({
      queryKey: ['today-activity'],
      queryFn: getStaysTodayActivityAPI,
   });

   return {
      isTodayActivityPending,
      todayActivity: todayActivity as BookingsType | undefined,
   };
}
