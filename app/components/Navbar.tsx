"use client";
import Link from "next/link";
import React, { useContext } from "react";
import { FiShoppingBag } from "react-icons/fi";
import Cart from "./Cart";
import { CartContext } from "../context/CartContext";

// Define the structure of the CartContext
interface CartContextType {
  showCart: boolean;
  setShowCart: (value: boolean) => void;
  totalQuantity: number;
}

// Define the Navbar component, which will display the logo and cart icon.
const Navbar = () => {
  // Get cart context state using useContext hook
  const { totalQuantity, showCart, setShowCart } = useContext(CartContext) as CartContextType;
  useContext(CartContext);

  // function to handle cart state change on click button
  const handleClose = () => {
    setShowCart(!showCart);
  };
  return (
    <>
      <div className="w-full h-[80px] bg-white ">
        <div className="container w-full h-full flex items-center justify-between">
          <Link href="/" className="logo">
            Shop
          </Link>
          <button
            className="cart-icon"
            onClick={handleClose}
          >
            <FiShoppingBag />
            <span className="newCartQuantity">{totalQuantity}</span>
          </button>
        </div>
      </div>
      {showCart && <Cart />}
    </>
  );
};

export default Navbar;
