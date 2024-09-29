"use client";
import { createContext, useState } from "react";

// Define the interface for a product item in the cart
interface CartItem {
  _id: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl?: string; // You can add more properties as needed
}

// Define the context structure
interface CartContextType {
  showCart: boolean;
  setShowCart: (value: boolean) => void;
  quantity: number;
  increaseQuantity: () => void;
  decreaseQuantity: () => void;
  addProduct: (product: CartItem, quantity: number) => void;
  cartItem: CartItem[];
  totalQuantity: number;
  totalPrice: number;
  toggleCartItemQty: (id: string, value: string) => void;
  onRemove: (product: CartItem) => void;
}

// Create the context and provide the initial state
export const CartContext = createContext<CartContextType | undefined>(
  undefined
);

// Define the provider component to manage the cart state
export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  // Define the state to track if the cart is shown or hidden
  const [showCart, setShowCart] = useState(false);

  // Define the state to show the quantity
  const [quantity, setQuantity] = useState(1);

  // Define the state to sho the cart item
  const [cartItem, setCartItem] = useState<CartItem[]>([]);

  // Define the state to track the total quantity of items in the cart
  const [totalQuantity, setTotalQuantity] = useState(0);

  // Define the state to track the total price of items in the cart
  const [totalPrice, setTotalPrice] = useState(0);

  // Define the state to increment the quantity
  const increaseQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  // define the state to decrement the quantity
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  // Define the function to add a product to the cart
  const addProduct = (product: CartItem, quantity: number) => {
    // Update the total quantity of items in the cart
    setTotalQuantity((prev) => prev + quantity);

    // Update the total price of items in the cart
    setTotalPrice((prevTotalPrice) => prevTotalPrice + product.price);

    // Check if the product already exists in the cart and update the quantity if true, otherwise add a new product
    const checkProductInCart = cartItem.find(
      (item: CartItem) => item._id === product._id
    );

    if (checkProductInCart) {
      const updatedCartItems = cartItem.map((cartProduct: CartItem) => {
        if (cartProduct._id === product._id) {
          return { ...cartProduct, quantity: cartProduct.quantity + quantity };
        } else {
          return cartProduct;
        }
      });
      setCartItem(updatedCartItems);
    } else {
      product.quantity = quantity;
      setCartItem([...cartItem, { ...product }]);
    }
  };

  // Define the function to remove a product from the cart
  const toggleCartItemQty = (id: string, value: string) => {
    const foundProduct = cartItem.find((item: CartItem) => item._id === id);
    const index = cartItem.findIndex((product: CartItem) => product._id === id);
    const updatedCartItems = [...cartItem];

    if (value === "plus") {
      updatedCartItems[index] = {
        ...updatedCartItems[index],
        quantity: updatedCartItems[index].quantity + 1,
      };
      setCartItem([...updatedCartItems]);
      setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct!.price);
      setTotalQuantity((prevTotalQty) => prevTotalQty + 1);
    } else if (value === "minus") {
      if (foundProduct!.quantity > 1) {
        updatedCartItems[index] = {
          ...updatedCartItems[index],
          quantity: updatedCartItems[index].quantity - 1,
        };
        setCartItem([...updatedCartItems]);
        setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct!.price);
        setTotalQuantity((prevTotalQty) => prevTotalQty - 1);
      }
    }
  };

  // Define the state to remove a product from the cart
  const onRemove = (product: CartItem) => {
    const foundProduct = cartItem.find((item) => item._id === product._id);
    const newCartItems = cartItem.filter((item) => item._id !== product._id);

    setCartItem(newCartItems);
    setTotalPrice(
      (prevTotal) => prevTotal - foundProduct!.price * foundProduct!.quantity
    );
    setTotalQuantity((prevTotalQty) => prevTotalQty - foundProduct!.quantity);
  };

  // Define the state to track the cart items
  return (
    <CartContext.Provider
      value={{
        onRemove,
        toggleCartItemQty,
        totalPrice,
        totalQuantity,
        showCart,
        setShowCart,
        quantity,
        increaseQuantity,
        decreaseQuantity,
        addProduct,
        cartItem,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
