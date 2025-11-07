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
  const [glow, setGlow] = useState(false);

  const handleAdd = () => {
    if (loading) return;

    setIsAdded(true);
    onAddToCart(product._id);

    // Glow effect on add
    setGlow(true);
    setTimeout(() => setGlow(false), 400);

    setTimeout(() => setIsAdded(false), 700);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.03, duration: 0.25 }}
      className="w-full"
    >
      <div
        className={`rounded-lg border overflow-hidden 
          bg-white dark:bg-gray-800 
          transition-all cursor-pointer

          ${
            glow
              ? "shadow-[0_0_16px_rgba(59,130,246,0.6)] dark:shadow-[0_0_20px_rgba(59,130,246,0.8)]"
              : "shadow"
          }
          hover:shadow-lg
        `}
      >
        {/* Image */}
        <div className="relative h-44 bg-gray-100 dark:bg-gray-700 overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />

          <span className="absolute top-2 left-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 px-2 py-1 rounded text-xs font-medium text-gray-700 dark:text-gray-300">
            {product.category}
          </span>
        </div>

        {/* Body */}
        <div className="p-4 flex flex-col">
          <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-sm line-clamp-2">
            {product.name}
          </h3>

          <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">
            {product.description}
          </p>

          {/* Footer */}
          <div className="mt-4 flex items-center justify-between border-t border-gray-200 dark:border-gray-700 pt-3">
            <span className="text-lg font-bold text-gray-900 dark:text-gray-100">
              ₹{product.price.toFixed(2)}
            </span>

            <button
              onClick={handleAdd}
              disabled={loading}
              className={`px-3 py-2 rounded-md text-sm font-medium flex items-center gap-2 transition 
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
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
