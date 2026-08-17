const mongoose = require('mongoose');
require('dotenv').config({ path: './server/.env' });

const Product = require('./models/Product');

const products = [
  {
    name: 'Pearl Hair Clip',
    category: 'Accessories',
    price: 1099,
    description: 'Elegant pearl hair clip for a simple and stylish look.',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYVo-Lu37KocAdaphVVywsIkdxLy2RekJhvFANByOnI--QeRGwgn1ht_uA&s=10',
    rating: 4.5,
  },
  {
    name: 'Cute Crochet Hair Clips',
    category: 'Accessories',
    price: 1999,
    description: 'Cute crochet hair clips designed to add a playful touch to your look.',
    image: 'https://rukminim2.flixcart.com/image/480/640/l1dwknk0/hair-accessory/n/c/g/8pc-and-6pc-cards-combo-2-al-8-n-6-comb-hair-clip-alamodey-original-imagcxzehyg7gyha.jpeg?q=90',
    rating: 4.4,
  },
  {
    name: 'Cute Earrings',
    category: 'Accessories',
    price: 1999,
    description: 'Stylish earrings that complement both casual and dressy outfits.',
    image: 'https://i.pinimg.com/736x/71/e2/9e/71e29eed382bda573cf5ddb23e2818c8.jpg',
    rating: 4.6,
  },
  {
    name: 'Glitter Bows',
    category: 'Accessories',
    price: 599,
    description: 'Sparkling glitter bows for a fun and elegant finishing touch.',
    image: 'https://img.kwcdn.com/product/fancy/657f83f1-1a6e-4f01-a6ed-ec28fb6bd65d.jpg?imageView2/2/w/500/q/60/format/webp',
    rating: 4.3,
  },
  {
    name: 'Flower Style Elastic Ponytail',
    category: 'Accessories',
    price: 999,
    description: 'Flower-style elastic ponytail accessory for an effortless everyday look.',
    image: 'https://rukminim2.flixcart.com/image/480/640/xif0q/hair-accessory/2/l/k/-original-imahfvytjymvugau.jpeg?q=90',
    rating: 4.2,
  },
];

async function seedProducts() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log('MongoDB connected');

    await Product.insertMany(products);

    console.log('Accessories added successfully');

    process.exit(0);
  } catch (error) {
    console.error('Error adding Accessories:', error);
    process.exit(1);
  }
}

seedProducts();