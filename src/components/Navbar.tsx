import { Search, ShoppingCart, User } from "lucide-react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";


interface NavbarProps {
  cartCount?: number;      // ✅ optional
  onCartClick?: () => void;  // ✅ optional
}


export function Navbar({ cartCount, onCartClick }: NavbarProps) {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-5 py-3 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 cursor-pointer">
          <ShoppingCart size={26} className="text-blue-600" />
          <span className="text-xl font-semibold text-gray-800 tracking-tight">
            Vibe<span className="text-blue-600 font-bold">Commerce</span>
          </span>
        </Link>

        {/* Search Bar */}
        <div className="hidden md:flex items-center bg-gray-100 px-4 py-2 rounded-md w-96 border border-gray-300">
          <Search className="text-gray-500 mr-2" size={18} />
          <input
            type="text"
            placeholder="Search for products..."
            className="w-full bg-transparent outline-none text-sm text-gray-700"
          />
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">

          {/* Login Button */}
          <button className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition text-sm">
            <User size={18} className="inline-block mr-1" />
            Login
          </button>

          {/* Cart */}
          <button
  onClick={() => onCartClick && onCartClick()}
  className="relative bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center gap-2 transition text-sm"
>
  <ShoppingCart size={18} />
  <span>Cart</span>

  <AnimatePresence>
    {cartCount !== undefined && cartCount > 0 && (
      <motion.span
        key={cartCount} 
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 12 }}
        className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold h-5 w-5 rounded-full flex items-center justify-center shadow-lg"
      >
        {cartCount}
      </motion.span>
    )}
  </AnimatePresence>
</button>


        </div>
      </div>
    </header>
  );
}
