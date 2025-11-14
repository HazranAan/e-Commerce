// src/components/CartPage.tsx
import { useNavigate, Link } from "react-router-dom";
import { Product } from "../data/products";

interface Props {
  cart: Product[];
  handleRemoveFromCart: (index: number) => void;
}

const CartPage = ({ cart, handleRemoveFromCart }: Props) => {
  const navigate = useNavigate();
  const totalPrice = cart.reduce((acc, item) => acc + item.price, 0);

  return (
    <div className="container cart-page mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h2 className="cart-title">Your Cart</h2>
          <p className="cart-subtitle">
            Review your selected drinks before checkout.
          </p>
        </div>
        <button
          className="btn btn-outline-secondary"
          onClick={() => navigate(-1)}
        >
          ⬅ Back
        </button>
      </div>

      {cart.length === 0 ? (
        <div className="card empty-cart-card">
          <div className="card-body text-center">
            <h4 className="mb-2">Your cart is empty</h4>
            <p className="text-muted mb-3">
              Looks like you haven't added any drinks yet.
            </p>
            <Link to="/" className="btn btn-primary">
              Browse Drinks ☕
            </Link>
          </div>
        </div>
      ) : (
        <div className="row">
          {/* LEFT: CART ITEMS */}
          <div className="col-md-8 mb-3">
            <div className="card cart-items-card">
              <ul className="list-group list-group-flush">
                {cart.map((item, idx) => (
                  <li
                    key={idx}
                    className="list-group-item cart-item d-flex align-items-center justify-content-between"
                  >
                    <div className="d-flex align-items-center">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="cart-item-img me-3"
                      />
                      <div>
                        <h6 className="mb-1">{item.name}</h6>
                        <small className="text-muted">
                          RM {item.price.toFixed(2)}
                        </small>
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

          {/* RIGHT: SUMMARY PANEL */}
          <div className="col-md-4 mb-3">
            <div className="card cart-summary-card">
              <div className="card-body">
                <h5 className="mb-3">Order Summary</h5>
                <div className="d-flex justify-content-between mb-2">
                  <span>Items</span>
                  <span>{cart.length}</span>
                </div>
                <div className="d-flex justify-content-between mb-3">
                  <span className="fw-bold">Total</span>
                  <span className="fw-bold">RM {totalPrice.toFixed(2)}</span>
                </div>
                <button className="btn btn-primary w-100 mb-2" disabled>
                  Checkout (Coming Soon)
                </button>
                <Link to="/" className="btn btn-outline-secondary w-100">
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
