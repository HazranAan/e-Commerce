// src/components/ProductList.tsx
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getProducts } from "../api";
import { Product } from "../types";
import "../styles/ProductList.css";

interface Props {
  handleAddToCart: (product: Product) => void;
  isLoggedIn: boolean;
  cart: Product[];
  selectedCategory?: string;
}

const ProductList = ({
  handleAddToCart,
  isLoggedIn,
  cart,
  selectedCategory,
}: Props) => {
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [productList, setProductList] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 📡 Call API sekali bila component mount
  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await getProducts(); // 👉 ambil semua product dari API
        setProductList(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load products.");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  const effectiveCategory =
    selectedCategory && selectedCategory !== "" ? selectedCategory : "All";

  // Filter ikut category + search
  const filteredProducts = productList.filter((product) => {
    const matchCategory =
      effectiveCategory === "All" || product.category === effectiveCategory;

    const lowerSearch = searchTerm.toLowerCase();
    const matchSearch =
      product.name.toLowerCase().includes(lowerSearch) ||
      (product.description || "").toLowerCase().includes(lowerSearch);

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

      {/* SEARCH BAR */}
      <div className="search-bar-row">
        <input
          type="text"
          className="form-control search-input-top"
          placeholder="Search drinks..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* LOADING / ERROR STATE */}
      {loading && <p className="text-muted mt-3">Loading drinks...</p>}
      {error && <p className="text-danger mt-3">{error}</p>}

      {!loading && filteredProducts.length === 0 && !error && (
        <p className="text-muted mt-3">No drinks found. Try another search.</p>
      )}

      {/* PRODUCT GRID */}
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
                <p className="product-price">
                  RM {Number(product.price).toFixed(2)}
                </p>
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
    </div>
  );
};

export default ProductList;
