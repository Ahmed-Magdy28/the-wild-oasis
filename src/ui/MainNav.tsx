import { NavLink } from 'react-router';
import styled from 'styled-components';
import {
   HiOutlineCalendarDays,
   HiOutlineCog6Tooth,
   HiOutlineHome,
   HiOutlineHomeModern,
   HiOutlineUsers,
} from 'react-icons/hi2';

export const NavList = styled.ul<{ $isSidebarOpen: boolean }>`
   display: flex;
   flex-direction: column;
   gap: 0.8rem;

   & span {
      display: ${(props) => (props.$isSidebarOpen ? 'inline' : 'none')};
   }

   @media (max-width: 900px) {
      display: ${(props) => (props.$isSidebarOpen ? 'flex' : 'none')};
      flex-direction: row;
      overflow-x: auto;
      gap: 0.6rem;
      padding-bottom: 0.2rem;

      & span {
         display: inline;
      }
   }
`;

export const StyledNavLink = styled(NavLink)<{ $isSidebarOpen: boolean }>`
   &:link,
   &:visited {
      display: flex;
      align-items: center;
      gap: ${(props) => (props.$isSidebarOpen ? '1.2rem' : '0')};
      justify-content: ${(props) =>
         props.$isSidebarOpen ? 'flex-start' : 'center'};

      color: var(--color-grey-600);
      font-size: 1.6rem;
      font-weight: 500;
      padding: ${(props) =>
         props.$isSidebarOpen ? '1.2rem 2.4rem' : '1.2rem 1.4rem'};
      transition: all 0.3s;
   }
   /* This works because react-router places the active class on the active NavLink */
   &:hover,
   &:active,
   &.active:link,
   &.active:visited {
      color: var(--color-grey-800);
      background-color: var(--color-grey-50);
      border-radius: var(--border-radius-sm);
   }

   & svg {
      width: 2.4rem;
      height: 2.4rem;
      color: var(--color-grey-400);
      transition: all 0.3s;
   }

   &:hover svg,
   &:active svg,
   &.active:link svg,
   &.active:visited svg {
      color: var(--color-brand-600);
   }

   @media (max-width: 900px) {
      &:link,
      &:visited {
         padding: 0.9rem 1.2rem;
         white-space: nowrap;
         gap: 0.8rem;
         justify-content: flex-start;
      }

      & svg {
         width: 2rem;
         height: 2rem;
      }
   }
`;

export default function MainNav({ isSidebarOpen }: { isSidebarOpen: boolean }) {
   return (
      <nav>
         <NavList as="ul" $isSidebarOpen={isSidebarOpen}>
            <li>
               <StyledNavLink to="/dashboard" $isSidebarOpen={isSidebarOpen}>
                  <HiOutlineHome />
                  <span>Home</span>
               </StyledNavLink>
            </li>

            <li>
               <StyledNavLink to="/bookings" $isSidebarOpen={isSidebarOpen}>
                  <HiOutlineCalendarDays />
                  <span>Bookings</span>
               </StyledNavLink>
            </li>

            <li>
               <StyledNavLink to="/cabins" $isSidebarOpen={isSidebarOpen}>
                  <HiOutlineHomeModern />
                  <span>Cabins</span>
               </StyledNavLink>
            </li>

            <li>
               <StyledNavLink to="/guests" $isSidebarOpen={isSidebarOpen}>
                  <HiOutlineUsers />
                  <span>Guests</span>
               </StyledNavLink>
            </li>

            <li>
               <StyledNavLink to="/settings" $isSidebarOpen={isSidebarOpen}>
                  <HiOutlineCog6Tooth />
                  <span>settings</span>
               </StyledNavLink>
            </li>
         </NavList>
      </nav>
   );
}
