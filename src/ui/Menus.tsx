import {
   createContext,
   useContext,
   useState,
   type ReactElement,
   type ReactNode,
} from 'react';
import { createPortal } from 'react-dom';
import { HiEllipsisVertical } from 'react-icons/hi2';
import styled from 'styled-components';
import useOutsideClick from '../hooks/useOutsideClick';
import type { MenuContextType } from '../types';

export const StyledMenu = styled.div`
   display: flex;
   align-items: center;
   justify-content: flex-end;
`;

export const StyledToggle = styled.button`
   background: none;
   border: none;
   padding: 0.4rem;
   border-radius: var(--border-radius-sm);
   transform: translateX(0.8rem);
   transition: all 0.2s;

   &:hover {
      background-color: var(--color-grey-100);
   }

   & svg {
      width: 2.4rem;
      height: 2.4rem;
      color: var(--color-grey-700);
   }
`;

const StyledList = styled.ul<{
   $position: { x: number | string; y: number | string };
}>`
   position: fixed;

   background-color: var(--color-grey-0);
   box-shadow: var(--shadow-md);
   border-radius: var(--border-radius-md);

   right: ${(props) => props.$position.x}px;
   top: ${(props) => props.$position.y}px;
`;

const StyledButton = styled.button`
   width: 100%;
   text-align: left;
   background: none;
   border: none;
   padding: 1.2rem 2.4rem;
   font-size: 1.4rem;
   transition: all 0.2s;

   display: flex;
   align-items: center;
   gap: 1.6rem;

   &:hover {
      background-color: var(--color-grey-50);
   }

   & svg {
      width: 1.6rem;
      height: 1.6rem;
      color: var(--color-grey-400);
      transition: all 0.3s;
   }
`;

const MenusContext = createContext<MenuContextType>({
   openId: '',
   close: () => {},
   open: () => {},
   position: undefined,
   setPosition: () => {},
});

type position = { x: number; y: number } | undefined;
function Menus({ children }: { children: ReactNode }) {
   const [openId, setOpenId] = useState('');
   const [position, setPosition] = useState<position>();

   const close = () => setOpenId('');
   const open = setOpenId;
   return (
      <MenusContext.Provider
         value={{ openId, open, close, position, setPosition }}
      >
         {children}
      </MenusContext.Provider>
   );
}
function Menu({ children }: { children: ReactNode }) {
   return <StyledMenu>{children}</StyledMenu>;
}
function Toggle({ id }: { id: string }) {
   const { openId, open, close, setPosition } = useContext(MenusContext);
   function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
      e.stopPropagation();
      const rect = (e.target as HTMLElement)
         .closest('button')!
         .getBoundingClientRect();
      setPosition({
         x: window.innerWidth - rect.width - rect.x,
         y: rect.y + rect.height + 8,
      });
      if (openId === '' || openId !== id) {
         open(id);
      } else {
         close();
      }
   }
   return (
      <StyledToggle onClick={handleClick}>
         <HiEllipsisVertical />
      </StyledToggle>
   );
}
function List({ id, children }: { id: string; children: ReactNode }) {
   const { openId, position, close } = useContext(MenusContext);
   // const ref = useOutsideClick(close) as React.RefObject<HTMLUListElement>;
   const ref = useOutsideClick(() => {
      close();
   }, false) as React.RefObject<HTMLUListElement>;
   if (openId !== id || !position) return null;

   return createPortal(
      <StyledList $position={position} ref={ref}>
         {children}
      </StyledList>,
      document.body,
   );
}
function Button({
   children,
   icon,
   onClick,
   disabled,
}: {
   children: ReactNode;
   icon: ReactElement;
   onClick?: () => void;
   disabled?: boolean;
}) {
   const { close } = useContext(MenusContext);

   function handleClick() {
      onClick?.();
      close();
   }

   return (
      <li>
         <StyledButton onClick={handleClick} disabled={disabled}>
            {icon}
            <span>{children}</span>
         </StyledButton>
      </li>
   );
}

Menus.Menu = Menu;
Menus.Toggle = Toggle;
Menus.List = List;
Menus.Button = Button;
export default Menus;
