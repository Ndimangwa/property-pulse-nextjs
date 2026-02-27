//import '../assets/styles/globals.css';
import '@/assets/styles/globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AuthProvider from '@/components/AuthProvider';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { GlobalProvider } from '@/context/GlobalContext';
import 'photoswipe/dist/photoswipe.css';

export const metadata = {
    title: 'Property Pulse',
    keywords: 'rental, property, real estate, ndimangwa rental',
    description: 'Find the perfect rental property',
}

type LayoutProps = {
    children: React.ReactNode;
};

const MainLayout = ({ children }: LayoutProps) => {
    return (
        <AuthProvider>
            <GlobalProvider>
                <html>
                    <body>
                        <Navbar />
                        <main>
                            {children}
                        </main>
                        <Footer />
                        {/* For ToastContainer , it does not matter where you put it*/}
                        <ToastContainer />
                    </body>
                </html>
            </GlobalProvider>
        </AuthProvider>
    );
}

export default MainLayout;