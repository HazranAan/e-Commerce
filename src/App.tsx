// src/App.tsx
import { useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  Navigate,
  useLocation,
} from "react-router-dom";

import ProductList from "./components/ProductList";
import ProductDetail from "./components/ProductDetail";
import CartPage from "./components/CartPage";
import LoginPage from "./components/LoginPage"; // pastikan file ni wujud
import AdminProducts from "./pages/AdminProducts";

import { Product } from "./types";
import "./App.css";

const categories = ["All", "Coffee", "Tea", "Special"];

function RequireAdmin({
  isLoggedIn,
  isAdmin,
  children,
}: {
  isLoggedIn: boolean;
  isAdmin: boolean;
  children: JSX.Element;
}) {
  const location = useLocation();
  if (!isLoggedIn || !isAdmin) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }
  return children;
}

function AppShell() {
  const [cart, setCart] = useState<Product[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [showWelcome, setShowWelcome] = useState(true);

  const location = useLocation();
  const isAdminPage = location.pathname.startsWith("/admin");
  const isLoginPage = location.pathname === "/login";
  const isHomePage = location.pathname === "/";

  const handleAddToCart = (product: Product) => {
    setCart((prev) => [...prev, product]);
  };

  const handleRemoveFromCart = (index: number) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  };

  const handleLogin = (isAdminFlag: boolean) => {
    setIsLoggedIn(true);
    setIsAdmin(isAdminFlag);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsAdmin(false);
    setCart([]);
  };

  // ✅ Welcome screen hanya di homepage ("/")
  if (showWelcome && isHomePage) {
    return (
      <div className="welcome-container">
        <div className="welcome-glass">
          <img
            src="https://i.pinimg.com/736x/39/3b/b1/393bb1bb15940aea508dd07c5da23917.jpg"
            alt="Logo"
            className="welcome-logo"
          />
          <h1 className="welcome-heading">Hi, Welcome! 👋</h1>
          <p className="welcome-text">Ready to explore our drinks menu?</p>
          <button
            className="welcome-start-btn"
            onClick={() => setShowWelcome(false)}
          >
            Let’s Get Started
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* ✅ HIDE NAVBAR KAT LOGIN PAGE */}
      {!isLoginPage && (
        <nav className="navbar navbar-light bg-light px-3">
          <Link to="/" className="navbar-brand">
            My Drinks Café
          </Link>

          {/* HANYA tunjuk category pill kalau BUKAN di admin page */}
          {!isAdminPage && (
            <div className="nav-categories">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  className={`nav-cat-pill ${
                    selectedCategory === cat ? "active" : ""
                  }`}
                  onClick={() => setSelectedCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}

          <div className="d-flex align-items-center gap-2">
            {!isAdminPage && (
              <Link to="/cart" className="btn btn-outline-secondary btn-sm">
                Cart ({cart.length})
              </Link>
            )}

            {/* Admin button hanya appear kalau user tu admin */}
            {isAdmin && (
              <Link to="/admin/products" className="btn btn-warning btn-sm">
                Admin
              </Link>
            )}

            {isLoggedIn ? (
              <button
                className="btn btn-outline-danger btn-sm"
                onClick={handleLogout}
              >
                Logout
              </button>
            ) : (
              <Link to="/login" className="btn btn-primary btn-sm">
                Login / Sign Up
              </Link>
            )}
          </div>
        </nav>
      )}

      {/* ✅ ROUTES – termasuk /login supaya tak ada error No routes matched */}
      <Routes>
        <Route
          path="/"
          element={
            <ProductList
              handleAddToCart={handleAddToCart}
              isLoggedIn={isLoggedIn}
              cart={cart}
              selectedCategory={selectedCategory}
            />
          }
        />
        <Route
          path="/product/:id"
          element={
            <ProductDetail
              handleAddToCart={handleAddToCart}
              isLoggedIn={isLoggedIn}
            />
          }
        />
        <Route
          path="/cart"
          element={
            <CartPage cart={cart} handleRemoveFromCart={handleRemoveFromCart} />
          }
        />
        <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
        <Route
          path="/admin/products"
          element={
            <RequireAdmin isLoggedIn={isLoggedIn} isAdmin={isAdmin}>
              <AdminProducts />
            </RequireAdmin>
          }
        />
      </Routes>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  );
}

export default App;
