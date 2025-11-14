// src/components/ProductList.tsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { products } from "../products";
import { Product } from "../types";
import "../styles/ProductList.css";

interface Props {
  handleAddToCart: (product: Product) => void;
  isLoggedIn: boolean;
  cart: Product[];
}

const categories = ["All", "Coffee", "Tea", "Special"];

const ProductList = ({ handleAddToCart, isLoggedIn, cart }: Props) => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchTerm, setSearchTerm] = useState<string>("");

  const filteredProducts = products.filter((product) => {
    const matchCategory =
      selectedCategory === "All" || product.category === selectedCategory;
    const matchSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchCategory && matchSearch;
  });

  const totalItems = cart.length;
  const totalPrice = cart.reduce((acc, item) => acc + item.price, 0);

  const handleClickAdd = (product: Product) => {
    if (!isLoggedIn) {
      alert("Please login or sign up before adding items to cart.");
      navigate("/login");
    } else {
      handleAddToCart(product);
    }
  };

  return (
    <div className="container mt-4">
      {/* TITLE & SMALL SUMMARY */}
      <div className="d-flex justify-content-between align-items-center flex-wrap mb-3">
        <div>
          <h2 className="menu-title">☕ Drinks Menu</h2>
          <p className="menu-subtitle">
            Pick your favourite drink and add it to your cart.
          </p>
        </div>
        <div className="top-cart-summary">
          <span>{totalItems} item(s)</span>
          <span>·</span>
          <span>Total RM {totalPrice.toFixed(2)}</span>
        </div>
      </div>

      {/* TOP FILTER BAR – CATEGORIES + SEARCH */}
      <div className="filters-bar">
        <div className="filters-categories">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              className={`btn category-pill ${
                selectedCategory === cat ? "active" : ""
              }`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="filters-search">
          <input
            type="text"
            className="form-control search-input-top"
            placeholder="Search drinks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* PRODUCT GRID */}
      {filteredProducts.length === 0 && (
        <p className="text-muted mt-3">No drinks found. Try another search.</p>
      )}

      <div className="row mt-3">
        {filteredProducts.map((product) => (
          <div key={product.id} className="col-md-4 mb-4">
            <div className="card product-card modern-card">
              <Link to={`/product/${product.id}`}>
                <div className="image-wrapper">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="card-img-top product-img"
                  />
                  {product.category && (
                    <span className="category-badge">
                      {product.category.toUpperCase()}
                    </span>
                  )}
                </div>
              </Link>
              <div className="card-body text-center">
                <h5 className="product-title">{product.name}</h5>
                <p className="product-price">RM {product.price.toFixed(2)}</p>
                <button
                  className="btn btn-custom"
                  onClick={() => handleClickAdd(product)}
                >
                  + Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Link to="/cart" className="btn btn-warning mt-2">
        View Cart
      </Link>
    </div>
  );
};

export default ProductList;
