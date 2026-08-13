import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import "./globals.css";

export const metadata = {
  title: "KrishiBondhu | Smart Crop Advisory System",
  description:
    "KrishiBondhu is an AI-powered agricultural advisory platform for Bangladeshi farmers, offering crop disease detection, weather forecasts, crop recommendations, flood risk alerts, and direct communication with agricultural officers.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
