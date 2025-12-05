import React, { useEffect, useRef, useState } from "react";
import Plotly from "plotly.js-dist-min";
import Chart from "chart.js/auto";

export default function DeveloperTheExplorer() {
  const earthPlotRef = useRef(null);
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  const animationIdRef = useRef(null);
  const rotationAngleRef = useRef(0);
  const lastFrameTimeRef = useRef(null);

  // PDF Data Extraction
  const eventData = {
    title: "Developer-The-Explorer",
    tagline: "Into the Wild With the Brightest Minds",
    description:
      "An immersive, high-impact technical summit designed for next-generation technologists. Where curiosity becomes action and bold ideas mature into meaningful, real-world solutions.",
    highlights: [
      {
        title: "Immersive Tech Sessions",
        desc: "Dive into Al, Cloud, Web, and Mobile through highly interactive, hands-on sessions.",
      },
      {
        title: "Camping & Adventure",
        desc: "A 3-day, 2-night outdoor tech camp in a forest setting where adventure meets innovation.",
      },
      {
        title: "Real-Time Building",
        desc: "Collaborate in real time to explore ideas, experiment boldly, and prototype quickly.",
      },
    ],
    pastEvents: [
      {
        name: "Figma Lifestyle",
        date: "Oct 21, 2023",
        desc: "Unlocked Figma's potential through UI/UX explorations.",
      },
      {
        name: "Techotsav 2024",
        date: "April 21, 2024",
        desc: "A vibrant tech carnival with 100+ attendees exploring AI and Cybersecurity.",
      },
      {
        name: "Build With AI",
        date: "Past Tenure",
        desc: "Hands-on training in AI tools and LLM model deployment.",
      },
    ],
    currentEvents: [
      {
        name: "Crack SIH",
        date: "Sept 9, 2025",
        desc: "Smart India Hackathon orientation with 600+ attendees.",
      },
      {
        name: "SIH Internal Hackathon",
        date: "Current Tenure",
        desc: "National-level simulation solving real-world problem statements.",
      },
      {
        name: "9 Days of Coding",
        date: "Navratri Series",
        desc: "Daily escalating challenges to master DSA and logic.",
      },
    ],
  };

  // --- 1. Earth Animation Logic (Non-Interactive) ---
  useEffect(() => {
    if (!earthPlotRef.current) return;

    const initEarth = async () => {
      // Locations representing Global Tech Hubs (Stylized)
      const data = [
        {
          type: "scattergeo",
          mode: "markers",
          locations: ["IND", "USA", "GBR", "SGP", "JPN", "DEU"],
          locationmode: "ISO-3",
          marker: {
            size: [30, 15, 15, 12, 18, 15],
            color: "#3b82f6", // Blue-500
            opacity: 0.9,
            line: { color: "white", width: 1 },
          },
          text: [
            "GHRCE (Nagpur)",
            "Tech Hub West",
            "Innovation Center",
            "Asia Node",
            "Future Lab",
            "Cloud Region",
          ],
          hoverinfo: "text", // Keep hover text for context, but disable dragging below
        },
      ];

      const layout = {
        geo: {
          projection: {
            type: "orthographic",
            rotation: { lon: 0, lat: 20 },
          },
          showocean: true,
          oceancolor: "#020617", // slate-950
          showland: true,
          landcolor: "#1e293b", // slate-800
          showlakes: true,
          lakecolor: "#020617",
          showcountries: true,
          countrycolor: "#475569", // slate-600
          bgcolor: "rgba(0,0,0,0)",
        },
        margin: { r: 0, t: 0, l: 0, b: 0 },
        paper_bgcolor: "rgba(0,0,0,0)",
        plot_bgcolor: "rgba(0,0,0,0)",
        showlegend: false,
        dragmode: false, // DISABLED USER INTERACTION
        hovermode: false, // Cleaner look
      };

      const config = {
        responsive: true,
        displayModeBar: false, // Hides the toolbar
        scrollZoom: false, // Disables scroll zoom
        staticPlot: false, // False allows animation, but we disable interaction via layout
      };

      await Plotly.newPlot(earthPlotRef.current, data, layout, config);
      startEarthAnimation();
    };

    const startEarthAnimation = () => {
      if (animationIdRef.current) cancelAnimationFrame(animationIdRef.current);
      lastFrameTimeRef.current = null;

      const step = (timestamp) => {
        if (!earthPlotRef.current) return;
        if (lastFrameTimeRef.current == null) lastFrameTimeRef.current = timestamp;
        
        const deltaMs = timestamp - lastFrameTimeRef.current;
        lastFrameTimeRef.current = timestamp;

        // Constant rotation speed
        const speed = 1.5; 
        const degreesPerMs = 0.01;
        
        rotationAngleRef.current = (rotationAngleRef.current + degreesPerMs * deltaMs * speed) % 360;

        Plotly.update(
          earthPlotRef.current,
          {},
          { "geo.projection.rotation.lon": rotationAngleRef.current }
        );

        animationIdRef.current = requestAnimationFrame(step);
      };

      animationIdRef.current = requestAnimationFrame(step);
    };

    initEarth();

    const handleResize = () => {
      if (earthPlotRef.current) Plotly.Plots.resize(earthPlotRef.current);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      if (animationIdRef.current) cancelAnimationFrame(animationIdRef.current);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // --- 2. Chart Logic (Visualizing Impact from PDF) ---
  useEffect(() => {
    if (!chartRef.current || chartInstanceRef.current) return;

    const ctx = chartRef.current.getContext("2d");

    // Data derived from PDF stats (Techotsav: 100+, Crack SIH: 600+)
    chartInstanceRef.current = new Chart(ctx, {
      type: "bar",
      data: {
        labels: ["Techotsav '24", "Crack SIH '25", "Exp. DTE Summit"],
        datasets: [
          {
            label: "Participant Reach",
            data: [120, 600, 800], // Estimated growth based on trend
            backgroundColor: ["#64748b", "#3b82f6", "#22c55e"],
            borderRadius: 6,
            barThickness: 40,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          title: {
            display: true,
            text: "Community Growth (Attendees)",
            color: "#94a3b8",
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: { color: "#334155" },
            ticks: { color: "#94a3b8" },
          },
          x: {
            grid: { display: false },
            ticks: { color: "#94a3b8" },
          },
        },
      },
    });

    return () => {
      chartInstanceRef.current?.destroy();
    };
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-blue-500 selection:text-white">
      
      {/* --- HERO SECTION --- */}
      <section className="relative h-screen w-full overflow-hidden flex flex-col items-center justify-center">
        {/* Background Earth Layer */}
        <div className="absolute inset-0 z-0 opacity-60">
           {/* Overlay to prevent interaction with the canvas */}
          <div className="absolute inset-0 z-10 bg-transparent cursor-default"></div> 
          <div ref={earthPlotRef} className="w-full h-full" />
        </div>

        {/* Hero Content Overlay */}
        <div className="relative z-20 text-center px-4 max-w-4xl mx-auto space-y-6 mt-[-100px]">
            <div className="inline-block px-3 py-1 border border-blue-500/30 rounded-full bg-blue-900/20 text-blue-400 text-xs font-bold tracking-widest uppercase mb-2 backdrop-blur-sm">
                GDGOC GHRCE Presents
            </div>
            <h1 className="text-5xl md:text-7xl font-black tracking-tight text-white drop-shadow-2xl">
                {eventData.title}
            </h1>
            <p className="text-xl md:text-2xl text-blue-200 font-light tracking-wide">
                {eventData.tagline}
            </p>
            <p className="text-slate-400 max-w-2xl mx-auto leading-relaxed">
                {eventData.description}
            </p>
            <div className="pt-8">
                <button 
                    onClick={() => document.getElementById('details').scrollIntoView({ behavior: 'smooth' })}
                    className="px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-full transition-all shadow-lg shadow-blue-500/30"
                >
                    Start Exploration
                </button>
            </div>
        </div>
        
        {/* Gradient Fade at bottom */}
        <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-slate-950 to-transparent z-10 pointer-events-none" />
      </section>

      {/* --- CONTENT SECTION --- */}
      <div id="details" className="container mx-auto px-6 py-20 space-y-24">
        
        {/* Highlights Grid */}
        <section>
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">What You'll Experience</h2>
                <div className="w-20 h-1 bg-blue-500 mx-auto rounded-full"></div>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
                {eventData.highlights.map((item, idx) => (
                    <div key={idx} className="p-8 bg-slate-900 border border-slate-800 rounded-2xl hover:border-blue-500/50 transition-colors group">
                        <div className="w-12 h-12 bg-blue-900/30 rounded-lg flex items-center justify-center mb-6 group-hover:bg-blue-600 transition-colors">
                            <span className="text-2xl text-blue-400 group-hover:text-white">❖</span>
                        </div>
                        <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                        <p className="text-slate-400 leading-relaxed">{item.desc}</p>
                    </div>
                ))}
            </div>
        </section>

        {/* Events Timeline & Analytics */}
        <section className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Timeline Column */}
            <div className="space-y-8">
                <div>
                    <h2 className="text-3xl font-bold mb-2">Our Journey</h2>
                    <p className="text-slate-400">From Figma Lifestyle to National Hackathons.</p>
                </div>
                
                <div className="space-y-6">
                    <h3 className="text-sm font-bold text-blue-400 uppercase tracking-wider">Recent Milestones</h3>
                    {eventData.currentEvents.map((evt, idx) => (
                        <div key={idx} className="flex gap-4">
                            <div className="flex flex-col items-center">
                                <div className="w-3 h-3 bg-blue-500 rounded-full mt-2"></div>
                                <div className="w-0.5 flex-grow bg-slate-800 mt-1"></div>
                            </div>
                            <div className="pb-6">
                                <h4 className="font-bold text-lg">{evt.name}</h4>
                                <span className="text-xs text-slate-500 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">{evt.date}</span>
                                <p className="text-slate-400 text-sm mt-2">{evt.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Analytics Column */}
        </section>

        {/* FAQ Section */}
        <section className="max-w-3xl mx-auto w-full">
            <h2 className="text-3xl font-bold mb-10 text-center">Camp FAQs</h2>
            <div className="space-y-4">
                <div className="bg-slate-900 rounded-lg p-6 border border-slate-800">
                    <h4 className="font-bold text-lg mb-2 text-white">Who can participate?</h4>
                    <p className="text-slate-400">Any student or developer with a passion for learning! No expertise required—just curiosity.</p>
                </div>
                <div className="bg-slate-900 rounded-lg p-6 border border-slate-800">
                    <h4 className="font-bold text-lg mb-2 text-white">Where is the event?</h4>
                    <p className="text-slate-400">A peaceful forest campsite, perfect for nature adventures and tech innovation.</p>
                </div>
                <div className="bg-slate-900 rounded-lg p-6 border border-slate-800">
                    <h4 className="font-bold text-lg mb-2 text-white">How long is it?</h4>
                    <p className="text-slate-400">A 3-day, 2-night immersive experience packed with coding, bonfires, and mentors.</p>
                </div>
            </div>
        </section>

        {/* Footer Note */}
        <div className="text-center pt-20 pb-10 border-t border-slate-900 text-slate-600 text-sm">
            <p>© 2025 GDGOC GHRCE. All Rights Reserved.</p>
            <p className="mt-2">Designed for Explorers.</p>
        </div>

      </div>
    </div>
  );
}