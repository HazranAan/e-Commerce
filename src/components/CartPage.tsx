// src/components/CartPage.tsx
import { useNavigate } from "react-router-dom";
import { Product } from "../types";

interface Props {
  cart: Product[];
  handleRemoveFromCart: (index: number) => void;
}

const CartPage = ({ cart, handleRemoveFromCart }: Props) => {
  const navigate = useNavigate();
  const totalPrice = cart.reduce((acc, item) => acc + item.price, 0);

  return (
    <div className="container cart-page mt-4">
      <button className="btn btn-secondary mb-3" onClick={() => navigate(-1)}>
        Back
      </button>
      <h2>Your Cart</h2>
      {cart.length === 0 && <p>Cart is empty</p>}
      <ul className="list-group mb-3">
        {cart.map((item, idx) => (
          <li
            key={idx}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            <span>
              {item.name} - RM {item.price.toFixed(2)}
            </span>
            <button
              className="btn btn-sm btn-danger"
              onClick={() => handleRemoveFromCart(idx)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
      <h4>Total: RM {totalPrice.toFixed(2)}</h4>
    </div>
  );
};

export default CartPage;
