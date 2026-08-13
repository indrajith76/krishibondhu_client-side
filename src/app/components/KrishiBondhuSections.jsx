import React from "react";
import {
  FaLeaf,
  FaCloudSun,
  FaMapMarkedAlt,
  FaCalendarAlt,
  FaBullhorn,
  FaCommentDots,
  FaCamera,
  FaSearch,
  FaUserCheck,
  FaSeedling,
  FaUsers,
  FaShieldAlt,
  FaArrowRight,
  FaCheck,
  FaTint,
} from "react-icons/fa";

/* ---------- Design tokens ---------- */
const c = {
  ink: "#16241A",
  paddy900: "#1F3D2B",
  paddy700: "#2E5A3B",
  paddy500: "#4C7A3D",
  paddy300: "#8CB380",
  husk: "#E8B94A",
  huskDeep: "#C99A2E",
  indigo: "#2B4570",
  indigoDeep: "#1D3050",
  terracotta: "#B5533C",
  paper: "#F7F3E8",
  paperDeep: "#EFE7D3",
};

const display = {
  fontFamily: "'Fraunces', Georgia, serif",
};

const body = {
  fontFamily: "'Work Sans', system-ui, sans-serif",
};

const mono = {
  fontFamily: "'IBM Plex Mono', monospace",
};

/* ---------- Recurring contour-line divider ---------- */
function ContourDivider({ tone = "paper" }) {
  const stroke =
    tone === "paper" ? "rgba(31,61,43,0.12)" : "rgba(247,243,232,0.14)";

  return (
    <svg
      viewBox="0 0 1200 40"
      preserveAspectRatio="none"
      className="absolute left-0 right-0 bottom-0 w-full h-10 pointer-events-none"
    >
      {[0, 1, 2].map((i) => (
        <path
          key={i}
          d={`M0 ${20 + i * 6}
             Q150 ${5 + i * 6} 300 ${20 + i * 6}
             T600 ${20 + i * 6}
             T900 ${20 + i * 6}
             T1200 ${20 + i * 6}`}
          fill="none"
          stroke={stroke}
          strokeWidth="1.5"
        />
      ))}
    </svg>
  );
}

/* ---------- Eyebrow ---------- */
function Eyebrow({ children, color }) {
  return (
    <div
      className="text-xs tracking-[0.2em] uppercase mb-4 inline-flex items-center gap-2"
      style={{ ...mono, color }}
    >
      <span className="w-6 h-px" style={{ background: color }} />
      {children}
    </div>
  );
}

