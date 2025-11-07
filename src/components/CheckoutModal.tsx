import { useState } from "react";
import { X } from "lucide-react";
import { CartItem } from "../types";
import { motion, AnimatePresence } from "framer-motion";

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  total: number;
  onCheckout: (name: string, email: string) => void;
  loading: boolean;
}

export function CheckoutModal({
  isOpen,
  onClose,
  cartItems,
  total,
  onCheckout,
  loading,
}: CheckoutModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCheckout(name, email);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4"
      >
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 15 }}
          transition={{ duration: 0.2 }}
          className="bg-white rounded-lg shadow-lg max-w-md w-full p-6 relative max-h-[90vh] overflow-y-auto"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-gray-500 hover:bg-gray-100 rounded-md transition"
          >
            <X size={20} />
          </button>

          {/* Title */}
          <h2 className="text-xl font-semibold text-gray-900 mb-1">
            Checkout
          </h2>
          <p className="text-gray-500 text-sm mb-6">
            Enter your details to complete the order
          </p>

          {/* Order Summary */}
          <div className="bg-gray-50 p-4 rounded-md border border-gray-200 mb-6">
            <h3 className="font-medium text-gray-800 mb-3">Order Summary</h3>

            <div className="space-y-2 max-h-40 overflow-y-auto">
              {cartItems.map((item) => (
                <div
                  key={item._id}
                  className="flex justify-between text-sm text-gray-700"
                >
                  <span>
                    {item.productId.name}{" "}
                    <span className="text-gray-500">x{item.quantity}</span>
                  </span>
                  <span className="font-semibold">
                    ₹{(item.productId.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-300 pt-3 mt-3 flex justify-between font-semibold text-gray-900">
              <span>Total</span>
              <span>₹{total.toFixed(2)}</span>
            </div>
          </div>

          {/* Checkout Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="john@example.com"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-md transition text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Processing..." : "Complete Purchase"}
            </button>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
