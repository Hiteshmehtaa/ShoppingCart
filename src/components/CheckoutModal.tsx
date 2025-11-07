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
      {isOpen && (
        <motion.div
          key="checkout-modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        >
          {/* MODAL PANEL */}
          <motion.div
            initial={{ scale: 0.85, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.85, opacity: 0, y: 20 }}
            transition={{ type: "spring", stiffness: 120, damping: 12 }}
            className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-md w-full p-6 relative overflow-y-auto max-h-[90vh] border border-gray-200 dark:border-gray-700"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition"
            >
              <X size={20} />
            </button>

            {/* Title */}
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-1">
              Checkout
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-5 text-sm">
              Complete your purchase securely.
            </p>

            {/* Order Summary */}
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-xl border border-gray-300 dark:border-gray-700 mb-6">
              <h3 className="font-semibold mb-3 text-gray-900 dark:text-gray-100">
                Order Summary
              </h3>

              <div className="space-y-2 max-h-40 overflow-y-auto">
                {cartItems.map((item) => (
                  <motion.div
                    key={item._id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex justify-between text-sm"
                  >
                    <span className="text-gray-700 dark:text-gray-300">
                      {item.productId.name}{" "}
                      <span className="text-gray-500 dark:text-gray-400">
                        × {item.quantity}
                      </span>
                    </span>
                    <span className="font-semibold text-gray-900 dark:text-gray-100">
                      ₹{(item.productId.price * item.quantity).toFixed(2)}
                    </span>
                  </motion.div>
                ))}
              </div>

              <div className="border-t border-gray-300 dark:border-gray-700 pt-3 flex justify-between font-bold text-lg mt-4">
                <span className="text-gray-900 dark:text-gray-100">Total</span>
                <span className="text-blue-600 dark:text-blue-400">
                  ₹{total.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Checkout Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="John Doe"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="john@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              {/* Submit Button */}
              <motion.button
                whileTap={{ scale: 0.97 }}
                whileHover={{ scale: loading ? 1 : 1.02 }}
                disabled={loading}
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700 disabled:bg-green-600/60 text-white font-bold py-3 rounded-lg transition flex items-center justify-center"
              >
                {loading ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 0.8 }}
                    className="h-5 w-5 border-2 border-white border-b-transparent rounded-full"
                  />
                ) : (
                  "Complete Purchase"
                )}
              </motion.button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
