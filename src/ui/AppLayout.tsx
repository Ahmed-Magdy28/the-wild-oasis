import { Outlet } from 'react-router';
import styled from 'styled-components';
import { useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import Main from './Main';

const StyledAppLayout = styled.div<{ $isSidebarOpen: boolean }>`
   display: grid;
   grid-template-columns: ${(props) =>
      props.$isSidebarOpen ? '26rem 1fr' : '9.2rem 1fr'};
   grid-template-rows: auto 1fr;
   height: 100vh;
   transition: grid-template-columns 0.3s ease;

   @media (max-width: 900px) {
      grid-template-columns: 1fr;
      grid-template-rows: auto auto 1fr;
      height: auto;
      min-height: 100vh;
   }
`;

const Container = styled.div`
   width: 100%;
   max-width: 120rem;
   margin: 0 auto;
   display: flex;
   flex-direction: column;
   gap: 3.2rem;
   padding-inline: 1.6rem;
`;

export default function AppLayout() {
   const [isSidebarOpen, setIsSidebarOpen] = useState(true);

   return (
      <StyledAppLayout $isSidebarOpen={isSidebarOpen}>
         <Header />
         <Sidebar
            isSidebarOpen={isSidebarOpen}
            onToggleSidebar={() => setIsSidebarOpen((open) => !open)}
         />
         <Main>
            <Container>
               <Outlet />
            </Container>
         </Main>
      </StyledAppLayout>
   );
}
