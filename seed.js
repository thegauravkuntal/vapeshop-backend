require('dns').setServers(['8.8.8.8', '8.8.4.4']);
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const Category = require('./models/Category');
const Product = require('./models/Product');
const User = require('./models/User');

const IMG1 = 'https://images.hostinger.com/d27fd603-ff66-40e3-9da8-38e6b8e4ae48.png';
const IMG2 = 'https://images.hostinger.com/5eab9da6-8d68-46ca-b65c-9724b3c26193.png';
const IMG3 = 'https://images.hostinger.com/96db0cdd-77a1-4403-ac60-0cf1cff497ad.png';
const IMG4 = 'https://images.hostinger.com/019cf443-90fa-4626-94fa-78805cafdf52.png';
const IMG5 = 'https://images.hostinger.com/548e8e8b-a0ba-4c1b-8755-b64130e4d70e.png';
const IMG6 = 'https://images.hostinger.com/14c3995f-cde9-49e0-b1a0-fc7e5d366db8.png';

const categories = [
  { title: 'ELFBAR VAPES', image: IMG1, description: 'ELFBAR disposable vapes', order: 1 },
  { title: 'ELFBAR RAYA', image: IMG2, description: 'Premium Raya series', order: 2 },
  { title: 'ALFAKHER CROWN BAR', image: IMG3, description: 'Crown bar collection', order: 3 },
  { title: 'ELFBAR MOONLIGHT', image: IMG4, description: 'Moonlight edition', order: 4 },
  { title: 'GEEK VAPES', image: IMG5, description: 'Geek vape devices', order: 5 },
  { title: 'DTY HERB & CHARGER', image: IMG6, description: 'Herb & pocket chargers', order: 6 },
  { title: 'I GET VAPES', image: IMG1, description: 'I Get range', order: 7 },
  { title: 'YUOTO VAPES', image: IMG2, description: 'Yuoto collection', order: 8 },
  { title: 'TEREA & HEETS', image: IMG3, description: 'Heated tobacco sticks', order: 9 },
  { title: 'PEN VAPES', image: IMG4, description: 'Sleek pen-style vapes', order: 10 },
  { title: 'RECHARGEABLE VAPES', image: IMG5, description: 'USB rechargeable devices', order: 11 },
  { title: 'DISPOSABLE VAPES', image: IMG6, description: 'Ready to use, no hassle', order: 12 },
  { title: 'MORE ITEMS', image: IMG1, description: 'Additional vape products and bundles', order: 13 },
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB connected for seeding...');

    await Category.deleteMany({});
    await Product.deleteMany({});
    await User.deleteMany({});

    console.log('Cleared existing data');

    const createdCategories = await Category.insertMany(categories);
    console.log(`${createdCategories.length} categories seeded`);

    const catMap = {};
    createdCategories.forEach(c => { catMap[c.title] = c._id });

    await User.create({
      name: 'Admin',
      email: 'admin@vapeshop.com',
      password: 'admin123',
      phone: '9999999999',
      role: 'admin',
    });
    console.log('Admin user created: admin@vapeshop.com / admin123');

    const products = [
      {
        title: 'ELFBAR BC5000',
        subtitle: '5000 Puffs Disposable',
        description: 'ELFBAR BC5000 with 5000 puffs, 50mg salt nicotine, rechargeable battery.',
        category: catMap['ELFBAR VAPES'],
        image: IMG1,
        ribbonText: 'Best Seller',
        variants: [
          { title: 'Watermelon Ice', price: 1200, salePrice: 999, inventory: 50 },
          { title: 'Blue Razz Ice', price: 1200, salePrice: 999, inventory: 45 },
          { title: 'Mango Peach', price: 1200, salePrice: 999, inventory: 30 },
        ],
      },
      {
        title: 'ELFBAR TE6000',
        subtitle: '6000 Puffs Disposable',
        description: 'ELFBAR TE6000 with 6000 puffs, mesh coil, adjustable airflow.',
        category: catMap['ELFBAR RAYA'],
        image: IMG2,
        variants: [
          { title: 'Triple Melon', price: 1500, salePrice: 1299, inventory: 40 },
          { title: 'Pink Lemonade', price: 1500, salePrice: 1299, inventory: 35 },
        ],
      },
      {
        title: 'Lost Mary OS5000',
        subtitle: '5000 Puffs Disposable',
        description: 'Lost Mary OS5000 with 5000 puffs, dual coil, 13ml e-liquid capacity.',
        category: catMap['ALFAKHER CROWN BAR'],
        image: IMG3,
        ribbonText: 'Popular',
        variants: [
          { title: 'Strawberry Ice', price: 1300, salePrice: 1099, inventory: 50 },
          { title: 'Peach Mango', price: 1300, salePrice: 1099, inventory: 40 },
        ],
      },
      {
        title: 'Lost Mary QM600',
        subtitle: '600 Puffs Compact',
        description: 'Lost Mary QM600 compact disposable, perfect for on-the-go.',
        category: catMap['ELFBAR MOONLIGHT'],
        image: IMG4,
        variants: [
          { title: 'Blueberry Ice', price: 500, salePrice: 399, inventory: 60 },
          { title: 'Mint', price: 500, salePrice: 399, inventory: 50 },
        ],
      },
      {
        title: 'WAKA soPro PA10000',
        subtitle: '10000 Puffs',
        description: 'WAKA soPro PA10000 with 10000 puffs, 18ml capacity, mesh coil.',
        category: catMap['GEEK VAPES'],
        image: IMG5,
        ribbonText: 'New',
        variants: [
          { title: 'Tropical Punch', price: 1800, salePrice: 1599, inventory: 30 },
          { title: 'Cool Mint', price: 1800, salePrice: 1599, inventory: 25 },
        ],
      },
      {
        title: 'HQD Mega Max',
        subtitle: '15000 Puffs',
        description: 'HQD Mega Max with 15000 puffs, huge capacity, premium flavors.',
        category: catMap['DTY HERB & CHARGER'],
        image: IMG6,
        variants: [
          { title: 'Lush Ice', price: 2000, salePrice: 1799, inventory: 25 },
          { title: 'Banana Ice', price: 2000, salePrice: 1799, inventory: 20 },
        ],
      },
      {
        title: 'HQD Cuvie Plus',
        subtitle: '1200 Puffs',
        description: 'HQD Cuvie Plus compact disposable with 1200 puffs.',
        category: catMap['I GET VAPES'],
        image: IMG1,
        variants: [
          { title: 'Strawberry', price: 600, salePrice: 499, inventory: 50 },
          { title: 'Grape', price: 600, salePrice: 499, inventory: 40 },
        ],
      },
      {
        title: 'RnB E-Liquid',
        subtitle: 'Fruit Blends - 30ml',
        description: 'Premium fruit-flavored e-liquid by RnB, available in 3mg and 6mg.',
        category: catMap['YUOTO VAPES'],
        image: IMG2,
        variants: [
          { title: 'Berry Blast (3mg)', price: 600, salePrice: 499, inventory: 30 },
          { title: 'Tropical Mango (3mg)', price: 600, salePrice: 499, inventory: 20 },
        ],
      },
      {
        title: 'Pod Juice E-Liquid',
        subtitle: 'Salt Nic - 30ml',
        description: 'Pod Juice salt nicotine e-liquid, ideal for pod systems.',
        category: catMap['TEREA & HEETS'],
        image: IMG3,
        variants: [
          { title: 'Jewel Mint (25mg)', price: 550, salePrice: 449, inventory: 40 },
          { title: 'Jewel Mint (50mg)', price: 550, salePrice: 449, inventory: 35 },
        ],
      },
      {
        title: 'Uwell Caliburn GK2',
        subtitle: 'Refillable Pod System',
        description: 'Uwell Caliburn GK2 pod kit with 690mAh battery, 2ml pod capacity.',
        category: catMap['PEN VAPES'],
        image: IMG4,
        ribbonText: 'Premium',
        variants: [
          { title: 'Grey', price: 2500, salePrice: 2199, inventory: 15 },
          { title: 'Blue', price: 2500, salePrice: 2199, inventory: 12 },
        ],
      },
      {
        title: 'SMOK Nord 5',
        subtitle: 'Refillable Pod Kit',
        description: 'SMOK Nord 5 with 2000mAh battery, 5ml pod, adjustable wattage.',
        category: catMap['RECHARGEABLE VAPES'],
        image: IMG5,
        variants: [
          { title: 'Black', price: 3000, salePrice: 2699, inventory: 10 },
          { title: 'Silver', price: 3000, salePrice: 2699, inventory: 8 },
        ],
      },
      {
        title: 'Caliburn G2 Coils',
        subtitle: 'Pack of 4',
        description: 'Replacement coils for Uwell Caliburn G2, 1.0ohm mesh.',
        category: catMap['MORE ITEMS'],
        image: IMG6,
        variants: [
          { title: '1.0ohm Mesh (4-pack)', price: 500, salePrice: 399, inventory: 100 },
        ],
      },
    ];

    const createdProducts = await Product.insertMany(products);
    console.log(`${createdProducts.length} products seeded`);

    console.log('\n--- Seed Complete ---');
    console.log('Admin login: admin@vapeshop.com / admin123');
    process.exit(0);
  } catch (error) {
    console.error('Seed error:', error);
    process.exit(1);
  }
};

seedDB();
