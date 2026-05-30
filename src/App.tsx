import { useState, useEffect, FormEvent } from "react";
import { 
  User, 
  Award, 
  Flame, 
  HelpCircle, 
  Sparkles, 
  ChevronRight, 
  Mail, 
  Github, 
  Youtube, 
  Linkedin, 
  Instagram, 
  Globe, 
  Heart, 
  CheckCircle,
  Clock,
  ArrowRight,
  BookOpen,
  Laptop,
  Users,
  Video,
  MapPin,
  Check,
  Menu,
  X,
  ExternalLink,
  ShieldCheck,
  ArrowUpRight,
  ChevronDown,
  Sun,
  Moon
} from "lucide-react";
import { StudentProfile } from "./types";
import { defaultStudentProfile } from "./data";
import LiveOpportunities from "./components/LiveOpportunities";
import ProofOfImpact from "./components/ProofOfImpact";
import Chatbot from "./components/Chatbot";
import { motion, AnimatePresence } from "motion/react";
// @ts-ignore
import logoImg from "./assets/images/backtobase_logo_1780074332267.png";

export default function App() {
  const [activeTab, setActiveTab] = useState<"home">("home");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [studentProfile, setStudentProfile] = useState<StudentProfile>(defaultStudentProfile);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

  // States for "Whether You Are" Interactive Grid
  const [selectedRole, setSelectedRole] = useState<"developer" | "creator" | "designer" | "entrepreneur" | "speaker">("developer");

  // Registration Form Inputs for join modal
  const [regName, setRegName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regCollege, setRegCollege] = useState("");
  const [regRole, setRegRole] = useState("developer");
  const [regGithub, setRegGithub] = useState("");
  const [isSubmittingReg, setIsSubmittingReg] = useState(false);

  // Persistent both light & dark theme states
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem("b2b_theme");
    return saved !== "light"; // default to dark cosmic theme
  });

  // Dynamic Simulated console feeds for high-fidelity professional vibes
  const [logFeed, setLogFeed] = useState<{ time: string; node: string; event: string }[]>([
    { time: "15:04", node: "SNIST Base", event: "Vennela A. completed Git staging task" },
    { time: "15:12", node: "JNTUH Node", event: "Sai Kumar registered for 'WHY WHERE WHEN AI' session" },
    { time: "15:28", node: "Google Node", event: "Ananya Rao updated active scheduler availability" },
    { time: "15:35", node: "VNR Base", event: "Deepak Joshi pushed dynamic workspace routes" },
  ]);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
    } else {
      document.documentElement.classList.add("light");
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("b2b_theme", isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  useEffect(() => {
    const feeds = [
      { node: "SNIST Base", event: "Varun R. initiated dynamic model packaging wrapper" },
      { node: "VNR Node", event: "Priyanjali S. scaled streak counter to 14 days" },
      { node: "T-Hub Hyd", event: "Rahul Verma approved 1-on-1 code showcase review" },
      { node: "JNTUH Base", event: "Sandeep M. cloned custom Docker node script" },
      { node: "SNIST Node", event: "Vennela A. activated cryptographically signed badge" },
      { node: "B2B Server", event: "Pushed verified talent profile to regional directory" }
    ];

    const interval = setInterval(() => {
      const now = new Date();
      const timeStr = `${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}:${now.getSeconds().toString().padStart(2, "0")}`;
      const randomFeed = feeds[Math.floor(Math.random() * feeds.length)];
      setLogFeed((prev) => [
        { time: timeStr, node: randomFeed.node, event: randomFeed.event },
        ...prev.slice(0, 3)
      ]);
    }, 4500);

    return () => clearInterval(interval);
  }, []);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // Synchronized Event Registration handler
  const handleRegisterSuccess = (eventTitle: string, eventId: string) => {
    const exists = studentProfile.history.some((h) => h.eventId === eventId);
    if (exists) {
      triggerToast(`You are already registered for "${eventTitle}"!`);
      return;
    }

    const updatedProfile: StudentProfile = {
      ...studentProfile,
      history: [
        ...studentProfile.history,
        {
          eventId,
          eventTitle,
          date: new Date().toISOString().split("T")[0],
          status: "registered"
        }
      ]
    };
    setStudentProfile(updatedProfile);
    triggerToast(`Got you, Vennela! Secure entry code generated for "${eventTitle}". Passed successfully to Workspace.`);
  };

  // Synchronized Profile Update handler
  const handleUpdateProfile = (updated: StudentProfile) => {
    setStudentProfile(updated);
    triggerToast("Workspace learning profile synced successfully!");
  };

  const handleScrollToId = (elementId: string) => {
    setActiveTab("home");
    setTimeout(() => {
      const el = document.getElementById(elementId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 100);
  };

  // Handle Joining from Modal Form
  const handleJoinEcosystemSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!regName || !regEmail || !regCollege) {
      triggerToast("Please fill in your name, email, and college/base.");
      return;
    }

    setIsSubmittingReg(true);
    setTimeout(() => {
      const updatedProfile: StudentProfile = {
        ...studentProfile,
        name: regName,
        email: regEmail,
        college: regCollege,
        bio: `Eager ${regRole} looking to learn by doing. Joined BackToBase Base station! GitHub username: ${regGithub || "N/A"}`,
        streakCount: studentProfile.streakCount + 1, // incremental streak encouragement!
        streakHistory: [...studentProfile.streakHistory, new Date().toISOString().split("T")[0]],
      };
      setStudentProfile(updatedProfile);
      setIsSubmittingReg(false);
      setIsRegisterModalOpen(false);
      triggerToast(`Welcome to the Ecosystem, ${regName}! You have joined BackToBase dynamically.`);
    }, 1200);
  };

  // FAQ Array
  const rawFaqs = [
    {
      k: "What is BackToBase?",
      v: "BackToBase is a borderless mentorship hub and platform connecting active industry professionals with college students, helping them transition practical knowledge into active projects and global professional opportunities."
    },
    {
      k: "Who can attend BackToBase sessions?",
      v: "Any college student, whether in Tech, Design, or Content, is welcome! We design events to demystify complex systems and bridge academic gaps."
    },
    {
      k: "Is there any cost associated?",
      v: "No. Our mentorship sessions, offline campus meets, and core online opportunities are fully sponsored and structured to support talented students."
    },
    {
      k: "How can I seek support or learn by doing?",
      v: "By listing your active products, testing custom codebases with our chatbot, and attending live events. Registered students receive continuous support and code audits from our returning alumni nodes."
    }
  ];

  return (
    <div className="min-h-screen cosmic-gradient-flow text-zinc-100 flex flex-col font-sans selection:bg-cyan-500/35 transition-colors duration-300 relative">
      
      {/* CSS Animations & Cosmic Variables */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: flex;
          width: max-content;
          animation: marquee 35s linear infinite;
        }
        .cosmic-gradient-flow {
          background: #000000 !important;
        }
        .cosmic-grid-overlay {
          background-image: 
            linear-gradient(rgba(244, 246, 255, 0.012) 1px, transparent 1px),
            linear-gradient(90deg, rgba(244, 246, 255, 0.012) 1px, transparent 1px);
          background-size: 30px 30px;
        }
        .hero-spotlight {
          background: transparent;
        }
        /* Continuous pipeline connector track */
        .pipeline-line {
          width: 2px;
          background: linear-gradient(180deg, rgba(6, 182, 212, 0.5) 0%, rgba(99, 102, 241, 0.2) 25%, rgba(139, 92, 246, 0.1) 60%, transparent 100%);
        }
        /* Light Theme overrides targeting parent light class if toggled */
        .light .cosmic-gradient-flow,
        .light.cosmic-gradient-flow {
          background: linear-gradient(180deg, #f6f8fa 0%, #ffffff 15%, #ffffff 100%) !important;
          color: #24292f !important;
        }
        .light .cosmic-grid-overlay {
          background-image: 
            linear-gradient(rgba(15, 23, 42, 0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(15, 23, 42, 0.025) 1px, transparent 1px) !important;
          background-size: 24px 24px;
        }
        .light .hero-spotlight {
          background: radial-gradient(circle at 50% -20%, rgba(9, 105, 218, 0.08) 0%, rgba(139, 92, 246, 0.03) 50%, transparent 80%) !important;
        }
        .glow-cyan {
          box-shadow: 0 0 45px rgba(6, 182, 212, 0.22);
        }
        .glow-text-cyan {
          text-shadow: 0 0 15px rgba(6, 182, 212, 0.6);
        }
        .glass-card-premium {
          background: rgba(13, 16, 23, 0.65);
          backdrop-filter: blur(16px);
          border: 1px solid rgba(255, 255, 255, 0.035);
          box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.3);
        }
        .light .glass-card-premium {
          background: rgba(255, 255, 255, 0.8) !important;
          border: 1px solid rgba(15, 23, 42, 0.06) !important;
          box-shadow: 0 8px 32px 0 rgba(15, 23, 42, 0.04) !important;
        }
        .badge-premium-glow {
          background: rgba(6, 182, 212, 0.08);
          border: 1px solid rgba(6, 182, 212, 0.15);
          box-shadow: 0 0 14px rgba(6, 182, 212, 0.1);
        }
      `}</style>



      {/* Toast Alert Banner */}
      {toastMessage && (
        <div id="toast-banner" className="fixed top-24 right-6 z-50 max-w-sm bg-zinc-950 text-zinc-100 p-4 rounded-2xl shadow-2xl border border-cyan-500/20 flex items-start gap-3 animate-in fade-in-50 slide-in-from-top-4 duration-300">
          <CheckCircle className="h-5 w-5 text-cyan-400 shrink-0 mt-0.5" />
          <div>
            <p className="text-xs font-semibold leading-normal font-sans">{toastMessage}</p>
          </div>
        </div>
      )}

      {/* Translucent Cosmic Header */}
      <header className="sticky top-0 z-40 bg-zinc-950/75 backdrop-blur-md border-b border-zinc-850">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          {/* Logo Brand matching the precise B2B Legends Upgrade image representation */}
          <button 
            onClick={() => setActiveTab("home")}
            className="flex items-center justify-center cursor-pointer group transition-all duration-300 py-1"
          >
            <img 
              src={logoImg} 
              alt="Back to Base: Legends Upgrade" 
              className="h-11 sm:h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              referrerPolicy="no-referrer"
            />
          </button>

          {/* Clean Navigation Links mapped around core concepts */}
          <nav className="hidden lg:flex items-center gap-6 text-xs font-medium font-mono">
            {[
              { id: "about", text: "Why BackToBase?" },
              { id: "divein", text: "Interactive Guide" },
              { id: "events", text: "Upcoming Events" },
              { id: "gallery", text: "Impact Gallery" },
              { id: "faq", text: "FAQ Desk" }
            ].map((link) => (
              <button
                key={link.id}
                onClick={() => handleScrollToId(link.id)}
                className="text-zinc-400 hover:text-cyan-400 py-1 transition-all duration-200 cursor-pointer relative group flex items-center"
              >
                <span>{link.text}</span>
                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-cyan-400 scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
              </button>
            ))}
          </nav>

          {/* Action Area: Register Popup Trigger */}
          <div className="flex items-center gap-2">
            {/* Theme Toggle Button */}
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 rounded-xl bg-zinc-950 border border-zinc-850 hover:bg-zinc-900 transition-colors text-zinc-300 hover:text-cyan-400 cursor-pointer flex items-center justify-center h-9 w-9"
              title={isDarkMode ? "Toggle Light Theme" : "Toggle Dark Theme"}
            >
              {isDarkMode ? (
                <Sun className="h-4 w-4 text-amber-500 animate-pulse" />
              ) : (
                <Moon className="h-4 w-4 text-cyan-500" />
              )}
            </button>

            {/* Mobile Menu Burger Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-xl bg-zinc-950 border border-zinc-850 hover:bg-zinc-900 transition-colors text-zinc-300 hover:text-cyan-400 cursor-pointer flex items-center justify-center h-9 w-9 lg:hidden ml-1"
              title="Toggle Menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-4 w-4" />
              ) : (
                <Menu className="h-4 w-4" />
              )}
            </button>

            <button
              onClick={() => setIsRegisterModalOpen(true)}
              className="relative hidden sm:inline-flex h-9 items-center justify-center rounded-xl bg-cyan-500 hover:bg-cyan-400 px-4 text-xs font-mono font-bold text-zinc-950 transition-all duration-300 shadow-md hover:shadow-lg shadow-cyan-500/20 active:scale-95 cursor-pointer glow-cyan"
            >
              Secure Entry
            </button>
          </div>

        </div>

        {/* Mobile Dropdown Menu Drawer */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden w-full bg-zinc-950/95 border-t border-zinc-850 backdrop-blur-md overflow-hidden"
            >
              <div className="px-5 py-6 space-y-3.5 flex flex-col font-mono text-xs">
                {[
                  { id: "about", text: "Why BackToBase?" },
                  { id: "divein", text: "Interactive Guide" },
                  { id: "events", text: "Upcoming Events" },
                  { id: "gallery", text: "Impact Gallery" },
                  { id: "faq", text: "FAQ Desk" }
                ].map((link) => (
                  <button
                    key={link.id}
                    onClick={() => {
                      handleScrollToId(link.id);
                      setIsMobileMenuOpen(false);
                    }}
                    className="text-left py-3 px-4 rounded-xl text-zinc-300 hover:text-cyan-400 bg-zinc-900/40 border border-transparent hover:border-zinc-800 transition-all cursor-pointer flex items-center justify-between"
                  >
                    <span>{link.text}</span>
                    <ChevronRight className="h-3 w-3 text-zinc-500" />
                  </button>
                ))}
                
                <div className="pt-4 border-t border-zinc-900 flex flex-col gap-3">
                  <button
                    onClick={() => {
                      setIsRegisterModalOpen(true);
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full py-3.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-zinc-950 font-bold font-mono text-xs transition duration-300 glow-cyan text-center flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>Secure Entry</span>
                    <ArrowRight className="h-3.5 w-3.5 text-zinc-950" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Top Scrolling Announcement Ticker */}
      <div className="w-full bg-zinc-900 border-b border-zinc-800/80 text-[11px] font-mono py-1.5 overflow-hidden text-cyan-400 select-none z-30">
        <div className="animate-marquee gap-8">
          <div className="flex gap-8 items-center pr-8">
            <span className="flex items-center gap-1.5 text-amber-400">
              <Sparkles className="h-3 w-3 animate-spin" /> UPDATE:
            </span>
            <span>BacktoBase Edition 6: "The AI Era" successfully concluded at Thoughtworks Hyderabad!</span>
            <span className="text-zinc-650">|</span>
            <span className="text-cyan-400">🔥 LEGENDS UPGRADE:</span>
            <span>Physical sandbox builds completed live. Check the Proof of Impact gallery!</span>
            <span className="text-zinc-650">|</span>
            <span className="text-purple-400">🚀 STAY TUNED:</span>
            <span>Follow official handles on YouTube, LinkedIn, and Instagram for the next edition.</span>
          </div>
          <div className="flex gap-8 items-center">
            <span className="flex items-center gap-1.5 text-amber-400">
              <Sparkles className="h-3 w-3 animate-spin" /> UPDATE:
            </span>
            <span>BacktoBase Edition 6: "The AI Era" successfully concluded at Thoughtworks Hyderabad!</span>
            <span className="text-zinc-650">|</span>
            <span className="text-cyan-400">🔥 LEGENDS UPGRADE:</span>
            <span>Physical sandbox builds completed live. Check the Proof of Impact gallery!</span>
            <span className="text-zinc-650">|</span>
            <span className="text-purple-400">🚀 STAY TUNED:</span>
            <span>Follow official handles on YouTube, LinkedIn, and Instagram for the next edition.</span>
          </div>
        </div>
      </div>

      {/* Primary Main Render Body */}
      <main className="flex-grow cosmic-grid-overlay hero-spotlight">
        
        {/* VIEW: INDEX HOME PORTAL */}
        {activeTab === "home" && (
          <>
            {/* Proof of impact gallery (Moments from the ecosystem gallery (Screenshot 3 accurate)) */}
            <ProofOfImpact />

            {/* Dive In. Learn It. Section & "Whether You Are" Interactive Core Section (Screenshot 5 accurate) */}
            <section id="divein" className="py-20 bg-transparent border-b border-zinc-900/10 relative">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                  
                  {/* Left block - text and Online/Offline dual tracks */}
                  <div className="lg:col-span-6 space-y-6">
                    <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest bg-cyan-950/40 px-3.5 py-1 rounded-full">DIVE IN TODAY</span>
                    <h2 className="text-3xl font-extrabold text-zinc-100 tracking-tight">
                      Stuck in tutorial hell? <br />
                      Let's build real things.
                    </h2>
                    <p className="text-xs text-zinc-400 leading-normal font-sans">
                      College teaches you rote definitions, not deployments. At BackToBase, we skip the boring slides. We host intense weekend builders' meets, hands-on production staging sessions, and live showcases where you build actual web apps, configure database rules, optimize APIs, and show your work directly to working senior developers.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                      
                      {/* Online card */}
                      <div className="p-5 bg-zinc-900/50 border border-zinc-850 rounded-2xl relative overflow-hidden group hover:border-cyan-500/20">
                        <div className="absolute top-0 right-0 h-10 w-10 bg-cyan-500/5 rounded-bl-full"></div>
                        <span className="text-xs font-mono font-bold text-cyan-400 uppercase">Track A</span>
                        <h4 className="font-bold text-sm text-zinc-100 mt-1.5">Deep Builds & PR Audits</h4>
                        <p className="mt-2 text-[11px] text-zinc-400 leading-relaxed font-sans">
                          Host your code, fix real-world issues on GitHub, and join live pull-request code audits with senior alumni. No safe sandbox simulation; we fix real bugs.
                        </p>
                      </div>

                      {/* Offline card */}
                      <div className="p-5 bg-zinc-900/50 border border-zinc-850 rounded-2xl relative overflow-hidden group hover:border-indigo-500/20">
                        <div className="absolute top-0 right-0 h-10 w-10 bg-indigo-500/5 rounded-bl-full"></div>
                        <span className="text-xs font-mono font-bold text-indigo-400 uppercase">Track B</span>
                        <h4 className="font-bold text-sm text-zinc-100 mt-1.5">Campus Sandbox Meets</h4>
                        <p className="mt-2 text-[11px] text-zinc-400 leading-relaxed font-sans">
                          Crash at physical workspaces across SNIST, JNTUH, and off-campus Hyderabad cafe hubs. Bring your laptop, eat pizzas with peers, and deploy code before midnight.
                        </p>
                      </div>

                    </div>
                  </div>

                  {/* Right block - "Whether You Are" Interactive Core Tool */}
                  <div className="lg:col-span-6 glass-card-premium p-6 sm:p-8 rounded-3xl relative overflow-hidden">
                    <div className="absolute -top-12 -right-12 h-32 w-32 bg-cyan-500/5 rounded-full blur-2xl pointer-events-none"></div>
                    <h3 className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest pl-1">INTERACTIVE ROSTER</h3>
                    <h4 className="text-lg font-extrabold text-zinc-100 mt-1 mb-5">Whether you are a:</h4>

                    {/* Horizontal/Grid Selector of Roles */}
                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mb-6">
                      {[
                        { id: "developer", label: "💻 Developer" },
                        { id: "creator", label: "✍️ Creator" },
                        { id: "designer", label: "🎨 Designer" },
                        { id: "entrepreneur", label: "🚀 Pitcher" },
                        { id: "speaker", label: "🎤 Speaker" }
                      ].map((role) => {
                        const isSel = selectedRole === role.id;
                        return (
                          <button
                            key={role.id}
                            onClick={() => setSelectedRole(role.id as any)}
                            className={`text-xs px-2.5 py-2.5 rounded-xl text-center font-bold font-sans transition-all duration-300 transform active:scale-95 cursor-pointer ${
                              isSel 
                                ? "bg-cyan-500 text-zinc-950 glow-cyan font-extrabold scale-[1.03]" 
                                : "bg-zinc-950/80 border border-zinc-900 text-zinc-400 hover:text-zinc-200 hover:border-zinc-800"
                            }`}
                          >
                            {role.label.split(" ")[1]}
                          </button>
                        );
                      })}
                    </div>

                    {/* Role Content details box */}
                    <div className="p-5 bg-zinc-950/80 border border-zinc-900 rounded-2xl min-h-[170px] flex flex-col justify-between shadow-inner">
                      <div>
                        {selectedRole === "developer" && (
                          <>
                            <span className="text-[10px] font-mono font-bold text-cyan-400 bg-cyan-950/30 border border-cyan-850/40 px-2 py-0.5 rounded uppercase tracking-wider">ROSTER OUTCOMES • CODE HACKER</span>
                            <p className="text-xs text-zinc-300 mt-2 leading-relaxed">
                              Tired of writing simple console.log calculators or repeating the same basic 'Hello World' tutorials? Join our live builds where we integrate Gemini APIs, secure server routes, configure environment variables, and deploy directly to Cloud Run inside real, production-ready repositories.
                            </p>
                            <p className="text-[10px] text-zinc-500 mt-2 font-mono">⚡ Priority technologies: React.js, TypeScript, Gemini SDK, Node.js, Express, Firebase.</p>
                          </>
                        )}
                        {selectedRole === "creator" && (
                          <>
                            <span className="text-[10px] font-mono font-bold text-indigo-400 bg-indigo-950/30 border border-indigo-900/40 px-2 py-0.5 rounded uppercase tracking-wider">ROSTER OUTCOMES • STORYTELLER</span>
                            <p className="text-xs text-zinc-300 mt-2 leading-relaxed">
                              Love creating cool digital stuff but don't know how to reach an audience of builders? We show you how to script high-retention technical shorts, design eye-catching LinkedIn carousels, edit dev vlogs, and explain complex tools in under 60 seconds to build huge personal distribution.
                            </p>
                            <p className="text-[10px] text-zinc-500 mt-2 font-mono">⚡ Priority structures: Storytelling formulas, high-hook edits, SEO tracking, personal branding.</p>
                          </>
                        )}
                        {selectedRole === "designer" && (
                          <>
                            <span className="text-[10px] font-mono font-bold text-purple-400 bg-purple-950/30 border border-purple-900/40 px-2 py-0.5 rounded uppercase tracking-wider">ROSTER OUTCOMES • VISUAL DESIGNER</span>
                            <p className="text-xs text-zinc-300 mt-2 leading-relaxed">
                              Are your beautiful Figma layouts sitting in your drafts folder forever because nobody is around to code them? We pair you directly with real campus developers. Learn precise typography scales, responsive auto-layout structures, premium dark mode interfaces, and design implementation patterns.
                            </p>
                            <p className="text-[10px] text-zinc-500 mt-2 font-mono">⚡ Priority models: UX wireframes, vector branding, layout design pairings, UI design systems.</p>
                          </>
                        )}
                        {selectedRole === "entrepreneur" && (
                          <>
                            <span className="text-[10px] font-mono font-bold text-amber-400 bg-amber-950/30 border border-amber-900/40 px-2 py-0.5 rounded uppercase tracking-wider">ROSTER OUTCOMES • IDEA PITCHER</span>
                            <p className="text-xs text-zinc-300 mt-2 leading-relaxed">
                              Got a wild college project idea but totally clueless about where to launch or get active users? Meet seasoned startup founders who review your pitch, help structure real pricing models, construct high-conversion landing pages, and teach you how to acquire your first 100 active users.
                            </p>
                            <p className="text-[10px] text-zinc-500 mt-2 font-mono">⚡ Priority concepts: Landing page conversions, MVP sprints, user acquisition metrics.</p>
                          </>
                        )}
                        {selectedRole === "speaker" && (
                          <>
                            <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-950/30 border border-emerald-900/40 px-2 py-0.5 rounded uppercase tracking-wider">ROSTER OUTCOMES • VOICE</span>
                            <p className="text-xs text-zinc-300 mt-2 leading-relaxed">
                              Scared of speaking on stage or stuttering during your upcoming campus placements? Speak at our local meetups first. Start with comfortable, friendly 5-minute lightning talks about what you built this weekend, record live webinars, and master technical communication.
                            </p>
                            <p className="text-[10px] text-zinc-500 mt-2 font-mono">⚡ Priority structures: Technical communication, lightning demos, placements interview preparation.</p>
                          </>
                        )}
                      </div>

                      <div className="mt-4 pt-3 border-t border-zinc-850 space-y-2 text-[11px] font-mono text-left">
                        <div className="flex items-center justify-between">
                          <span className="text-zinc-500">Available Roster: 100% Free Entry</span>
                        </div>
                        <p className="text-[10px] text-zinc-400 leading-normal font-sans">
                          💡 <span className="font-semibold text-zinc-300">Fast-Pass Join:</span> Just follow our official <a href="https://youtube.com/@backtobase_xyz" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-500 font-bold underline">YouTube</a>, <a href="https://www.linkedin.com/company/backtobasee/" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-500 font-bold underline">LinkedIn</a>, and <a href="https://www.instagram.com/backtobase_xyz/" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-500 font-bold underline">Instagram</a> for updates!
                        </p>
                      </div>
                    </div>
                  </div>

                </div>

              </div>
            </section>

            {/* Live Opportunities List block (Replaced with premium exact visual Screenshot 7) */}
            <LiveOpportunities 
              onRegisterSuccess={handleRegisterSuccess} 
              studentProfile={studentProfile} 
            />

            {/* Growth Roadmap Progression track (Screenshot 6 accurate) */}
            <section className="py-20 bg-transparent border-t border-zinc-900/10 relative">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                <div className="text-center max-w-xl mx-auto mb-16">
                  <span className="text-xs font-bold font-mono text-purple-800 bg-purple-100 border border-purple-200 dark:text-purple-300 dark:bg-purple-950/40 dark:border-purple-900/30 px-3 py-1 rounded-full uppercase tracking-widest leading-none">Growth Trail</span>
                  <h3 className="mt-4 text-3xl font-bold tracking-tight text-zinc-100 leading-tight">
                    Your Growth Path
                  </h3>
                  <p className="mt-3 text-sm text-zinc-400 font-sans">
                    A clear roadmap from registration to revenue. No academic friction.
                  </p>
                </div>

                {/* Progress Grid Flow */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 font-sans relative">
                  
                  {/* Connect Line in Desktop */}
                  <div className="hidden md:block absolute top-[44px] left-[5%] right-[5%] h-0.5 bg-gradient-to-r from-cyan-500/40 via-indigo-500/40 to-purple-500/40 z-0"></div>

                  {[
                    { 
                      step: "01 / ROSTER", 
                      title: "Enter the Ecosystem", 
                      tracker: "Ecosystem Roster", 
                      text: "Step into our high-caliber talent pool. Define your key interests, catalog your current raw skills, and get matched with aligned peer circles and dedicated learning tracks." 
                    },
                    { 
                      step: "02 / MENTOR", 
                      title: "Acquire Guidance", 
                      tracker: "Alumni Circle", 
                      text: "Engage in hands-on workshops and software design sprints. Work directly alongside working alumni who help eliminate confidence gaps and shape your professional map." 
                    },
                    { 
                      icon: "⚡", 
                      step: "03 / EXPLORE", 
                      title: "Bridge the Gap", 
                      tracker: "Live Events & Workshops", 
                      text: "Claim active seats in curated hackathons, developer sandboxes, and creative design challenges. Test and build your capabilities live under real-world production setups." 
                    },
                    { 
                      step: "04 / DEPLOY", 
                      title: "Unlock Opportunities", 
                      tracker: "Careers & Contracts", 
                      text: "Log verified public contributions into your personal profile. Generate credentials, connect with top company partners, and bridge the final gap toward global career pathways." 
                    }
                  ].map((item, idx) => (
                    <motion.div 
                      key={idx} 
                      whileHover={{ y: -6, borderColor: "rgba(6, 182, 212, 0.45)" }}
                      transition={{ type: "spring", stiffness: 350, damping: 25 }}
                      className="p-6 glass-card-premium rounded-2xl relative z-10 transition-all flex flex-col justify-between hover:shadow-lg group"
                    >
                      <div>
                        <div className="flex justify-between items-center mb-4">
                          <span className="text-[9px] font-bold font-mono tracking-wider text-cyan-400 uppercase bg-zinc-950/80 px-2.5 py-1 rounded border border-zinc-900">
                            {item.step}
                          </span>
                          <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse"></span>
                        </div>
                        <h4 className="font-extrabold text-base text-zinc-100 group-hover:text-cyan-400 transition-colors">{item.title}</h4>
                        <p className="text-xs text-zinc-400 mt-2.5 leading-relaxed font-sans">{item.text}</p>
                      </div>

                      <div className="mt-6 pt-3 border-t border-zinc-900 flex items-center justify-between text-[9px] font-mono text-zinc-500 uppercase tracking-wider">
                        <span>Tracker: {item.tracker}</span>
                        <span className="text-cyan-500">✓ Enabled</span>
                      </div>
                    </motion.div>
                  ))}
                </div>

              </div>
            </section>

            {/* Why Back To Base (Screenshot 1-2 inspired Value Proposition) */}
            <section id="about" className="py-24 bg-transparent border-y border-zinc-900/10 relative overflow-hidden">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                
                {/* Visual Branch Line for Desktop */}
                <div className="hidden lg:block absolute left-12 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-500/40 via-blue-500/20 to-transparent pointer-events-none z-0"></div>

                <div className="relative z-10 pl-0 lg:pl-16">
                  
                  {/* Glowing branch milestone circle */}
                  <div className="hidden lg:flex absolute left-[41px] top-2 h-6 w-6 rounded-full bg-zinc-950 border border-cyan-500/50 items-center justify-center shadow-[0_0_12px_rgba(6,182,212,0.4)] z-10">
                    <span className="h-2 w-2 rounded-full bg-cyan-400"></span>
                  </div>

                  <div className="text-left max-w-3xl mb-16 space-y-3">
                    <span className="text-[10px] font-bold font-mono text-cyan-400 uppercase tracking-widest bg-cyan-950/40 border border-cyan-800/30 px-3 py-1.5 rounded-full inline-block">
                      THE PROBLEM &amp; SOLUTION
                    </span>
                    <h3 className="text-3xl sm:text-4xl font-extrabold text-zinc-100 tracking-tight leading-tight">
                      The Skill-to-Confidence Gap. <br />
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-indigo-400">We bridge academic theory with true industry execution.</span>
                    </h3>
                    <p className="text-sm text-zinc-400 font-sans leading-relaxed max-w-2xl">
                      Traditional college structures force you into passive rote-memorization, while online courses leave you trapped in tutorial hell. BacktoBase changes the paradigm. We plug you into an active, collaborative ecosystem where you build live features, get audited by elite alumni, and deploy production-grade applications under the spotlight.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[
                      {
                        num: "01",
                        tag: "ROTE THEORY VS BUILD FIRST",
                        title: "100% Practical Focus",
                        text: "Skip slide decks. That is our absolute law. Exit every live session with real, functional, deployed solutions sitting inside your repositories instead of dry study printouts.",
                        accent: "border-cyan-500/20 bg-cyan-500/5 text-cyan-400"
                      },
                      {
                        num: "02",
                        tag: "ISOLATION VS INDUSTRY NODES",
                        title: "Alumni Returning Network",
                        text: "Break out of isolated silos. Get your architectures and clean code certified by verified senior engineers graduated from SNIST, JNTU, and major product companies.",
                        accent: "border-amber-500/20 bg-amber-500/5 text-amber-500 dark:text-amber-400"
                      },
                      {
                        num: "03",
                        tag: "PROPRIETARY VS OPEN ACCESS",
                        title: "Ecosystem Blueprints",
                        text: "Real industrial setup rules and templates are often locked away. We open-source production boilers, database schemas, and state patterns directly to your workspace.",
                        accent: "border-purple-500/20 bg-purple-500/5 text-purple-400"
                      },
                      {
                        num: "04",
                        tag: "SOLITARY STANDSTILL VS STREAK ENGINE",
                        title: "Streaks, Gigs & Spotlights",
                        text: "Self-driven study has a high drop-off rate. We turn it into a high-energy sport with shared build logs, active community feeds, local off-campus meetups, and live webinars.",
                        accent: "border-emerald-500/20 bg-emerald-500/5 text-emerald-400"
                      }
                    ].map((step, idx) => (
                      <motion.div
                        key={idx}
                        whileHover={{ y: -6, borderColor: "rgba(6, 182, 212, 0.45)" }}
                        transition={{ type: "spring", stiffness: 350, damping: 25 }}
                        className="p-6 glass-card-premium rounded-2xl flex flex-col justify-between group relative"
                      >
                        {/* Spotlight background item */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-white/[0.015] to-transparent rounded-2xl pointer-events-none"></div>
                        
                        <div>
                          <div className="flex justify-between items-center mb-4">
                            <span className={`px-2.5 py-1 rounded-md inline-block font-mono font-bold text-[9px] uppercase tracking-wider ${step.accent}`}>
                              {step.num} / {step.tag}
                            </span>
                            <span className="h-1.5 w-1.5 rounded-full bg-zinc-700 group-hover:bg-cyan-400 transition-colors"></span>
                          </div>
                          
                          <h4 className="font-extrabold text-base text-zinc-100 group-hover:text-cyan-400 transition-colors">
                            {step.title}
                          </h4>
                          <p className="mt-2 text-xs text-zinc-400 leading-relaxed font-sans">
                            {step.text}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                </div>
              </div>
            </section>

            {/* Collapsible FAQ Section with absolute screenshot accurate content (Screenshot 8 accurate) */}
            <section id="faq" className="py-20 bg-transparent relative">
              <div className="max-w-3xl mx-auto px-4 sm:px-6">
                
                <div className="text-center mb-14">
                  <span className="text-xs font-bold font-mono tracking-widest text-cyan-400 bg-cyan-950/40 border border-cyan-900/30 px-3 py-1 rounded-full uppercase">
                    Common Questions
                  </span>
                  <h3 className="mt-4 text-3xl font-extrabold tracking-tight text-zinc-100">
                    FAQ &amp; Hub Explanations
                  </h3>
                </div>

                <div className="space-y-4">
                  {rawFaqs.map((faq, idx) => (
                    <details 
                      key={idx} 
                      className="group p-5 bg-zinc-900/30 border border-zinc-850 rounded-2xl transition-all duration-300 [&_summary::-webkit-details-marker]:hidden"
                    >
                      <summary className="flex items-center justify-between cursor-pointer focus:outline-none select-none">
                        <h4 className="font-bold text-xs sm:text-sm text-zinc-200 group-hover:text-cyan-400 transition-colors tracking-normal font-sans">
                          {faq.k}
                        </h4>
                        <span className="p-1 rounded-lg bg-zinc-950 text-zinc-400 group-open:rotate-180 transition-transform">
                          <ChevronDown className="h-4 w-4" />
                        </span>
                      </summary>
                      <div className="mt-3 overflow-hidden text-xs text-zinc-400 leading-relaxed pt-3 border-t border-zinc-850/60">
                        {faq.v}
                      </div>
                    </details>
                  ))}
                </div>

              </div>
            </section>
          </>
        )}



      </main>

      {/* Floating AI Chatbot Widget (Always Active) */}
      <Chatbot />

      {/* Structured Space Footer */}
      <footer className="bg-zinc-950 border-t border-zinc-900 py-12 text-zinc-550 text-xs text-zinc-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2.5">
              <img 
                src={logoImg} 
                alt="Back to Base: Legends Upgrade" 
                className="h-11 sm:h-12 w-auto object-contain transition-transform duration-300 hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <span className="font-sans font-bold text-zinc-100 text-sm tracking-wide">BackToBase India Foundation</span>
            </div>
            <p className="text-zinc-400 leading-normal font-sans max-w-sm">
              We empower raw talent by establishing active, guided development tracks completely free of academic barriers. Registered in Hyderabad, India.
            </p>
            <p className="text-[10px] text-zinc-500 font-mono mt-1 pt-1.5 border-t border-zinc-900/60 inline-block">
              Base Contact: backtobase923@gmail.com
            </p>
          </div>

          <div className="md:col-span-3 space-y-3">
            <h5 className="font-bold text-zinc-300 font-sans uppercase tracking-wider text-[10px]">Eco Navigation</h5>
            <ul className="space-y-2 font-sans text-zinc-400">
              <li>
                <button onClick={() => { setActiveTab("home"); handleScrollToId("about"); }} className="hover:text-cyan-400 text-left transition-colors cursor-pointer">
                  Mission Statement
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveTab("home"); handleScrollToId("events"); }} className="hover:text-cyan-400 text-left transition-colors cursor-pointer">
                  Live Opportunities
                </button>
              </li>

            </ul>
          </div>

          <div className="md:col-span-4 space-y-3">
            <h5 className="font-bold text-zinc-300 font-sans uppercase tracking-wider text-[10px]">Outreach &amp; Community Channels</h5>
            <p className="text-[11px] text-zinc-400 leading-relaxed max-w-xs">
              Check out our public channels where we showcase live student hackathons &amp; college pivots.
            </p>
            <div className="flex gap-2.5 pt-1.5">
              <a
                href="https://youtube.com/@backtobase_xyz"
                target="_blank"
                referrerPolicy="no-referrer"
                className="p-2.5 bg-zinc-900 border border-zinc-850 hover:bg-zinc-800 hover:text-cyan-400 text-zinc-300 rounded-lg transition-colors"
                title="B2B YouTube"
              >
                <Youtube className="h-4.5 w-4.5" />
              </a>
              <a
                href="https://www.linkedin.com/company/backtobasee/"
                target="_blank"
                referrerPolicy="no-referrer"
                className="p-2.5 bg-zinc-900 border border-zinc-850 hover:bg-zinc-800 hover:text-cyan-400 text-zinc-300 rounded-lg transition-colors"
                title="B2B LinkedIn"
              >
                <Linkedin className="h-4.5 w-4.5" />
              </a>
              <a
                href="https://www.instagram.com/backtobase_xyz/"
                target="_blank"
                referrerPolicy="no-referrer"
                className="p-2.5 bg-zinc-900 border border-zinc-850 hover:bg-zinc-800 hover:text-cyan-400 text-zinc-300 rounded-lg transition-colors"
                title="B2B Instagram"
              >
                <Instagram className="h-4.5 w-4.5" />
              </a>
            </div>
          </div>
          
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-4 border-t border-zinc-900 text-center flex flex-col sm:flex-row justify-between items-center text-[10px] text-zinc-500">
          <span>&copy; {new Date().getFullYear()} BackToBase India Foundation. All rights reserved.</span>
          <span className="flex items-center gap-1.5 mt-2 sm:mt-0 leading-none">
            Built with supreme dedication <Heart className="h-3 w-3 text-red-500 fill-current animate-pulse" /> off-campus Hyderabad node
          </span>
        </div>
      </footer>

      {/* Global Interactive "Join Ecosystem" Registration Modal Popup */}
      {isRegisterModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-zinc-900 border border-zinc-850 rounded-3xl w-full max-w-md overflow-hidden relative shadow-2xl p-6 sm:p-8 animate-in fade-in-50 zoom-in-95 duration-200">
            
            {/* Close */}
            <button
              onClick={() => setIsRegisterModalOpen(false)}
              className="absolute top-4 right-4 bg-zinc-950 border border-zinc-850 text-zinc-400 p-1.5 rounded-full hover:text-rose-500 hover:border-zinc-800 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>

            <span className="text-[10px] font-mono tracking-widest text-cyan-500 dark:text-cyan-400 bg-cyan-950/40 border border-cyan-900/40 px-2.5 py-1 rounded inline-block">SECURE ROSTER PORTAL</span>
            <h3 className="mt-4 text-xl font-bold font-sans text-zinc-100 leading-snug">
              Join the Ecosystem
            </h3>
            
            {/* Dedicated Absolute Zero Friction Social Pathways */}
            <div className="mt-4 p-4.5 bg-zinc-950/60 border border-cyan-500/20 rounded-2xl space-y-3.5 text-left text-xs">
              <span className="text-[10px] font-bold font-mono text-cyan-400 bg-cyan-950/40 border border-cyan-900/30 px-2.5 py-0.5 rounded-md inline-block">
                ⚡ FAST-PASS PATHWAY (RECOMMENDED)
              </span>
              <p className="text-zinc-300 leading-relaxed font-sans text-[11px]">
                To join our community for direct workshop &amp; off-campus access, <strong className="text-cyan-400 font-extrabold">it is fully enough to follow us</strong> on our official channels below to lock in all official updates:
              </p>
              
              <div className="space-y-2">
                <a
                  href="https://youtube.com/@backtobase_xyz"
                  target="_blank"
                  referrerPolicy="no-referrer"
                  className="flex items-center justify-between p-3 bg-zinc-900 border border-zinc-850 hover:border-red-500/35 hover:bg-zinc-850 rounded-xl transition-all cursor-pointer"
                >
                  <div className="flex items-center gap-2.5">
                    <Youtube className="h-4 w-4 text-red-500 shrink-0 animate-pulse" />
                    <span className="font-sans font-bold text-zinc-250">B2B YouTube Channel</span>
                  </div>
                  <span className="text-[9.5px] font-mono text-red-400 font-bold uppercase tracking-wider flex items-center gap-1.5 shrink-0">
                    SUBSCRIBE <ExternalLink className="h-3 w-3" />
                  </span>
                </a>

                <a
                  href="https://www.linkedin.com/company/backtobasee/"
                  target="_blank"
                  referrerPolicy="no-referrer"
                  className="flex items-center justify-between p-3 bg-zinc-900 border border-zinc-850 hover:border-cyan-500/35 hover:bg-zinc-850 rounded-xl transition-all cursor-pointer"
                >
                  <div className="flex items-center gap-2.5">
                    <Linkedin className="h-4 w-4 text-cyan-400 shrink-0 animate-pulse" />
                    <span className="font-sans font-bold text-zinc-250">B2B LinkedIn Hub</span>
                  </div>
                  <span className="text-[9.5px] font-mono text-cyan-400 font-bold uppercase tracking-wider flex items-center gap-1.5 shrink-0">
                    CONNECT <ExternalLink className="h-3 w-3" />
                  </span>
                </a>

                <a
                  href="https://www.instagram.com/backtobase_xyz/"
                  target="_blank"
                  referrerPolicy="no-referrer"
                  className="flex items-center justify-between p-3 bg-zinc-900 border border-zinc-850 hover:border-pink-500/35 hover:bg-zinc-850 rounded-xl transition-all cursor-pointer"
                >
                  <div className="flex items-center gap-2.5">
                    <Instagram className="h-4 w-4 text-pink-500 shrink-0 animate-pulse" />
                    <span className="font-sans font-bold text-zinc-250">B2B Instagram Page</span>
                  </div>
                  <span className="text-[9.5px] font-mono text-pink-400 font-bold uppercase tracking-wider flex items-center gap-1.5 shrink-0">
                    FOLLOW <ExternalLink className="h-3 w-3" />
                  </span>
                </a>
              </div>
            </div>

            {/* Close Button Pathway */}
            <div className="mt-5 flex justify-center">
              <button
                type="button"
                onClick={() => setIsRegisterModalOpen(false)}
                className="w-full bg-zinc-950 hover:bg-zinc-900 text-zinc-400 hover:text-rose-400 border border-zinc-850 hover:border-zinc-700 text-xs font-mono font-bold py-3.5 rounded-xl transition duration-200 cursor-pointer text-center"
              >
                Close Portal
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
