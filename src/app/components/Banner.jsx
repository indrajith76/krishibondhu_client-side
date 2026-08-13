"use client";
// Banner.jsx
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  FaArrowRight,
  FaCloudRain,
  FaWater,
  FaSeedling,
  FaCommentDots,
  FaBullhorn,
} from "react-icons/fa";
import { MdOutlineDocumentScanner } from "react-icons/md";

const FEATURES = [
  {
    icon: MdOutlineDocumentScanner,
    label: "রোগ শনাক্ত",
    copy: "পাতার ছবি তুলুন, কয়েক সেকেন্ডেই AI রোগ নির্ণয় পান।",
    color: "#7CC98F",
    anim: "scan",
  },
  {
    icon: FaCloudRain,
    label: "আবহাওয়া",
    copy: "স্প্রে ও ফসল কাটার সঠিক সময় জানতে লাইভ পূর্বাভাস দেখুন।",
    color: "#7EC2DE",
    anim: "rain",
  },
  {
    icon: FaWater,
    label: "বন্যার ঝুঁকি",
    copy: "আপনার আশেপাশের ঝুঁকিপূর্ণ এলাকা রঙভিত্তিক মানচিত্রে দেখুন।",
    color: "#7EC2DE",
    anim: "wave",
  },
  {
    icon: FaSeedling,
    label: "মৌসুমি ফসল",
    copy: "এই মাসে ঠিক কোন ফসল চাষ করবেন, তা সহজেই জানুন।",
    color: "#7CC98F",
    anim: "grow",
  },
  {
    icon: FaCommentDots,
    label: "কর্মকর্তার চ্যাট",
    copy: "উপজেলা কৃষি কর্মকর্তাকে সরাসরি বার্তা দিন এবং দ্রুত উত্তর পান।",
    color: "#F0C25E",
    anim: "typing",
  },
  {
    icon: FaBullhorn,
    label: "কৃষি পরামর্শ",
    copy: "সরকারি গুরুত্বপূর্ণ আপডেট সবার আগে এখানেই পান।",
    color: "#F0C25E",
    anim: "ring",
  },
];

// Fixed cluster layout, % of a 460×400 reference box
const SLOTS = [
  { left: 50, top: 37.5, width: 43.48, height: 50 },
  { left: 15.22, top: 61.25, width: 15.65, height: 18 },
  { left: 30.43, top: 75, width: 15.65, height: 18 },
  { left: 48.91, top: 82.5, width: 15.65, height: 18 },
  { left: 67.39, top: 76.25, width: 15.65, height: 18 },
  { left: 82.61, top: 62.5, width: 15.65, height: 18 },
];

const ROTATE_MS = 2000;

// --- YouTube background video config ---
const VIDEO_ID = "0DfZHHDKqI4";
const START_SEC = 10;
const END_SEC = 45;

let ytApiPromise = null;
function loadYouTubeApi() {
  if (typeof window === "undefined") return Promise.resolve(null);
  if (window.YT && window.YT.Player) return Promise.resolve(window.YT);
  if (ytApiPromise) return ytApiPromise;

  ytApiPromise = new Promise((resolve) => {
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    document.head.appendChild(tag);

    const prevCallback = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      if (typeof prevCallback === "function") prevCallback();
      resolve(window.YT);
    };
  });

  return ytApiPromise;
}

