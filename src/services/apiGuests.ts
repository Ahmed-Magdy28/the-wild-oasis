import type { PostgrestError } from '@supabase/supabase-js';
import type { GuestsType, GuestType } from '../types';
import supabase from './supabase';

export async function getGuestsAPI() {
   const {
      data: guests,
      error,
   }: { data: GuestsType | null; error: PostgrestError | null } = await supabase
      .from('guests')
      .select('*');

   if (error) {
      console.error('Error fetching guests:', error.message);
      throw new Error(error.message);
   }
   return guests;
}

export async function createGuestAPI(guest: GuestType) {
   const { data, error } = await supabase
      .from('guests')
      .insert([{ ...guest }])
      .select();

   if (error) {
      console.error('Error creating guest:', error.message);
      throw new Error(error.message);
   }

   return data;
}

export async function editGuestAPI(guest: GuestType, id: number) {
   // Update guest data
   const { data, error } = await supabase
      .from('guests')
      .update({ ...guest })
      .eq('id', id)
      .select();

   if (error) {
      console.error('Error editing guest:', error.message);
      throw new Error(error.message);
   }

   return data;
}

export async function deleteGuestAPI(id: number | undefined) {
   if (!id) {
      throw new Error('Guest ID is required for deletion');
   }

   const { data, error } = await supabase.from('guests').delete().eq('id', id);

   if (error) {
      console.error('Error deleting guest:', error.message);
      throw new Error(error.message);
   }

   return data;
}
