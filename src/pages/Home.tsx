import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingBag, Package, ShieldCheck } from "lucide-react";
import { Navbar } from "../components/Navbar";

export function Home() {

  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">

      {/* ✅ NAVBAR (Keep this — your requirement) */}
      <Navbar 
        cartCount={0} 
        onCartClick={() => navigate("/shop")} 
      />

      {/* ✅ HERO SECTION */}
      <section className="py-24 border-b bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 transition-colors">
        <div className="max-w-7xl mx-auto px-6 text-center">

          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl font-semibold text-gray-900 dark:text-gray-100 leading-tight transition-colors">
            Shop Smart.
            <br className="hidden sm:block" />
            <span className="text-blue-600 dark:text-blue-400">Explore Quality Products.</span>
          </h1>

          {/* Subheading */}
          <p className="text-gray-600 dark:text-gray-300 mt-4 max-w-xl mx-auto text-lg transition-colors">
            A clean and effortless shopping experience built for speed,
            simplicity, and comfort.
          </p>

          {/* CTA */}
          <div className="mt-8">
            <Link
              to="/shop"
              className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-lg font-medium transition"
            >
              Browse Products
            </Link>
          </div>
        </div>
      </section>

      {/* ✅ FEATURES SECTION */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800 transition-colors">
        <div className="max-w-7xl mx-auto px-6">

          <h2 className="text-3xl font-semibold text-gray-900 dark:text-gray-100 mb-12 text-center transition-colors">
            What Makes Us Better
          </h2>

          <div className="grid sm:grid-cols-3 gap-10">

            {/* Feature 1 */}
            <div className="p-6 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-md text-center transition-colors">
              <ShoppingBag size={32} className="mx-auto text-blue-600 dark:text-blue-400 mb-4" />
              <h3 className="font-medium text-lg text-gray-900 dark:text-gray-100 mb-1">
                Latest Products
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                Discover trending and high-quality items curated for you.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-6 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-md text-center transition-colors">
              <Package size={32} className="mx-auto text-blue-600 dark:text-blue-400 mb-4" />
              <h3 className="font-medium text-lg text-gray-900 dark:text-gray-100 mb-1">
                Fast Delivery
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                Quick and reliable delivery right to your doorstep.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-6 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-md text-center transition-colors">
              <ShieldCheck size={32} className="mx-auto text-blue-600 dark:text-blue-400 mb-4" />
              <h3 className="font-medium text-lg text-gray-900 dark:text-gray-100 mb-1">
                Secure Checkout
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                Trusted and safe payment & checkout process.
              </p>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
