'use client';
import {SessionProvider} from 'next-auth/react';
type AuthProviderProps = {
    children: string | React.ReactNode;
};

const AuthProvider = ({children} : AuthProviderProps) => {
    return ( 
        <SessionProvider>{children}</SessionProvider>
     );
}
 /*A client component can be used inside a server component [the vice versa is not true]
    This is a technique of wrapping all pages in SessionProvider ,
    while leaving the layout page, being a server page
 */
export default AuthProvider;