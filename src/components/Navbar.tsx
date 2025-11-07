import { Search, ShoppingCart, User, Sun, Moon } from "lucide-react";
import { Link } from "react-router-dom";
import { useThemeContext } from "../context/ThemeContext";

interface NavbarProps {
  cartCount?: number;
  onCartClick?: () => void;
}

export function Navbar({ cartCount, onCartClick }: NavbarProps) {
  const { theme, toggleTheme } = useThemeContext();

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 transition">
      <div className="max-w-7xl mx-auto px-5 py-3 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <ShoppingCart size={26} className="text-blue-600" />
          <span className="text-xl font-semibold text-gray-900 dark:text-gray-100">
            Ne<span className="text-blue-600 font-bold">xora</span>
          </span>
        </Link>

        {/* Search Bar */}
        <div className="hidden md:flex items-center bg-gray-100 dark:bg-gray-800 px-4 py-2 rounded-md w-96 border border-gray-300 dark:border-gray-700">
          <Search className="text-gray-500 dark:text-gray-400 mr-2" size={18} />
          <input
            type="text"
            placeholder="Search for products..."
            className="w-full bg-transparent outline-none text-sm text-gray-800 dark:text-gray-100"
          />
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">

          {/* Theme Button */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-md border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
          >
            {theme === "light" ? (
              <Moon size={18} className="text-gray-700" />
            ) : (
              <Sun size={18} className="text-yellow-400" />
            )}
          </button>

          {/* Login */}
          <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition text-sm">
            <User size={18} className="inline-block mr-1" />
            Login
          </button>

          {/* Cart */}
          <button
            onClick={() => onCartClick && onCartClick()}
            className="relative bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center gap-2 text-sm transition"
          >
            <ShoppingCart size={18} />
            Cart

            {cartCount !== undefined && cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-xs text-white font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>

        </div>
      </div>
    </header>
  );
}
