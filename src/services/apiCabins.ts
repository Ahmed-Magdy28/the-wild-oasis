import type { PostgrestError } from '@supabase/supabase-js';
import type { CabinsType, CabinType } from '../types';
import supabase from './supabase';
import { checkImageFiles } from '../utils/helpers';

export async function getCabins() {
   const {
      data: cabins,
      error,
   }: { data: CabinsType | null; error: PostgrestError | null } = await supabase
      .from('cabins')
      .select('*');

   if (error) {
      console.error('Error fetching cabins:', error.message);
      throw new Error(error.message);
   }
   return cabins;
}

export async function createCabin(cabin: CabinType) {
   const { path, Image, imageName, type } = checkImageFiles(
      cabin.image,
      'cabin',
   );

   const { data, error } = await supabase
      .from('cabins')
      .insert([{ ...cabin, image: path }])
      .select();

   if (error) {
      console.error('Error creating cabin:', error.message);
      throw new Error(error.message);
   }

   // Upload image only if it's a new file
   if (type === 'file' && Image instanceof File) {
      try {
         await uploadCabinImage(Image, imageName);
      } catch (error: unknown) {
         console.error(
            'Error uploading cabin image:',
            (error as Error).message,
         );
         // Delete the cabin record if image upload fails
         if (data?.[0]?.id) {
            await deleteCabin(data[0].id);
         }
         // Re-throw to notify the caller
         throw error;
      }
   }

   return data;
}

export async function uploadCabinImage(image: File, imageName: string) {
   const { data, error } = await supabase.storage
      .from('cabin-images')
      .upload(imageName, image);

   if (error) {
      console.error('Error uploading cabin image:', error.message);
      throw new Error(error.message);
   }
   return data;
}

export async function editCabin(cabin: CabinType, id: number) {
   const { path, Image, imageName, type } = checkImageFiles(
      cabin.image,
      'cabin',
   );

   // Upload new image first if it's a file
   if (type === 'file' && Image instanceof File) {
      await uploadCabinImage(Image, imageName);
   }

   // Update cabin with new image path if applicable
   const { data, error } = await supabase
      .from('cabins')
      .update({ ...cabin, image: path })
      .eq('id', id)
      .select();

   if (error) {
      console.error('Error editing cabin:', error.message);
      throw new Error(error.message);
   }

   return data;
}

export async function deleteCabin(id: number | undefined) {
   if (!id) {
      throw new Error('Cabin ID is required for deletion');
   }

   const { data, error } = await supabase.from('cabins').delete().eq('id', id);

   if (error) {
      console.error('Error deleting cabin:', error.message);
      throw new Error(error.message);
   }

   return data;
}
