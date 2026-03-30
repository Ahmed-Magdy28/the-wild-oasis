import { HiArrowRightOnRectangle } from 'react-icons/hi2';
import ButtonIcon from '../../ui/ButtonIcon';
import useLogout from './hooks/useLogout';
import SpinnerMini from '../../ui/SpinnerMini';

export default function LogOut() {
   const { logout, isLoggingOut } = useLogout();
   return (
      <ButtonIcon onClick={() => logout()} disabled={isLoggingOut}>
         {isLoggingOut ? <SpinnerMini /> : <HiArrowRightOnRectangle />}
      </ButtonIcon>
   );
}
