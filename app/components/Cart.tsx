import React, { useContext } from "react";
import { AiOutlineLeft, AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { CartContext } from "../context/CartContext";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { ImageLoader } from "next/image";
import { TiDeleteOutline } from "react-icons/ti";
import Products from "./Products";
const Cart = () => {
  // Get cart context state using useContext hook
  const {
    onRemove,
    toggleCartItemQty,
    totalPrice,
    totalQuantity,
    cartItem,
    showCart,
    setShowCart,
  }: any = useContext(CartContext);
  const obj = useContext(CartContext);

  // function to handle cart state change on click button
  const handleClose = () => {
    setShowCart(!showCart);
  };

  const handleCheckout = async () => {
    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ products: cartItem }),
      });
      const data = await response.json();
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      console.error("Error during checkout", error);
    }
  };

  return (
    <div className="cart-wrapper">
      <div className="cart-container">
        <button onClick={handleClose} className="cart-heading">
          <AiOutlineLeft />
          <span className="heading">Your Shopping Cart</span>
          <span className="cart-num-items">{totalQuantity}</span>
        </button>
        <div className="product-container">
          {cartItem.map((product: any) => (
            <div key={product._id} className="product">
              <Image
                loader={() => urlFor(product.images[0]).width(500).url()} // Loader should return a URL
                src={urlFor(product.images[0]).width(500).url()}
                alt={product.name[0]}
                width={200}
                height={200}
                className="object-cover"
              />
              <div className="item-desc">
                <div className="flex top">
                  <h5>{product.name}</h5>
                  <h4>{`$ ${product.price}`}</h4>
                </div>
                <div className="flex bottom">
                  <div className="quantity-desc">
                    <span
                      className="minus"
                      onClick={() => toggleCartItemQty(product._id, `minus`)}
                    >
                      <AiOutlineMinus />
                    </span>
                    <span className="num">{product.quantity}</span>
                    <span
                      className="plus"
                      onClick={() => toggleCartItemQty(product._id, `plus`)}
                    >
                      <AiOutlinePlus />
                    </span>
                  </div>
                  <button
                    type="button"
                    className="remove-item"
                    onClick={() => onRemove(product)}
                  >
                    <TiDeleteOutline />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {cartItem.length > 0 && (
          <div className="cart-bottom ">
            <div className="total">
              <h3>Subtotal</h3>
              <h3>${totalPrice}</h3>
            </div>
            <div className="btn-container">
              <button
                onClick={handleCheckout}
                type="button"
                className="checkout-btn"
              >
                Pay with stripe
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
