import {
   cloneElement,
   createContext,
   useContext,
   useState,
   type ReactElement,
   type ReactNode,
} from 'react';
import { createPortal } from 'react-dom';
import { HiXMark } from 'react-icons/hi2';
import styled from 'styled-components';
import type { ModalContextType } from '../types';
import useOutsideClick from '../hooks/useOutsideClick';

const StyledModal = styled.div`
   position: fixed;
   top: 50%;
   left: 50%;
   transform: translate(-50%, -50%);
   background-color: var(--color-grey-0);
   border-radius: var(--border-radius-lg);
   box-shadow: var(--shadow-lg);
   padding: 3.2rem 4rem;
   transition: all 0.5s;
   width: min(84rem, calc(100vw - 3.2rem));
   max-height: calc(100vh - 3.2rem);
   overflow: auto;

   @media (max-width: 900px) {
      padding: 2.4rem 1.6rem;
   }
`;

const Overlay = styled.div`
   position: fixed;
   top: 0;
   left: 0;
   width: 100%;
   height: 100vh;
   background-color: var(--backdrop-color);
   backdrop-filter: blur(4px);
   z-index: 1000;
   transition: all 0.5s;
`;

const Button = styled.button`
   background: none;
   border: none;
   padding: 0.4rem;
   border-radius: var(--border-radius-sm);
   transform: translateX(0.8rem);
   transition: all 0.2s;
   position: absolute;
   top: 1.2rem;
   right: 1.9rem;

   &:hover {
      background-color: var(--color-grey-100);
   }

   & svg {
      width: 2.4rem;
      height: 2.4rem;
      /* Sometimes we need both */
      /* fill: var(--color-grey-500);
    stroke: var(--color-grey-500); */
      color: var(--color-grey-500);
   }
`;

const ModalContext = createContext<ModalContextType>({
   openName: '',
   close: () => {},
   open: () => {},
});

function Modal({ children }: { children: ReactNode }) {
   const [openName, setOpenName] = useState<string>('');
   const close = () => setOpenName('');
   const open = setOpenName;
   return (
      <ModalContext.Provider value={{ openName, close, open }}>
         {children}
      </ModalContext.Provider>
   );
}

function Open({
   children,
   opensWindowName,
}: {
   children: ReactElement<{ onClick: () => void }>;
   opensWindowName:
      | 'cabin-form'
      | 'table'
      | 'edit'
      | 'delete'
      | 'password'
      | 'booking-form'
      | 'user-data'
      | 'guest-form';
}) {
   const { open } = useContext(ModalContext);
   return cloneElement(children, { onClick: () => open(opensWindowName) });
}

function Window({
   children,
   name,
}: {
   children: ReactElement<{ onCloseModal: () => void }>;
   name:
      | 'table'
      | 'cabin-form'
      | 'edit'
      | 'delete'
      | 'password'
      | 'user-data'
      | 'booking-form'
      | 'guest-form';
}) {
   const { openName, close } = useContext(ModalContext);
   const ref = useOutsideClick(close) as React.RefObject<HTMLDivElement>;
   if (name !== openName) return null;

   return createPortal(
      <Overlay>
         <StyledModal ref={ref}>
            <Button onClick={close}>
               <HiXMark />
            </Button>
            <div>{cloneElement(children, { onCloseModal: close })}</div>
         </StyledModal>
      </Overlay>,
      document.body,
   );
}

Modal.Window = Window;
Modal.Open = Open;

export default Modal;
