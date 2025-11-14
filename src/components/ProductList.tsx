import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { products } from "../products";
import { Product } from "../types";
import "../styles/ProductList.css";

interface Props {
  handleAddToCart: (product: Product) => void;
  isLoggedIn: boolean;
  cart: Product[];
  selectedCategory?: string; // optional supaya tak rosak kalau tak dihantar
}

const ProductList = ({
  handleAddToCart,
  isLoggedIn,
  cart,
  selectedCategory,
}: Props) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState<string>("");

  // fallback: kalau selectedCategory tak ada, assume "All"
  const effectiveCategory =
    selectedCategory && selectedCategory !== "" ? selectedCategory : "All";

  const filteredProducts = products.filter((product) => {
    const matchCategory =
      effectiveCategory === "All" || product.category === effectiveCategory;

    const lowerSearch = searchTerm.toLowerCase();
    const matchSearch =
      product.name.toLowerCase().includes(lowerSearch) ||
      product.description.toLowerCase().includes(lowerSearch);

    return matchCategory && matchSearch;
  });

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
      {/* TITLE */}
      <div className="mb-3">
        <h2 className="menu-title">☕ Drinks Menu</h2>
        <p className="menu-subtitle">
          Pick your favourite drink and add it to your cart.
        </p>
      </div>

      {/* SEARCH BAR BAWAH NAVBAR */}
      <div className="search-bar-row">
        <input
          type="text"
          className="form-control search-input-top"
          placeholder="Search drinks..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
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

      {/* BUTANG VIEW CART BAWAH – DAH DIBUANG */}
    </div>
  );
};

export default ProductList;