function useYouTubeBackground() {
  const containerRef = useRef(null);
  const playerRef = useRef(null);
  const watcherRef = useRef(null);
  const mountedRef = useRef(true);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    mountedRef.current = true;

    loadYouTubeApi().then((YT) => {
      if (!YT || !mountedRef.current || !containerRef.current) return;

      playerRef.current = new YT.Player(containerRef.current, {
        videoId: VIDEO_ID,
        playerVars: {
          autoplay: 1,
          mute: 1,
          controls: 0,
          disablekb: 1,
          modestbranding: 1,
          rel: 0,
          playsinline: 1,
          start: START_SEC,
        },
        events: {
          onReady: (e) => {
            const player = e.target;

            player.mute();
            player.seekTo(START_SEC, true);
            player.playVideo();

            setReady(true);

            watcherRef.current = setInterval(() => {
              if (!player || typeof player.getCurrentTime !== "function") {
                return;
              }

              const currentTime = player.getCurrentTime();

              if (currentTime >= END_SEC) {
                // Stop first
                player.pauseVideo();

                // Go back to the start point
                player.seekTo(START_SEC, true);

                // Start again
                setTimeout(() => {
                  player.playVideo();
                }, 50);
              }
            }, 100);
          },

          onStateChange: (e) => {
            // Only handle the actual YouTube video ending.
            // Don't react to PAUSED.
            if (e.data === window.YT.PlayerState.ENDED) {
              e.target.seekTo(START_SEC, true);

              setTimeout(() => {
                e.target.playVideo();
              }, 50);
            }
          },
        },
      });
    });

    return () => {
      mountedRef.current = false;
      if (watcherRef.current) clearInterval(watcherRef.current);
      if (
        playerRef.current &&
        typeof playerRef.current.destroy === "function"
      ) {
        playerRef.current.destroy();
      }
    };
  }, []);

  return { containerRef, ready };
}

