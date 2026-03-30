import styled, { css } from 'styled-components';

const Form = styled.form<{ type?: 'regular' | 'modal' }>`
   ${(props) =>
      props.type === 'regular' &&
      css`
         padding: 2.4rem 4rem;

         /* Box */
         background-color: var(--color-grey-0);
         border: 1px solid var(--color-grey-100);
         border-radius: var(--border-radius-md);

         @media (max-width: 900px) {
            padding: 2rem 1.6rem;
         }
      `}

   ${(props) =>
      props.type === 'modal' &&
      css`
         width: min(80rem, calc(100vw - 4rem));
      `}
    
  overflow: hidden;
   font-size: 1.4rem;
`;

export default Form;
