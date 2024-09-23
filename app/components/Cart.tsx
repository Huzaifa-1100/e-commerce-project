import React from "react";
import { AiOutlineLeft } from "react-icons/ai";

const Cart = () => {
  return (
    <div className="cart-wrapper">
      <div className="cart-container">
        <button className="cart-heading">
          <AiOutlineLeft />
          <span className="heading">Your Shopping Cart</span>
          <span className="cart-num-items">0</span>
        </button>
      </div>
    </div>
  );
};

export default Cart;
