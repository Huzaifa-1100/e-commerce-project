import { CartProvider } from "../context/CartContext";
import { AppProps } from 'next/app';

interface CartProvider {
  name: string;
  price: number;
  slug: { current: string };
  images: { url: string }[];
}

function MyApp({ Component, pageProps }:AppProps) {
  return (
    <CartProvider>
      <Component {...pageProps} />
    </CartProvider>
  );
}

export default MyApp;
