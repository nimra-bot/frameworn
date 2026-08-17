require('dotenv').config({ path: './server/.env' });
const mongoose = require('mongoose');
const Product = require('./models/Product');

const products = [
  {
    name: 'Chain Saddle Sling Bag for Women',
    category: 'Bags',
    price: 1099,
    description: 'Elegant chain saddle sling bag for women.',
    image: 'https://arkin.pk/wp-content/uploads/2026/04/1000481979.png',
    rating: 4.5,
  },
  {
    name: 'Luxury Handbag for Women',
    category: 'Bags',
    price: 2999,
    description: 'Stylish luxury handbag designed for a modern look.',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-HoAerzkAaQUaY3D6xuqAwxV0BRo4A9O1frnehysti-S596l0Qf8lmWwT&s=10',
    rating: 4.9,
  },
  {
    name: 'New High End Textured Women Bag',
    category: 'Bags',
    price: 2999,
    description: 'High-end textured bag with a modern elegant design.',
    image: 'https://img.kwcdn.com/product/fancy/babaa1f0-21e3-4973-afba-971998499e22.jpg?imageMogr2/auto-orient%7CimageView2/2/w/800/q/70/format/webp',
    rating: 4.5,
  },
  {
    name: 'Designer Bag',
    category: 'Bags',
    price: 2999,
    description: 'Premium designer-inspired shoulder bag.',
    image: 'https://image.made-in-china.com/2f0j00WKnbeElFkokI/Luxury-Handbags-Women-Bags-Designer-Shoulder-Bag-High-Quality-Soft-Leather-Purses-and-Handbags-3-Layer-Large-Capacity-Tote-Bag.jpg',
    rating: 4.5,
  },
  {
    name: 'Elegant Women Fashion Dress',
    category: "Women's Fashion",
    price: 1999,
    description: 'Elegant women fashion piece with a contemporary style.',
    image: 'https://img.kwcdn.com/product/fancy/900c9f7c-9959-40a9-a00d-588a425d41e1.jpg?imageMogr2/auto-orient%7CimageView2/2/w/800/q/70/format/webp',
    rating: 4.5,
  },
  {
    name: 'Long Silk Maxi Dress',
    category: "Women's Fashion",
    price: 9999,
    description: 'Elegant long silk maxi dress with a graceful silhouette.',
    image: 'https://laz-img-sg.alicdn.com/p/fcbc120d3af14d6154602c75728f023d.jpg',
    rating: 4.5,
  },
  {
    name: 'Korean Fashion Skirt',
    category: "Women's Fashion",
    price: 3999,
    description: 'Modern Korean-inspired fashion skirt.',
    image: 'https://i.pinimg.com/736x/4c/c9/48/4cc948ad5f7aef0fd92c5a4cfb8f72b7.jpg',
    rating: 3.9,
  },
];

async function seedProducts() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log('MongoDB connected');

    await Product.insertMany(products);

    console.log('New Arrivals added successfully');

    process.exit(0);
  } catch (error) {
    console.error('Error adding products:', error);
    process.exit(1);
  }
}

seedProducts();