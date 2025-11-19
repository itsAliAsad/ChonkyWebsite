import Client from 'shopify-buy';

export const client = Client.buildClient({
  domain: process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN || '',
  storefrontAccessToken: process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN || '',
  apiVersion: '2024-01'
});

export async function fetchProducts() {
  return await client.product.fetchAll();
}

export async function getCheckoutUrl(cartItems: { name: string; quantity: number }[]) {
  try {
    const products = await fetchProducts();
    const lineItems = [];

    for (const item of cartItems) {
      // Match Shopify product by Title (case-insensitive)
      const product = products.find((p: any) => p.title.toLowerCase() === item.name.toLowerCase());
      
      if (product && product.variants && product.variants.length > 0) {
        // Use the first variant (assuming simple products without options like size/color)
        lineItems.push({
          variantId: product.variants[0].id,
          quantity: item.quantity
        });
      } else {
        console.warn(`Product not found in Shopify: ${item.name}`);
      }
    }

    if (lineItems.length === 0) return null;

    const checkout = await client.checkout.create();
    const checkoutId = checkout.id;
    const updatedCheckout = await client.checkout.addLineItems(checkoutId, lineItems);
    
    // @ts-ignore - webUrl exists on the checkout object
    return updatedCheckout.webUrl;
  } catch (error) {
    console.error("Error creating checkout:", error);
    throw error;
  }
}
