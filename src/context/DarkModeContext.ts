import { createContext } from 'react';

export const DarkModeContext = createContext<
   | {
        isDarkMode: boolean;
        toggleDarkMode: () => void;
     }
   | undefined
>(undefined);
