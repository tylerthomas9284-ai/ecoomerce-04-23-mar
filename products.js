// Product Data
const mensProducts = [
  {
    id: "m1",
    name: "Premium Black Hoodie",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1617409122337-594499222247?w=400",
    category: "men",
  },
  {
    id: "m2",
    name: "Denim Jacket",
    price: 129.99,
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400",
    category: "men",
  },
  {
    id: "m3",
    name: "Classic White Tee",
    price: 39.99,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400",
    category: "men",
  },
  {
    id: "m4",
    name: "Slim Fit Jeans",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400",
    category: "men",
  },
  {
    id: "m5",
    name: "Leather Boots",
    price: 149.99,
    image: "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=400",
    category: "men",
  },
  {
    id: "m6",
    name: "Casual Blazer",
    price: 199.99,
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=400",
    category: "men",
  },
];

const womensProducts = [
  {
    id: "w1",
    name: "Elegant Black Dress",
    price: 159.99,
    image: "https://images.unsplash.com/photo-1763771444851-4fa902534f04?w=400",
    category: "women",
  },
  {
    id: "w2",
    name: "Floral Summer Dress",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400",
    category: "women",
  },
  {
    id: "w3",
    name: "Designer Handbag",
    price: 249.99,
    image: "https://images.unsplash.com/photo-1769116416641-e714b71851e8?w=400",
    category: "women",
  },
  {
    id: "w4",
    name: "Silk Blouse",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1564584217132-2271feaeb3c5?w=400",
    category: "women",
  },
  {
    id: "w5",
    name: "High Heels",
    price: 119.99,
    image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400",
    category: "women",
  },
  {
    id: "w6",
    name: "Wide Leg Trousers",
    price: 99.99,
    image: "https://images.unsplash.com/photo-1594633313593-bab3825d0caf?w=400",
    category: "women",
  },
];

const trendingProducts = [...mensProducts.slice(0, 2), ...womensProducts.slice(0, 2)];

const blogPosts = [
  {
    id: "b1",
    title: "2024 Streetwear Trends",
    excerpt: "Discover the latest trends in streetwear fashion that are dominating the scene this year...",
    image: "https://images.unsplash.com/photo-1553033754-890d2383fdc8?w=400",
    date: "Jan 20, 2026",
  },
  {
    id: "b2",
    title: "How to Style Minimalist Fashion",
    excerpt: "Learn the art of minimalist fashion and create timeless looks with essential pieces...",
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=400",
    date: "Jan 18, 2026",
  },
  {
    id: "b3",
    title: "Sustainable Fashion Guide",
    excerpt: "Explore eco-friendly fashion choices and learn how to build a sustainable wardrobe...",
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400",
    date: "Jan 15, 2026",
  },
];
