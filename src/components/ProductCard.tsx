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
  index = 0
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
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04, duration: 0.4 }}
      className="w-full"
    >
      <motion.div
        whileHover={{ scale: 1.02, boxShadow: "0px 8px 20px rgba(0,0,0,0.08)" }}
        className="bg-white rounded-md border border-gray-200 cursor-pointer flex flex-col h-full"
      >

        {/* Image */}
        <div className="relative h-44 bg-gray-100 overflow-hidden">
          <motion.img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.08 }}
            transition={{ duration: 0.3 }}
          />

          {/* Category Tag */}
          <span className="absolute top-2 left-2 bg-white/90 backdrop-blur px-2 py-1 rounded text-xs font-medium text-gray-700 border border-gray-300">
            {product.category}
          </span>
        </div>

        {/* Content */}
        <div className="p-4 flex flex-col flex-1">
          <h3 className="text-sm font-semibold text-gray-900 leading-tight line-clamp-2">
            {product.name}
          </h3>

          <p className="text-xs text-gray-500 mt-1 line-clamp-2 flex-1">
            {product.description}
          </p>

          <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-200">

            {/* Price */}
            <span className="text-lg font-semibold text-gray-900 tracking-tight">
              ₹{product.price.toFixed(2)}
            </span>

            {/* Add to Cart Button */}
            <motion.button
              onClick={handleAdd}
              disabled={loading}
              whileTap={{ scale: 0.9 }}
              animate={isAdded ? { scale: [1, 1.15, 1] } : { scale: 1 }}
              transition={{ duration: 0.3 }}
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
                  <Check size={16} />
                  Added
                </>
              ) : (
                <>
                  <ShoppingCart size={16} />
                  Add
                </>
              )}
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
