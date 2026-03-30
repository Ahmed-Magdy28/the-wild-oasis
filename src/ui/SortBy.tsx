import { useSearchParams } from 'react-router';
import Select from './Select';

export default function SortBy({
   options,
}: {
   options: { value: string; label: string }[];
}) {
   const [searchParams, setSearchParams] = useSearchParams();
   const sortBy = searchParams.get('sortBy') || '';

   return (
      <Select
         options={options}
         value={sortBy}
         onChange={(value) => {
            searchParams.set('sortBy', value);
            setSearchParams(searchParams);
         }}
      />
   );
}
