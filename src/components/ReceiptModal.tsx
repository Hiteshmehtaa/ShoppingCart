import { X, CheckCircle } from "lucide-react";
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
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50"
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
            className="absolute top-4 right-4 text-gray-500 hover:bg-gray-100 p-2 rounded-md transition"
          >
            <X size={20} />
          </button>

          {/* Success Header */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-3">
              <CheckCircle size={32} className="text-green-600" />
            </div>

            <h2 className="text-xl font-semibold text-gray-900">
              Order Confirmed
            </h2>
            <p className="text-gray-500 text-sm mt-1">
              Your order has been placed successfully.
            </p>
          </div>

          {/* Order Details */}
          <div className="bg-gray-50 p-4 rounded-md border border-gray-200 mb-6">
            <h3 className="font-medium text-gray-800 mb-3">Order Details</h3>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Order ID</span>
                <span className="font-semibold text-gray-800">
                  {receipt.orderId}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600">Customer</span>
                <span className="font-semibold text-gray-800">
                  {receipt.customerName}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600">Email</span>
                <span className="font-semibold text-gray-800 text-right break-all">
                  {receipt.customerEmail}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600">Date</span>
                <span className="font-semibold text-gray-800">
                  {new Date(receipt.timestamp).toLocaleDateString("en-IN", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </div>
            </div>
          </div>

          {/* Items List */}
          <div className="bg-white border border-gray-200 rounded-md p-4 mb-6">
            <h3 className="font-medium text-gray-800 mb-3">Items</h3>

            <div className="space-y-2 max-h-48 overflow-y-auto text-sm">
              {receipt.items.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center py-1 text-gray-700"
                >
                  <span>
                    {item.name}{" "}
                    <span className="text-gray-500">x{item.quantity}</span>
                  </span>
                  <span className="font-semibold">₹{item.subtotal}</span>
                </div>
              ))}
            </div>

            <div className="border-t mt-4 pt-3 flex justify-between font-semibold text-gray-900">
              <span>Total</span>
              <span>₹{receipt.total}</span>
            </div>
          </div>

          {/* Button */}
          <button
            onClick={onClose}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-md transition"
          >
            Continue Shopping
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
