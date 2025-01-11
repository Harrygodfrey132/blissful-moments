// components/Layout.tsx
import Header from './Header';
import Footer from './Footer';

interface LayoutProps {
  children: React.ReactNode;
  noLayout?: boolean;
}

const Layout = ({ children, noLayout = false }: LayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Conditionally render Header and Footer based on noLayout */}
      {!noLayout && <Header />}
      <main className="flex-grow">{children}</main>
      {!noLayout && <Footer />}
    </div>
  );
};

export default Layout;
