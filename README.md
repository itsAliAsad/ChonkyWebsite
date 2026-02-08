# Chonky
A specialized e-commerce platform dedicated to "Chonky" treats. This project provides a seamless shopping experience for customers to browse, select, and customize boxes of delicious, oversized cookies and desserts.
## Features
- **Next.js App Router**: Built on the latest Next.js 15 for optimal performance and modern routing capabilities.
- **Shopify Integration**: Robust e-commerce functionality powered by the Shopify Buy SDK and Storefront API.
- **Custom "Build a Box" Flow**: A unique, interactive user experience allowing customers to select their favorite flavors and build their own custom box.
- **Modern UI/UX**: Designed with a premium aesthetic using Tailwind CSS v4, Radix UI primitives, and smooth animations (Marquee, custom transitions).
- **Responsive Design**: Fully responsive layout ensuring a great experience on all devices.
- **Type-Safe**: Developed with TypeScript for reliability and maintainability.
## Tech Stack
- **Framework**: [Next.js 15](https://nextjs.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/), [Radix UI](https://www.radix-ui.com/), [Lucide React](https://lucide.dev/)
- **State Management**: React Context (`BoxContext` for cart & box building)
- **E-commerce**: [Shopify Buy SDK](https://shopify.dev/docs/api/storefront)
- **Form Handling**: [React Hook Form](https://react-hook-form.com/), [Zod](https://zod.dev/)
- **Optimization**: `next/font`, `next/image`
## Getting Started
### Prerequisites
Ensure you have the following installed on your machine:
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- A package manager: `npm`, `yarn`, `pnpm`, or `bun`
### Installation
1.  Clone the repository:
    ```bash
    git clone https://github.com/yourusername/chonky-website.git
    cd ChonkyWebsite/ChonkyWebsite
    ```
2.  Install dependencies:
    ```bash
    npm install
    # or
    yarn install
    # or
    pnpm install
    # or
    bun install
    ```
### Environment Variables
Create a `.env.local` file in the root directory and configure the following environment variables:
```env
NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN=your-shopify-store-domain.myshopify.com
NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN=your-storefront-access-token
```
> **Note**: You will need a valid Shopify store and a Storefront API access token to fetch products and manage checkouts.
### Development
Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
## Project Structure
- **`app/`**: Contains the application routes and pages (App Router).
- **`components/`**: Reusable UI components (Navbar, Hero, Flavors, CustomizeBox, Footer, etc.).
- **`lib/`**: Utility functions and configuration files (Shopify client setup, helper functions).
- **`public/`**: Static assets like images and fonts.
## Learn More
To learn more about Next.js, take a look at the following resources:
- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
---
Built with ❤️ by the Chonky Team.
