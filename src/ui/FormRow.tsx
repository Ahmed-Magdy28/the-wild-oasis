import styled from 'styled-components';
import type { ReactElement, ReactNode } from 'react';
import type { FieldError, FieldErrorsImpl, Merge } from 'react-hook-form';

const StyledFormRow = styled.div`
   display: grid;
   align-items: center;
   grid-template-columns: 24rem 1fr 1.2fr;
   gap: 2.4rem;

   padding: 1.2rem 0;

   &:first-child {
      padding-top: 0;
   }

   &:last-child {
      padding-bottom: 0;
   }

   &:not(:last-child) {
      border-bottom: 1px solid var(--color-grey-100);
   }

   &:has(button) {
      display: flex;
      justify-content: flex-end;
      gap: 1.2rem;
      flex-wrap: wrap;
   }

   @media (max-width: 900px) {
      grid-template-columns: 1fr;
      gap: 0.8rem;
   }
`;

const Label = styled.label`
   font-weight: 500;
`;

const Error = styled.span`
   font-size: 1.4rem;
   color: var(--color-red-700);
`;

export default function FormRow({
   label,
   error,
   children,
}: {
   label?: string;
   error?:
      | string
      | FieldError
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      | Merge<FieldError, FieldErrorsImpl<any>>
      | undefined;
   children?: ReactElement | ReactNode;
}) {
   return (
      <StyledFormRow>
         {label && (
            <Label
               htmlFor={(children as ReactElement<{ id: string }>).props?.id}
            >
               {label}
            </Label>
         )}
         {children}
         {error && (
            <Error>
               {String(
                  typeof error === 'string'
                     ? error
                     : error?.message || 'An error occurred',
               )}
            </Error>
         )}
      </StyledFormRow>
   );
}
