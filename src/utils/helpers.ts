import { differenceInDays, formatDistance, parseISO } from 'date-fns';
import { supabaseUrl } from '../services/supabase';

// We want to make this function work for both Date objects and strings (which come from Supabase)
export const subtractDates = (
   dateStr1: string | Date,
   dateStr2: string | Date,
) => differenceInDays(parseISO(String(dateStr1)), parseISO(String(dateStr2)));

export const formatDistanceFromNow = (dateStr: string | Date) =>
   formatDistance(parseISO(String(dateStr)), new Date(), {
      addSuffix: true,
   })
      .replace('about ', '')
      .replace('in', 'In');

// Supabase needs an ISO date string. However, that string will be different on every render because the MS or SEC have changed, which isn't good. So we use this trick to remove any time
export const getToday = function (options = { end: false }) {
   const today = new Date();

   // This is necessary to compare with created_at from Supabase, because it it not at 0.0.0.0, so we need to set the date to be END of the day when we compare it with earlier dates
   if (options?.end)
      // Set to the last second of the day
      today.setUTCHours(23, 59, 59, 999);
   else today.setUTCHours(0, 0, 0, 0);
   return today.toISOString();
};

export const formatCurrency = (value: number) =>
   new Intl.NumberFormat('en', { style: 'currency', currency: 'USD' }).format(
      value,
   );

export function checkImageFiles(
   image: FileList | string,
   type: 'cabin' | 'guest',
) {
   // Check if image is a FileList with at least one file
   if (
      image instanceof FileList &&
      image.length > 0 &&
      image[0] instanceof File
   ) {
      const imageName =
         `${type}-${crypto.randomUUID()}-${image[0].name}`.replaceAll('/', '');
      const imagePath = `${supabaseUrl}/storage/v1/object/public/${type}-images/${imageName}`;

      return {
         type: 'file' as const,
         Image: image[0],
         path: imagePath,
         imageName: imageName,
      };
   }

   if (typeof image === 'string') {
      return {
         type: 'string' as const,
         Image: image,
         path: image, // Use the existing image path
         imageName: image,
      };
   }

   return { type: 'none' as const, Image: null, path: '', imageName: '' };
}
