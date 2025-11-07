import express from 'express';
import Cart from '../models/Cart.js';

const router = express.Router();
const DEFAULT_USER_ID = 'default-user';

router.post('/', async (req, res) => {
  try {
    const { name, email, cartItems } = req.body;

    if (!name || !email) {
      return res.status(400).json({ error: 'Name and email are required' });
    }

    if (!cartItems || cartItems.length === 0) {
      return res.status(400).json({ error: 'Cart is empty' });
    }

    const total = cartItems.reduce((sum, item) => {
      return sum + (item.productId?.price || 0) * item.quantity;
    }, 0);

    const receipt = {
      orderId: `ORD-${Date.now()}`,
      customerName: name,
      customerEmail: email,
      items: cartItems.map(item => ({
        name: item.productId?.name,
        quantity: item.quantity,
        price: item.productId?.price,
        subtotal: (item.productId?.price || 0) * item.quantity
      })),
      total: total.toFixed(2),
      timestamp: new Date().toISOString()
    };

    await Cart.findOneAndUpdate(
      { userId: DEFAULT_USER_ID },
      { items: [], updatedAt: Date.now() }
    );

    res.json(receipt);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
