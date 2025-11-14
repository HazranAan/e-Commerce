// src/App.tsx
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ProductList from "./components/ProductList";
import ProductDetail from "./components/ProductDetail";
import CartPage from "./components/CartPage";
import LoginPage from "./components/LoginPage";
import { Product } from "./types";
import "./App.css";

const categories = ["All", "Coffee", "Tea", "Special"];

function App() {
  const [showWelcome, setShowWelcome] = useState(true);
  const [cart, setCart] = useState<Product[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const handleAddToCart = (product: Product) => {
    setCart((prev) => [...prev, product]);
  };

  const handleRemoveFromCart = (index: number) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCart([]); // optional: clear cart when logout
  };

  // WELCOME PAGE
  if (showWelcome) {
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

  // MAIN APP WITH NAVBAR + ROUTES
  return (
    <Router>
      <div>
        {/* NAVBAR */}
        <nav className="navbar navbar-light bg-light px-3">
          {/* Left: Brand */}
          <Link to="/" className="navbar-brand">
            My Drinks Café
          </Link>

          {/* Middle: Categories */}
          <div className="nav-categories">
            {["All", "Coffee", "Tea", "Special"].map((cat) => (
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

          {/* Right: Cart + Login/Logout */}
          <div className="d-flex align-items-center gap-2">
            <Link to="/cart" className="btn btn-outline-secondary btn-sm">
              Cart ({cart.length})
            </Link>
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

        {/* ROUTES */}
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
              <CartPage
                cart={cart}
                handleRemoveFromCart={handleRemoveFromCart}
              />
            }
          />
          <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
