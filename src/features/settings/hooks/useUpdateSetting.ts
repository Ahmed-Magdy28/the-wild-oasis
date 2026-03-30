import { toast } from 'react-hot-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateSetting as UpdateSettingApi } from '../../../services/apiSettings';

export default function useUpdateSetting() {
   const queryClient = useQueryClient();

   const {
      isPending: isUpdating,
      mutate: updateSetting,
      error: errorUpdating,
   } = useMutation({
      mutationFn: UpdateSettingApi,
      onSuccess: () => {
         toast.success('Settings successfully Edited');
         queryClient.invalidateQueries({ queryKey: ['settings'] });
      },
      onError: () => {
         toast.error('Failed to update setting');
         console.error(errorUpdating?.message);
      },
   });

   return { isUpdating, updateSetting, errorUpdating };
}
