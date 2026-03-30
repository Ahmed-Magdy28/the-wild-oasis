import Button from '../../ui/Button';
import Modal from '../../ui/Modal';
import CreateGuestForm from './CreateGuestForm';

export default function AddGuest() {
   return (
      <div>
         <Modal>
            <Modal.Open opensWindowName="guest-form">
               <Button>Add new guest</Button>
            </Modal.Open>
            <Modal.Window name="guest-form">
               <CreateGuestForm />
            </Modal.Window>
         </Modal>
      </div>
   );
}
