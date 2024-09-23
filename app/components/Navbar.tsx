"use client"
import Link from "next/link";
import React, { useContext } from "react";
import { FiShoppingBag } from "react-icons/fi";
import Cart from "./Cart";
import { CartContext } from "../context/CartContext";

// Define the Navbar component, which will display the logo and cart icon.
const Navbar = () => {
  // Get cart context state using useContext hook
  const { showCart, setShowCart }: any = useContext(CartContext);

  console.log({ showCart, setShowCart });

  // Toggle cart visibility on click  - This could be a button or a hamburger menu icon
  const handleClose =() => {
    setShowCart(!showCart)
  } 
  return (
    <>
    <div className="w-full h-[80px] bg-white ">
      <div className="container w-full h-full flex items-center justify-between">
        <Link href="/" className="logo">Shop</Link>
        <button className="cart-icon" onClick={handleClose}>
          <FiShoppingBag />
          <span className="absolute text-[12px] top-0 right-[-5px] bg-red-500 w-[18px] h-[18px] rounded-full text-center text-white font-bold">
            0
          </span>
        </button>
      </div>
    </div>
    {showCart && <Cart/>}
   
    </>
  );
};

export default Navbar;
