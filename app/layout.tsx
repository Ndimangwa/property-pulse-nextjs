//import '../assets/styles/globals.css';
import '@/assets/styles/globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata = {
    title: 'Property Pulse',
    keywords: 'rental, property, real estate, ndimangwa rental',
    description: 'Find the perfect rental property',
}

type LayoutProps = {
    children: React.ReactNode;
};

const MainLayout = ({children}: LayoutProps) => {
    return ( <html>
        <body>
            <Navbar/>
            <main>
                {children}
            </main>
            <Footer/>
        </body>
    </html> );
}
 
export default MainLayout;