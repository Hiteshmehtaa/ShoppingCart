import { Minus, Plus, Trash2 } from "lucide-react";
import { CartItem as CartItemType } from "../types";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

interface CartItemProps {
  item: CartItemType;
  onUpdateQuantity: (itemId: string, quantity: number) => void;
  onRemove: (itemId: string) => void;
  loading: boolean;
}

export function CartItem({ item, onUpdateQuantity, onRemove, loading }: CartItemProps) {
  const [isRemoving, setIsRemoving] = useState(false);
  const subtotal = item.productId.price * item.quantity;

  const handleRemove = () => {
    setIsRemoving(true);
    setTimeout(() => onRemove(item._id), 200);
  };

  return (
    <AnimatePresence>
      {!isRemoving && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="flex items-center gap-3 bg-white border border-gray-200 p-3 rounded-md"
        >
          {/* Image */}
          <img
            src={item.productId.image}
            alt={item.productId.name}
            className="w-16 h-16 object-cover rounded-md"
          />

          {/* Info */}
          <div className="flex-1 min-w-0">
            <h4 className="font-medium text-gray-900 truncate text-sm">
              {item.productId.name}
            </h4>
            <p className="text-gray-600 text-xs">
              ₹{item.productId.price.toFixed(2)}
            </p>
          </div>

          {/* Quantity Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => onUpdateQuantity(item._id, item.quantity - 1)}
              disabled={loading || item.quantity <= 1}
              className="h-7 w-7 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-100 disabled:opacity-40"
            >
              <Minus size={14} className="text-gray-700" />
            </button>

            <span className="text-sm font-semibold text-gray-800 w-6 text-center">
              {item.quantity}
            </span>

            <button
              onClick={() => onUpdateQuantity(item._id, item.quantity + 1)}
              disabled={loading}
              className="h-7 w-7 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-100 disabled:opacity-40"
            >
              <Plus size={14} className="text-gray-700" />
            </button>
          </div>

          {/* Subtotal */}
          <div className="w-20 text-right">
            <p className="text-sm font-semibold text-gray-900">
              ₹{subtotal.toFixed(2)}
            </p>
          </div>

          {/* Remove Button */}
          <button
            onClick={handleRemove}
            disabled={loading}
            className="text-red-600 hover:bg-red-50 p-2 rounded-md transition disabled:opacity-40"
          >
            <Trash2 size={18} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
