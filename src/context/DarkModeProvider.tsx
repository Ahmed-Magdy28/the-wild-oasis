import { useEffect, type ReactNode } from 'react';
import { useLocalStorageState } from '../hooks/useLocalStorageState';
import { DarkModeContext } from './DarkModeContext';

export function DarkModeProvider({ children }: { children: ReactNode }) {
   const [isDarkMode, setIsDarkMode] = useLocalStorageState(
      window.matchMedia('(prefers-color-scheme: dark)').matches,
      'isDarkMode',
   );

   const toggleDarkMode = () => {
      setIsDarkMode(!isDarkMode);
   };

   useEffect(() => {
      if (isDarkMode) {
         document.documentElement.classList.add('dark-mode');
         document.documentElement.classList.remove('light-mode');
      } else {
         document.documentElement.classList.remove('dark-mode');
         document.documentElement.classList.add('light-mode');
      }
   }, [isDarkMode]);

   return (
      <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
         {children}
      </DarkModeContext.Provider>
   );
}

export default DarkModeProvider;
