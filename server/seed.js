// Run this once (or anytime you want to reset) to fill your database:
//   node seed.js
require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/Product');

const img = (seed) => `https://picsum.photos/seed/${seed}/700/900?grayscale`;

const products = [
  // ---------- Outerwear (7) ----------
  { name: 'Structured Wool Coat', category: 'Outerwear', price: 214, rating: 4.9, image: img('fw-out-1'), description: 'A tailored silhouette in heavyweight wool, built for cold-weather statement dressing.' },
  { name: 'Oversized Tailored Blazer', category: 'Outerwear', price: 178, rating: 4.8, image: img('fw-out-2'), description: 'Sharp shoulders and a relaxed, oversized cut — layers over anything.' },
  { name: 'Cropped Trench Coat', category: 'Outerwear', price: 164, rating: 4.7, image: img('fw-out-3'), description: 'A shortened take on the classic trench, cinched at the waist.' },
  { name: 'Quilted Puffer Jacket', category: 'Outerwear', price: 148, rating: 4.6, image: img('fw-out-4'), description: 'Lightweight insulation with a matte-finish shell for city winters.' },
  { name: 'Shearling-Lined Bomber', category: 'Outerwear', price: 196, rating: 4.8, image: img('fw-out-5'), description: 'A modern bomber with soft shearling lining for extra warmth.' },
  { name: 'Longline Wool Overcoat', category: 'Outerwear', price: 238, rating: 4.9, image: img('fw-out-6'), description: 'Floor-grazing length, minimal hardware, maximum presence.' },
  { name: 'Denim Utility Jacket', category: 'Outerwear', price: 92, rating: 4.5, image: img('fw-out-7'), description: 'Raw-edge denim with boxy fit and functional chest pockets.' },

  // ---------- Tops (7) ----------
  { name: 'Draped Turtleneck', category: 'Tops', price: 68, rating: 4.6, image: img('fw-top-1'), description: 'Soft-knit turtleneck with a relaxed drape through the body.' },
  { name: 'Ribbed Knit Vest', category: 'Tops', price: 52, rating: 4.4, image: img('fw-top-2'), description: 'A sleeveless ribbed piece, perfect for layering over shirting.' },
  { name: 'Boxy Cotton Shirt', category: 'Tops', price: 58, rating: 4.5, image: img('fw-top-3'), description: 'Structured shoulders and a cropped, boxy body in heavyweight cotton.' },
  { name: 'Silk Slip Cami', category: 'Tops', price: 46, rating: 4.6, image: img('fw-top-4'), description: 'A fluid silk-blend cami that moves with every step.' },
  { name: 'Merino Crewneck Sweater', category: 'Tops', price: 74, rating: 4.7, image: img('fw-top-5'), description: 'Fine-gauge merino wool in a clean, everyday crewneck.' },
  { name: 'Asymmetric Draped Top', category: 'Tops', price: 64, rating: 4.5, image: img('fw-top-6'), description: 'A single-shoulder drape for an editorial, sculptural line.' },
  { name: 'Oversized Graphic Tee', category: 'Tops', price: 38, rating: 4.3, image: img('fw-top-7'), description: 'Heavyweight cotton tee with a dropped shoulder and boxy fit.' },

  // ---------- Bottoms (7) ----------
  { name: 'Wide-Leg Tailored Trousers', category: 'Bottoms', price: 96, rating: 4.7, image: img('fw-bot-1'), description: 'High-waist trousers with a fluid, wide-leg fall.' },
  { name: 'Pleated Midi Skirt', category: 'Bottoms', price: 74, rating: 4.6, image: img('fw-bot-2'), description: 'Fluid box pleats that move with every step.' },
  { name: 'Straight-Leg Denim', category: 'Bottoms', price: 82, rating: 4.6, image: img('fw-bot-3'), description: 'Rigid raw denim in a clean, straight-leg cut.' },
  { name: 'Tailored Wool Shorts', category: 'Bottoms', price: 58, rating: 4.4, image: img('fw-bot-4'), description: 'Structured tailoring shortened for warmer days.' },
  { name: 'Draped Palazzo Pants', category: 'Bottoms', price: 88, rating: 4.5, image: img('fw-bot-5'), description: 'Voluminous, floor-length trousers in fluid crepe.' },
  { name: 'Cargo Utility Trousers', category: 'Bottoms', price: 78, rating: 4.5, image: img('fw-bot-6'), description: 'Multi-pocket utility trousers with a tapered ankle.' },
  { name: 'Leather Pencil Skirt', category: 'Bottoms', price: 118, rating: 4.7, image: img('fw-bot-7'), description: 'A fitted, knee-length silhouette in supple leather.' },

  // ---------- Footwear (6) ----------
  { name: 'Minimal Leather Ankle Boots', category: 'Footwear', price: 142, rating: 4.7, image: img('fw-shoe-1'), description: 'Clean-lined boots in matte leather with a stacked heel.' },
  { name: 'Leather Chelsea Boots', category: 'Footwear', price: 156, rating: 4.9, image: img('fw-shoe-2'), description: 'Elastic-panel Chelsea boots with a polished finish.' },
  { name: 'Platform Combat Boots', category: 'Footwear', price: 168, rating: 4.6, image: img('fw-shoe-3'), description: 'Chunky lug-sole boots for an edge underfoot.' },
  { name: 'Pointed Leather Mules', category: 'Footwear', price: 108, rating: 4.5, image: img('fw-shoe-4'), description: 'Sleek, backless mules with a sharp point-toe.' },
  { name: 'Sculpted Block Heels', category: 'Footwear', price: 124, rating: 4.6, image: img('fw-shoe-5'), description: 'A stable block heel with an architectural strap detail.' },
  { name: 'Minimal Leather Sneakers', category: 'Footwear', price: 118, rating: 4.7, image: img('fw-shoe-6'), description: 'Low-profile sneakers in smooth grain leather.' },

  // ---------- Accessories (7) ----------
  { name: 'Structured Leather Tote', category: 'Accessories', price: 118, rating: 4.8, image: img('fw-acc-1'), description: 'An architectural tote in grained leather, room for everything.' },
  { name: 'Leather Belt Bag', category: 'Accessories', price: 84, rating: 4.5, image: img('fw-acc-2'), description: 'A compact bag with an adjustable strap, worn cross-body or at the waist.' },
  { name: 'Oversized Wool Scarf', category: 'Accessories', price: 46, rating: 4.5, image: img('fw-acc-3'), description: 'A generously sized scarf in a soft wool blend.' },
  { name: 'Sculptural Gold-Tone Earrings', category: 'Accessories', price: 34, rating: 4.4, image: img('fw-acc-4'), description: 'Bold, minimal hoops with a sculpted finish.' },
  { name: 'Structured Leather Belt', category: 'Accessories', price: 42, rating: 4.6, image: img('fw-acc-5'), description: 'A wide leather belt with a matte metal buckle.' },
  { name: 'Wool Beret', category: 'Accessories', price: 32, rating: 4.3, image: img('fw-acc-6'), description: 'A soft, structured beret in brushed wool.' },
  { name: 'Angular Sunglasses', category: 'Accessories', price: 54, rating: 4.5, image: img('fw-acc-7'), description: 'Sharp, geometric frames with a matte-black finish.' },
];

async function run() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected — seeding...');
    await Product.deleteMany({});
    await Product.insertMany(products);
    console.log(`Seeded ${products.length} products.`);
  } catch (err) {
    console.error('Seeding failed:', err);
  } finally {
    mongoose.connection.close();
  }
}

run();
