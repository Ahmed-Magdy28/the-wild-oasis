import { useForm } from 'react-hook-form';
import Button from '../../ui/Button';
import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import useSignUp from './hooks/useSignup';
import Spinner from '../../ui/Spinner';

// Email regex: /\S+@\S+\.\S+/

type SignUpFormValues = {
   fullName: string;
   email: string;
   password: string;
   passwordConfirm: string;
};

function SignupForm() {
   const { register, formState, handleSubmit, reset } =
      useForm<SignUpFormValues>();
   const { errors } = formState;
   const { isSigningUp, signUp } = useSignUp();
   function onSubmit(data: SignUpFormValues) {
      console.log('Form submitted with data:', data);
      signUp(data, {
         onSettled: () => {
            reset();
         },
      });
   }
   if (isSigningUp) return <Spinner />;

   return (
      <Form onSubmit={handleSubmit(onSubmit)}>
         <FormRow label="Full name" error={errors.fullName?.message}>
            <Input
               type="text"
               id="fullName"
               disabled={isSigningUp}
               {...register('fullName', { required: 'This field is required' })}
            />
         </FormRow>

         <FormRow label="Email address" error={errors.email?.message}>
            <Input
               type="email"
               id="email"
               disabled={isSigningUp}
               {...register('email', {
                  required: 'This field is required',
                  pattern: {
                     value: /\S+@\S+\.\S+/,
                     message: 'Invalid email address',
                  },
               })}
            />
         </FormRow>

         <FormRow
            label="Password (min 8 characters)"
            error={errors.password?.message}
         >
            <Input
               type="password"
               id="password"
               disabled={isSigningUp}
               {...register('password', {
                  required: 'This field is required',
                  minLength: {
                     value: 8,
                     message: 'Password must be at least 8 characters',
                  },
               })}
            />
         </FormRow>

         <FormRow
            label="Repeat password"
            error={errors.passwordConfirm?.message}
         >
            <Input
               type="password"
               id="passwordConfirm"
               disabled={isSigningUp}
               {...register('passwordConfirm', {
                  required: 'This field is required',
                  validate: (value, formValues) =>
                     value === formValues.password || 'Passwords do not match',
               })}
            />
         </FormRow>

         <FormRow>
            {/* type is an HTML attribute! */}
            <Button disabled={isSigningUp} $variation="secondary" type="reset">
               Cancel
            </Button>
            <Button disabled={isSigningUp}>Create new user</Button>
         </FormRow>
      </Form>
   );
}

export default SignupForm;
