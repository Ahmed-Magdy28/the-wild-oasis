import styled from 'styled-components';
import Logo from './Logo';
import MainNav from './MainNav';

const StyledSidebar = styled.aside<{ $isOpen: boolean }>`
   background-color: var(--color-grey-0);
   padding: ${(props) => (props.$isOpen ? '3.2rem 2.4rem' : '3.2rem 1.2rem')};
   border-right: 1px solid var(--color-grey-100);
   grid-row: 1/-1;
   display: flex;
   flex-direction: column;
   gap: ${(props) => (props.$isOpen ? '3.2rem' : '2rem')};
   align-items: ${(props) => (props.$isOpen ? 'stretch' : 'center')};
   transition:
      padding 0.3s ease,
      gap 0.3s ease;

   @media (max-width: 900px) {
      grid-row: auto;
      border-right: none;
      border-bottom: 1px solid var(--color-grey-100);
      padding: 1.6rem;
      gap: 1.6rem;
      align-items: stretch;
   }
`;

const LogoButton = styled.button`
   border: none;
   background: transparent;
   padding: 0;
   margin: 0 auto;
   display: flex;
   align-items: center;
   justify-content: center;
`;

export default function Sidebar({
   isSidebarOpen,
   onToggleSidebar,
}: {
   isSidebarOpen: boolean;
   onToggleSidebar: () => void;
}) {
   return (
      <StyledSidebar $isOpen={isSidebarOpen}>
         <LogoButton
            type="button"
            onClick={onToggleSidebar}
            aria-label={isSidebarOpen ? 'Close sidebar' : 'Open sidebar'}
            title={isSidebarOpen ? 'Close sidebar' : 'Open sidebar'}
         >
            <Logo />
         </LogoButton>
         <MainNav isSidebarOpen={isSidebarOpen} />
      </StyledSidebar>
   );
}
