// src/components/Planet.jsx
import React, { useEffect, useRef, useState } from "react";
import Plotly from "plotly.js-dist-min";
import Chart from "chart.js/auto";

export default function Planet() {
  const earthPlotRef = useRef(null);
  const regionChartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  const animationIdRef = useRef(null);
  const rotationAngleRef = useRef(0);
  const rotationSpeedRef = useRef(1); // target speed
  const currentRotationSpeedRef = useRef(1); // smoothed speed
  const lastFrameTimeRef = useRef(null);

  const [rotationSpeed, setRotationSpeed] = useState(1);
  const [bannerText, setBannerText] = useState("Connecting the World");
  const [isDark, setIsDark] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);

  // Reveal animation on mount
  useEffect(() => {
    setHasMounted(true);
  }, []);

  // Keep ref in sync with state so animation sees latest speed
  useEffect(() => {
    rotationSpeedRef.current = rotationSpeed;
  }, [rotationSpeed]);

  // Plotly Earth initialization + animation (re-run on theme change)
  useEffect(() => {
    if (!earthPlotRef.current) return;

    const initEarth = async () => {
      const data = [
        {
          type: "scattergeo",
          mode: "markers",
          locations: [
            "USA",
            "CHN",
            "IND",
            "RUS",
            "BRA",
            "AUS",
            "ZAF",
            "FRA",
            "GBR",
            "JPN",
          ],
          locationmode: "ISO-3",
          marker: {
            size: [20, 30, 25, 15, 18, 12, 10, 15, 15, 22],
            color: "#2563eb", // hero blue
            opacity: 0.88,
            line: {
              color: "white",
              width: 1,
            },
          },
          text: [
            "North America HQ",
            "Asia Hub",
            "Growth Market",
            "Northern Ops",
            "LatAm Hub",
            "Pacific Node",
            "Africa Connect",
            "EU Central",
            "UK Branch",
            "Tech Center",
          ],
          hoverinfo: "text",
        },
      ];

      const layout = {
        geo: {
          projection: {
            type: "orthographic",
            rotation: { lon: rotationAngleRef.current, lat: 20 },
          },
          showocean: true,
          oceancolor: isDark ? "#020617" : "#e2f3ff",
          showland: true,
          landcolor: isDark ? "#1e293b" : "#cbd5f5",
          showlakes: true,
          lakecolor: isDark ? "#020617" : "#e2e8f0",
          showcountries: true,
          countrycolor: isDark ? "#64748b" : "#ffffff",
          bgcolor: "rgba(0,0,0,0)",
          framecolor: "rgba(0,0,0,0)",
        },
        margin: { r: 0, t: 0, l: 0, b: 0 },
        paper_bgcolor: "rgba(0,0,0,0)",
        plot_bgcolor: "rgba(0,0,0,0)",
        showlegend: false,
        dragmode: "pan",
      };

      const config = { responsive: true, displayModeBar: false };

      await Plotly.newPlot(earthPlotRef.current, data, layout, config);
      startEarthAnimation();
    };

    const startEarthAnimation = () => {
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }

      lastFrameTimeRef.current = null;

      const step = (timestamp) => {
        if (!earthPlotRef.current) return;

        if (lastFrameTimeRef.current == null) {
          lastFrameTimeRef.current = timestamp;
        }
        const deltaMs = timestamp - lastFrameTimeRef.current;
        lastFrameTimeRef.current = timestamp;

        // Smoothly ease current speed towards target speed
        const targetSpeed = rotationSpeedRef.current;
        const currentSpeed = currentRotationSpeedRef.current;
        const easedSpeed = currentSpeed + (targetSpeed - currentSpeed) * 0.08;
        currentRotationSpeedRef.current = easedSpeed;

        // Only rotate if speed is significant
        if (Math.abs(easedSpeed) > 0.001) {
          // Degrees per ms at speed 1
          const degreesPerMs = 0.012;
          rotationAngleRef.current =
            (rotationAngleRef.current + degreesPerMs * deltaMs * easedSpeed) %
            360;

          Plotly.update(
            earthPlotRef.current,
            {},
            {
              "geo.projection.rotation.lon": rotationAngleRef.current,
            }
          );
        }

        animationIdRef.current = requestAnimationFrame(step);
      };

      animationIdRef.current = requestAnimationFrame(step);
    };

    initEarth();

    const handleResize = () => {
      if (earthPlotRef.current) {
        Plotly.Plots.resize(earthPlotRef.current);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
      window.removeEventListener("resize", handleResize);
    };
  }, [isDark]);

  // Chart.js initialization (runs once)
  useEffect(() => {
    if (!regionChartRef.current || chartInstanceRef.current) return;

    const ctx = regionChartRef.current.getContext("2d");

    chartInstanceRef.current = new Chart(ctx, {
      type: "bar",
      data: {
        labels: ["North America", "Europe", "Asia Pacific", "LatAm", "MEA"],
        datasets: [
          {
            label: "Brand Engagement Score",
            data: [85, 72, 90, 64, 58],
            backgroundColor: [
              "#2563eb", // blue-600
              "#60a5fa", // blue-400
              "#38bdf8", // sky-400
              "#a5b4fc", // indigo-300
              "#22c55e", // green-500
            ],
            borderRadius: 6,
            barThickness: 28,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: {
          duration: 900,
          easing: "easeOutQuint",
        },
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: "#020617",
            titleColor: "#e5e7eb",
            bodyColor: "#e5e7eb",
            borderColor: "#1e293b",
            borderWidth: 1,
            padding: 10,
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: { color: "#e2e8f0" },
            ticks: {
              font: { family: "Inter, system-ui, sans-serif" },
            },
          },
          x: {
            grid: { display: false },
            ticks: {
              font: { family: "Inter, system-ui, sans-serif" },
            },
          },
        },
      },
    });

    return () => {
      chartInstanceRef.current?.destroy();
    };
  }, []);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const highlightSection = (section) => {
    alert(
      `Design Insight: ${section.toUpperCase()} is a critical component of this composition.`
    );
  };

  const handleThemeChange = (theme) => {
    setIsDark(theme === "dark");
  };

  // Derived root theme classes
  const rootThemeClasses = isDark
    ? "bg-slate-950 text-slate-100"
    : "bg-slate-50 text-slate-900";

  const navThemeClasses = isDark
    ? "bg-slate-900 border-slate-800 text-slate-100"
    : "bg-white border-slate-200 text-slate-900";

  return (
    <div className={`min-h-screen flex flex-col ${rootThemeClasses}`}>
      {/* Navigation / Header */}
      <nav
        className={`${navThemeClasses} px-6 py-4 flex justify-between items-center sticky top-0 z-50 shadow-sm transition-colors duration-500`}
      >
        <div className="flex items-center space-x-2">
          <span className="text-2xl text-blue-500">❖</span>
          <h1 className="text-xl font-bold tracking-tight">
            Global
            <span className="font-light">Vision</span>
          </h1>
        </div>
        <div className="hidden md:flex space-x-6 text-sm font-medium">
          <button
            onClick={() => scrollToSection("composer")}
            className="hover:text-blue-500 transition-colors"
          >
            Composer
          </button>
          <button
            onClick={() => scrollToSection("analytics")}
            className="hover:text-blue-500 transition-colors"
          >
            Analytics
          </button>
          <button
            onClick={() => scrollToSection("insights")}
            className="hover:text-blue-500 transition-colors"
          >
            Design Logic
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 py-8 space-y-12">
        {/* Section 1: Composer */}
        <section
          id="composer"
          className="grid lg:grid-cols-12 gap-8 items-start"
        >
          {/* Left Column: Controls & Description */}
          <div className="lg:col-span-4 space-y-6">
            <h2 className="text-3xl font-bold">Visual Composition Engine</h2>
            <p className="text-slate-500 leading-relaxed">
              Merge the <strong>Global Earth</strong> concept with a{" "}
              <strong>Professional Banner</strong> layout. This interactive
              canvas builds that “perfect image” dynamically.
            </p>
            <p className="text-slate-500 leading-relaxed">
              The <strong>Earth</strong> at the top represents global reach,
              while the <strong>Brand Identity</strong> anchors the composition
              at the bottom, mirroring the flow from worldwide impact to your
              specific brand.
            </p>

            {/* Controls Card */}
            <div
              className={`p-6 rounded-xl shadow-sm border ${
                isDark
                  ? "bg-slate-900 border-slate-700"
                  : "bg-white border-slate-100"
              } space-y-4 transition-colors duration-500`}
            >
              <h3 className="font-semibold text-sm border-b border-slate-200/50 pb-2">
                Refine Aesthetics
              </h3>

              {/* Rotation Speed */}
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-1">
                  Rotation Speed
                </label>
                <input
                  type="range"
                  min="0"
                  max="5"
                  step="0.5"
                  value={rotationSpeed}
                  onChange={(e) =>
                    setRotationSpeed(parseFloat(e.target.value) || 0)
                  }
                  className="w-full accent-blue-500 cursor-pointer"
                />
              </div>

              {/* Theme Mode */}
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-1">
                  Theme Mode
                </label>
                <div className="flex space-x-2">
                  <button
                    type="button"
                    onClick={() => handleThemeChange("light")}
                    className={`flex-1 py-2 text-xs font-bold rounded transition ${
                      !isDark
                        ? "bg-blue-600 text-white shadow"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    Warm Light
                  </button>
                  <button
                    type="button"
                    onClick={() => handleThemeChange("dark")}
                    className={`flex-1 py-2 text-xs font-bold rounded transition ${
                      isDark
                        ? "bg-blue-600 text-white shadow"
                        : "bg-slate-800 text-slate-100 hover:bg-slate-900"
                    }`}
                  >
                    Deep Space
                  </button>
                </div>
              </div>

              {/* Banner Message */}
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-1">
                  Banner Message
                </label>
                <input
                  type="text"
                  value={bannerText}
                  onChange={(e) => setBannerText(e.target.value)}
                  className={`w-full p-2 text-sm rounded border focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    isDark
                      ? "bg-slate-900 border-slate-700 text-slate-100"
                      : "bg-white border-slate-200 text-slate-900"
                  }`}
                />
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Canvas */}
          <div className="lg:col-span-8">
            <div
              className={`rounded-2xl shadow-xl overflow-hidden border flex flex-col items-center h-[600px] transition-all duration-700 ease-out ${
                isDark
                  ? "bg-slate-900 border-slate-800"
                  : "bg-white border-slate-100"
              } ${
                hasMounted
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
            >
              {/* Earth + Glow */}
              <div
                className={`w-full flex-grow relative bg-gradient-to-b transition-colors duration-500 ${
                  isDark
                    ? "from-slate-950 to-slate-900"
                    : "from-slate-50 to-white"
                }`}
              >
                {/* Glow behind Earth */}
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute -inset-16 bg-gradient-to-br from-blue-500/25 via-sky-400/10 to-emerald-400/20 blur-3xl opacity-80 animate-pulse" />
                </div>

                {/* Earth plot */}
                <div className="relative w-full h-full">
                  <div
                    ref={earthPlotRef}
                    className="w-full h-full"
                    id="earth-plot"
                  />
                </div>
              </div>

              {/* Banner */}
              <div
                className={`w-full py-8 px-12 border-t flex flex-col items-center justify-center space-y-3 transition-colors duration-500 ${
                  isDark
                    ? "bg-slate-950 border-slate-800"
                    : "bg-white border-slate-100"
                }`}
                id="banner-area"
              >
                <h2
                  id="banner-text"
                  className={`text-2xl md:text-3xl font-light tracking-wide text-center ${
                    isDark ? "text-slate-50" : "text-slate-900"
                  }`}
                >
                  {bannerText}
                </h2>
                <div className="flex items-center space-x-2 opacity-90 mt-2">
                  <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-blue-500/40">
                    ❖
                  </div>
                  <span className="text-sm font-bold tracking-widest uppercase text-slate-400">
                    GlobalVision Inc.
                  </span>
                </div>
              </div>
            </div>
            <p className="text-center text-xs text-slate-400 mt-4">
              Interactive Canvas: drag the globe to explore; scroll to zoom.
            </p>
          </div>
        </section>

        {/* Section 2: Analytics */}
        <section id="analytics" className="py-12 border-t border-slate-200/70">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Text */}
            <div className="space-y-4">
              <div className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-bold uppercase tracking-wide">
                Data Context
              </div>
              <h2 className="text-2xl font-bold">Why this Composition Works</h2>
              <p className="text-slate-500">
                Placing the Earth above the brand mirrors the flow of attention:
                from global scope to your specific identity. The data here
                supports a “global first” narrative backed by engagement
                metrics.
              </p>

              <div className="grid grid-cols-2 gap-4 mt-6">
                <div
                  className={`p-4 rounded-lg border shadow-sm hover:shadow-md transition ${
                    isDark
                      ? "bg-slate-900 border-slate-700"
                      : "bg-white border-slate-100"
                  }`}
                >
                  <div className="text-3xl font-bold text-slate-900 dark:text-slate-50">
                    195
                  </div>
                  <div className="text-xs text-slate-500 uppercase font-semibold">
                    Countries Reached
                  </div>
                </div>
                <div
                  className={`p-4 rounded-lg border shadow-sm hover:shadow-md transition ${
                    isDark
                      ? "bg-slate-900 border-slate-700"
                      : "bg-white border-slate-100"
                  }`}
                >
                  <div className="text-3xl font-bold text-blue-600">2.4B</div>
                  <div className="text-xs text-slate-500 uppercase font-semibold">
                    Digital Impressions
                  </div>
                </div>
              </div>
            </div>

            {/* Chart */}
            <div
              className={`p-6 rounded-xl shadow-sm border ${
                isDark
                  ? "bg-slate-900 border-slate-700"
                  : "bg-white border-slate-100"
              } transition-colors duration-500`}
            >
              <h3 className="text-sm font-bold text-slate-400 uppercase mb-4">
                Regional Engagement Metrics
              </h3>
              <div className="relative w-full max-w-xl mx-auto h-[300px] md:h-[350px]">
                <canvas ref={regionChartRef} />
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
