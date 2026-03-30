import { max_rows_per_page } from '../utils/config';
import type { BookingsType, BookingMutationType } from '../types';
import { getToday } from '../utils/helpers';
import supabase from './supabase';

// get all bookings
export async function getBookings({
   filter,
   sortBy,
   page,
}: {
   filter?: { field: string; value: string } | null;
   sortBy?: { field: string; direction: string };
   page?: number;
} = {}) {
   let query = supabase
      .from('bookings')
      .select(
         'id,created_at,startDate,endDate,numNights,numGuests,status,totalPrice, cabins(name),guests(fullName, email)',
         { count: 'exact' },
      );

   // Filtering
   if (filter && filter?.field && filter?.value)
      query = query.eq(filter.field, filter.value);

   // Sorting
   if (sortBy && sortBy.field && sortBy.direction)
      query = query.order(sortBy.field, {
         ascending: sortBy.direction === 'asc',
      });

   // pagination
   if (page) {
      const start = (page - 1) * max_rows_per_page;
      const end = start + max_rows_per_page - 1;
      //  query.range(start_From: number, end_To: number)
      query = query.range(start, end);
   }

   const { data, error, count } = await query;

   if (error) {
      console.error(error);
      throw new Error('Bookings could not get loaded');
   }

   return { data: data as unknown as BookingsType, count };
}

// create a booking
export async function createBookingAPI(booking: BookingMutationType) {
   // Insert a row
   const { data, error } = await supabase
      .from('bookings')
      .insert([booking])
      .select();

   if (error) {
      console.error(error);
      throw new Error('Bookings could not get created');
   }

   return data as BookingsType;
}

// get a single booking by id
export async function getBooking(id: string | undefined) {
   const { data, error } = await supabase
      .from('bookings')
      .select('*, cabins(*), guests(*)')
      .eq('id', id)
      .single();

   if (error) {
      console.error(error);
      throw new Error('Booking not found');
   }

   return data;
}

// Returns all BOOKINGS that are were created after the given date. Useful to get bookings created in the last 30 days, for example.
export async function getBookingsAfterDate(date: string) {
   const { data, error } = await supabase
      .from('bookings')
      .select('created_at, totalPrice, extrasPrice')
      .gte('created_at', date)
      .lte('created_at', getToday({ end: true }));

   if (error) {
      console.error(error);
      throw new Error('Bookings could not get loaded');
   }
   return data;
}

// Returns all STAYS that are were created after the given date
export async function getStaysAfterDate(date: string) {
   const { data, error } = await supabase
      .from('bookings')
      // .select('*')
      .select('*, guests(fullName)')
      .gte('startDate', date)
      .lte('startDate', getToday());

   if (error) {
      console.error(error);
      throw new Error('Bookings could not get loaded');
   }

   return data;
}

// Activity means that there is a check in or a check out today
export async function getStaysTodayActivityAPI() {
   const { data, error } = await supabase
      .from('bookings')
      .select('*, guests(fullName, nationality, countryFlag)')
      .or(
         `and(status.eq.unconfirmed,startDate.eq.${getToday()}),and(status.eq.checked-in,endDate.eq.${getToday()})`,
      )
      .order('created_at');

   // Equivalent to this. But by querying this, we only download the data we actually need, otherwise we would need ALL bookings ever created
   // (stay.status === 'unconfirmed' && isToday(new Date(stay.startDate))) ||
   // (stay.status === 'checked-in' && isToday(new Date(stay.endDate)))

   if (error) {
      console.error(error);
      throw new Error('Bookings could not get loaded');
   }

   return data;
}

// update a booking
export async function updateBookingAPI(
   booking: BookingMutationType,
   id: number,
) {
   const { data, error } = await supabase
      .from('bookings')
      .update(booking)
      .eq('id', id)
      .select()
      .single();

   if (error) {
      console.error(error);
      throw new Error('Booking could not be updated');
   }
   return data;
}
// update a booking
export async function updateCheckInAPI(
   booking: {
      status: 'checked-in';
      isPaid: boolean;
      hasBreakfast?: boolean;
      extrasPrice?: number;
      totalPrice?: number;
   },
   id: string,
) {
   const { data, error } = await supabase
      .from('bookings')
      .update(booking)
      .eq('id', id)
      .select()
      .single();

   if (error) {
      console.error(error);
      throw new Error('Booking could not be updated');
   }
   return data;
}
export async function updateCheckOutAPI(
   booking: {
      status: 'checked-out';
   },
   id: number,
) {
   const { data, error } = await supabase
      .from('bookings')
      .update(booking)
      .eq('id', id)
      .select()
      .single();

   if (error) {
      console.error(error);
      throw new Error('Booking could not be updated');
   }
   return data;
}

// delete a booking
export async function deleteBookingAPI(id: number) {
   // REMEMBER RLS POLICIES
   const { data, error } = await supabase
      .from('bookings')
      .delete()
      .eq('id', id);

   if (error) {
      console.error(error);
      throw new Error('Booking could not be deleted');
   }
   return data;
}
