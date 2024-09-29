"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { ProductDetails } from "../../components/indext";
import { groq } from "next-sanity";
import { client } from "@/sanity/lib/client";
import { Product } from "@/app/components/Card";

const ProductPage = () => {
  const { slug } = useParams(); // useParams must be inside a React component
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      const products = await client.fetch(groq`*[_type == "product"]`);
      const matchedProduct = products.find(
        (p: Product) => p.slug.current === slug
      );
      setProduct(matchedProduct || null);
    };

    if (slug) {
      fetchProduct();
    }
  }, [slug]);

  // Loading state if the product hasn't been fetched yet
  if (!product) return <div>Loading...</div>;

  // Once the product is fetched, render the product details
  return <ProductDetails product={product} />;
};

export default ProductPage;
