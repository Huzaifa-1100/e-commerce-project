"use client";
import React, { useContext, useState } from "react";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { CartContext } from "../context/CartContext";

const ProductDetails = ({ product }: any) => {
  
  const [index, setIndex] = useState(0);
  // import quantityincreasing quantity and decrease quantity by use context
  const { cartItem, addProduct, quantity, increaseQuantity, decreaseQuantity }: any =
    useContext(CartContext);
    console.log(cartItem);
    
  return (
    <div className="product-details-section">
      <div className="product-details-container">
        {/* Left hand side */}
        <div>
          {/* Top Image */}
          <div className="h-[450] flex items-center mb-[25px  ]">
            <Image
              loader={() =>
                urlFor(product.images && product.images[index])
                  .width(200)
                  .url()
              }
              src={urlFor(product.images && product.images[index])
                .width(200)
                .url()}
              alt={product.images[index]}
              width={350}
              height={350}
              className="object-cover mx-auto"
            />
          </div>
          {/* Bottom images */}
          <div className="small-images-container">
            {product.images?.map((item: any, i: number) => (
              <Image
                loader={() =>
                  urlFor(product.images && product.images[i])
                    .width(200)
                    .url()
                }
                src={urlFor(product.images && product.images[i])
                  .width(200)
                  .url()}
                alt={product.images[0]}
                width={220}
                height={220}
                className="h-32 mx-auto bordrder rounded hover:cursor-pointer"
                onClick={() => setIndex(i)}
              />
            ))}
          </div>
        </div>

        {/* Righthand side */}
        <div className="flex flex-col gap-8 md:pt-32 md:ml-12">
          <div className="flex flex-col gap-4">
            <div className="text-3xl font-bold">{product.name}</div>
            <div className="text-xl font-medium">{product.price}</div>
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
          <button className="btn add-to-cart"
          onClick={()=>addProduct(product,quantity)}
          >Add To Cart</button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
