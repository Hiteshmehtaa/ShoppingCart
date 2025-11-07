import { Facebook, Instagram, Twitter, Linkedin } from "lucide-react";
import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-300 pt-14 pb-6 mt-16 border-t border-gray-300 dark:border-gray-700">

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">

        {/* BRAND */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
            Vibe<span className="text-blue-600 dark:text-blue-400">Commerce</span>
          </h2>

          <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">
            Your trusted platform for premium quality products and a seamless shopping experience.
          </p>
        </div>

        {/* QUICK LINKS */}
        <div>
          <h3 className="text-gray-900 dark:text-white font-semibold mb-4 text-lg">
            Quick Links
          </h3>

          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:text-blue-600 dark:hover:text-blue-400 transition">Home</Link></li>
            <li><Link to="/shop" className="hover:text-blue-600 dark:hover:text-blue-400 transition">Shop</Link></li>
            <li className="hover:text-blue-600 dark:hover:text-blue-400 transition">Categories</li>
            <li className="hover:text-blue-600 dark:hover:text-blue-400 transition">Offers</li>
          </ul>
        </div>

        {/* SUPPORT */}
        <div>
          <h3 className="text-gray-900 dark:text-white font-semibold mb-4 text-lg">
            Support
          </h3>

          <ul className="space-y-2 text-sm">
            <li className="hover:text-blue-600 dark:hover:text-blue-400 transition">Contact Us</li>
            <li className="hover:text-blue-600 dark:hover:text-blue-400 transition">FAQs</li>
            <li className="hover:text-blue-600 dark:hover:text-blue-400 transition">Shipping Policy</li>
            <li className="hover:text-blue-600 dark:hover:text-blue-400 transition">Return Policy</li>
          </ul>
        </div>

        {/* NEWSLETTER */}
        <div>
          <h3 className="text-gray-900 dark:text-white font-semibold mb-4 text-lg">
            Join Our Newsletter
          </h3>

          <p className="text-sm text-gray-600 dark:text-gray-400">
            Stay updated with exclusive deals and new arrivals.
          </p>

          {/* Input box */}
          <div className="flex items-center bg-gray-200 dark:bg-gray-800 rounded-md px-3 py-2 mt-3 border border-gray-300 dark:border-gray-700">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 bg-transparent outline-none text-sm text-gray-900 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400"
            />

            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md ml-2 text-sm font-medium transition">
              Subscribe
            </button>
          </div>

          {/* SOCIAL ICONS */}
          <div className="flex items-center gap-4 mt-5">
            {[Facebook, Instagram, Twitter, Linkedin].map((Icon, i) => (
              <Icon
                key={i}
                size={22}
                className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer transition"
              />
            ))}
          </div>
        </div>

      </div>

      {/* COPYRIGHT */}
      <div className="border-t border-gray-300 dark:border-gray-700 mt-12 pt-4">
        <p className="text-center text-gray-600 dark:text-gray-400 text-sm">
          © {new Date().getFullYear()} VibeCommerce. All rights reserved.
        </p>
      </div>

    </footer>
  );
}
