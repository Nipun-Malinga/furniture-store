import diningTable from '../components/3DModels/diningTable';
import bed from '../components/3DModels/queen_bed';
import sofa from '../components/3DModels/sofa';
import bookshelf from '../components/3DModels/bookshelf';
import lamp from '../components/3DModels/lamp';
import platformBed from '../components/3DModels/platform_bed';
import armChair from '../components/3DModels/arm_chair';
import diningChair from '../components/3DModels/dining_chair';
import loungeChair from '../components/3DModels/lounge_chair';
import stool from '../components/3DModels/stool';
import bench from '../components/3DModels/bench';
import CoffeeTable from '../components/3DModels/coffee_table';
import wardrobes from '../components/3DModels/wardrobes';
import tableLamp from '../components/3DModels/tableLamp';
import modernReadingLight from '../components/3DModels/standReadingLight';
import nightstand from '../components/3DModels/nightStand';
import cabinet from '../components/3DModels/cabinet';

const data = [
  {
    categoryName: 'Seating',
    categoryId: 1,
    products: [
      {
        productId: 1,
        name: 'Armchair',
        modelId: null,
        categoryId: 1,
        categoryName: 'Seating',
        description: 'Comfortable armchair perfect for living rooms.',
        price: 299.99,
        rating: 4.5,
        ratingCount: 245,
        model: armChair,
        colors: ['#FFD700', '#FFA500', '#33ecff'],
      },
      {
        productId: 2,
        name: 'Dining Chair',
        modelId: null,
        categoryId: 1,
        categoryName: 'Seating',
        description: 'Elegant dining chair for modern dining spaces.',
        price: 149.99,
        rating: 4.2,
        ratingCount: 180,
        model: diningChair,
        colors: ['#DAA520', '#B8860B'],
      },
      {
        productId: 3,
        name: 'Lounge Chair',
        modelId: null,
        categoryId: 1,
        categoryName: 'Seating',
        description: 'Relaxing lounge chair for your leisure time.',
        price: 349.99,
        rating: 4.7,
        ratingCount: 320,
        model: loungeChair,
        colors: ['#F4A460', '#D2B48C'],
      },
      {
        productId: 4,
        name: 'Sofa',
        modelId: null,
        categoryId: 1,
        categoryName: 'Seating',
        description: 'Spacious and comfortable sofa for family rooms.',
        price: 799.99,
        rating: 4.8,
        ratingCount: 410,
        model: sofa,
        colors: ['#11603a', '#ca2a2a', '#141f68'],
      },
      {
        productId: 5,
        name: 'Stool',
        modelId: null,
        categoryId: 1,
        categoryName: 'Seating',
        description: 'Compact stool for versatile use.',
        price: 89.99,
        rating: 4.1,
        ratingCount: 150,
        model: stool,
        colors: ['#C0C0C0', '#808080', '#1E1E1E'],
      },
      {
        productId: 6,
        name: 'Bench',
        modelId: null,
        categoryId: 1,
        categoryName: 'Seating',
        description: 'Simple wooden bench ideal for entryways.',
        price: 189.99,
        rating: 4.3,
        ratingCount: 230,
        model: bench,
        colors: ['#8B0000', '#A52A2A'],
      },
    ],
  },
  {
    categoryName: 'Tables',
    categoryId: 2,
    products: [
      {
        productId: 7,
        name: 'Dining Table',
        modelId: null,
        categoryId: 2,
        categoryName: 'Tables',
        description: 'Sturdy dining table with a timeless design.',
        price: 599.99,
        rating: 4.6,
        ratingCount: 280,
        model: diningTable,
        colors: ['#DEB887', '#70A48C', '#6A3C0E'],
      },
      {
        productId: 8,
        name: 'Coffee Table',
        modelId: null,
        categoryId: 2,
        categoryName: 'Tables',
        description: 'Modern coffee table for living room setups.',
        price: 249.99,
        rating: 4.4,
        ratingCount: 200,
        model: CoffeeTable,
        colors: ['#8B4513', '#CD853F', '#FFF8DC'],
      },
      {
        productId: 12,
        name: 'Nightstand',
        modelId: null,
        categoryId: 2,
        categoryName: 'Tables',
        description: 'Practical nightstand with storage.',
        price: 159.99,
        rating: 4.3,
        ratingCount: 190,
        model: nightstand,
        colors: ['#610B0B', '#C87C30', '#EDE1B3'],
      },
    ],
  },
  {
    categoryName: 'Beds',
    categoryId: 3,
    products: [
      {
        productId: 13,
        name: 'Queen Bed',
        modelId: null,
        categoryId: 3,
        categoryName: 'Beds',
        description: 'Modern queen-size bed with headboard and sturdy frame.',
        price: 999.99,
        rating: 4.9,
        ratingCount: 410,
        model: bed,
        colors: ['#D2B48C', '#8B4513', '#F5F5DC'],
      },
      {
        productId: 14,
        name: 'Platform Bed',
        modelId: null,
        categoryId: 3,
        categoryName: 'Beds',
        description: 'Sleek platform bed with a flat headboard and under-bed drawer.',
        price: 1099.99,
        rating: 4.8,
        ratingCount: 360,
        model: platformBed,
        colors: ['#A0522D', '#DEB887', '#FFF8DC'],
      },
    ],
  },
  {
    categoryName: 'Storage',
    categoryId: 4,
    products: [
      {
        productId: 15,
        name: 'Bookshelf',
        modelId: null,
        categoryId: 4,
        categoryName: 'Storage',
        description:
          'Stylish and functional storage solutions to organize your space with ease and modern appeal.',
        price: 150.22,
        rating: 3.9,
        ratingCount: 350,
        model: bookshelf,
        colors: ['#D2691E', '#CD853F', 'black'],
      },
      {
        productId: 16,
        name: 'Wardrobes',
        modelId: null,
        categoryId: 4,
        categoryName: 'Storage',
        description:
          'Stylish and functional storage solutions to organize your space with ease and modern appeal.',
        price: 450.0,
        rating: 4.5,
        ratingCount: 450,
        model: wardrobes,
        colors: ['#D2691E', '#CD853F', '#8B4513'],
      },
      {
        productId: 17,
        name: 'Cabinet',
        modelId: null,
        categoryId: 4,
        categoryName: 'Storage',
        description:
          'A sleek cabinet with 3 hanging rods and 3 adjustable shelves, made from high-quality wood for efficient storage.',
        price: 420.0,
        rating: 4.2,
        ratingCount: 410,
        model: cabinet,
        colors: ['#8B4513', '#CD853F', '#FFF8DC'],
      },
    ],
  },
  {
    categoryName: 'Lighting',
    categoryId: 5,
    products: [
      {
        productId: 18,
        name: 'Table Lamp',
        modelId: null,
        categoryId: 5,
        categoryName: 'Lighting',
        description: 'Stylish desk lamp for working table.',
        price: 79.99,
        rating: 4.4,
        ratingCount: 140,
        model: lamp,
        colors: ['#F5F5DC', '#8B4513', '#D2B48C'],
      },
      {
        productId: 19,
        name: 'Table Side Lamp',
        modelId: null,
        categoryId: 5,
        categoryName: 'Lighting',
        description: 'Stylish bedside lamp for ambient lighting.',
        price: 199.99,
        rating: 4.4,
        ratingCount: 240,
        model: tableLamp,
        colors: ['#F5F5DC', '#8B4513', '#D2B48C'],
      },
      {
        productId: 20,
        name: 'Reading Lamp',
        modelId: null,
        categoryId: 5,
        categoryName: 'Lighting',
        description: 'Stylish table side lamp for reading purposes.',
        price: 299.99,
        rating: 4.6,
        ratingCount: 340,
        model: modernReadingLight,
        colors: ['#F5F5DC', '#8B4513', '#D2B48C'],
      },
    ],
  },
];

export default data;
