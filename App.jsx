// src/App.jsx

import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import ScrollToTop from './components/common/ScrollToTop';

// Pages
import Home from './pages/Home';
import CategoryPage from './pages/CategoryPage';
import ArticleDetail from './pages/ArticleDetail';
import SearchPage from './pages/SearchPage';
import Videos from './pages/Videos';
import Photos from './pages/Photos';
import Epaper from './pages/Epaper';
import EpaperAdmin from './pages/EpaperAdmin';  // Add this
import LiveTV from './pages/LiveTV';
import Opinion from './pages/Opinion';
import Trending from './pages/Trending';
import AboutUs from './pages/AboutUs';
import Contact from './pages/Contact';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import NotFound from './pages/NotFound';

// Layout wrapper
const Layout = ({ children }) => {
  const location = useLocation();

  // E-Paper pages ki header/footer vaddhu
  const isEpaperPage = location.pathname.startsWith('/epaper');

  if (isEpaperPage) {
    return <>{children}</>;
  }

  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen bg-gray-50">
        <Layout>
          <Routes>
            {/* Main Routes */}
            <Route path="/" element={<Home />} />

            {/* Category Routes */}
            <Route path="/category/:category" element={<CategoryPage />} />
            <Route path="/category/:category/:subcategory" element={<CategoryPage />} />

            {/* Article Route */}
            <Route path="/article/:slug" element={<ArticleDetail />} />

            {/* Search Route */}
            <Route path="/search" element={<SearchPage />} />

            {/* Media Routes */}
            <Route path="/videos" element={<Videos />} />
            <Route path="/photos" element={<Photos />} />

            {/* E-Paper Routes */}
            <Route path="/epaper" element={<Epaper />} />
            <Route path="/epaper/admin" element={<EpaperAdmin />} />
            <Route path="/epaper/:edition" element={<Epaper />} />

            {/* Live TV */}
            <Route path="/live-tv" element={<LiveTV />} />

            {/* Editorial Routes */}
            <Route path="/opinion" element={<Opinion />} />
            <Route path="/trending" element={<Trending />} />

            {/* Info Pages */}
            <Route path="/about" element={<AboutUs />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />

            {/* 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </div>
    </Router>
  );
}

export default App;