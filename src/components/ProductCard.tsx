import { ShoppingCart, Check } from "lucide-react";
import { Product } from "../types";
import { useState } from "react";
import { motion } from "framer-motion";

interface ProductCardProps {
  product: Product;
  onAddToCart: (productId: string) => void;
  loading: boolean;
  index?: number;
}

export function ProductCard({
  product,
  onAddToCart,
  loading,
  index = 0,
}: ProductCardProps) {
  const [isAdded, setIsAdded] = useState(false);

  const handleAdd = () => {
    if (loading) return;
    setIsAdded(true);
    onAddToCart(product._id);
    setTimeout(() => setIsAdded(false), 700);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.03, duration: 0.25 }}
      className="w-full"
    >
      <motion.div
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        className="bg-white dark:bg-gray-800 rounded-md border border-gray-200 dark:border-gray-700 
        hover:shadow-lg transition-shadow cursor-pointer flex flex-col h-full"
      >
        {/* ✅ IMAGE */}
        <div className="relative h-44 bg-gray-100 dark:bg-gray-700 overflow-hidden">
          <motion.img
            whileHover={{ scale: 1.08 }}
            transition={{ duration: 0.4 }}
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />

          {/* ✅ CATEGORY TAG */}
          <span className="absolute top-2 left-2 bg-white dark:bg-gray-900 text-gray-700 
          dark:text-gray-300 border border-gray-300 dark:border-gray-600 px-2 py-1 rounded text-xs font-medium shadow-sm">
            {product.category}
          </span>
        </div>

        {/* ✅ CONTENT */}
        <div className="p-4 flex flex-col flex-1">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 leading-tight line-clamp-2">
            {product.name}
          </h3>

          <p className="text-xs text-gray-500 dark:text-gray-300 mt-1 line-clamp-2 flex-1">
            {product.description}
          </p>

          <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-200 dark:border-gray-700">
            {/* ✅ PRICE */}
            <span className="text-lg font-semibold text-gray-900 dark:text-gray-100 tracking-tight">
              ₹{product.price.toFixed(2)}
            </span>

            {/* ✅ ADD BUTTON */}
            <motion.button
              whileTap={{ scale: 0.92 }}
              onClick={handleAdd}
              disabled={loading}
              className={`px-3 py-2 rounded-md text-sm font-medium flex items-center gap-2 
              transition relative overflow-hidden
              ${
                isAdded
                  ? "bg-green-600 text-white"
                  : "bg-blue-600 hover:bg-blue-700 text-white"
              }
              ${loading ? "opacity-50 cursor-not-allowed" : ""}
            `}
            >
              {isAdded ? (
                <>
                  <Check size={16} /> Added
                </>
              ) : (
                <>
                  <ShoppingCart size={16} /> Add
                </>
              )}
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
