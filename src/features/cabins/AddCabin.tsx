import Button from '../../ui/Button';
import Modal from '../../ui/Modal';
import CreateCabinForm from './CreateCabinForm';

export default function AddCabin() {
   return (
      <div>
         <Modal>
            <Modal.Open opensWindowName="cabin-form">
               <Button>Add new cabins</Button>
            </Modal.Open>
            <Modal.Window name="cabin-form">
               <CreateCabinForm />
            </Modal.Window>
         </Modal>
      </div>
   );
}
