import { Outlet } from 'react-router-dom';
import Footer from 'components/Footer/Footer';
import Header from 'components/Header/Header';

const PageLayout = () => (
  <>
    <Header />
    <Outlet />
    <Footer />
  </>
);

export default PageLayout;
