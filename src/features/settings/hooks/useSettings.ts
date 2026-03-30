import { useQuery } from '@tanstack/react-query';
import { getSettings } from '../../../services/apiSettings';
import type { SettingsType } from '../../../types';

export default function useSettings() {
   const {
      isPending: isGettingSettings,
      data: settings,
      error,
   } = useQuery<SettingsType>({
      queryKey: ['settings'],
      queryFn: getSettings,
   });
   return { isGettingSettings, settings, error };
}
