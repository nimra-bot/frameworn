const mongoose = require('mongoose');
require('dotenv').config({ path: './server/.env' });

const Product = require('./models/Product');

const products = [
  {
    name: 'Short Jacket Outerwear Army Green',
    category: 'Outerwear',
    price: 3999,
    description: 'A stylish cropped jacket with a modern army green finish.',
    image: 'https://i5.walmartimages.com/seo/Womens-Cropped-Trench-Coat-Lapel-Double-Breasted-Short-Jacket-Outwear-Army-Green-XL_ae802218-522e-41b3-a388-8d9cc5297519.fd9cc44c8d58427c17dc7c27164417ba.jpeg?odnHeight=1067&odnWidth=800&odnBg=FFFFFF',
    rating: 4.5,
  },
  {
    name: 'Women Polyester Blazer Jacket',
    category: 'Outerwear',
    price: 5999,
    description: 'A polished polyester blazer jacket for a sophisticated everyday look.',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSggdQFZhJCyfqXPKD7ocicXhtzfpWNq7SIJThkTfHT1tnYEUfiDtDDlQp7&s=10',
    rating: 4.4,
  },
  {
    name: 'Winter Oversized Outerwear Jacket',
    category: 'Outerwear',
    price: 7999,
    description: 'A comfortable oversized jacket designed for cold-weather styling.',
    image: 'https://m.media-amazon.com/images/I/81RwCF5wsYL._AC_UY1100_.jpg',
    rating: 4.6,
  },
  {
    name: 'Hooded Parker Coat',
    category: 'Outerwear',
    price: 8999,
    description: 'A warm hooded parker coat combining comfort and contemporary style.',
    image: 'https://img4.dhresource.com/webp/m/0x0/f3/albu/ys/j/28/d0539195-1b85-4caa-99cc-5ee2ec53b821.jpg',
    rating: 4.7,
  },
  {
    name: 'Gym and Training Outerwear',
    category: 'Outerwear',
    price: 5999,
    description: 'Lightweight outerwear designed for active days and training sessions.',
    image: 'https://thediversestore.com/cdn/shop/files/IMG_3945.jpg?v=1780208006&width=500',
    rating: 4.3,
  },
];

async function seedProducts() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log('MongoDB connected');

    await Product.insertMany(products);

    console.log('Outerwear added successfully');

    process.exit(0);
  } catch (error) {
    console.error('Error adding Outerwear:', error);
    process.exit(1);
  }
}

seedProducts();