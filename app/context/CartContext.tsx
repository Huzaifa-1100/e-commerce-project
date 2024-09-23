"use client";
import { createContext, useState } from "react";

export const CartContext = createContext({});



export const CartProvider = ({ children }: any) => {
  // Define the state to track if the cart is shown or hidden
  const [showCart, setShowCart] = useState(false);

   
  return (
    <CartContext.Provider value={{ showCart, setShowCart }}>
      <div>{children}</div>
    </CartContext.Provider>
  );
};

// export const CartProvider = ({ Children }: any) => {
//   const [showCart, setShowCart] = useState(false);
//   return (
//     <CartContext.Provider value={{ showCart, setShowCart }}>
//       {Children}
//     </CartContext.Provider>
//   );
// };
