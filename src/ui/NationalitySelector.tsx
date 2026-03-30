import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Select from './Select';

const StyledNationalitySelector = styled.div`
   display: flex;
   align-items: center;
   gap: 1.2rem;
`;

type Country = {
   name: string;
   flag: string;
};

export default function NationalitySelector({
   id,
   value,
   disabled,
   onChange,
}: {
   id?: string;
   value?: string;
   disabled?: boolean;
   onChange: (country: Country) => void;
}) {
   const [countries, setCountries] = useState<Country[]>([]);
   const [isLoading, setIsLoading] = useState(false);

   useEffect(() => {
      async function fetchCountries() {
         try {
            setIsLoading(true);
            const res = await fetch(
               'https://restcountries.com/v3.1/all?fields=name,flags',
            );
            const data = await res.json();

            const countryData = data
               .map(
                  (country: {
                     name: { common: string };
                     flags: { svg: string };
                  }) => ({
                     name: country.name.common,
                     flag: country.flags.svg,
                  }),
               )
               .sort((a: Country, b: Country) => a.name.localeCompare(b.name));

            setCountries(countryData);
         } catch {
            console.error('Countries could not be loaded');
         } finally {
            setIsLoading(false);
         }
      }

      fetchCountries();
   }, []);

   const selectedCountry = countries.find(
      (country) => country.name.toLowerCase() === value?.toLowerCase(),
   );

   const options = [
      { value: '', label: 'Select nationality...' },
      ...countries.map((country) => ({
         value: country.name,
         label: country.name,
      })),
   ];

   function handleChange(countryName: string) {
      const country = countries.find((item) => item.name === countryName);

      onChange({
         name: countryName,
         flag: country?.flag ?? '',
      });
   }

   return (
      <StyledNationalitySelector>
         <Select
            id={id}
            options={options}
            value={value}
            disabled={disabled || isLoading}
            onChange={handleChange}
            type="white"
         />
         {selectedCountry && (
            <img
               src={selectedCountry.flag}
               alt={`Flag of ${selectedCountry.name}`}
               style={{ width: '2.4rem' }}
            />
         )}
      </StyledNationalitySelector>
   );
}
