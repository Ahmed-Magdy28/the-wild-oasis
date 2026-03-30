import { useSearchParams } from 'react-router';
import type { CabinType, CabinsType } from '../../../types';

export default function useCabinFiltersAndSort(
   cabins: CabinsType | undefined | null,
) {
   const [searchParams] = useSearchParams();

   if (!cabins) return [];

   // 1. Filter Cabins
   const filterValue = searchParams.get('discount') || 'all';
   let filteredCabins = cabins;

   if (filterValue === 'no-discount') {
      filteredCabins = cabins.filter((cabin) => cabin.discount === 0);
   } else if (filterValue === 'discount') {
      filteredCabins = cabins.filter((cabin) => cabin.discount > 0);
   }

   // 2. Sort Cabins
   const sortBy = searchParams.get('sortBy') || 'name-asc';
   const [field, direction] = sortBy.split('-');
   const modifier = direction === 'asc' ? 1 : -1;

   const sortedCabins = [...filteredCabins].sort((a, b) => {
      const aValue = a[field as keyof CabinType];
      const bValue = b[field as keyof CabinType];

      // Handle string comparison
      if (typeof aValue === 'string' && typeof bValue === 'string') {
         return aValue.localeCompare(bValue) * modifier;
      }

      // Handle number comparison
      if (typeof aValue === 'number' && typeof bValue === 'number') {
         return (aValue - bValue) * modifier;
      }

      return 0;
   });

   return sortedCabins;
}
