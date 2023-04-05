import { Header } from './components/Header/Header.js';
import { Footer } from './components/Footer/Footer.js';

const Layout = ({ children }) => (
    <>
        <Header />
        <main>
            {children}
        </main>
        <Footer />
    </>
)

export { Layout };