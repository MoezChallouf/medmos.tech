/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useState } from "react";
import {
  Terminal,
  Activity,
  Cpu,
  Database,
  CheckCircle2,
  ExternalLink,
  Code2,
  ChevronRight,
  Download,
  Mail,
  Linkedin,
  Github,
  Sparkles,
  Bot,
  Send,
  Loader2,
  Menu,
  X,
  FileCode,
  Eye
} from "lucide-react";
import { motion } from "motion/react";

// Precision SVG component replicating the circuit-trace letter M logo with node pads
const CircuitMLogo = ({ className = "w-8 h-8" }: { className?: string }) => (
  <svg viewBox="0 0 48 44" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="circuit-m-grad" x1="0%" y1="100%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#1E50E5" />
        <stop offset="50%" stopColor="#118DFF" />
        <stop offset="100%" stopColor="#00E5FF" />
      </linearGradient>
    </defs>
    
    {/* Main thick M structure */}
    <path
      d="M 12 14 L 12 26 M 12 14 L 24 29 L 28 25 L 36 14 M 36 14 L 36 26"
      stroke="url(#circuit-m-grad)"
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />

    {/* Secondary inner trace lines */}
    <path
      d="M 17 8 L 24 17 L 31 8 M 8 28 L 12 24 M 15 32 L 15 23 M 33 32 L 33 23 M 40 28 L 36 24"
      stroke="url(#circuit-m-grad)"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />

    {/* Solder Vias (Nodes) */}
    {[
      [17, 8],
      [31, 8],
      [8, 28],
      [15, 32],
      [33, 32],
      [40, 28]
    ].map(([cx, cy], i) => (
      <g key={i}>
        <circle cx={cx} cy={cy} r="2.8" stroke="url(#circuit-m-grad)" strokeWidth="1.8" fill="#080B14" />
        <circle cx={cx} cy={cy} r="1.2" fill="#5EEAD4" />
      </g>
    ))}
  </svg>
);

