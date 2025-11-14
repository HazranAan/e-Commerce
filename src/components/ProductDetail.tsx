// src/components/ProductDetail.tsx
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { products } from "../products";
import { Product } from "../types";

interface Props {
  handleAddToCart: (product: Product) => void;
  isLoggedIn: boolean;
}

const ProductDetail = ({ handleAddToCart, isLoggedIn }: Props) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    const p = products.find((item) => item.id === Number(id));
    if (p) setProduct(p);
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

  if (!product)
    return (
      <div style={{ padding: "40px" }}>
        <h3>Product not found</h3>
        <button className="btn btn-secondary mt-3" onClick={() => navigate(-1)}>
          Back
        </button>
      </div>
    );

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "50px",
        backgroundColor: "#f5f5f5",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          maxWidth: "1200px",
          width: "100%",
          backgroundColor: "#fff",
          borderRadius: "10px",
          boxShadow: "0 10px 20px rgba(0,0,0,0.2)",
          overflow: "hidden",
        }}
      >
        <div style={{ flex: 1 }}>
          <img
            src={product.image}
            alt={product.name}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>
        <div
          style={{
            flex: 1,
            padding: "40px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div>
            <h1>{product.name}</h1>
            <h3 style={{ color: "#555" }}>RM {product.price.toFixed(2)}</h3>
            <p
              style={{ marginTop: "20px", fontSize: "18px", lineHeight: "1.6" }}
            >
              {product.description}
            </p>
          </div>
          <div>
            <button
              style={{
                padding: "15px 30px",
                fontSize: "18px",
                marginRight: "15px",
              }}
              className="btn btn-primary"
              onClick={handleClickAdd}
            >
              Add to Cart
            </button>
            <button
              style={{ padding: "15px 30px", fontSize: "18px" }}
              className="btn btn-outline-secondary"
              onClick={() => navigate(-1)}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
