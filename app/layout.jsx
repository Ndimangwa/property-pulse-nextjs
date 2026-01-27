//import '../assets/styles/globals.css';
import '@/assets/styles/globals.css';
const MainLayout = ({children}) => {
    return ( <html>
        <body>
            <main>
                Main Layout
                {children}
            </main>
        </body>
    </html> );
}
 
export default MainLayout;