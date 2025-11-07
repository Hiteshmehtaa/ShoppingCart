import express from 'express';
import Product from '../models/Product.js';

const router = express.Router();

const mockProducts = [
  { 
    name: 'Wireless Headphones',
    price: 79.99,
    description: 'Premium sound quality',
    image: 'https://images.pexels.com/photos/3825517/pexels-photo-3825517.jpeg?auto=compress&w=400',
    category: 'Electronics'
  },
  { 
    name: 'Smart Watch',
    price: 199.99,
    description: 'Track your fitness',
    image: 'https://images.pexels.com/photos/393047/pexels-photo-393047.jpeg?auto=compress&w=400',
    category: 'Electronics'
  },
  { 
    name: 'Laptop Stand',
    price: 49.99,
    description: 'Ergonomic design',
    image: 'https://images.pexels.com/photos/7974/pexels-photo.jpg?auto=compress&w=400',
    category: 'Home'
  },
  { 
    name: 'Mechanical Keyboard',
    price: 129.99,
    description: 'RGB backlit keys',
    image: 'https://images.pexels.com/photos/2115257/pexels-photo-2115257.jpeg?auto=compress&w=400',
    category: 'Electronics'
  },
  { 
    name: 'USB-C Hub',
    price: 39.99,
    description: 'Multiple ports',
    image: 'https://images.pexels.com/photos/163125/board-electronics-computer-data-processing-163125.jpeg?auto=compress&w=400',
    category: 'Electronics'
  },
  { 
    name: 'Wireless Mouse',
    price: 29.99,
    description: 'Comfortable grip',
    image: 'https://images.pexels.com/photos/2115256/pexels-photo-2115256.jpeg?auto=compress&w=400',
    category: 'Electronics'
  },
  { 
    name: 'Phone Case',
    price: 19.99,
    description: 'Protective & stylish',
    image: 'https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg?auto=compress&w=400',
    category: 'Fashion'
  },
  { 
    name: 'Portable Charger',
    price: 34.99,
    description: '20000mAh capacity',
    image: 'https://images.pexels.com/photos/4199098/pexels-photo-4199098.jpeg?auto=compress&w=400',
    category: 'Electronics'
  }
];


router.get('/', async (req, res) => {
  try {
    let products = await Product.find();

    if (products.length === 0) {
      await Product.insertMany(mockProducts);
      products = await Product.find();
    }

    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
