import styled from 'styled-components';
import { useNavigate } from 'react-router';
import LogOut from '../features/authentication/LogOut';
import ButtonIcon from './ButtonIcon';
import DarkModeToggle from './DarkModeToggle';
import UserAvatar from '../features/authentication/UserAvatar';
const StyledHeaderMenu = styled.ul`
   display: flex;
   gap: 0.4rem;
   list-style: none;
   flex-wrap: wrap;
`;

export default function HeaderMenu() {
   const navigate = useNavigate();
   return (
      <StyledHeaderMenu>
         <li>
            <ButtonIcon onClick={() => navigate('/account')}>
               <UserAvatar />
            </ButtonIcon>
         </li>
         <li>
            <DarkModeToggle />
         </li>
         <li>
            <LogOut />
         </li>
      </StyledHeaderMenu>
   );
}
