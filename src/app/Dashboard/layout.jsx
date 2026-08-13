"use client";
import Link from "next/link";
import { GoSidebarCollapse } from "react-icons/go";
import { GiLindenLeaf } from "react-icons/gi";
import { FiHome } from "react-icons/fi";
import { PiPlantFill } from "react-icons/pi";
import { MdOutlineFlood, MdOutlinePostAdd } from "react-icons/md";
import { TiWeatherPartlySunny,TiDocumentAdd  } from "react-icons/ti";
import { TbSpeakerphone } from "react-icons/tb";
import { FaUsersCog } from "react-icons/fa";
import { usePathname } from "next/navigation";


export default function DashboardLayout({ children }) {
  const pathName = usePathname().replace(/^\//, "");

  return (
    <div className="drawer lg:drawer-open h-screen overflow-hidden">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />

      {/* Main area */}
      <div className="drawer-content h-screen overflow-hidden flex flex-col">
        {/* Navbar */}
        <nav className="navbar w-full bg-base-300 h-16 shrink-0 sticky top-0 z-50">
          <label
            htmlFor="my-drawer-4"
            aria-label="open sidebar"
            className="btn btn-square btn-ghost drawer-button"
          >
            <GoSidebarCollapse className="text-xl" />
          </label>

          <div className="px-4 font-semibold">{pathName}</div>
        </nav>

        {/* ONLY THIS AREA SCROLLS */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden p-4 scrollbar-hide">
          {children}
        </main>
      </div>

      {/* Sidebar */}
      <div className="drawer-side h-screen">
        <label
          htmlFor="my-drawer-4"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>

        <aside className="pt-36 lg:pt-0 flex h-full min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64">
          <ul className="menu w-full grow text-green-900">
            <li>
              <Link
                href={"/Dashboard"}
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Homepage"
              >
                <FiHome />
                <span className="is-drawer-close:hidden">Deshboard</span>
              </Link>
            </li>
            {/* Farmars */}
            <>
              <li>
                <Link
                  href={"/Dashboard/CropDiseaseDetection"}
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                >
                  <GiLindenLeaf />
                  <span className="is-drawer-close:hidden">
                    Crop Disease Detection
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href={"/Dashboard/WeatherForecasts"}
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                >
                  <TiWeatherPartlySunny />
                  <span className="is-drawer-close:hidden">
                    Weather Forecasts
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href={"/Dashboard/FloodRiskMap"}
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                >
                  <MdOutlineFlood />
                  <span className="is-drawer-close:hidden">Flood Risk Map</span>
                </Link>
              </li>
              <li>
                <Link
                  href={"/Dashboard/CropRecommendations"}
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                >
                  <PiPlantFill />
                  <span className="is-drawer-close:hidden">
                    Crop Recommendations
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href={"/Dashboard/SubmitComplaints"}
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                >
                  <MdOutlinePostAdd />
                  <span className="is-drawer-close:hidden">
                    Submit Complaints
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href={"/Dashboard/Announcements"}
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                >
                  <TbSpeakerphone />
                  <span className="is-drawer-close:hidden">Announcements</span>
                </Link>
              </li>
            </>
            {/* Upazila Officer */}
            <>
              <li>
                <Link
                  href={"/Dashboard/PostAnnouncement"}
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                >
                  <TiDocumentAdd  />
                  <span className="is-drawer-close:hidden">
                    Post Announcement
                  </span>
                </Link>
              </li>
            </>
            {/* Admin / District Officer */}
            <>
              <li>
                <Link
                  href={"/Dashboard/ManageUsers"}
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                >
                  <FaUsersCog />
                  <span className="is-drawer-close:hidden">Manage Users</span>
                </Link>
              </li>
            </>
          </ul>
        </aside>
      </div>
    </div>
  );
}
