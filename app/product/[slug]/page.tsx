"use client";
import { useParams } from "next/navigation";
import { ProductDetails } from "../../components/indext";
import React from "react";
import { groq } from "next-sanity";
import { client } from "@/sanity/lib/client";

const page = async () => {
  const { slug }: any = useParams();
  const products = await client.fetch(groq`*[_type=="product"]`);
  
  const product = products.find((p:any) => p.slug.current === slug);
  console.log(product);
  
  return (
    <>
      <ProductDetails product={product} />
    </>
  );
};

export default page;
