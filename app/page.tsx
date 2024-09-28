import { groq } from "next-sanity";
import { client } from "@/sanity/lib/client";
import Hero from "./components/Hero";
import Products from "./components/Products";

export default async function Home() {
  // Fetch products from Sanity
  const products = await client.fetch(groq`*[_type=="product"]{
  name,
  price,
  slug,
  images
}`);

  return (
    <>
      <Hero />
      <Products />
    </>
  );
}
