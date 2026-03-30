import { useContext } from 'react';
import { DarkModeContext } from './DarkModeContext';

export function useDarkMode() {
   const context = useContext<
      | {
           isDarkMode: boolean;
           toggleDarkMode: () => void;
        }
      | undefined
   >(DarkModeContext);
   if (context === undefined) {
      throw new Error('useDarkMode must be used within a DarkModeProvider');
   }
   return context;
}
