import { Minus, Plus, Trash2 } from "lucide-react";
import { CartItem as CartItemType } from "../types";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

interface Props {
  item: CartItemType;
  onUpdateQuantity: (itemId: string, quantity: number) => void;
  onRemove: (itemId: string) => void;
  loading: boolean;
}

export function CartItem({ item, onUpdateQuantity, onRemove, loading }: Props) {
  const [isRemoving, setIsRemoving] = useState(false);

  const handleRemove = () => {
    setIsRemoving(true);
    setTimeout(() => onRemove(item._id), 400);
  };

  const price = item.productId.price;
  const subtotal = price * item.quantity;

  return (
    <AnimatePresence>
      {!isRemoving && (
        <motion.div
          initial={{ opacity: 0, x: 30 }}

          // ✅ FIXED ANIMATION (NO TS ERRORS)
          animate={
            isRemoving
              ? {
                  x: [0, -6, 6, -6, 6, 0],     // shake
                  transition: { duration: 0.35 }
                }
              : {
                  opacity: 1,
                  x: 0
                }
          }

          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.25 }}
          className="flex gap-3 bg-gray-50 dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700"
        >
          {/* IMAGE */}
          <img
            src={item.productId.image}
            className="w-16 h-16 rounded-lg object-cover"
          />

          {/* MIDDLE */}
          <div className="flex-1">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
              {item.productId.name}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">₹{price}</p>

            {/* QUANTITY */}
            <div className="flex items-center gap-2 mt-2 bg-white dark:bg-gray-700 px-2 py-1 rounded-md border border-gray-300 dark:border-gray-600">
              <button
                onClick={() => onUpdateQuantity(item._id, item.quantity - 1)}
                disabled={loading || item.quantity <= 1}
                className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded disabled:opacity-40"
              >
                <Minus size={14} />
              </button>

              <span className="w-6 text-center font-bold">{item.quantity}</span>

              <button
                onClick={() => onUpdateQuantity(item._id, item.quantity + 1)}
                disabled={loading}
                className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded disabled:opacity-40"
              >
                <Plus size={14} />
              </button>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="flex flex-col justify-between items-end">
            <p className="font-semibold text-gray-900 dark:text-gray-100 text-sm">
              ₹{subtotal.toFixed(2)}
            </p>

            <motion.button
              onClick={handleRemove}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.85 }}
              className="text-red-600 hover:bg-red-100 dark:hover:bg-red-900 p-1 rounded"
            >
              <Trash2 size={18} />
            </motion.button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
