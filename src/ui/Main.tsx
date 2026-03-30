import styled from 'styled-components';

const Main = styled.main`
   background-color: var(--color-grey-50);
   padding: 4rem 4.8rem 6.4rem;
   overflow: auto;

   @media (max-width: 900px) {
      padding: 2.4rem 0 4rem;
   }
`;

export default Main;
