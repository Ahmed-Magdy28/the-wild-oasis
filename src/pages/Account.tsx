import UpdatePasswordForm from '../features/authentication/UpdatePasswordForm';
import UpdateUserDataForm from '../features/authentication/UpdateUserDataForm';
import Heading from '../ui/Heading';
import Row from '../ui/Row';
import Modal from '../ui/Modal';

function Account() {
   return (
      <>
         <Heading as="h1">Update your account</Heading>

         <Row>
            <Modal>
               <Modal.Open opensWindowName="user-data">
                  <Heading as="h3">Update user data</Heading>
               </Modal.Open>
               <Modal.Window name="user-data">
                  <UpdateUserDataForm />
               </Modal.Window>
            </Modal>
         </Row>

         <Row>
            <Modal>
               <Modal.Open opensWindowName="password">
                  <Heading as="h3">Update password</Heading>
               </Modal.Open>
               <Modal.Window name="password">
                  <UpdatePasswordForm />
               </Modal.Window>
            </Modal>
         </Row>
      </>
   );
}

export default Account;
