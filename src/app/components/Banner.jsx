import Link from "next/link"; 
import {
  FaLeaf,
  FaArrowRight,
  FaCloudRain,
  FaShieldAlt
} from "react-icons/fa";
import { MdOutlineDocumentScanner } from "react-icons/md";

export default function Banner() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-green-50 via-white to-lime-100">
      {/* Background Blur */}
      <div className="absolute -top-32 -left-20 h-80 w-80 rounded-full bg-green-200 blur-3xl opacity-40" />
      <div className="absolute -bottom-32 -right-20 h-80 w-80 rounded-full bg-lime-200 blur-3xl opacity-40" />

      <div className="max-w-7xl mx-auto px-6 py-24 lg:py-32">

        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left Side */}
          <div>

            <span className="inline-flex items-center gap-2 rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">
              🌱 AI Smart Farming Platform
            </span>

            <h1 className="mt-6 text-5xl lg:text-7xl font-extrabold leading-tight text-gray-900">
              Smarter Farming
              <br />
              with
              <span className="text-green-700"> AI Technology</span>
            </h1>

            <p className="mt-6 text-lg text-gray-600 leading-8 max-w-xl">
              Detect crop diseases instantly, receive weather updates,
              monitor flood risks, and connect directly with agriculture
              officers—all from one intelligent platform.
            </p>

            <div className="flex flex-wrap gap-4 mt-10">

              <Link
                href="#features"
                className="inline-flex items-center gap-2 rounded-full bg-green-700 px-7 py-4 text-white font-semibold hover:bg-green-800 transition"
              >
                Explore Features
                <FaArrowRight size={18} />
              </Link>

              <Link
                href="#contact"
                className="rounded-full border border-green-700 px-7 py-4 font-semibold text-green-700 hover:bg-green-50 transition"
              >
                Contact Us
              </Link>

            </div>

            {/* Small Features */}

            <div className="flex flex-wrap gap-3 mt-12">

              <span className="flex items-center gap-2 rounded-full border bg-white px-4 py-2 text-sm shadow-sm">
                <MdOutlineDocumentScanner size={16} className="text-green-600" />
                AI Disease Detection
              </span>

              <span className="flex items-center gap-2 rounded-full border bg-white px-4 py-2 text-sm shadow-sm">
                <FaCloudRain size={16} className="text-blue-600" />
                Weather Forecast
              </span>

              <span className="flex items-center gap-2 rounded-full border bg-white px-4 py-2 text-sm shadow-sm">
                <FaShieldAlt size={16} className="text-emerald-600" />
                Flood Alerts
              </span>

            </div>

          </div>

          {/* Right Side */}

          <div className="relative">

            <div className="rounded-3xl bg-white shadow-2xl border p-8">

              <img
                src="https://images.unsplash.com/photo-1501004318641-b39e6451bec6?w=900"
                alt="Crop"
                className="rounded-2xl h-72 w-full object-cover"
              />

              <div className="mt-6 flex items-center justify-between">

                <div>
                  <p className="text-gray-500 text-sm">
                    AI Diagnosis
                  </p>

                  <h3 className="text-xl font-bold text-green-700">
                    Healthy Crop 🌿
                  </h3>
                </div>

                <span className="rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">
                  98% Accuracy
                </span>

              </div>

            </div>

            {/* Floating Cards */}

            <div className="absolute -top-6 -right-6 rounded-2xl bg-white shadow-lg border px-5 py-4">
              🌦️ 31°C • Light Rain
            </div>

            <div className="absolute -bottom-6 -left-6 rounded-2xl bg-white shadow-lg border px-5 py-4">
              👨‍🌾 Officer Replied
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}