import Link from "next/link";
import React from "react";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";

// Define the interface for product
export interface Product {
  name: string;
  price: number;
  _id: string;
  quantity: number;
  description: string;
  slug: {
    current: string;
  };
  images: {
    _key: string;
    _type: string;
    asset: {
      _ref: string;
      _type: string;
    };
  }[];
}

// Define the props for the Card component
interface CardProps {
  product: Product;
}

const Card = ({ product }: CardProps) => {
  return (
    <div>
      <Link href={`/product/${product.slug.current}`}>
        <div className="bg-white pt-10 drop-shadow-md rounded-lg overflow-hidden">
          <Image
            src={urlFor(product.images && product.images[0])
              .width(200)
              .url()}
            alt={product.name}
            width={220}
            height={100}
            className="object-cover h-auto w-auto mx-auto p-2"
          />
          <div className="text-center py-5">
            <h1 className="text-2xl font-bold ">{product.name}</h1>
            <h1 className="text-xl text-gray-500 font-bold">
              ${product.price}
            </h1>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Card;
