import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Select from './Select';

const StyledCountryFlagSelector = styled.div`
   display: flex;
   align-items: center;
   gap: 1.2rem;

   & span {
      font-size: 2rem;
   }
`;

interface Country {
   name: string;
   flag: string;
   isoCode: string;
}

export default function CountryFlagSelector({
   country,
   onChange,
   disabled,
}: {
   country?: string;
   onChange?: (value: string) => void;
   disabled?: boolean;
}) {
   const [countries, setCountries] = useState<Country[]>([]);
   const [isLoading, setIsLoading] = useState(false);

   useEffect(() => {
      async function fetchCountries() {
         try {
            setIsLoading(true);
            const res = await fetch(
               'https://restcountries.com/v3.1/all?fields=name,flags,cca2',
            );
            const data = await res.json();

            const countryData = data
               .map(
                  (country: {
                     name: { common: string };
                     flags: { svg: string };
                     cca2: string;
                  }) => ({
                     name: country.name.common,
                     flag: country.flags.svg,
                     isoCode: country.cca2,
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
      (item) => item.name.toLowerCase() === country?.toLowerCase(),
   );

   const options = [
      { value: '', label: 'Select country...' },
      ...countries.map((country) => ({
         value: country.name,
         label: country.name,
      })),
   ];

   return (
      <StyledCountryFlagSelector>
         <Select
            options={options}
            value={country}
            disabled={disabled || isLoading}
            onChange={(value) => onChange?.(value)}
            type="white"
         />
         {selectedCountry && (
            <img
               src={selectedCountry.flag}
               alt={`Flag of ${selectedCountry.name}`}
               style={{ width: '2.4rem' }}
            />
         )}
      </StyledCountryFlagSelector>
   );
}