export default function Banner() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const { containerRef: videoRef, ready: videoReady } = useYouTubeBackground();

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => {
      setActive((i) => (i + 1) % FEATURES.length);
    }, ROTATE_MS);
    return () => clearInterval(id);
  }, [paused]);

  const others = FEATURES.map((_, i) => i).filter((i) => i !== active);
  const slotForFeature = {};
  slotForFeature[active] = 0;
  others.forEach((featIdx, idx) => {
    slotForFeature[featIdx] = idx + 1;
  });

  const focused = FEATURES[active];

  return (
    <section className="relative overflow-hidden bg-[#0F1710] font-body">
      <style>{`
        @keyframes fadeUp { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
        .fade-up { animation: fadeUp 0.6s ease-out both; }

        @keyframes captionIn { from { opacity: 0; transform: translateY(4px); } to { opacity: 1; transform: translateY(0); } }
        .caption-in { animation: captionIn 0.4s ease-out both; }

        .bubble {
          transition: left 0.7s cubic-bezier(.4,0,.2,1), top 0.7s cubic-bezier(.4,0,.2,1),
                      width 0.7s cubic-bezier(.4,0,.2,1), height 0.7s cubic-bezier(.4,0,.2,1),
                      box-shadow 0.4s ease, border-color 0.4s ease, background-color 0.4s ease;
        }

        @keyframes scanY { 0%,8% { transform: translateY(-110%); opacity: 0; } 18% { opacity: 1; } 82% { opacity: 1; } 92%,100% { transform: translateY(110%); opacity: 0; } }
        .anim-scan .line { animation: scanY 2.6s ease-in-out infinite; }

        @keyframes dropFall { 0% { transform: translateY(-6px); opacity: 0; } 30% { opacity: 1; } 100% { transform: translateY(16px); opacity: 0; } }
        .anim-rain .d1 { animation: dropFall 1.3s ease-in infinite; }
        .anim-rain .d2 { animation: dropFall 1.3s ease-in infinite; animation-delay: 0.4s; }
        .anim-rain .d3 { animation: dropFall 1.3s ease-in infinite; animation-delay: 0.75s; }

        @keyframes ripple { 0% { transform: scale(0.4); opacity: 0.7; } 100% { transform: scale(2.2); opacity: 0; } }
        .anim-wave .ring1 { animation: ripple 2.4s ease-out infinite; }
        .anim-wave .ring2 { animation: ripple 2.4s ease-out infinite; animation-delay: 0.8s; }

        @keyframes growPulse { 0%,100% { transform: scaleY(1); } 50% { transform: scaleY(1.2); } }
        .anim-grow .icon-el { animation: growPulse 1.8s ease-in-out infinite; transform-origin: bottom center; }

        @keyframes typingDot { 0%,60%,100% { transform: translateY(0); opacity: 0.35; } 30% { transform: translateY(-4px); opacity: 1; } }
        .anim-typing .t1 { animation: typingDot 1.2s ease-in-out infinite; }
        .anim-typing .t2 { animation: typingDot 1.2s ease-in-out infinite; animation-delay: 0.15s; }
        .anim-typing .t3 { animation: typingDot 1.2s ease-in-out infinite; animation-delay: 0.3s; }

        @keyframes ringPulse { 0% { transform: scale(1); opacity: 0.6; } 100% { transform: scale(1.8); opacity: 0; } }
        .anim-ring .ring1 { animation: ringPulse 1.8s ease-out infinite; }
        .anim-ring .ring2 { animation: ringPulse 1.8s ease-out infinite; animation-delay: 0.6s; }

        @media (prefers-reduced-motion: reduce) {
          .fade-up, .caption-in { animation: none; opacity: 1; }
          .bubble { transition: box-shadow 0.4s ease, border-color 0.4s ease; }
          .anim-scan .line, .anim-rain .d1, .anim-rain .d2, .anim-rain .d3,
          .anim-wave .ring1, .anim-wave .ring2, .anim-grow .icon-el,
          .anim-typing .t1, .anim-typing .t2, .anim-typing .t3,
          .anim-ring .ring1, .anim-ring .ring2 { animation: none; }
        }
      `}</style>

      {/* Background video layer */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-1/2 left-1/2"
          style={{
            width: "177.78vh",
            height: "56.25vw",
            minWidth: "100%",
            minHeight: "100%",
            transform: "translate(-50%, -50%)",
            opacity: videoReady ? 1 : 0,
            transition: "opacity 0.8s ease",
          }}
        >
          <div ref={videoRef} className="w-full h-full" />
        </div>
      </div>

      {/* Overlay for legibility */}
      <div className="absolute inset-0 bg-[#0F1710]/70" />
      <div className="absolute inset-0 bg-linear-to-t from-[#0F1710]/85 via-[#0F1710]/40 to-[#0F1710]/60" />

      <div className="relative z-10 max-w-6xl mx-auto px-5 sm:px-8 py-16 sm:py-16">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          {/* Left — copy */}
          <div>
            <span
              className="fade-up inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-wider text-[#DCE8DA] bg-white/10 border border-white/15 rounded-full px-3 py-1 backdrop-blur-sm"
              style={{ animationDelay: "0.05s" }}
            >
              AI Smart Farming Platform
            </span>

            <h1
              className="fade-up font-display text-4xl sm:text-5xl lg:text-[3.25rem] leading-[1.08] font-semibold text-white mt-5 tracking-tight"
              style={{ animationDelay: "0.12s" }}
            >
              Smarter farming,
              <br />
              guided by AI.
            </h1>

            <p
              className="fade-up text-[#D8DACB] text-base sm:text-lg mt-5 max-w-md leading-relaxed"
              style={{ animationDelay: "0.2s" }}
            >
              Detect crop diseases instantly, track weather and flood risk, get
              seasonal guidance, and reach your Upazila Agriculture Officer
              directly — all in one place.
            </p>

            <div
              className="fade-up flex flex-wrap gap-3 mt-9"
              style={{ animationDelay: "0.28s" }}
            >
              <Link
                href="#features"
                className="group inline-flex items-center gap-2 rounded-md bg-[#7CC98F] hover:bg-[#66B87A] px-5 py-3 text-sm font-medium text-[#0F1710] transition-colors"
              >
                Explore Features
                <FaArrowRight
                  size={13}
                  className="transition-transform group-hover:translate-x-0.5"
                />
              </Link>
              <Link
                href="#contact"
                className="inline-flex items-center gap-2 rounded-md border border-white/25 px-5 py-3 text-sm font-medium text-white hover:border-white/50 transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </div>

          {/* Right — orbiting focus cluster */}
          <div
            className="fade-up"
            style={{ animationDelay: "0.18s" }}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <div
              className="relative mx-auto w-full"
              style={{ maxWidth: 440, aspectRatio: "460 / 400" }}
            >
              {FEATURES.map((feature, i) => {
                const slot = SLOTS[slotForFeature[i]];
                const isBig = slotForFeature[i] === 0;
                const Icon = feature.icon;

                return (
                  <button
                    key={feature.label}
                    onClick={() => setActive(i)}
                    aria-label={`Focus ${feature.label}`}
                    className="bubble absolute rounded-full flex flex-col items-center justify-center border backdrop-blur-md"
                    style={{
                      left: `${slot.left}%`,
                      top: `${slot.top}%`,
                      width: `${slot.width}%`,
                      height: `${slot.height}%`,
                      transform: "translate(-50%, -50%)",
                      borderColor: isBig
                        ? feature.color
                        : "rgba(255,255,255,0.18)",
                      borderWidth: isBig ? 2 : 1.5,
                      boxShadow: isBig
                        ? `0 12px 32px -10px ${feature.color}55`
                        : "none",
                      backgroundColor: isBig
                        ? "rgba(15,23,16,0.55)"
                        : "rgba(255,255,255,0.08)",
                      zIndex: isBig ? 10 : 1,
                    }}
                  >
                    <div
                      className={`relative flex items-center justify-center overflow-hidden rounded-full ${
                        isBig ? `anim-${feature.anim}` : ""
                      }`}
                      style={{
                        width: isBig ? "34%" : "42%",
                        aspectRatio: "1 / 1",
                      }}
                    >
                      <Icon
                        className="icon-el relative z-10"
                        style={{
                          color: feature.color,
                          width: "60%",
                          height: "60%",
                        }}
                      />

                      {isBig && feature.anim === "scan" && (
                        <span
                          className="line absolute inset-x-0 h-[22%]"
                          style={{ backgroundColor: `${feature.color}55` }}
                        />
                      )}
                      {isBig && feature.anim === "rain" && (
                        <>
                          <span
                            className="d1 absolute left-[30%] top-[10%] w-[8%] rounded-full"
                            style={{
                              height: "20%",
                              backgroundColor: feature.color,
                            }}
                          />
                          <span
                            className="d2 absolute left-[52%] top-[10%] w-[8%] rounded-full"
                            style={{
                              height: "20%",
                              backgroundColor: feature.color,
                            }}
                          />
                          <span
                            className="d3 absolute left-[70%] top-[10%] w-[8%] rounded-full"
                            style={{
                              height: "20%",
                              backgroundColor: feature.color,
                            }}
                          />
                        </>
                      )}
                      {isBig && feature.anim === "wave" && (
                        <>
                          <span
                            className="ring1 absolute inset-0 rounded-full border-2"
                            style={{ borderColor: feature.color }}
                          />
                          <span
                            className="ring2 absolute inset-0 rounded-full border-2"
                            style={{ borderColor: feature.color }}
                          />
                        </>
                      )}
                      {isBig && feature.anim === "typing" && (
                        <span className="absolute bottom-[8%] flex gap-[6%]">
                          <span
                            className="t1 rounded-full"
                            style={{
                              width: "14%",
                              aspectRatio: "1/1",
                              backgroundColor: feature.color,
                            }}
                          />
                          <span
                            className="t2 rounded-full"
                            style={{
                              width: "14%",
                              aspectRatio: "1/1",
                              backgroundColor: feature.color,
                            }}
                          />
                          <span
                            className="t3 rounded-full"
                            style={{
                              width: "14%",
                              aspectRatio: "1/1",
                              backgroundColor: feature.color,
                            }}
                          />
                        </span>
                      )}
                      {isBig && feature.anim === "ring" && (
                        <>
                          <span
                            className="ring1 absolute inset-0 rounded-full border-2"
                            style={{ borderColor: feature.color }}
                          />
                          <span
                            className="ring2 absolute inset-0 rounded-full border-2"
                            style={{ borderColor: feature.color }}
                          />
                        </>
                      )}
                    </div>

                    <span
                      className="font-medium text-center leading-tight mt-1 px-1"
                      style={{
                        color: isBig ? "#FFFFFF" : "rgba(255,255,255,0.75)",
                        fontSize: isBig
                          ? "clamp(11px, 2.6vw, 14px)"
                          : "clamp(7px, 1.6vw, 9px)",
                      }}
                    >
                      {feature.label}
                    </span>
                  </button>
                );
              })}
            </div>

            <p
              key={active}
              className="caption-in text-center text-sm text-[#D8DACB]  max-w-xs mx-auto"
            >
              {focused.copy}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
