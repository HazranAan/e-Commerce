// src/components/ProductDetail.tsx
import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { getProduct } from "../api";
import { Product } from "../types";
//import "./ProductDetail.css";

interface Props {
  handleAddToCart: (product: Product) => void;
  isLoggedIn: boolean;
}

const ProductDetail = ({ handleAddToCart, isLoggedIn }: Props) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const load = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await getProduct(id); // 👉 ambil 1 product dari API
        setProduct(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load product details.");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [id]);

  const handleClickAdd = () => {
    if (!product) return;

    if (!isLoggedIn) {
      alert("Please login or sign up before adding items to cart.");
      navigate("/login");
    } else {
      handleAddToCart(product);
    }
  };

  if (loading) {
    return (
      <div className="container mt-4">
        <p className="text-muted">Loading product...</p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="container mt-4">
        <p className="text-danger">{error || "Product not found."}</p>
        <Link to="/" className="btn btn-secondary mt-3">
          ← Back to menu
        </Link>
      </div>
    );
  }

  return (
    <div className="container mt-4 product-detail-page">
      <Link to="/" className="btn btn-link mb-3">
        ← Back to menu
      </Link>

      <div className="row">
        <div className="col-md-6 text-center">
          <div className="detail-image-wrapper">
            <img
              src={product.image}
              alt={product.name}
              className="detail-image"
            />
            {product.category && (
              <span className="detail-category-badge">
                {product.category.toUpperCase()}
              </span>
            )}
          </div>
        </div>

        <div className="col-md-6">
          <h2 className="detail-title">{product.name}</h2>
          {product.description && (
            <p className="detail-description">{product.description}</p>
          )}
          <p className="detail-price">RM {Number(product.price).toFixed(2)}</p>

          <button className="btn btn-custom mt-3" onClick={handleClickAdd}>
            + Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
