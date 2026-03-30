import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import toast from 'react-hot-toast';
import { signUpApi } from '../../../services/apiAuth';

export default function useSignUp() {
   const navigate = useNavigate();
   const queryClient = useQueryClient();

   const {
      isPending: isSigningUp,
      mutate: signUp,
      error: errorSignUp,
   } = useMutation({
      mutationFn: ({
         email,
         password,
         fullName,
      }: {
         email: string;
         password: string;
         fullName: string;
      }) => signUpApi({ email, password, fullName }),
      onSuccess: (user) => {
         toast.success('Signed up successfully');
         queryClient.setQueryData(['user'], user.user);
         navigate('/dashboard', { replace: true });
      },
      onError: (error: Error) => {
         toast.error(`Error signing up, please try again: ${error.message}`);
      },
   });

   return { isSigningUp, signUp, errorSignUp };
}
