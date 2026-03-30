import styled from 'styled-components';

const StyledSelect = styled.select<{ $type?: 'white' }>`
   font-size: 1.4rem;
   padding: 0.8rem 1.2rem;
   border: 1px solid
      ${(props) =>
         props.$type === 'white'
            ? 'var(--color-grey-100)'
            : 'var(--color-grey-300)'};
   border-radius: var(--border-radius-sm);
   background-color: var(--color-grey-0);
   font-weight: 500;
   box-shadow: var(--shadow-sm);

   @media (max-width: 500px) {
      width: 100%;
   }
`;
export default function Select({
   id,
   options,
   value,
   type,
   onChange,
   disabled,
}: {
   id?: string;
   options: { value: string; label: string }[];
   value?: string;
   type?: 'white';
   onChange: (value: string) => void;
   disabled?: boolean;
}) {
   return (
      <StyledSelect
         id={id}
         value={value}
         disabled={disabled}
         $type={type}
         onChange={(e) => onChange(e.target.value)}
      >
         {options.map((option) => (
            <option key={option.value} value={option.value}>
               {option.label}
            </option>
         ))}
      </StyledSelect>
   );
}
