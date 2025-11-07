import { useState, useEffect } from "react";
import { ProductCard } from "../components/ProductCard";
import { CartItem as CartItemComponent } from "../components/CartItem";
import { CheckoutModal } from "../components/CheckoutModal";
import { ReceiptModal } from "../components/ReceiptModal";
import { Product, CartItem, Receipt } from "../types";
import { api } from "../api/api";
import { motion, AnimatePresence } from "framer-motion";
import { SkeletonCard } from "../components/SkeletonCard";
import { notifyAdd, notifyRemove, notifyCheckout } from "../utils/toast";
import { X } from "lucide-react";
import { Navbar } from "../components/Navbar";
import { useRef } from "react";


export function Shop() {
  const [products, setProducts] = useState<Product[]>([]);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  const [showCart, setShowCart] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [receipt, setReceipt] = useState<Receipt | null>(null);

  const [selectedCategory, setSelectedCategory] = useState("All");

  // ✅ Load products + cart initially
  useEffect(() => {
    loadProducts();
    loadCart();
  }, []);

  const loadProducts = async () => {
    setLoading(true);
    const data = await api.getProducts();
    setProducts(data);
    setLoading(false);
  };

  const loadCart = async () => {
    const { cart, total } = await api.getCart();
    setCartItems(cart.items);
    setCartTotal(total);
  };

  const handleAddToCart = async (id: string) => {
    setLoading(true);
    await api.addToCart(id);
    await loadCart();
    notifyAdd();
    setLoading(false);
  };

  const handleUpdateQuantity = async (itemId: string, qty: number) => {
    await api.updateCartItem(itemId, qty);
    await loadCart();
  };

  const handleRemoveItem = async (itemId: string) => {
    await api.removeFromCart(itemId);
    await loadCart();
    notifyRemove();
  };

  const handleCheckout = async (name: string, email: string) => {
    const receiptData = await api.checkout(name, email, cartItems);
    setReceipt(receiptData);
    notifyCheckout();
    setShowCheckout(false);
    setShowCart(false);
    await loadCart();
  };
  const cartRef = useRef<HTMLDivElement | null>(null);

useEffect(() => {
  function handleOutsideClick(e: MouseEvent) {
    if (cartRef.current && !cartRef.current.contains(e.target as Node)) {
      setShowCart(false);
    }
  }

  if (showCart) {
    document.addEventListener("mousedown", handleOutsideClick);
  }

  return () => {
    document.removeEventListener("mousedown", handleOutsideClick);
  };
}, [showCart]);


  // ✅ Auto-generate categories
  const categories = ["All", ...new Set(products.map((p) => p.category))];

  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((p) => p.category === selectedCategory);

  return (
    <div className="min-h-screen bg-white">

      {/* ✅ NAVBAR — controlled by Shop page */}
      <Navbar
        cartCount={cartItems.length}
        onCartClick={() => setShowCart(true)}
      />

      <div className="max-w-7xl mx-auto px-4 py-10">
        
        {/* PAGE TITLE */}
        <h1 className="text-3xl font-semibold mb-6 text-gray-900">
          Shop Products
        </h1>

        {/* ✅ CATEGORY TABS */}
        <div className="flex gap-6 mb-10 border-b border-gray-200 pb-2 overflow-x-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`pb-2 text-sm font-medium transition-all ${
                selectedCategory === cat
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* ✅ PRODUCT GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {loading && products.length === 0
            ? [...Array(8)].map((_, i) => <SkeletonCard key={i} />)
            : filteredProducts.map((product, index) => (
                <motion.div
                  key={product._id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.25, delay: index * 0.03 }}
                >
                  <ProductCard
                    product={product}
                    onAddToCart={handleAddToCart}
                    loading={loading}
                    index={index}
                  />
                </motion.div>
              ))}
        </div>
      </div>

      {/* ✅ CART SIDEBAR */}
      <AnimatePresence>
  {showCart && (
    <motion.div
      ref={cartRef}
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 40 }}
      transition={{ duration: 0.2 }}
      className="fixed right-0 top-0 h-full w-80 bg-white border-l border-gray-200 p-6 z-50 overflow-y-auto shadow-xl"
    >

            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Your Cart</h2>

              <button
                onClick={() => setShowCart(false)}
                className="text-gray-500 hover:text-gray-700 transition p-1"
              >
                <X size={20} />
              </button>
            </div>

            {cartItems.length === 0 ? (
              <p className="text-gray-500 text-center mt-10">
                Your cart is empty
              </p>
            ) : (
              <>
                <div className="space-y-3 mb-6">
                  {cartItems.map((item) => (
                    <CartItemComponent
                      key={item._id}
                      item={item}
                      onUpdateQuantity={handleUpdateQuantity}
                      onRemove={handleRemoveItem}
                      loading={loading}
                    />
                  ))}
                </div>

                <div className="border-t pt-4">
                  <p className="flex justify-between text-sm font-medium text-gray-800 mb-3">
                    <span>Total</span>
                    <span>₹{cartTotal.toFixed(2)}</span>
                  </p>

                  <button
                    onClick={() => setShowCheckout(true)}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-md text-sm font-medium transition"
                  >
                    Checkout
                  </button>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ✅ MODALS */}
      <CheckoutModal
        isOpen={showCheckout}
        onClose={() => setShowCheckout(false)}
        cartItems={cartItems}
        total={cartTotal}
        onCheckout={handleCheckout}
        loading={loading}
      />

      <ReceiptModal
        isOpen={!!receipt}
        onClose={() => setReceipt(null)}
        receipt={receipt}
      />
    </div>
  );
}
