"use client";
import React, { useContext, useState } from "react";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { CartContext } from "../context/CartContext";
import useToast from "quick-toastify";


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

// Define the interface for the product's images
interface ImageType {
  _key: string;
  _type: string;
  asset: {
    _ref: string;
    _type: string;
  };
}

// Define the interface for the product object
 interface ProductType {
  _id: string;
  name: string;
  price: number;
  description: string;
  images: ImageType[]; // An array of image objects
  quantity: number;
}


export interface ProductDetailsProps {
  product: ProductType;
}

// Define the ProductDetails component with proper typing
const ProductDetails: React.FC<ProductDetailsProps> = ({ product }) => {
  const { toastComponent, triggerToast } = useToast("bottom-left");

  const [index, setIndex] = useState<number>(0);

  // Use the CartContext with the appropriate type
  const { addProduct, quantity, increaseQuantity, decreaseQuantity } =
    useContext(CartContext) as CartContextType;
    

  // Ensure that we extract the correct URL string from the image object
  const currentImageUrl = product.images && product.images[index] 
    ? urlFor(product.images[index].asset._ref).width(200).url() 
    : "/placeholder-image.jpg"; // Fallback image URL

  return (
    <div className="product-details-section">
      <div className="product-details-container">
        {/* Left hand side */}
        <div>
          {/* Top Image */}
          <div className="h-[450] flex items-center mb-[25px]">
            <Image
              loader={() => currentImageUrl}
              src={currentImageUrl}
              alt={product.name}
              width={350}
              height={350}
              className="object-cover mx-auto"
            />
          </div>
          {/* Bottom images */}
          <div className="small-images-container">
            {product.images?.map((item: ImageType, i: number) => {
              const smallImageUrl = urlFor(item.asset._ref).width(200).url(); // Extract URL for small images

              return (
                <Image
                  key={item._key} // Use unique key for each image
                  loader={() => smallImageUrl}
                  src={smallImageUrl}
                  alt={product.name} // Use the product name as the alt text
                  width={220}
                  height={220}
                  className={`product-Image-amination h-32 w-32 mx-auto border rounded shadow-md hover:cursor-pointer hover:shadow-xl ${index === i ? 'active' : ''}`}
                  onClick={() => setIndex(i)}
                />
              );
            })}
          </div>
        </div>

        {/* Right-hand side */}
        <div className="flex flex-col gap-8 md:pt-32 md:ml-12">
          <div className="flex flex-col gap-4">
            <div className="text-3xl font-bold">{product.name}</div>
            <div className="text-xl font-medium">${product.price}</div>
          </div>
          <div className="flex gap-2 items-center">
            <h3>Quantity</h3>
            <p className="quantity-desc flex items-center border-black">
              <span className="minus" onClick={decreaseQuantity}>
                <AiOutlineMinus />
              </span>
              <span className="num">{quantity}</span>
              <span className="plus" onClick={increaseQuantity}>
                <AiOutlinePlus />
              </span>
            </p>
          </div>
          <button
  className="btn transition-all duration-500 add-to-cart"
  onClick={() => {
    addProduct(product, quantity); 
    triggerToast({
      type: "success",
      message: "Your product has been added successfully",
      duration: 5000,
      animationIn: "bounce",
      animationOut: "fade",
    });
    console.log("Hello woprld")
  }}
>
  Add To Cart
</button>

        </div>
      </div>
      {toastComponent}
    </div>
  );
};

export default ProductDetails;