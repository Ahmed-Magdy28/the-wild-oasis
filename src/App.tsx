import { BrowserRouter, Navigate, Route, Routes } from 'react-router';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from 'react-hot-toast';
import Dashboard from './pages/Dashboard';
import Account from './pages/Account';
import Bookings from './pages/Bookings';
import Cabins from './pages/Cabins';
import Login from './pages/Login';
import Settings from './pages/Settings';
import Guests from './pages/Guests';
import PageNotFound from './pages/PageNotFound';
import { GlobalStyles } from './styles/GlobalStyles';
import AppLayout from './ui/AppLayout';
import queryClient from './services/reactQuery';
import Booking from './pages/Booking';
import Checkin from './pages/Checkin';
import SignUp from './pages/SignUp';
import ProtectedRoute from './ui/ProtectedRoute';
import DarkModeProvider from './context/DarkModeProvider';

export default function App() {
   return (
      <>
         <QueryClientProvider client={queryClient}>
            <DarkModeProvider>
               <ReactQueryDevtools initialIsOpen={false} />
               <GlobalStyles />
               <BrowserRouter>
                  <Routes>
                     <Route
                        element={
                           <ProtectedRoute>
                              <AppLayout />
                           </ProtectedRoute>
                        }
                     >
                        <Route
                           index
                           element={<Navigate replace to="dashboard" />}
                        />
                        <Route index path="dashboard" element={<Dashboard />} />
                        <Route path="account" element={<Account />} />
                        <Route path="bookings" element={<Bookings />} />
                        <Route
                           path="bookings/:bookingId"
                           element={<Booking />}
                        />
                        <Route
                           path="check-in/:bookingId"
                           element={<Checkin />}
                        />
                        <Route path="cabins" element={<Cabins />} />
                        <Route path="settings" element={<Settings />} />
                        <Route path="guests" element={<Guests />} />
                     </Route>
                     <Route path="login" element={<Login />} />
                     <Route path="signup" element={<SignUp />} />
                     <Route path="*" element={<PageNotFound />} />
                  </Routes>
               </BrowserRouter>
               <Toaster
                  position="top-center"
                  gutter={12}
                  containerStyle={{ margin: '8px' }}
                  toastOptions={{
                     success: {
                        duration: 5000,
                     },
                     error: {
                        duration: 5000,
                     },
                     style: {
                        fontSize: '16px',
                        maxWidth: '500px',
                        padding: '16px 24px',
                        backgroundColor: 'var(--color-grey-0)',
                        color: 'var(--color-grey-700)',
                     },
                  }}
               />
            </DarkModeProvider>
         </QueryClientProvider>
      </>
   );
}
