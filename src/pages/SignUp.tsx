import styled from 'styled-components';
import { Link } from 'react-router';
import SignupForm from '../features/authentication/SignupForm';
import Heading from '../ui/Heading';
import Logo from '../ui/Logo';

const SignUpLayout = styled.main`
   min-height: 100vh;
   display: grid;
   align-content: center;
   justify-items: center;
   background: linear-gradient(
      180deg,
      var(--color-grey-50) 0%,
      var(--color-grey-100) 100%
   );
   padding: 2.4rem 1.6rem;
`;

const SignUpCard = styled.section`
   width: min(84rem, 100%);
   background-color: var(--color-grey-0);
   border: 1px solid var(--color-grey-200);
   border-radius: var(--border-radius-lg);
   box-shadow: var(--shadow-md);
   overflow: hidden;
`;

const Header = styled.header`
   padding: 2.4rem 3.2rem;
   border-bottom: 1px solid var(--color-grey-100);
   text-align: center;
   display: grid;
   gap: 1.2rem;

   @media (max-width: 600px) {
      padding: 2rem 1.6rem;
   }
`;

const Subtitle = styled.p`
   font-size: 1.4rem;
   color: var(--color-grey-500);
`;

const FormArea = styled.div`
   padding: 2.4rem 3.2rem 2rem;

   @media (max-width: 600px) {
      padding: 1.6rem;
   }
`;

const Footer = styled.footer`
   padding: 0 3.2rem 2.4rem;
   text-align: center;
   font-size: 1.4rem;
   color: var(--color-grey-500);

   @media (max-width: 600px) {
      padding: 0 1.6rem 1.6rem;
   }
`;

const LoginLink = styled(Link)`
   color: var(--color-brand-600);
   font-weight: 600;

   &:hover {
      color: var(--color-brand-700);
      text-decoration: underline;
      text-underline-offset: 3px;
   }
`;

export default function SignUp() {
   return (
      <SignUpLayout>
         <SignUpCard>
            <Header>
               <Logo />
               <Heading as="h1">Create your account</Heading>
               <Subtitle>
                  Set up your profile to start managing cabins and bookings.
               </Subtitle>
            </Header>
            <FormArea>
               <SignupForm />
            </FormArea>
            <Footer>
               Already have an account? <LoginLink to="/login">Login</LoginLink>
            </Footer>
         </SignUpCard>
      </SignUpLayout>
   );
}
