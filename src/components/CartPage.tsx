// src/components/CartPage.tsx
import { Product } from "../types";
import { useNavigate } from "react-router-dom";

interface Props {
  cart: Product[];
  handleRemoveFromCart: (index: number) => void;
}

const CartPage = ({ cart, handleRemoveFromCart }: Props) => {
  const navigate = useNavigate();

  // pastikan harga sentiasa number (support API bagi string/number)
  const getPrice = (item: Product) => Number(item.price) || 0;

  const totalPrice = cart.reduce((acc, item) => acc + getPrice(item), 0);

  const handleBack = () => navigate(-1);

  return (
    <div className="container mt-4 cart-page">
      <button className="btn btn-link px-0 mb-2" onClick={handleBack}>
        ← Back
      </button>

      <h2 className="cart-title">Your Cart</h2>
      <p className="cart-subtitle">
        Review your selected drinks before checkout.
      </p>

      {cart.length === 0 ? (
        <div className="card empty-cart-card mt-3 p-4">
          <p className="mb-2">Your cart is empty.</p>
          <button className="btn btn-primary" onClick={() => navigate("/")}>
            Back to menu
          </button>
        </div>
      ) : (
        <div className="row mt-3">
          {/* Cart items */}
          <div className="col-md-8 mb-3">
            <div className="card cart-items-card">
              <ul className="list-group list-group-flush">
                {cart.map((item, idx) => (
                  <li
                    key={idx}
                    className="list-group-item d-flex align-items-center cart-item"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="cart-item-img me-3"
                    />
                    <div className="flex-grow-1">
                      <div>{item.name}</div>
                      <div className="text-muted">
                        RM {getPrice(item).toFixed(2)}
                      </div>
                    </div>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleRemoveFromCart(idx)}
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Summary */}
          <div className="col-md-4">
            <div className="card cart-summary-card p-3">
              <h5 className="mb-3">Order Summary</h5>
              <div className="d-flex justify-content-between mb-2">
                <span>Items</span>
                <span>{cart.length}</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>Total</span>
                <span>RM {totalPrice.toFixed(2)}</span>
              </div>
              <button className="btn btn-success w-100 mt-2" disabled>
                Checkout (coming soon)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
