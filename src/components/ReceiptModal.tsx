import { CheckCircle, X } from "lucide-react";
import { Receipt } from "../types";
import { motion, AnimatePresence } from "framer-motion";

interface ReceiptModalProps {
  isOpen: boolean;
  onClose: () => void;
  receipt: Receipt | null;
}

export function ReceiptModal({ isOpen, onClose, receipt }: ReceiptModalProps) {
  if (!isOpen || !receipt) return null;

  return (
    <AnimatePresence>
      <motion.div
        key="receipt-modal"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
      >
        <motion.div
          initial={{ scale: 0.85, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.85, opacity: 0, y: 20 }}
          transition={{ type: "spring", stiffness: 120, damping: 12 }}
          className="bg-white dark:bg-gray-900 rounded-2xl max-w-md w-full p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto border border-gray-200 dark:border-gray-700"
        >
          {/* CLOSE BUTTON */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 p-2 rounded-full transition"
          >
            <X size={20} />
          </button>

          {/* SUCCESS ICON */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 150, damping: 12 }}
              className="inline-flex items-center justify-center w-20 h-20 bg-green-100 dark:bg-green-900/40 rounded-full shadow mb-3"
            >
              <CheckCircle className="text-green-600 dark:text-green-400" size={42} />
            </motion.div>

            <h2 className="text-3xl font-bold text-green-600 dark:text-green-400">
              Order Confirmed!
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Thank you for your purchase 🎉
            </p>
          </div>

          {/* ORDER SUMMARY */}
          <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-5 mb-6 border border-gray-300 dark:border-gray-700">
            <div className="space-y-3">

              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400 text-sm font-medium">
                  Order ID
                </span>
                <span className="font-bold text-gray-800 dark:text-gray-200">
                  {receipt.orderId}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400 text-sm font-medium">
                  Customer
                </span>
                <span className="font-semibold text-gray-800 dark:text-gray-200">
                  {receipt.customerName}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400 text-sm font-medium">
                  Email
                </span>
                <span className="font-semibold text-gray-800 dark:text-gray-200 text-right break-all">
                  {receipt.customerEmail}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400 text-sm font-medium">
                  Date
                </span>
                <span className="font-semibold text-gray-800 dark:text-gray-200">
                  {new Date(receipt.timestamp).toLocaleDateString("en-IN", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </div>
            </div>
          </div>

          {/* ORDER ITEMS */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 mb-6 border border-gray-200 dark:border-gray-700">
            <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-4">
              Order Items
            </h3>

            <motion.div
              initial="hidden"
              animate="show"
              variants={{
                hidden: {},
                show: {
                  transition: { staggerChildren: 0.06 },
                },
              }}
              className="space-y-3 max-h-48 overflow-y-auto"
            >
              {receipt.items.map((item, i) => (
                <motion.div
                  key={i}
                  variants={{
                    hidden: { opacity: 0, x: 25 },
                    show: { opacity: 1, x: 0 },
                  }}
                  className="flex justify-between text-sm p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                >
                  <span className="text-gray-700 dark:text-gray-300">
                    <strong>{item.name}</strong> × {item.quantity}
                  </span>
                  <span className="font-bold text-gray-900 dark:text-gray-100">
                    ₹{item.subtotal}
                  </span>
                </motion.div>
              ))}
            </motion.div>

            <div className="border-t border-gray-300 dark:border-gray-700 mt-4 pt-3 flex justify-between">
              <span className="font-semibold text-gray-700 dark:text-gray-300">
                Total
              </span>
              <span className="text-3xl font-bold text-green-600 dark:text-green-400">
                ₹{receipt.total}
              </span>
            </div>
          </div>

          {/* CONTINUE BUTTON */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.96 }}
            onClick={onClose}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg shadow-md transition"
          >
            Continue Shopping
          </motion.button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
