// src/App.jsx

import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";

import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import ScrollToTop from "./components/common/ScrollToTop";

// Public Pages
import Home from "./pages/Home";
import CategoryPage from "./pages/CategoryPage";
import ArticleDetail from "./pages/ArticleDetail";
import SearchPage from "./pages/SearchPage";
import Videos from "./pages/Videos";
import Photos from "./pages/Photos";
import Epaper from "./pages/Epaper";
import EpaperAdmin from "./pages/EpaperAdmin";
import LiveTV from "./pages/LiveTV";
import Opinion from "./pages/Opinion";
import Trending from "./pages/Trending";
import AboutUs from "./pages/AboutUs";
import Contact from "./pages/Contact";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import NotFound from "./pages/NotFound";

// Admin Pages
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import DashboardStats from "./components/admin/DashboardStats";
import ManageCategories from "./pages/admin/ManageCategories";
import ManageNews from "./pages/admin/ManageNews";
import NewsEditor from "./components/admin/NewsEditor";
import ApprovalQueue from "./components/admin/ApprovalQueue";
import ManageEpaper from "./pages/admin/ManageEpaper";
import ManageUsers from "./pages/admin/ManageUsers";
import ManageMedia from "./pages/admin/ManageMedia";
import CommentModeration from "./components/admin/CommentModeration";
import BreakingNewsManager from "./components/admin/BreakingNewsManager";
import Settings from "./pages/admin/Settings";

/* ===================== PROTECTED ROUTE ===================== */
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("adminToken");

  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
};

/* ===================== LAYOUT ===================== */
const Layout = ({ children }) => {
  const location = useLocation();

  const isEpaperPage = location.pathname.startsWith("/epaper");
  const isAdminPage = location.pathname.startsWith("/admin");

  if (isEpaperPage || isAdminPage) {
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

/* ===================== APP ===================== */
function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen bg-gray-50">
        <Layout>
          <Routes>
            {/* ================= PUBLIC ROUTES ================= */}

            <Route path="/" element={<Home />} />

            {/* Category */}
            <Route path="/category/:category" element={<CategoryPage />} />
            <Route
              path="/category/:category/:subcategory"
              element={<CategoryPage />}
            />

            {/* Article */}
            <Route path="/article/:slug" element={<ArticleDetail />} />

            {/* Search */}
            <Route path="/search" element={<SearchPage />} />

            {/* Media */}
            <Route path="/videos" element={<Videos />} />
            <Route path="/photos" element={<Photos />} />

            {/* E-Paper */}
            <Route path="/epaper" element={<Epaper />} />
            <Route path="/epaper/admin" element={<EpaperAdmin />} />
            <Route path="/epaper/:edition" element={<Epaper />} />

            {/* Live TV */}
            <Route path="/live-tv" element={<LiveTV />} />

            {/* Editorial */}
            <Route path="/opinion" element={<Opinion />} />
            <Route path="/trending" element={<Trending />} />

            {/* Info */}
            <Route path="/about" element={<AboutUs />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />

            {/* ================= ADMIN ROUTES ================= */}

            {/* Admin Login (Public) */}
            <Route path="/admin/login" element={<AdminLogin />} />

            {/* Protected Admin Layout */}
            <Route
              path="/admin/*"
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            >
              {/* Nested Admin Pages */}
              <Route index element={<DashboardStats />} />
              <Route path="categories" element={<ManageCategories />} />
              <Route path="news" element={<ManageNews />} />
              <Route path="news/create" element={<NewsEditor />} />
              <Route path="news/edit/:id" element={<NewsEditor />} />
              <Route path="news/approval" element={<ApprovalQueue />} />
              <Route path="epaper" element={<ManageEpaper />} />
              <Route path="users" element={<ManageUsers />} />
              <Route path="media" element={<ManageMedia />} />
              <Route path="comments" element={<CommentModeration />} />
              <Route path="breaking" element={<BreakingNewsManager />} />
              <Route path="settings" element={<Settings />} />
            </Route>

            {/* ================= 404 ================= */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </div>
    </Router>
  );
}

export default App;
