import Link from "next/link";
import { AiFillFacebook, AiFillYoutube, AiTwotoneMail } from "react-icons/ai";

export default function Footer() {
  return (
    <footer className="bg-green-950 text-gray-300">
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-4 gap-10">
          {/* Logo */}

          <div>
            <div className="flex items-center gap-2 mb-5">
              <img src="/images/navLogo.png" alt="" />
            </div>

            <p className="text-gray-400 leading-7">
              AI-powered crop advisory platform helping farmers with disease
              detection, weather forecasting, flood alerts and agriculture
              officer support.
            </p>
          </div>

          {/* Product */}

          <div>
            <h3 className="text-white font-semibold mb-4">Product</h3>

            <ul className="space-y-3">
              <li>
                <a href="#features">Features</a>
              </li>
              <li>
                <a href="#how">How it Works</a>
              </li>
              <li>
                <a href="#technology">Technology</a>
              </li>
            </ul>
          </div>

          {/* Users */}

          <div>
            <h3 className="text-white font-semibold mb-4">Users</h3>

            <ul className="space-y-3">
              <li>Farmers</li>
              <li>Agriculture Officers</li>
              <li>Administrators</li>
            </ul>
          </div>

          {/* Contact */}

          <div>
            <h3 className="text-white font-semibold mb-4">Contact</h3>

            <div className="flex items-center gap-2">
              <AiTwotoneMail size={18} />
              hello@krishibondhu.app
            </div>

            <div className="flex gap-5 mt-6">
              <Link href="#">
                <AiFillFacebook className="hover:text-white transition" />
              </Link>

              <Link href="#">
                <AiFillYoutube className="hover:text-white transition" />
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-green-900 mt-16 pt-8 flex flex-col md:flex-row justify-between gap-4">
          <p className="text-sm text-gray-500">
            © 2026 KrishiBondhu. All rights reserved.
          </p>

          <p className="text-sm text-gray-500">Your Smart Farming Companion</p>
        </div>
      </div>
    </footer>
  );
}
