import { NextResponse } from "next/server";
import Stripe from "stripe"; // Use import instead of require

// Initialize Stripe with your secret key
const stripe = new Stripe(process.env.NEXT_STRIPE_SECRET_KEY!, {
  apiVersion: "2024-06-20", // Specify the API version you're using
});

export const POST = async (request: Request) => {
  const { products } = await request.json();
  let activeProducts = await stripe.products.list({ active: true });

  try {
    // 1. Find products from Stripe that match products from the cart.
    for (const product of products) {
      const matchedProduct = activeProducts.data.find(
        (stripeProduct) =>
          stripeProduct.name.toLowerCase() === product.name.toLowerCase()
      );

      // 2. If the product didn't exist in Stripe, then add this product to Stripe.
      if (matchedProduct === undefined) {
        await stripe.products.create({
          name: product.name,
          default_price_data: {
            currency: "usd",
            unit_amount: product.price * 100,
          },
        });
      }
    }
  } catch (error) {
    console.error("Error in creating a new product", error);
    throw error;
  }

  // 3. Once the new product has been added to Stripe, fetch products again with updated products from Stripe
  activeProducts = await stripe.products.list({ active: true });
  const stripeProducts: Stripe.Checkout.SessionCreateParams.LineItem[] = []; // Specify the type here

  for (const product of products) {
    const stripeProduct = activeProducts.data.find(
      (stripeProduct) =>
        stripeProduct.name.toLowerCase() === product.name.toLowerCase()
    );

    // Ensure that stripeProduct and its default_price exist
    if (stripeProduct && stripeProduct.default_price) {
      // Check if default_price is an object and get the ID
      const priceId = typeof stripeProduct.default_price === 'string' 
        ? stripeProduct.default_price 
        : stripeProduct.default_price.id;

      stripeProducts.push({
        price: priceId, // Use the price ID as a string
        quantity: product.quantity,
      });
    } else {
      console.warn(`Product ${product.name} not found or has no default price.`);
    }
  }

  // Create Checkout Sessions from body params.
  const session = await stripe.checkout.sessions.create({
    line_items: stripeProducts, 
    mode: "payment",
    success_url: `https://e-commerce-project-liard.vercel.app/success`,
    cancel_url: `https://e-commerce-project-liard.vercel.app/`,
  });

  return NextResponse.json({
    url: session.url,
  });
};
