import styled from 'styled-components';
import { Link } from 'react-router';
import LoginForm from '../features/authentication/LoginForm';
import Logo from '../ui/Logo';
import Heading from '../ui/Heading';

const LoginLayout = styled.main`
   min-height: 100vh;
   display: grid;
   grid-template-columns: min(48rem, 100%);
   align-content: center;
   justify-content: center;
   gap: 3.2rem;
   background-color: var(--color-grey-50);
   padding: 2.4rem 1.6rem;
`;

function Login() {
   return (
      <LoginLayout>
         <Logo />
         <Heading as="h4">Log in to your Account</Heading>
         <LoginForm />
         <p>
            Don&apos;t have an account? <Link to="/signup">Sign up</Link>
         </p>
      </LoginLayout>
   );
}

export default Login;