/* ============================================================
   Section 1: Features
============================================================ */
function FeaturesSection() {
  const features = [
    {
      icon: FaCamera,
      title: "AI Disease Detection",
      desc: "Snap a photo of a leaf. Get a diagnosis and a treatment plan in seconds, not days.",
    },
    {
      icon: FaCloudSun,
      title: "Localized Weather",
      desc: "Forecasts tuned to your union, so you know when to plant, spray, or wait.",
    },
    {
      icon: FaMapMarkedAlt,
      title: "Flood Risk Map",
      special: true,
    },
    {
      icon: FaCalendarAlt,
      title: "Seasonal Crop Guide",
      desc: "Recommendations that shift with the month — Aus, Aman, Boro, and beyond.",
    },
    {
      icon: FaBullhorn,
      title: "Government Advisories",
      desc: "Official announcements from your Upazila Agriculture Officer, in one feed.",
    },
    {
      icon: FaCommentDots,
      title: "Direct Complaint Line",
      desc: "Message a real officer about a real problem, and get a real reply.",
    },
  ];

  return (
    <section className="relative py-24 px-6" style={{ background: c.paddy900 }}>
      <div className="max-w-7xl mx-auto">
        <Eyebrow color={c.husk}>What you get</Eyebrow>

        <h2
          className="text-4xl md:text-5xl font-normal leading-[1.1] mb-5"
          style={{ ...display, color: c.paper }}
        >
          Everything a farmer needs, in one field
        </h2>

        <p
          className="text-lg leading-relaxed max-w-2xl mb-12"
          style={{ ...body, color: c.paddy300 }}
        >
          KrishiBondhu replaces six scattered sources — a neighbor&apos;s guess,
          an old radio broadcast, a distant office visit — with one platform
          that answers back.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f, i) => (
            <div
              key={i}
              className="rounded-2xl p-7 transition-colors duration-300 hover:bg-white/[0.06]"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <div
                className="w-11 h-11 rounded-full flex items-center justify-center mb-5"
                style={{
                  background: "rgba(232,185,74,0.15)",
                }}
              >
                <f.icon size={20} color={c.husk} />
              </div>

              <h3
                className="text-lg mb-2"
                style={{ ...display, color: c.paper }}
              >
                {f.title}
              </h3>

              {f.special ? (
                <>
                  <p
                    className="text-sm leading-relaxed mb-4"
                    style={{ ...body, color: c.paddy300 }}
                  >
                    Interactive, color-coded zones updated by local officers as
                    conditions change.
                  </p>

                  <div className="flex gap-2 flex-wrap">
                    {[
                      {
                        label: "Low",
                        color: c.paddy500,
                      },
                      {
                        label: "Medium",
                        color: c.husk,
                      },
                      {
                        label: "High",
                        color: c.terracotta,
                      },
                    ].map((lvl) => (
                      <span
                        key={lvl.label}
                        className="text-[11px] px-2.5 py-1 rounded-full"
                        style={{
                          ...mono,
                          background: `${lvl.color}22`,
                          color: lvl.color,
                          border: `1px solid ${lvl.color}55`,
                        }}
                      >
                        {lvl.label}
                      </span>
                    ))}
                  </div>
                </>
              ) : (
                <p
                  className="text-sm leading-relaxed"
                  style={{
                    ...body,
                    color: c.paddy300,
                  }}
                >
                  {f.desc}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      <ContourDivider tone="dark" />
    </section>
  );
}

/* ============================================================
   Section 2: How it works
============================================================ */
function HowItWorksSection() {
  const steps = [
    {
      icon: FaCamera,
      title: "Snap a photo",
      desc: "Photograph the affected leaf or crop, right from your phone.",
    },
    {
      icon: FaSearch,
      title: "AI reads it",
      desc: "The system identifies the disease and suggests a first treatment.",
    },
    {
      icon: FaUserCheck,
      title: "An officer confirms",
      desc: "Your Upazila Agriculture Officer reviews the case and can step in.",
    },
    {
      icon: FaSeedling,
      title: "You act, with confidence",
      desc: "Apply the treatment, track weather, and watch the field recover.",
    },
  ];

  return (
    <section className="relative py-24 px-6" style={{ background: c.paper }}>
      <div className="max-w-7xl mx-auto">
        <Eyebrow color={c.paddy700}>The process</Eyebrow>

        <h2
          className="text-4xl md:text-5xl font-normal leading-[1.1] mb-5"
          style={{ ...display, color: c.ink }}
        >
          From a sick leaf to a solved problem
        </h2>

        <p
          className="text-lg leading-relaxed max-w-2xl mb-16"
          style={{ ...body, color: "#4A5A4D" }}
        >
          A simple workflow that connects AI-powered detection with real
          agricultural expertise.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 relative">
          {/* Connecting line */}
          <div
            className="hidden md:block absolute top-6 left-0 right-0 h-px"
            style={{
              background: c.paddy300,
              marginLeft: "12.5%",
              marginRight: "12.5%",
            }}
          />

          {steps.map((s, i) => (
            <div key={i} className="relative">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center mb-6 relative z-10"
                style={{
                  background: c.paddy900,
                  color: c.husk,
                  ...mono,
                  fontSize: "14px",
                }}
              >
                {String(i + 1).padStart(2, "0")}
              </div>

              <s.icon size={22} color={c.paddy700} className="mb-3" />

              <h3 className="text-lg mb-2" style={{ ...display, color: c.ink }}>
                {s.title}
              </h3>

              <p
                className="text-sm leading-relaxed"
                style={{
                  ...body,
                  color: "#4A5A4D",
                }}
              >
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      <ContourDivider />
    </section>
  );
}

/* ============================================================
   Section 3: Roles
============================================================ */
function RolesSection() {
  const roles = [
    {
      name: "Farmer",
      bn: "কৃষক",
      color: c.paddy500,
      icon: FaSeedling,
      items: [
        "Detect crop disease from a photo",
        "Check weather & flood risk",
        "Get seasonal crop guidance",
        "Raise a complaint to an officer",
      ],
    },
    {
      name: "Agriculture Officer",
      bn: "কৃষি কর্মকর্তা",
      color: c.husk,
      icon: FaUsers,
      items: [
        "Respond to farmer complaints",
        "Publish advisories & alerts",
        "Update flood risk for your area",
        "Monitor disease reports",
      ],
    },
    {
      name: "Administrator",
      bn: "প্রশাসক",
      color: c.paper,
      icon: FaShieldAlt,
      items: [
        "Manage users & officer accounts",
        "Maintain crop & treatment data",
        "Monitor system-wide activity",
        "Configure integrations",
      ],
    },
  ];

  return (
    <section className="relative py-24 px-6" style={{ background: c.indigo }}>
      <div className="max-w-7xl mx-auto">
        <Eyebrow color={c.husk}>Who it&apos;s for</Eyebrow>

        <h2
          className="text-4xl md:text-5xl font-normal leading-[1.1] mb-5"
          style={{ ...display, color: c.paper }}
        >
          Built for three people, one goal
        </h2>

        <p
          className="text-lg leading-relaxed max-w-2xl mb-12"
          style={{
            ...body,
            color: "rgba(247,243,232,0.65)",
          }}
        >
          KrishiBondhu brings farmers, agricultural officers, and administrators
          into one connected ecosystem.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {roles.map((r, i) => (
            <div
              key={i}
              className="rounded-2xl overflow-hidden"
              style={{
                background: c.indigoDeep,
              }}
            >
              <div className="h-1.5" style={{ background: r.color }} />

              <div className="p-8">
                <r.icon size={24} color={r.color} className="mb-4" />

                <div className="flex items-baseline gap-2 mb-6 flex-wrap">
                  <h3
                    className="text-xl"
                    style={{
                      ...display,
                      color: c.paper,
                    }}
                  >
                    {r.name}
                  </h3>

                  <span
                    className="text-sm"
                    style={{
                      ...body,
                      color: "rgba(247,243,232,0.5)",
                    }}
                  >
                    {r.bn}
                  </span>
                </div>

                <ul className="space-y-3">
                  {r.items.map((item, j) => (
                    <li
                      key={j}
                      className="flex items-start gap-2.5 text-sm"
                      style={{
                        ...body,
                        color: "rgba(247,243,232,0.85)",
                      }}
                    >
                      <FaCheck
                        size={15}
                        color={r.color}
                        className="mt-0.5 flex-shrink-0"
                      />

                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>

      <ContourDivider tone="dark" />
    </section>
  );
}

/* ============================================================
   Section 4: Before / After
============================================================ */
function ImpactSection() {
  const rows = [
    {
      before: "Scattered, word-of-mouth information",
      after: "One centralized advisory platform",
    },
    {
      before: "Slow, uncertain officer contact",
      after: "A direct complaint & response line",
    },
    {
      before: "Guesswork on crop disease",
      after: "AI-assisted diagnosis from a photo",
    },
    {
      before: "Static, delayed flood warnings",
      after: "A live, color-coded flood risk map",
    },
  ];

  return (
    <section className="relative py-24 px-6" style={{ background: c.paper }}>
      <div className="max-w-7xl mx-auto">
        <Eyebrow color={c.paddy700}>Why it matters</Eyebrow>

        <h2
          className="text-4xl md:text-5xl font-normal leading-[1.1] mb-5"
          style={{ ...display, color: c.ink }}
        >
          The old way, and the KrishiBondhu way
        </h2>

        <p
          className="text-lg leading-relaxed max-w-2xl mb-12"
          style={{
            ...body,
            color: "#4A5A4D",
          }}
        >
          Replace uncertainty and scattered information with a connected,
          responsive agricultural support system.
        </p>

        <div
          className="rounded-2xl overflow-hidden"
          style={{
            border: `1px solid ${c.paddy300}`,
          }}
        >
          {/* Header */}
          <div
            className="grid grid-cols-2"
            style={{
              background: c.paperDeep,
            }}
          >
            <div
              className="px-8 py-4 text-xs tracking-[0.15em] uppercase"
              style={{
                ...mono,
                color: "#8A7A55",
              }}
            >
              Before
            </div>

            <div
              className="px-8 py-4 text-xs tracking-[0.15em] uppercase"
              style={{
                ...mono,
                color: c.paddy700,
                borderLeft: `1px solid ${c.paddy300}`,
              }}
            >
              With KrishiBondhu
            </div>
          </div>

          {/* Rows */}
          {rows.map((row, i) => (
            <div
              key={i}
              className="grid grid-cols-2"
              style={{
                borderTop: `1px solid ${c.paddy300}`,
                background: "#fff",
              }}
            >
              <div
                className="px-8 py-5 text-sm md:text-base"
                style={{
                  ...body,
                  color: "#7A6F5C",
                }}
              >
                {row.before}
              </div>

              <div
                className="px-8 py-5 text-sm md:text-base flex items-center gap-2.5"
                style={{
                  ...body,
                  color: c.ink,
                  borderLeft: `1px solid ${c.paddy300}`,
                }}
              >
                <FaTint
                  size={15}
                  color={c.paddy500}
                  className="flex-shrink-0"
                />

                {row.after}
              </div>
            </div>
          ))}
        </div>
      </div>

      <ContourDivider />
    </section>
  );
}

/* ============================================================
   Section 5: CTA
============================================================ */
function CTASection() {
  return (
    <section
      className="relative py-28 px-6 overflow-hidden"
      style={{ background: c.paddy900 }}
    >
      <div className="max-w-4xl mx-auto text-center">
        <Eyebrow color={c.husk}>Get started</Eyebrow>

        <h2
          className="text-4xl md:text-6xl font-normal leading-[1.05] mb-6"
          style={{
            ...display,
            color: c.paper,
          }}
        >
          Ready to grow smarter?
        </h2>

        <p
          className="text-lg mb-10 max-w-xl mx-auto leading-relaxed"
          style={{
            ...body,
            color: c.paddy300,
          }}
        >
          Whether you farm the land, advise a union, or run the system —
          KrishiBondhu gives you a seat at the same table.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3">
          {/* Farmer Register */}
          <button
            className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-medium transition-transform duration-200 hover:-translate-y-0.5"
            style={{
              ...body,
              background: c.husk,
              color: c.paddy900,
            }}
          >
            Register as Farmer
            <FaArrowRight
              size={14}
              className="transition-transform duration-200 group-hover:translate-x-1"
            />
          </button>

          {/* Officer Login */}
          <button
            className="px-7 py-3.5 rounded-full font-medium transition-colors duration-200 hover:bg-white/10"
            style={{
              ...body,
              color: c.paper,
              border: "1px solid rgba(247,243,232,0.3)",
            }}
          >
            Officer Login
          </button>

          {/* Learn More */}
          <button
            className="px-4 py-3.5 font-medium underline underline-offset-4 decoration-1"
            style={{
              ...body,
              color: c.paddy300,
            }}
          >
            Learn more
          </button>
        </div>
      </div>

      <ContourDivider tone="dark" />
    </section>
  );
}

/* ============================================================
   Main Component
============================================================ */
export default function KrishiBondhuSections() {
  return (
    <>  
      <main>
        <FeaturesSection />
        <HowItWorksSection />
        <RolesSection />
        <ImpactSection />
        <CTASection />
      </main>
    </>
  );
}
