import { Facebook, Instagram, Twitter, Linkedin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-16">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">

        {/* BRAND */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">
            VibeCommerce
          </h2>
          <p className="text-gray-600 text-sm leading-relaxed">
            A clean and reliable online shopping experience built for
            convenience and quality.
          </p>
        </div>

        {/* QUICK LINKS */}
        <div>
          <h3 className="text-gray-900 font-medium mb-4 text-sm tracking-wide">
            QUICK LINKS
          </h3>
          <ul className="space-y-2 text-gray-600 text-sm">
            <li className="hover:text-gray-900 cursor-pointer transition">Home</li>
            <li className="hover:text-gray-900 cursor-pointer transition">Shop</li>
            <li className="hover:text-gray-900 cursor-pointer transition">Categories</li>
            <li className="hover:text-gray-900 cursor-pointer transition">Offers</li>
          </ul>
        </div>

        {/* SUPPORT */}
        <div>
          <h3 className="text-gray-900 font-medium mb-4 text-sm tracking-wide">
            SUPPORT
          </h3>
          <ul className="space-y-2 text-gray-600 text-sm">
            <li className="hover:text-gray-900 cursor-pointer transition">Contact Us</li>
            <li className="hover:text-gray-900 cursor-pointer transition">FAQs</li>
            <li className="hover:text-gray-900 cursor-pointer transition">
              Shipping Policy
            </li>
            <li className="hover:text-gray-900 cursor-pointer transition">
              Return Policy
            </li>
          </ul>
        </div>

        {/* NEWSLETTER */}
        <div>
          <h3 className="text-gray-900 font-medium mb-4 text-sm tracking-wide">
            NEWSLETTER
          </h3>

          <p className="text-gray-600 text-sm mb-3">
            Get updates on new products and exclusive offers.
          </p>

          <div className="flex items-center border border-gray-300 rounded-md overflow-hidden mt-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-3 py-2 text-sm text-gray-700 outline-none"
            />
            <button className="bg-gray-900 text-white px-4 py-2 text-sm hover:bg-black transition">
              Subscribe
            </button>
          </div>

          {/* SOCIAL ICONS */}
          <div className="flex items-center gap-3 mt-5">
            {[Facebook, Instagram, Twitter, Linkedin].map((Icon, i) => (
              <div
                key={i}
                className="h-9 w-9 flex items-center justify-center border border-gray-300 rounded-full hover:bg-gray-100 cursor-pointer transition"
              >
                <Icon size={18} className="text-gray-900" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* COPYRIGHT */}
      <div className="border-t border-gray-200 py-4">
        <p className="text-center text-gray-500 text-xs">
          © {new Date().getFullYear()} VibeCommerce. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