export default function App() {
  const [loadingIntro, setLoadingIntro] = useState(true);
  const [loaderProgress, setLoaderProgress] = useState(0);
  const [loaderStatus, setLoaderStatus] = useState("INITIALIZING DOCUMENT CHAIN...");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // AI MES Consultant State (High Thinking Mode)
  const [aiModalOpen, setAiModalOpen] = useState(false);
  const [stitOptimaModalOpen, setStitOptimaModalOpen] = useState(false);

  const stitOptimaImages = [
    "/stitoptima/Screenshot 2026-07-28 133723.png",
    "/stitoptima/Screenshot 2026-07-28 133941.png",
    "/stitoptima/Screenshot 2026-07-28 133957.png",
    "/stitoptima/Screenshot 2026-07-28 134050.png",
    "/stitoptima/Screenshot 2026-07-28 134135.png",
    "/stitoptima/Screenshot 2026-07-28 134212.png",
    "/stitoptima/Screenshot 2026-07-28 134313.png",
    "/stitoptima/Screenshot 2026-07-28 134352.png",
    "/stitoptima/Screenshot 2026-07-28 134411.png",
    "/stitoptima/Screenshot 2026-07-28 134427.png",
    "/stitoptima/Screenshot 2026-07-28 134500.png",
    "/stitoptima/Screenshot 2026-07-28 134513.png",
    "/stitoptima/Screenshot 2026-07-28 134521.png",
    "/stitoptima/Screenshot 2026-07-28 134531.png",
    "/stitoptima/Screenshot 2026-07-28 134540.png",
    "/stitoptima/Screenshot 2026-07-28 134546.png",
    "/stitoptima/Screenshot 2026-07-28 134552.png",
    "/stitoptima/Screenshot 2026-07-28 134600.png",
  ];
  const [aiQuery, setAiQuery] = useState("");
  const [aiMessages, setAiMessages] = useState<Array<{ role: "user" | "ai"; text: string; thinking?: boolean }>>([
    {
      role: "ai",
      text: "SYSTEM ONLINE // I am Mohamed Moez Challouf's AI Twin & MES Architecture Consultant (running on Gemini 3.1 Pro Preview with HIGH THINKING mode). Ask me anything about scaling Laravel/Filament across 4 factories, real-time barcode telemetry, AI vision inventory tracking, or database document chains."
    }
  ]);
  const [aiLoading, setAiLoading] = useState(false);
  const [showStandaloneModal, setShowStandaloneModal] = useState(false);
  const [standaloneHtmlCode, setStandaloneHtmlCode] = useState("");

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // 1. Intro Boot Loader Animation
  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      setLoadingIntro(false);
      return;
    }

    const messages = [
      "INITIALIZING DOCUMENT CHAIN...",
      "CONNECTING ELOQUENT ORM NODES...",
      "SYNCING 4 FACTORY SCHEMATICS...",
      "ONLINE // KERNEL READY"
    ];

    let p = 0;
    const interval = setInterval(() => {
      p += Math.floor(Math.random() * 18) + 8;
      if (p >= 100) {
        p = 100;
        clearInterval(interval);
        setTimeout(() => setLoadingIntro(false), 500);
      }
      setLoaderProgress(p);
      if (p > 70) setLoaderStatus(messages[3]);
      else if (p > 45) setLoaderStatus(messages[2]);
      else if (p > 20) setLoaderStatus(messages[1]);
    }, 60);

    return () => clearInterval(interval);
  }, []);

  // Fetch Standalone HTML file code for preview/download
  useEffect(() => {
    fetch("/portfolio.html")
      .then((res) => res.text())
      .then((data) => setStandaloneHtmlCode(data))
      .catch(() => setStandaloneHtmlCode("<!-- Error loading standalone HTML -->"));
  }, []);

  // 2. PCB Interactive Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    const mouse = { x: width / 2, y: height / 2 };
    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    window.addEventListener("mousemove", handleMouseMove);

    class Node {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      isPulse: boolean;
      constructor() {
        // Snap to 24px grid intervals
        this.x = Math.floor((Math.random() * width) / 24) * 24;
        this.y = Math.floor((Math.random() * height) / 24) * 24;
        // Move strictly along orthogonal grid axes
        if (Math.random() > 0.5) {
          this.vx = (Math.random() > 0.5 ? 1 : -1) * 0.2;
          this.vy = 0;
        } else {
          this.vx = 0;
          this.vy = (Math.random() > 0.5 ? 1 : -1) * 0.2;
        }
        this.size = Math.random() > 0.7 ? 3 : 2;
        this.isPulse = Math.random() > 0.6;
      }
      update() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;
      }
    }

    // Sparse, deliberate schematic network (18 junction points)
    const nodes = Array.from({ length: 18 }, () => new Node());

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < nodes.length; i++) {
        nodes[i].update();
        
        // Draw square circuit pad
        ctx.fillStyle = nodes[i].isPulse ? "rgba(96, 165, 250, 0.7)" : "rgba(59, 130, 246, 0.4)";
        ctx.fillRect(nodes[i].x - nodes[i].size, nodes[i].y - nodes[i].size, nodes[i].size * 2, nodes[i].size * 2);

        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          // Connect with crisp orthogonal PCB traces
          if (dist < 192) {
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);

            const alpha = (1 - dist / 192) * 0.25;
            ctx.strokeStyle = `rgba(59, 130, 246, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }

        const mdx = nodes[i].x - mouse.x;
        const mdy = nodes[i].y - mouse.y;
        const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
        if (mdist < 220) {
          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(mouse.x, nodes[i].y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `rgba(245, 158, 11, ${(1 - mdist / 220) * 0.45})`;
          ctx.lineWidth = 1.2;
          ctx.stroke();

          // Highlight junction pad under mouse probe
          ctx.fillStyle = "rgba(245, 158, 11, 0.8)";
          ctx.fillRect(nodes[i].x - 2.5, nodes[i].y - 2.5, 5, 5);
        }
      }
      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [loadingIntro]);

  // Handle AI Consult Request
  const handleSendAiQuery = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiQuery.trim() || aiLoading) return;

    const userPrompt = aiQuery.trim();
    setAiQuery("");
    setAiMessages((prev) => [...prev, { role: "user", text: userPrompt }]);
    setAiLoading(true);

    try {
      const res = await fetch("/api/mes/consult", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: userPrompt })
      });
      const data = await res.json();
      if (data.error) {
        setAiMessages((prev) => [...prev, { role: "ai", text: `ERROR: ${data.error}` }]);
      } else {
        setAiMessages((prev) => [...prev, { role: "ai", text: data.reply }]);
      }
    } catch (err: any) {
      setAiMessages((prev) => [...prev, { role: "ai", text: "SYSTEM ERROR // Could not connect to AI diagnostic endpoint." }]);
    } finally {
      setAiLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(standaloneHtmlCode);
    alert("Full Standalone HTML copied to clipboard!");
  };

  return (
    <div className="bg-[#0A0A0B] text-[#E2E8F0] font-sans min-h-screen relative overflow-x-hidden selection:bg-[#3B82F6]/30 selection:text-[#60A5FA]">
      {/* INTRO LOADER OVERLAY */}
      {loadingIntro && (
        <div className="fixed inset-0 z-50 bg-[#0A0A0B] flex flex-col items-center justify-center font-mono border-b border-[#3B82F6]/20 transition-opacity duration-500">
          <div className="relative flex flex-col items-center p-8 max-w-md w-full mx-4 glass-panel rounded-xl border border-[#3B82F6]/40 shadow-[0_0_50px_rgba(59,130,246,0.2)]">
            <div className="flex items-center justify-between w-full mb-6 border-b border-white/10 pb-3 text-xs text-neutral-400">
              <span>SYS.BOOT // KERNEL v4.2.0</span>
              <span className="flex items-center gap-1.5 text-[#3B82F6] font-semibold">
                <span className="w-2 h-2 rounded-full bg-[#3B82F6] animate-ping"></span> ONLINE
              </span>
            </div>
            <div className="text-4xl md:text-5xl font-bold tracking-widest text-white mb-2 font-display">M.M.C</div>
            <div className="text-xs text-[#3B82F6] tracking-widest uppercase mb-6">Industrial ERP & MES Software Engine</div>
            
            <div className="w-full bg-white/5 rounded-full h-1.5 mb-3 overflow-hidden border border-white/10">
              <div
                className="h-full bg-gradient-to-r from-[#3B82F6] to-[#F59E0B] transition-all duration-300"
                style={{ width: `${loaderProgress}%` }}
              ></div>
            </div>
            
            <div className="w-full flex justify-between text-[11px] text-neutral-500 font-mono">
              <span>{loaderStatus}</span>
              <span>{loaderProgress}%</span>
            </div>
          </div>
        </div>
      )}
      {/* TECHNICAL BACKGROUNDS */}
      <div className="fixed inset-0 pointer-events-none z-0 bg-grid-pattern opacity-80"></div>
      <div className="fixed inset-0 pointer-events-none z-0 bg-noise"></div>
      <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0 opacity-45"></canvas>
      {/* 1. MAIN STICKY NAV */}
      <header className="sticky top-0 z-50 w-full border-b border-white/5 glass-panel">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <a href="#" className="flex items-center gap-2.5 group font-orbitron font-extrabold text-lg text-white tracking-[0.08em] uppercase">
            <div className="w-9 h-9 rounded-md bg-[#080B14]/90 border border-[#3B82F6]/30 group-hover:border-[#00E5FF]/60 flex items-center justify-center p-1 shadow-[0_0_15px_rgba(59,130,246,0.2)] group-hover:shadow-[0_0_20px_rgba(0,229,255,0.35)] transition-all flex-shrink-0">
              <CircuitMLogo className="w-full h-full" />
            </div>
            <div className="flex items-center gap-0.5">
              <span>medmos</span><span className="text-[#3B82F6]">.tech</span>
            </div>
          </a>

          <nav className="hidden md:flex items-center gap-8 font-mono text-[11px] uppercase tracking-widest text-zinc-400">
            <a href="#work" className="hover:text-[#3B82F6] transition-colors py-2">Work</a>
            <a href="#experience" className="hover:text-[#3B82F6] transition-colors py-2">Experience</a>
            <a href="#skills" className="hover:text-[#3B82F6] transition-colors py-2">Skills</a>
            <a href="#contact" className="hover:text-[#3B82F6] transition-colors py-2">Contact</a>
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <a
              href="#contact"
              className="px-5 py-1.5 rounded-sm font-mono text-[11px] uppercase tracking-widest font-bold bg-[#3B82F6]/10 border border-[#3B82F6]/40 hover:bg-[#3B82F6] text-[#3B82F6] hover:text-white shadow-[0_0_15px_rgba(59,130,246,0.2)] transition-all flex items-center gap-2"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#3B82F6] animate-pulse"></span>
              HIRE ME
            </a>
          </div>

          <button
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Toggle Navigation Menu"
            className="md:hidden p-2 rounded-sm border border-white/10 text-neutral-300 hover:text-white"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </header>
      {/* MOBILE FULLSCREEN OVERLAY MENU */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-[#0A0A0B]/95 backdrop-blur-2xl flex flex-col justify-between p-8 font-mono">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div className="flex items-center gap-2">
              <CircuitMLogo className="w-5 h-5" />
              <span className="text-xs text-[#3B82F6] font-orbitron font-extrabold tracking-widest uppercase">MEDMOS.TECH // SYSTEM NAV</span>
            </div>
            <button onClick={() => setMobileMenuOpen(false)} className="p-2 border border-white/20 rounded text-neutral-400 hover:text-white">
              <X className="w-6 h-6" />
            </button>
          </div>
          <div className="flex flex-col gap-6 text-2xl font-bold font-display my-auto">
            <a onClick={() => setMobileMenuOpen(false)} href="#work" className="text-white hover:text-[#3B82F6] flex items-center justify-between border-b border-white/5 pb-3">
              <span>01 // WORK</span>
              <span className="text-xs font-mono text-neutral-500">SYSTEM ARCHITECTURE</span>
            </a>
            <a onClick={() => setMobileMenuOpen(false)} href="#experience" className="text-white hover:text-[#3B82F6] flex items-center justify-between border-b border-white/5 pb-3">
              <span>02 // EXPERIENCE</span>
              <span className="text-xs font-mono text-neutral-500">TIMELINE</span>
            </a>
            <a onClick={() => setMobileMenuOpen(false)} href="#skills" className="text-white hover:text-[#3B82F6] flex items-center justify-between border-b border-white/5 pb-3">
              <span>03 // SKILLS</span>
              <span className="text-xs font-mono text-neutral-500">CONTROL SWITCHES</span>
            </a>
            <a onClick={() => setMobileMenuOpen(false)} href="#contact" className="text-white hover:text-[#3B82F6] flex items-center justify-between border-b border-white/5 pb-3">
              <span>04 // CONTACT</span>
              <span className="text-xs font-mono text-neutral-500">TRANSMISSION</span>
            </a>
          </div>
          <a
            onClick={() => setMobileMenuOpen(false)}
            href="#contact"
            className="w-full text-center py-3 bg-[#3B82F6] text-white font-mono text-sm font-semibold rounded shadow-lg shadow-[#3B82F6]/30"
          >
            INITIATE CONTRACT // HIRE ME
          </a>
        </div>
      )}

      <main className="relative z-10">
      {/* 2. HERO SECTION */}
        <section className="relative w-full min-h-[calc(100vh-4rem)] flex flex-col items-center justify-start pt-4 sm:pt-6 pb-10 sm:pb-14 px-4 sm:px-6 lg:px-8 overflow-hidden">
          {/* Faint ambient blueprint grid pattern backdrop behind framed video */}
          <div
            className="absolute inset-0 pointer-events-none z-0"
            style={{
              backgroundImage: "linear-gradient(rgba(59,130,246,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.06) 1px, transparent 1px)",
              backgroundSize: "48px 48px",
              WebkitMaskImage: "radial-gradient(ellipse 75% 65% at 50% 35%, black, transparent 80%)",
              maskImage: "radial-gradient(ellipse 75% 65% at 50% 35%, black, transparent 80%)",
            }}
          />

          {/* MOBILE & TABLET HERO CONTENT (< 1024px) - Separate from video monitor so no overlap/cropping occurs */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-[1240px] flex flex-col items-start text-left gap-4 mb-6 sm:mb-8 lg:hidden z-10"
          >
            <h1 className="font-display font-extrabold text-4xl sm:text-5xl leading-[1.02] tracking-tight uppercase m-0 flex flex-col gap-0.5">
              <span className="text-white">MOHAMED MOEZ</span>
              <span className="text-[#3B82F6]">CHALLOUF</span>
            </h1>

            <div className="font-mono text-xs sm:text-sm text-zinc-400 font-bold tracking-widest uppercase mt-1">
              ERP &amp; MANUFACTURING SOFTWARE ENGINEER / FULL-STACK LARAVEL DEVELOPER
            </div>

            <p className="text-xs sm:text-sm text-zinc-300 max-w-[62ch] leading-relaxed font-mono uppercase tracking-wider m-0">
              SOLE ENGINEER SCALING FACTORY-FLOOR SOFTWARE FROM <span className="text-white font-bold px-1.5 py-0.5 rounded-sm bg-white/5 border border-white/15">1 TO 4 INDUSTRIAL FACILITIES</span>. SPECIALIZING IN LARAVEL, FILAMENT, LIVEWIRE, AI-POWERED INVENTORY AUTOMATION, REAL-TIME PRODUCTION DASHBOARDS, BARCODE/QR SYSTEMS, AND DOCUMENT-CHAIN MANUFACTURING WORKFLOWS.
            </p>

            <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3 pt-2 w-full sm:w-auto">
              <a
                href="#work"
                className="w-full sm:w-auto justify-center px-6 py-3.5 rounded-sm bg-[#3B82F6] hover:bg-[#2563EB] text-white font-mono text-xs font-bold uppercase tracking-widest shadow-[0_0_25px_rgba(59,130,246,0.35)] hover:shadow-[0_0_35px_rgba(59,130,246,0.5)] transition-all flex items-center gap-2 group/btn min-h-[44px]"
              >
                <span>VIEW ARCHITECTURE</span>
                <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </a>
              <button
                onClick={() => setAiModalOpen(true)}
                className="w-full sm:w-auto justify-center px-5 py-3.5 rounded-sm bg-white/5 hover:bg-white/10 border border-white/15 hover:border-[#3B82F6]/50 text-zinc-300 hover:text-white font-mono text-xs font-bold uppercase tracking-widest transition-all flex items-center gap-2 min-h-[44px]"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B] animate-pulse"></span>
                <span>SYSTEM STATUS</span>
              </button>
              <a
                href="#contact"
                className="w-full sm:w-auto justify-center px-4 py-3 text-zinc-400 hover:text-white font-mono text-xs uppercase tracking-widest transition-colors flex items-center gap-1.5 underline underline-offset-4 min-h-[44px]"
              >
                <span>GET IN TOUCH →</span>
              </a>
            </div>
          </motion.div>

          {/* FRAMED LIVE FEED VIDEO MONITOR (Exact 1440:900 ratio on all screens) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative z-10 w-full max-w-[1240px] aspect-[1440/900] rounded-sm overflow-hidden bg-[#060608] border border-white/10 hover:border-[#3B82F6]/50 shadow-[0_25px_60px_rgba(0,0,0,0.9),0_0_40px_rgba(59,130,246,0.15)] flex flex-col justify-end group transition-colors duration-500"
          >
            {/* Animated Industrial Scanner Line */}
            <div className="animate-scanner"></div>

            {/* Animated Tech Corner Accents */}
            <div className="absolute top-0 left-0 w-3.5 h-3.5 border-t-2 border-l-2 border-[#3B82F6] z-30 pointer-events-none animate-pulse"></div>
            <div className="absolute top-0 right-0 w-3.5 h-3.5 border-t-2 border-r-2 border-[#3B82F6] z-30 pointer-events-none animate-pulse"></div>
            <div className="absolute bottom-0 left-0 w-3.5 h-3.5 border-b-2 border-l-2 border-[#3B82F6] z-30 pointer-events-none animate-pulse"></div>
            <div className="absolute bottom-0 right-0 w-3.5 h-3.5 border-b-2 border-r-2 border-[#3B82F6] z-30 pointer-events-none animate-pulse"></div>

            {/* Media */}
            <video
              autoPlay
              loop
              muted
              playsInline
              poster="/momo1440.png"
              className="absolute inset-0 w-full h-full object-contain bg-black"
              src="https://res.cloudinary.com/oujrzw6u/video/upload/v1783162308/medmos-v2_sbxmtu.mp4"
            />

            {/* Vignette shadow pressing in from all four sides */}
            <div className="absolute inset-0 pointer-events-none z-10 shadow-[inset_0_0_50px_18px_rgba(0,0,0,0.85)]"></div>

            {/* Bottom dark gradient overlay for desktop text legibility */}
            <div
              className="absolute inset-0 pointer-events-none z-10 hidden lg:block"
              style={{
                background: "linear-gradient(0deg, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.65) 30%, transparent 60%)",
              }}
            ></div>

            {/* DESKTOP CONTENT OVERLAY (>= 1024px) */}
            <div className="relative z-20 p-8 lg:p-10 hidden lg:flex flex-col gap-4 text-left">
              <h1 className="font-display font-extrabold text-5xl xl:text-[60px] leading-[0.98] tracking-tight uppercase m-0 flex flex-col gap-1">
                <span className="text-white">MOHAMED MOEZ</span>
                <span className="text-[#3B82F6]">CHALLOUF</span>
              </h1>

              <div className="font-mono text-xs xl:text-sm text-zinc-400 font-bold tracking-widest uppercase mt-0.5">
                ERP &amp; MANUFACTURING SOFTWARE ENGINEER / FULL-STACK LARAVEL DEVELOPER
              </div>

              <p className="text-xs xl:text-sm text-zinc-300 max-w-[62ch] leading-relaxed font-mono uppercase tracking-wider m-0">
                SOLE ENGINEER SCALING FACTORY-FLOOR SOFTWARE FROM <span className="text-white font-bold px-2 py-0.5 rounded-sm bg-white/5 border border-white/15">1 TO 4 INDUSTRIAL FACILITIES</span>. SPECIALIZING IN LARAVEL, FILAMENT, LIVEWIRE, AI-POWERED INVENTORY AUTOMATION, REAL-TIME PRODUCTION DASHBOARDS, BARCODE/QR SYSTEMS, AND DOCUMENT-CHAIN MANUFACTURING WORKFLOWS.
              </p>

              <div className="flex flex-wrap items-center gap-3.5 pt-2">
                <a
                  href="#work"
                  className="px-7 py-3 rounded-sm bg-[#3B82F6] hover:bg-[#2563EB] text-white font-mono text-xs font-bold uppercase tracking-widest shadow-[0_0_25px_rgba(59,130,246,0.35)] hover:shadow-[0_0_35px_rgba(59,130,246,0.5)] transition-all flex items-center gap-2 group/btn"
                >
                  <span>VIEW ARCHITECTURE</span>
                  <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </a>
                <button
                  onClick={() => setAiModalOpen(true)}
                  className="px-5 py-3 rounded-sm bg-transparent border border-white/15 hover:border-[#3B82F6]/50 bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white font-mono text-xs font-bold uppercase tracking-widest transition-all flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B] animate-pulse"></span>
                  <span>SYSTEM STATUS</span>
                </button>
                <a
                  href="#contact"
                  className="px-4 py-3 text-zinc-400 hover:text-white font-mono text-xs uppercase tracking-widest transition-colors flex items-center gap-1.5 underline underline-offset-4"
                >
                  <span>GET IN TOUCH →</span>
                </a>
              </div>
            </div>
          </motion.div>

          {/* Scroll down indicator */}
          <a
            href="#work"
            className="relative z-10 mt-5 sm:mt-6 mx-auto flex flex-col items-center gap-1.5 text-zinc-500 hover:text-white transition-colors animate-bounce font-mono text-[10px] tracking-[0.15em] uppercase"
          >
            <span>SCROLL TO INSPECT PRODUCTION LINE</span>
            <svg className="w-3.5 h-3.5 stroke-2" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M12 4v16M6 14l6 6 6-6" />
            </svg>
          </a>
        </section>
      {/* 3. STATS BAR (PRODUCTION LINE) */}
        <section className="border-y border-white/5 bg-zinc-900/60 backdrop-blur-xl relative py-12 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2 font-mono text-[11px] text-zinc-400 uppercase tracking-widest">
                <span className="w-2 h-2 rounded-full bg-[#3B82F6]"></span>
                <span className="font-bold text-white">CONVEYOR METRICS // LIVE TELEMETRY</span>
              </div>
              <div className="font-mono text-[11px] text-[#F59E0B] uppercase tracking-widest">SPEED: 240 SCAN/MIN</div>
            </div>
      {/* Horizontal conveyor track */}
            <div className="relative w-full py-4">
              <div
                className="absolute top-1/2 left-0 right-0 h-0.5 animate-conveyor -translate-y-1/2 z-0"
                style={{
                  backgroundImage: "repeating-linear-gradient(90deg, #3B82F6 0px, #3B82F6 2px, transparent 2px, transparent 16px)",
                  backgroundSize: "32px 2px"
                }}
              ></div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 relative z-10">
      {/* Station 1 */}
                <div className="bg-zinc-900/40 backdrop-blur-md p-5 rounded-sm border border-[#3B82F6]/30 flex flex-col justify-between shadow-xl">
                  <div className="flex items-center justify-between text-[10px] font-mono text-zinc-500 mb-2 uppercase tracking-wider">
                    <span>STATION 01</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#3B82F6]"></span>
                  </div>
                  <div className="text-3xl font-black font-mono text-white tracking-tight">127+</div>
                  <div className="text-xs font-mono text-[#3B82F6] mt-1 uppercase tracking-wider font-bold">Eloquent Models</div>
                </div>
      {/* Station 2 */}
                <div className="bg-zinc-900/40 backdrop-blur-md p-5 rounded-sm border border-[#F59E0B]/30 flex flex-col justify-between shadow-xl">
                  <div className="flex items-center justify-between text-[10px] font-mono text-zinc-500 mb-2 uppercase tracking-wider">
                    <span>STATION 02</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B]"></span>
                  </div>
                  <div className="text-3xl font-black font-mono text-white tracking-tight">4</div>
                  <div className="text-xs font-mono text-[#F59E0B] mt-1 uppercase tracking-wider font-bold">Factories Scaled</div>
                </div>
      {/* Station 3 */}
                <div className="bg-zinc-900/40 backdrop-blur-md p-5 rounded-sm border border-[#3B82F6]/30 flex flex-col justify-between shadow-xl">
                  <div className="flex items-center justify-between text-[10px] font-mono text-zinc-500 mb-2 uppercase tracking-wider">
                    <span>STATION 03</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#3B82F6]"></span>
                  </div>
                  <div className="text-3xl font-black font-mono text-white tracking-tight">2,000+</div>
                  <div className="text-xs font-mono text-[#3B82F6] mt-1 uppercase tracking-wider font-bold">Daily Barcode Scans</div>
                </div>
      {/* Station 4 */}
                <div className="bg-zinc-900/40 backdrop-blur-md p-5 rounded-sm border border-[#3B82F6]/30 flex flex-col justify-between shadow-xl">
                  <div className="flex items-center justify-between text-[10px] font-mono text-zinc-500 mb-2 uppercase tracking-wider">
                    <span>STATION 04</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#3B82F6]"></span>
                  </div>
                  <div className="text-3xl font-black font-mono text-white tracking-tight">500+</div>
                  <div className="text-xs font-mono text-[#3B82F6] mt-1 uppercase tracking-wider font-bold">PDFs Generated/Mo</div>
                </div>
      {/* Station 5 */}
                <div className="bg-zinc-900/40 backdrop-blur-md p-5 rounded-sm border border-[#F59E0B]/30 flex flex-col justify-between shadow-xl">
                  <div className="flex items-center justify-between text-[10px] font-mono text-zinc-500 mb-2 uppercase tracking-wider">
                    <span>STATION 05</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B]"></span>
                  </div>
                  <div className="text-3xl font-black font-mono text-white tracking-tight">~90%</div>
                  <div className="text-xs font-mono text-[#F59E0B] mt-1 uppercase tracking-wider font-bold">Config Error Reduction</div>
                </div>
              </div>
            </div>

          </div>
        </section>
      {/* 4. PROJECTS ("SYSTEM ARCHITECTURE & DEPLOYMENTS") */}
        <section id="work" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 border-b border-white/5 pb-6">
            <div>
              <div className="font-mono text-[11px] text-[#3B82F6] uppercase tracking-[0.3em] mb-2">// SECTION 01 : PIPELINE ARCHITECTURE</div>
              <h2 className="text-3xl sm:text-5xl font-black font-sans tracking-tight text-white">System Architecture &amp; Deployments</h2>
            </div>
            <div className="font-mono text-[11px] text-zinc-500 mt-4 md:mt-0 uppercase tracking-widest flex items-center gap-2">
              <span>DOCUMENT CHAIN NODES: <strong className="text-white font-bold">04 ACTIVE</strong></span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative">
      {/* Card 1: STIT OPTIMA */}
            <div className="bg-zinc-900/40 backdrop-blur-md border border-white/5 hover:border-[#3B82F6]/40 p-7 rounded-sm flex flex-col justify-between relative group overflow-hidden shadow-2xl transition-all duration-300">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#3B82F6]/10 rounded-full blur-2xl group-hover:bg-[#3B82F6]/20 transition-all"></div>
              
              <div>
                <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-widest text-zinc-400 mb-4 border-b border-white/5 pb-3">
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#3B82F6] shadow-[0_0_8px_#3B82F6]"></span>
                    <span className="text-white font-bold">STIT OPTIMA</span>
                  </span>
                  <span className="text-[#3B82F6] font-bold">DEPLOYED // 2 FACTORIES</span>
                </div>

                <h3 className="text-2xl font-black font-sans text-white tracking-tight mb-3 group-hover:text-[#3B82F6] transition-colors">Core Enterprise ERP &amp; MES Platform</h3>
                <p className="text-zinc-400 font-mono text-xs uppercase tracking-wider leading-relaxed mb-6">
                  Custom-built enterprise resource planning and manufacturing execution system. Manages 8 distinct operational modules with 127+ Eloquent models, bridging real-time shop-floor tracking with executive planning.
                </p>

                <div className="flex flex-wrap gap-2 mb-8">
                  {["Laravel 10", "PHP 8.1", "Filament 3", "Livewire 3", "MySQL", "DomPDF"].map((item, i) => (
                    <span key={i} className="px-2 py-0.5 rounded-sm bg-white/5 border border-white/5 font-mono text-[10px] text-zinc-400 uppercase tracking-wider">
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-white/5 pt-4 font-mono text-[11px] uppercase tracking-widest">
                <a href="#" className="inline-flex items-center gap-1.5 text-[#3B82F6] hover:text-white transition-colors font-bold">
                  <span>VIEW LIVE TELEMETRY</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <button onClick={() => setStitOptimaModalOpen(true)} className="inline-flex items-center gap-1.5 text-[#3B82F6] hover:text-white transition-colors font-bold cursor-pointer">
                  <span>VIEW SCREENSHOTS</span>
                  <Eye className="w-3.5 h-3.5" />
                </button>
                <a href="#" className="inline-flex items-center gap-1.5 text-zinc-500 hover:text-white transition-colors font-bold">
                  <span>VIEW CODE</span>
                  <Code2 className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
      {/* Card 2: STIT PRO */}
            <div className="bg-zinc-900/40 backdrop-blur-md border border-white/5 hover:border-[#F59E0B]/40 p-7 rounded-sm flex flex-col justify-between relative group overflow-hidden shadow-2xl transition-all duration-300">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#F59E0B]/10 rounded-full blur-2xl group-hover:bg-[#F59E0B]/20 transition-all"></div>
              
              <div>
                <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-widest text-zinc-400 mb-4 border-b border-white/5 pb-3">
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#F59E0B] shadow-[0_0_8px_#F59E0B]"></span>
                    <span className="text-white font-bold">STIT PRO</span>
                  </span>
                  <span className="text-[#F59E0B] font-bold">AI VISION // 2,000+ SCANS/DAY</span>
                </div>

                <h3 className="text-2xl font-black font-sans text-white tracking-tight mb-3 group-hover:text-[#F59E0B] transition-colors">AI-Powered Barcode &amp; Inventory Recognition</h3>
                <p className="text-zinc-400 font-mono text-xs uppercase tracking-wider leading-relaxed mb-6">
                  Next-generation MES module powered by AI multimodal vision. Automates factory warehouse receiving, QR tracking, and defect identification with real-time hardware scanning integrations.
                </p>

                <div className="flex flex-wrap gap-2 mb-8">
                  {["Laravel 12", "Filament 5", "Groq API", "Llama 3.2 90B Vision"].map((item, i) => (
                    <span key={i} className="px-2 py-0.5 rounded-sm bg-white/5 border border-white/5 font-mono text-[10px] text-zinc-400 uppercase tracking-wider">
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-white/5 pt-4 font-mono text-[11px] uppercase tracking-widest">
                <a href="#" className="inline-flex items-center gap-1.5 text-[#F59E0B] hover:text-white transition-colors font-bold">
                  <span>VIEW LIVE TELEMETRY</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <a href="#" className="inline-flex items-center gap-1.5 text-zinc-500 hover:text-white transition-colors font-bold">
                  <span>VIEW CODE</span>
                  <Code2 className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
      {/* Card 3: Smartdoors Tunisia */}
            <div className="bg-zinc-900/40 backdrop-blur-md border border-white/5 hover:border-[#3B82F6]/40 p-7 rounded-sm flex flex-col justify-between relative group overflow-hidden shadow-2xl transition-all duration-300">
              <div>
                <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-widest text-zinc-400 mb-4 border-b border-white/5 pb-3">
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#3B82F6]"></span>
                    <span className="text-white font-bold">SMARTDOORS TUNISIA</span>
                  </span>
                  <span className="text-zinc-400 font-bold">MULTI-LINGUAL E-COMMERCE</span>
                </div>

                <h3 className="text-2xl font-black font-sans text-white tracking-tight mb-3 group-hover:text-[#3B82F6] transition-colors">Modern Tri-lingual Industrial Showroom</h3>
                <p className="text-zinc-400 font-mono text-xs uppercase tracking-wider leading-relaxed mb-6">
                  High-performance web portal built with React 19 and Tailwind CSS v4. Features full multi-language localization (FR / AR / EN), interactive architectural door visualizers, and strict SEO optimization.
                </p>

                <div className="flex flex-wrap gap-2 mb-8">
                  {["React 19", "TypeScript", "Tailwind CSS v4", "Supabase", "Framer Motion"].map((item, i) => (
                    <span key={i} className="px-2 py-0.5 rounded-sm bg-white/5 border border-white/5 font-mono text-[10px] text-zinc-400 uppercase tracking-wider">
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-white/5 pt-4 font-mono text-[11px] uppercase tracking-widest">
                <a href="#" className="inline-flex items-center gap-1.5 text-[#3B82F6] hover:text-white transition-colors font-bold">
                  <span>VIEW LIVE PORTAL</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <a href="#" className="inline-flex items-center gap-1.5 text-zinc-500 hover:text-white transition-colors font-bold">
                  <span>VIEW CODE</span>
                  <Code2 className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
      {/* Card 4: Cash Flow Tracker */}
            <div className="bg-zinc-900/40 backdrop-blur-md border border-white/5 hover:border-[#10B981]/40 p-7 rounded-sm flex flex-col justify-between relative group overflow-hidden shadow-2xl transition-all duration-300">
              <div>
                <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-widest text-zinc-400 mb-4 border-b border-white/5 pb-3">
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#10B981]"></span>
                    <span className="text-white font-bold">CASH FLOW TRACKER</span>
                  </span>
                  <span className="text-[#10B981] font-bold">TREASURY BOT ALERTING</span>
                </div>

                <h3 className="text-2xl font-black font-sans text-white tracking-tight mb-3 group-hover:text-[#10B981] transition-colors">Automated Treasury &amp; Bot Alerting Platform</h3>
                <p className="text-zinc-400 font-mono text-xs uppercase tracking-wider leading-relaxed mb-6">
                  Automated personal finance and liquidity management system. Connects backend ledger calculations directly to Telegram bots for instant low-threshold warnings and daily cash flow digests.
                </p>

                <div className="flex flex-wrap gap-2 mb-8">
                  {["Laravel", "Telegram Bot API", "Queue Workers", "Cron Automation"].map((item, i) => (
                    <span key={i} className="px-2 py-0.5 rounded-sm bg-white/5 border border-white/5 font-mono text-[10px] text-zinc-400 uppercase tracking-wider">
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-white/5 pt-4 font-mono text-[11px] uppercase tracking-widest">
                <a href="#" className="inline-flex items-center gap-1.5 text-[#10B981] hover:text-white transition-colors font-bold">
                  <span>VIEW LIVE BOT</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <a href="#" className="inline-flex items-center gap-1.5 text-zinc-500 hover:text-white transition-colors font-bold">
                  <span>VIEW CODE</span>
                  <Code2 className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

          </div>
        </section>
      {/* 5. EXPERIENCE TIMELINE */}
        <section id="experience" className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative">
          <div className="mb-16 border-b border-white/5 pb-6">
            <div className="font-mono text-[11px] text-[#3B82F6] uppercase tracking-[0.3em] mb-2">// SECTION 02 : INDUSTRIAL TRACK RECORD</div>
            <h2 className="text-3xl sm:text-5xl font-black font-sans tracking-tight text-white">Experience Timeline</h2>
          </div>

          <div className="relative pl-6 sm:pl-10 border-l border-white/10 my-8">
            <div className="absolute top-0 left-0 w-[1px] bg-gradient-to-b from-[#3B82F6] via-[#F59E0B] to-zinc-800 h-full opacity-80"></div>

            <div className="mb-16 relative">
              <div className="absolute -left-[31px] sm:-left-[45px] top-2 w-3.5 h-3.5 rounded-full bg-[#0A0A0B] border-2 border-[#3B82F6] flex items-center justify-center shadow-[0_0_12px_#3B82F6]">
                <div className="w-1.5 h-1.5 rounded-full bg-[#3B82F6]"></div>
              </div>

              <div className="bg-zinc-900/40 backdrop-blur-md p-6 sm:p-8 rounded-sm border border-[#3B82F6]/30 shadow-xl">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between font-mono text-[11px] uppercase tracking-widest mb-3">
                  <span className="text-[#3B82F6] font-bold">NOV 2023 – PRESENT</span>
                  <span className="px-2 py-0.5 rounded-sm bg-[#3B82F6]/10 text-[#3B82F6] border border-[#3B82F6]/30 w-max mt-2 sm:mt-0 font-bold">CURRENT LEAD ROLE</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black font-sans text-white tracking-tight mb-1">ERP Software Engineer → IT &amp; Production Coordinator</h3>
                <div className="text-xs font-mono font-bold text-[#F59E0B] uppercase tracking-wider mb-4">STIT (Société Tunisienne d'Impression sur Textile) // Sousse, Tunisia</div>
                <p className="text-zinc-400 font-mono text-xs uppercase tracking-wider leading-relaxed">
                  Sole engineer scaling factory-floor software from 1 to 4 industrial facilities. Managing entire IT infrastructure and coordinating production data flows. Built custom MES modules replacing paper manufacturing orders, reducing human error by ~90% and generating 500+ daily barcodes and shipping manifests.
                </p>
              </div>
            </div>

            <div className="mb-16 relative">
              <div className="absolute -left-[31px] sm:-left-[45px] top-2 w-3.5 h-3.5 rounded-full bg-[#0A0A0B] border-2 border-zinc-600 flex items-center justify-center"></div>

              <div className="bg-zinc-900/40 backdrop-blur-md p-6 sm:p-8 rounded-sm border border-white/5 hover:border-white/20 transition-all shadow-xl">
                <div className="font-mono text-[11px] uppercase tracking-widest text-zinc-500 mb-3 font-bold">MAY 2023 – OCT 2023</div>
                <h3 className="text-xl sm:text-2xl font-black font-sans text-white tracking-tight mb-1">Full-Stack Laravel Developer</h3>
                <div className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-wider mb-4">HyperGroup</div>
                <p className="text-zinc-400 font-mono text-xs uppercase tracking-wider leading-relaxed">
                  Developed robust backend systems and intuitive frontend interfaces using the Laravel ecosystem. Optimized SQL queries, designed clean RESTful endpoints, and accelerated client portal responsiveness.
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -left-[31px] sm:-left-[45px] top-2 w-3.5 h-3.5 rounded-full bg-[#0A0A0B] border-2 border-zinc-700 flex items-center justify-center"></div>

              <div className="bg-zinc-900/40 backdrop-blur-md p-6 sm:p-8 rounded-sm border border-white/5 hover:border-white/20 transition-all shadow-xl">
                <div className="font-mono text-[11px] uppercase tracking-widest text-zinc-500 mb-3 font-bold">OCT 2021 – JUN 2022</div>
                <h3 className="text-xl sm:text-2xl font-black font-sans text-white tracking-tight mb-1">.NET Developer Intern</h3>
                <div className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-wider mb-4">Naxxum Group</div>
                <p className="text-zinc-400 font-mono text-xs uppercase tracking-wider leading-relaxed">
                  Assisted in developing enterprise .NET applications and gained foundational software engineering practices, C# architecture patterns, and structured SQL relational database modeling.
                </p>
              </div>
            </div>

          </div>
        </section>
      {/* 6. SKILLS (CONTROL SWITCH PANELS + MARQUEE) */}
        <section id="skills" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative overflow-hidden">
          <div className="mb-12 border-b border-white/5 pb-6">
            <div className="font-mono text-[11px] text-[#3B82F6] uppercase tracking-[0.3em] mb-2">// SECTION 03 : INDUSTRIAL CONTROL MODULES</div>
            <h2 className="text-3xl sm:text-5xl font-black font-sans tracking-tight text-white">Engineering Control Panel</h2>
          </div>

          <div className="w-full overflow-hidden bg-zinc-900/40 backdrop-blur-md py-4 mb-14 rounded-sm border border-white/5 shadow-inner">
            <div className="animate-marquee flex items-center gap-12 font-mono text-sm font-bold tracking-widest text-zinc-400">
              <span className="text-white">LARAVEL 12</span> <span>•</span>
              <span className="text-[#3B82F6]">FILAMENT 5</span> <span>•</span>
              <span className="text-[#F59E0B]">LIVEWIRE 3</span> <span>•</span>
              <span className="text-white">PHP 8.3</span> <span>•</span>
              <span className="text-[#3B82F6]">GROQ VISION AI</span> <span>•</span>
              <span className="text-white">REACT 19</span> <span>•</span>
              <span className="text-[#F59E0B]">TAILWIND CSS v4</span> <span>•</span>
              <span className="text-white">MYSQL ENTERPRISE</span> <span>•</span>
              <span className="text-[#3B82F6]">BARCODE / QR ENGINE</span> <span>•</span>
              <span className="text-white">LARAVEL 12</span> <span>•</span>
              <span className="text-[#3B82F6]">FILAMENT 5</span> <span>•</span>
              <span className="text-[#F59E0B]">LIVEWIRE 3</span> <span>•</span>
              <span className="text-white">PHP 8.3</span> <span>•</span>
              <span className="text-[#3B82F6]">GROQ VISION AI</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            <div className="bg-zinc-900/40 backdrop-blur-md p-6 rounded-sm border border-white/5 shadow-xl">
              <div className="flex items-center justify-between font-mono text-[11px] font-bold uppercase tracking-wider text-[#3B82F6] mb-4 pb-2 border-b border-white/5">
                <span>RACK 01 // BACKEND ARCHITECTURE</span>
                <span className="w-2 h-2 rounded-full bg-[#3B82F6]"></span>
              </div>
              <div className="flex flex-wrap gap-2.5">
                {["PHP 8+", "LARAVEL 10 / 12", "FILAMENT 3 / 5", "LIVEWIRE 3", ".NET (BASIC)"].map((sk, i) => (
                  <div key={i} className="px-3.5 py-2.5 rounded-sm bg-[#0A0A0B] border border-[#3B82F6]/30 hover:border-[#3B82F6] text-white font-mono text-[11px] uppercase tracking-wider flex items-center gap-2 cursor-default shadow">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#3B82F6]"></span>
                    <span>{sk}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-zinc-900/40 backdrop-blur-md p-6 rounded-sm border border-white/5 shadow-xl">
              <div className="flex items-center justify-between font-mono text-[11px] font-bold uppercase tracking-wider text-[#F59E0B] mb-4 pb-2 border-b border-white/5">
                <span>RACK 02 // FRONTEND &amp; UI</span>
                <span className="w-2 h-2 rounded-full bg-[#F59E0B]"></span>
              </div>
              <div className="flex flex-wrap gap-2.5">
                {["REACT 19", "TYPESCRIPT", "TAILWIND CSS v4", "FRAMER MOTION", "HTML / CSS / JS"].map((sk, i) => (
                  <div key={i} className="px-3.5 py-2.5 rounded-sm bg-[#0A0A0B] border border-[#F59E0B]/30 hover:border-[#F59E0B] text-white font-mono text-[11px] uppercase tracking-wider flex items-center gap-2 cursor-default shadow">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B]"></span>
                    <span>{sk}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-zinc-900/40 backdrop-blur-md p-6 rounded-sm border border-white/5 shadow-xl">
              <div className="flex items-center justify-between font-mono text-[11px] font-bold uppercase tracking-wider text-[#3B82F6] mb-4 pb-2 border-b border-white/5">
                <span>RACK 03 // DATABASES &amp; STORAGE</span>
                <span className="w-2 h-2 rounded-full bg-[#3B82F6]"></span>
              </div>
              <div className="flex flex-wrap gap-2.5">
                {["MYSQL ENTERPRISE", "SUPABASE"].map((sk, i) => (
                  <div key={i} className="px-3.5 py-2.5 rounded-sm bg-[#0A0A0B] border border-[#3B82F6]/30 hover:border-[#3B82F6] text-white font-mono text-[11px] uppercase tracking-wider flex items-center gap-2 cursor-default shadow">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#3B82F6]"></span>
                    <span>{sk}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-zinc-900/40 backdrop-blur-md p-6 rounded-sm border border-white/5 shadow-xl">
              <div className="flex items-center justify-between font-mono text-[11px] font-bold uppercase tracking-wider text-[#F59E0B] mb-4 pb-2 border-b border-white/5">
                <span>RACK 04 // AI &amp; AUTOMATION</span>
                <span className="w-2 h-2 rounded-full bg-[#F59E0B]"></span>
              </div>
              <div className="flex flex-wrap gap-2.5">
                {["GROQ API", "LLAMA 3.2 90B VISION", "TELEGRAM BOT API"].map((sk, i) => (
                  <div key={i} className="px-3.5 py-2.5 rounded-sm bg-[#0A0A0B] border border-[#F59E0B]/30 hover:border-[#F59E0B] text-white font-mono text-[11px] uppercase tracking-wider flex items-center gap-2 cursor-default shadow">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B]"></span>
                    <span>{sk}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-zinc-900/40 backdrop-blur-md p-6 rounded-sm border border-white/5 md:col-span-2 lg:col-span-2 shadow-xl">
              <div className="flex items-center justify-between font-mono text-[11px] font-bold uppercase tracking-wider text-[#3B82F6] mb-4 pb-2 border-b border-white/5">
                <span>RACK 05 // DEVOPS &amp; DOCUMENT PIPELINES</span>
                <span className="w-2 h-2 rounded-full bg-[#3B82F6]"></span>
              </div>
              <div className="flex flex-wrap gap-2.5">
                {["GIT VERSION CONTROL", "DOMPDF (500+ MANIFESTS/MO)", "LINUX / SERVER DEPLOYMENT", "BARCODE / QR HARDWARE INTEGRATION"].map((sk, i) => (
                  <div key={i} className="px-3.5 py-2.5 rounded-sm bg-[#0A0A0B] border border-[#3B82F6]/30 hover:border-[#3B82F6] text-white font-mono text-[11px] uppercase tracking-wider flex items-center gap-2 cursor-default shadow">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#3B82F6]"></span>
                    <span>{sk}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </section>
      {/* 7. CONTACT SECTION */}
        <section id="contact" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28 relative overflow-hidden">
          <div className="border-t border-white/5 pt-16 flex flex-col items-center text-center relative">
            {/* Background Watermark from Professional Polish Design HTML */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[80px] sm:text-[140px] font-black leading-[0.8] tracking-tighter opacity-[0.06] select-none pointer-events-none whitespace-nowrap text-white">
              LET'S BUILD SOMETHING.
            </div>

            <div className="font-mono text-[11px] text-[#3B82F6] uppercase tracking-[0.3em] mb-6 font-bold">// TRANSMISSION CHANNEL ACTIVE</div>
            
            <h2 className="text-6xl sm:text-8xl md:text-9xl lg:text-[10rem] font-black font-sans tracking-tighter text-white leading-none -mx-4 sm:-mx-12 select-none hover:text-[#3B82F6] transition-colors duration-500 relative z-10">
              Let's build something.
            </h2>

            <p className="mt-8 text-base sm:text-lg font-mono text-zinc-400 max-w-xl uppercase tracking-wider relative z-10">
              Available for enterprise ERP scaling, custom MES architecture, AI barcode integration, and Laravel consulting.
            </p>

            <div className="flex items-center justify-center gap-6 mt-12 relative z-10">
              <a
                href="mailto:mohamedmoezchallouf@gmail.com"
                aria-label="Send Email"
                className="w-14 h-14 rounded-sm bg-zinc-900/60 border border-white/10 hover:border-[#3B82F6] hover:bg-[#3B82F6] flex items-center justify-center text-white shadow-xl hover:shadow-[0_0_30px_rgba(59,130,246,0.4)] transition-all"
              >
                <Mail className="w-6 h-6 stroke-1.5" />
              </a>

              <a
                href="https://linkedin.com/in/moezchallouf"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
                className="w-14 h-14 rounded-sm bg-zinc-900/60 border border-white/10 hover:border-[#0077B5] hover:bg-[#0077B5] flex items-center justify-center text-white shadow-xl hover:shadow-[0_0_30px_rgba(0,119,181,0.4)] transition-all"
              >
                <Linkedin className="w-6 h-6 stroke-1.5" />
              </a>

              <a
                href="https://github.com/moezchallouf"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Profile"
                className="w-14 h-14 rounded-sm bg-zinc-900/60 border border-white/10 hover:border-white hover:bg-white hover:text-black flex items-center justify-center text-white shadow-xl hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] transition-all"
              >
                <Github className="w-6 h-6 stroke-1.5" />
              </a>
            </div>
          </div>
        </section>

      </main>
      {/* 8. FOOTER */}
      <footer className="border-t border-white/5 bg-zinc-900/80 backdrop-blur-md py-8 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[11px] uppercase tracking-widest text-zinc-400">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#3B82F6]"></span>
            <span className="text-white font-bold">MOHAMED MOEZ CHALLOUF</span>
            <span>// SOUSSE, TUNISIA</span>
          </div>
          <div className="tracking-widest font-bold text-[#3B82F6]">
            ENGINEERED FOR PRECISION.
          </div>
          <div className="flex items-center gap-6 font-bold">
            <a href="mailto:mohamedmoezchallouf@gmail.com" className="hover:text-white transition-colors">EMAIL</a>
            <a href="https://linkedin.com/in/moezchallouf" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">LINKEDIN</a>
            <a href="https://github.com/moezchallouf" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">GITHUB</a>
          </div>
        </div>
      </footer>
      {/* AI MES ARCHITECTURE CONSULTANT MODAL (HIGH THINKING MODE) */}
      {aiModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 font-mono">
          <div className="bg-zinc-900/90 backdrop-blur-xl border border-[#3B82F6]/50 rounded-sm w-full max-w-3xl h-[80vh] flex flex-col shadow-[0_0_50px_rgba(59,130,246,0.25)] overflow-hidden">
            <div className="p-4 border-b border-white/10 flex items-center justify-between bg-[#0A0A0B]">
              <div className="flex items-center gap-2">
                <Bot className="w-5 h-5 text-[#3B82F6]" />
                <span className="text-xs font-bold text-white uppercase tracking-wider">AI MES ARCHITECT // GEMINI 3.1 PRO (HIGH THINKING)</span>
              </div>
              <button onClick={() => setAiModalOpen(false)} className="text-neutral-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-4 font-mono text-xs">
              {aiMessages.map((m, idx) => (
                <div
                  key={idx}
                  className={`p-4 rounded-sm max-w-[85%] leading-relaxed ${
                    m.role === "user"
                      ? "ml-auto bg-[#3B82F6] text-white"
                      : "mr-auto bg-zinc-900/60 border border-white/10 text-neutral-200"
                  }`}
                >
                  <div className="text-[10px] uppercase font-bold tracking-wider mb-1 opacity-70">
                    {m.role === "user" ? "INSPECTOR / CLIENT" : "M.M.CHALLOUF AI TWIN"}
                  </div>
                  <div className="whitespace-pre-wrap font-sans text-sm">{m.text}</div>
                </div>
              ))}
              {aiLoading && (
                <div className="mr-auto bg-zinc-900/60 border border-[#3B82F6]/40 p-4 rounded-sm flex items-center gap-3 text-[#3B82F6]">
                  <Loader2 className="w-4 h-4 animate-spin text-[#3B82F6]" />
                  <span className="font-bold">ANALYZING MES ARCHITECTURE (HIGH THINKING REASONING IN PROGRESS)...</span>
                </div>
              )}
            </div>

            <form onSubmit={handleSendAiQuery} className="p-4 border-t border-white/10 bg-[#0A0A0B] flex gap-2">
              <input
                type="text"
                value={aiQuery}
                onChange={(e) => setAiQuery(e.target.value)}
                placeholder="Ask about Laravel 12 scaling, AI barcode vision, 4-factory sync..."
                className="flex-1 bg-white/5 border border-white/10 rounded-sm px-4 py-2.5 text-xs text-white uppercase font-mono focus:outline-none focus:border-[#3B82F6]"
              />
              <button
                type="submit"
                disabled={aiLoading}
                className="px-5 py-2.5 rounded-sm bg-[#3B82F6] hover:bg-[#2563EB] disabled:opacity-50 text-white font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-2"
              >
                <span>SEND</span>
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}

      {/* STIT OPTIMA SCREENSHOTS GALLERY MODAL */}
      {stitOptimaModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 font-mono">
          <div className="bg-zinc-900/90 backdrop-blur-xl border border-[#3B82F6]/50 rounded-sm w-full max-w-6xl h-[90vh] flex flex-col shadow-[0_0_50px_rgba(59,130,246,0.25)] overflow-hidden">
            <div className="p-4 border-b border-white/10 flex items-center justify-between bg-[#0A0A0B] flex-shrink-0">
              <div className="flex items-center gap-2">
                <Eye className="w-5 h-5 text-[#3B82F6]" />
                <span className="text-xs font-bold text-white uppercase tracking-wider">STIT OPTIMA // SYSTEM SCREENSHOTS</span>
                <span className="ml-2 px-2 py-0.5 rounded-sm bg-[#3B82F6]/10 border border-[#3B82F6]/30 text-[#3B82F6] text-[10px]">{stitOptimaImages.length} IMAGES</span>
              </div>
              <button onClick={() => setStitOptimaModalOpen(false)} className="text-neutral-400 hover:text-white cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {stitOptimaImages.map((src, idx) => (
                  <div
                    key={idx}
                    className="group relative rounded-sm overflow-hidden border border-white/5 hover:border-[#3B82F6]/50 bg-zinc-950 shadow-xl transition-colors"
                  >
                    <img
                      src={src}
                      alt={`STIT OPTIMA Screenshot ${idx + 1}`}
                      className="w-full h-auto object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                      loading="lazy"
                    />
                    <div className="absolute top-2 right-2 px-1.5 py-0.5 rounded-sm bg-black/60 backdrop-blur-sm text-[10px] text-zinc-400 font-mono border border-white/10">
                      {String(idx + 1).padStart(2, "0")}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
