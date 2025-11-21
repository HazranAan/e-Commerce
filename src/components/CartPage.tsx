// src/components/CartPage.tsx
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Product } from "../types";
import "./CartPage.css";

type CartPageProps = {
  cart: Product[];
  handleRemoveFromCart: (index: number) => void;
};

export default function CartPage({
  cart,
  handleRemoveFromCart,
}: CartPageProps) {
  const navigate = useNavigate();

  // pastikan price sentiasa number
  const total = useMemo(
    () =>
      cart.reduce((sum, item) => {
        const price = Number((item as any).price ?? 0);
        return sum + (isNaN(price) ? 0 : price);
      }, 0),
    [cart]
  );

  const handleBack = () => {
    navigate("/");
  };

  const hasItems = cart.length > 0;

  return (
    <div className="cart-page-wrapper">
      <div className="container mt-4">
        {/* back button atas */}
        <button
          type="button"
          onClick={handleBack}
          className="cart-back-top-btn"
        >
          ← Back to menu
        </button>

        <h2 className="cart-title">Your Cart</h2>
        <p className="cart-subtitle">
          Review your selected drinks before checkout.
        </p>

        <div className="row">
          {/* LEFT: item list */}
          <div className="col-lg-8 mb-3">
            <div className="card cart-card shadow-sm border-0">
              <div className="card-body">
                {hasItems ? (
                  <>
                    {cart.map((item, index) => {
                      const price = Number((item as any).price ?? 0);
                      const safePrice = isNaN(price) ? 0 : price;

                      return (
                        <div
                          key={`${item.id}-${index}`}
                          className="cart-item-row"
                        >
                          <div className="d-flex">
                            {item.image && (
                              <img
                                src={item.image}
                                alt={item.name}
                                className="cart-item-image"
                              />
                            )}
                            <div>
                              <div className="cart-item-name">{item.name}</div>
                              {item.category && (
                                <span className="cart-item-tag">
                                  {item.category}
                                </span>
                              )}
                              {item.description && (
                                <div className="cart-item-desc">
                                  {item.description}
                                </div>
                              )}
                            </div>
                          </div>

                          <div className="text-end">
                            <div className="cart-item-price">
                              RM {safePrice.toFixed(2)}
                            </div>
                            <button
                              type="button"
                              onClick={() => handleRemoveFromCart(index)}
                              className="cart-remove-btn"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </>
                ) : (
                  <div className="cart-empty">
                    <p>Your cart is empty.</p>
                    <button
                      type="button"
                      onClick={handleBack}
                      className="cart-back-main-btn"
                    >
                      Back to menu
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* RIGHT: order summary */}
          <div className="col-lg-4">
            <div className="card cart-summary-card shadow-sm border-0">
              <div className="card-body">
                <h5 className="cart-summary-title">Order Summary</h5>

                <div className="d-flex justify-content-between cart-summary-row">
                  <span>Items</span>
                  <span>{cart.length}</span>
                </div>

                <div className="d-flex justify-content-between cart-summary-row cart-summary-total">
                  <span>Total</span>
                  <span>RM {total.toFixed(2)}</span>
                </div>

                <button
                  type="button"
                  disabled={!hasItems}
                  className="cart-checkout-btn"
                >
                  Proceed to checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
