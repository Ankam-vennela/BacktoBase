import { useState } from "react";
import { X, Youtube, Linkedin, Instagram, ExternalLink, Sparkles, Award, Check, Link2, Heart } from "lucide-react";

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const socialLinks = [
    {
      id: "youtube",
      name: "YouTube Channel",
      handle: "@backtobase_xyz",
      description: "Technical build masterclasses, live webinar events, senior alumni coding tracks, and design deep dives.",
      url: "https://youtube.com/@backtobase_xyz",
      icon: <Youtube className="h-5 w-5 text-rose-500 shrink-0" />,
      actionText: "Subscribe Channel",
      colorClass: "hover:bg-rose-950/10 hover:border-rose-500/30 border-zinc-850 bg-zinc-900/45",
      badgeClass: "text-rose-400 bg-rose-950/30 border border-rose-900/40",
      btnClass: "bg-rose-500 hover:bg-rose-400 text-zinc-950 hover:scale-[1.02] active:scale-[0.98] shadow-sm font-bold"
    },
    {
      id: "linkedin",
      name: "LinkedIn Hub",
      handle: "backtobasee",
      description: "Official career updates, campus drive announcements, alumni networking opportunities, and spotlight columns.",
      url: "https://www.linkedin.com/company/backtobasee/",
      icon: <Linkedin className="h-5 w-5 text-blue-400 shrink-0" />,
      actionText: "Follow Professional Hub",
      colorClass: "hover:bg-blue-950/10 hover:border-blue-500/30 border-zinc-850 bg-zinc-900/45",
      badgeClass: "text-blue-400 bg-blue-950/30 border border-blue-900/40",
      btnClass: "bg-blue-500 hover:bg-blue-400 text-zinc-950 hover:scale-[1.02] active:scale-[0.98] shadow-sm font-bold"
    },
    {
      id: "instagram",
      name: "Instagram",
      handle: "@backtobase_xyz",
      description: "High-energy offline campus hackathon snippets, daily developer streaks, and event highlight reels.",
      url: "https://www.instagram.com/backtobase_xyz/",
      icon: <Instagram className="h-5 w-5 text-pink-400 shrink-0" />,
      actionText: "Follow on Instagram",
      colorClass: "hover:bg-pink-950/10 hover:border-pink-500/30 border-zinc-850 bg-zinc-900/45",
      badgeClass: "text-pink-400 bg-pink-950/30 border border-pink-900/40",
      btnClass: "bg-pink-500 hover:bg-pink-400 text-zinc-950 hover:scale-[1.02] active:scale-[0.98] shadow-sm font-bold"
    }
  ];

  const handleCopyLink = (id: string, url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <>
      {/* Invisible Style Element for Custom Keyframe Animations */}
      <style>{`
        @keyframes robotFloat {
          0% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-7px) rotate(1deg); }
          100% { transform: translateY(0px) rotate(0deg); }
        }
        @keyframes wifiPulse {
          0% { opacity: 0.35; transform: scale(0.95); }
          50% { opacity: 1; transform: scale(1.05); }
          100% { opacity: 0.35; transform: scale(0.95); }
        }
        @keyframes eyeGlint {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.08); filter: brightness(1.2); }
        }
        .animate-robot-float {
          animation: robotFloat 3.8s ease-in-out infinite;
        }
        .animate-wifi-pulse {
          animation: wifiPulse 2s infinite ease-in-out;
          transform-origin: 20px 25px;
        }
        .animate-eye-glint {
          animation: eyeGlint 3s infinite ease-in-out;
        }
      `}</style>

      {/* Floating Animated Robot Launcher Icon */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          id="chat-toggle-btn"
          className="fixed bottom-6 right-6 z-[100] transition-all duration-300 hover:scale-[1.12] active:scale-95 cursor-pointer flex flex-col items-center justify-center filter drop-shadow-[0_8px_24px_rgba(34,211,238,0.35)] hover:drop-shadow-[0_12px_32px_rgba(34,211,238,0.55)] animate-robot-float bg-transparent border-none p-0 focus:outline-none"
          title="Connect with Our Community Hub"
          style={{ background: 'transparent', border: 'none' }}
        >
          {/* Custom SVG Robot matching the precise user aesthetic */}
          <svg 
            className="w-20 h-22 select-none"
            viewBox="0 0 120 130" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="headGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="60%" stopColor="#f1f5f9" />
                <stop offset="100%" stopColor="#cbd5e1" />
              </linearGradient>
              <linearGradient id="visorGrad" x1="50%" y1="0%" x2="50%" y2="100%">
                <stop offset="0%" stopColor="#0f172a" />
                <stop offset="100%" stopColor="#1e293b" />
              </linearGradient>
              <linearGradient id="visorStroke" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#22d3ee" />
                <stop offset="100%" stopColor="#a855f7" />
              </linearGradient>
              <radialGradient id="eyeGrad" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#ec4899" stopOpacity="0.15" />
                <stop offset="65%" stopColor="#a855f7" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#3b0764" stopOpacity="1" />
              </radialGradient>
              <linearGradient id="armGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="100%" stopColor="#cbd5e1" />
              </linearGradient>
            </defs>

            {/* Glowing wireless connections */}
            <g className="animate-wifi-pulse text-cyan-400">
              <circle cx="21" cy="23" r="2.5" fill="#22d3ee" />
              <path d="M 23 15 A 11 11 0 0 1 31 23" stroke="#22d3ee" strokeWidth="2" strokeLinecap="round" fill="none" />
              <path d="M 24 8 A 20 20 0 0 1 39 23" stroke="#22d3ee" strokeWidth="2.2" strokeLinecap="round" fill="none" />
            </g>

            <rect x="15" y="47" width="8" height="18" rx="4" fill="#64748b" />
            <rect x="97" y="47" width="8" height="18" rx="4" fill="#64748b" />

            <path 
              d="M 27,82 C 21,80 11,92 11,104 C 11,113 19,117 24,113 C 28,109 29,95 29,85" 
              fill="url(#armGrad)" 
              stroke="#94a3b8"
              strokeWidth="0.75"
            />
            <path 
              d="M 93,82 C 99,80 109,92 109,104 C 109,113 101,117 96,113 C 92,109 91,95 91,85" 
              fill="url(#armGrad)" 
              stroke="#94a3b8"
              strokeWidth="0.75"
            />

            <path 
              d="M 40,77 C 40,77, 28,77, 28,93 C 28,114 41,125 60,125 C 79,125 92,114 92,93 C 92,77, 80,77, 80,77 Z" 
              fill="url(#headGrad)" 
              stroke="#94a3b8"
              strokeWidth="1"
            />

            <path 
              d="M 31 100 Q 60 106 89 100" 
              stroke="#a855f7" 
              strokeWidth="3" 
              strokeLinecap="round" 
              fill="none" 
              opacity="0.95" 
            />

            <line x1="53" y1="87" x2="67" y2="87" stroke="#94a3b8" strokeWidth="2.2" strokeLinecap="round" />
            <rect x="47" y="69" width="26" height="11" rx="4.5" fill="#94a3b8" />

            {/* Helmet/Head Plate */}
            <rect 
              x="21" 
              y="31" 
              width="78" 
              height="45" 
              rx="22.5" 
              fill="url(#headGrad)" 
              stroke="#cbd5e1" 
              strokeWidth="1.5" 
            />

            {/* Helmet Visor Screen */}
            <rect 
              x="26" 
              y="36" 
              width="68" 
              height="34" 
              rx="17" 
              fill="url(#visorGrad)" 
              stroke="url(#visorStroke)" 
              strokeWidth="1.8" 
            />

            {/* Left Eye */}
            <g className="animate-eye-glint" style={{ transformOrigin: "44px 53px" }}>
              <circle cx="44" cy="53" r="10" fill="url(#eyeGrad)" stroke="#ec4899" strokeWidth="0.5" />
              <circle cx="44" cy="53" r="5" fill="#090d16" />
              <circle cx="41.5" cy="50.5" r="2.5" fill="#ffffff" />
              <circle cx="46.5" cy="55.5" r="1.1" fill="#22d3ee" />
            </g>

            {/* Right Eye */}
            <g className="animate-eye-glint" style={{ transformOrigin: "76px 53px", animationDelay: "0.2s" }}>
              <circle cx="76" cy="53" r="10" fill="url(#eyeGrad)" stroke="#ec4899" strokeWidth="0.5" />
              <circle cx="76" cy="53" r="5" fill="#090d16" />
              <circle cx="73.5" cy="50.5" r="2.5" fill="#ffffff" />
              <circle cx="78.5" cy="55.5" r="1.1" fill="#22d3ee" />
            </g>

            {/* Cute robot smile */}
            <path 
              d="M 55,62 Q 60,65 65,62" 
              stroke="#ffffff" 
              strokeWidth="2.2" 
              strokeLinecap="round" 
              fill="none" 
            />
          </svg>
        </button>
      )}

      {/* Main Connection Hub Popout Card */}
      {isOpen && (
        <div
          id="social-hub-container"
          className="fixed bottom-3 right-3 sm:bottom-6 sm:right-6 z-[100] w-[calc(100vw-1.5rem)] sm:w-[460px] max-h-[90vh] sm:max-h-[640px] bg-zinc-950/98 backdrop-blur-xl border border-zinc-800 rounded-3xl shadow-2xl flex flex-col overflow-hidden transform transition-all duration-300 ease-out glow-cyan"
        >
          {/* Header with gradient branding flow */}
          <div className="bg-gradient-to-r from-cyan-500 via-teal-600 to-indigo-600 px-5 py-4 flex items-center justify-between text-white border-b border-white/10 shadow-lg">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full flex items-center justify-center border-2 border-cyan-400/55 overflow-hidden relative bg-zinc-950/90 shadow-[0_0_12px_rgba(34,211,238,0.3)] shrink-0">
                <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 absolute top-1 right-1 animate-pulse"></span>
                <Sparkles className="h-4 w-4 text-cyan-400 animate-pulse" />
              </div>
              <div>
                <h3 className="font-sans font-extrabold text-sm tracking-wide text-white leading-none">Official Social Hub</h3>
                <p className="text-[10px] text-cyan-100/95 flex items-center gap-1.5 font-mono leading-none mt-1 uppercase font-semibold">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 inline-block animate-ping"></span>
                  Active Connections
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-lg bg-zinc-950/20 border border-white/5 hover:bg-zinc-950/40 hover:border-white/15 transition-all text-white cursor-pointer"
              title="Close Panel"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Social connections list */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-gradient-to-b from-zinc-950 to-zinc-900/95 scrollbar-thin scrollbar-thumb-zinc-800">
            
            <div className="text-left space-y-1 mb-2">
              <h4 className="text-sm font-extrabold text-zinc-100 flex items-center gap-1.5 font-sans">
                Join the BackToBase Community! <span className="text-xs">👋</span>
              </h4>
              <p className="text-[11px] text-zinc-400 leading-normal font-sans">
                Follow our verified handles to get real-time bootcamp updates, event invitations, project blueprints, and interact with fellow student builders.
              </p>
            </div>

            <div className="space-y-3.5 pt-1">
              {socialLinks.map((social) => (
                <div
                  key={social.id}
                  className={`p-4 rounded-2xl border transition-all duration-300 group flex flex-col gap-3 relative overflow-hidden ${social.colorClass}`}
                >
                  <div className="flex items-start justify-between gap-2 z-10">
                    <div className="flex items-center gap-2.5">
                      <div className="p-2 rounded-xl bg-zinc-950/80 border border-zinc-800 group-hover:scale-110 transition-transform duration-300 shadow-sm">
                        {social.icon}
                      </div>
                      <div>
                        <h5 className="font-extrabold text-xs text-zinc-100 group-hover:text-cyan-400 transition-colors">
                          {social.name}
                        </h5>
                        <span className={`px-2 py-0.5 rounded text-[9px] font-mono font-bold mt-1 inline-block ${social.badgeClass}`}>
                          {social.handle}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => handleCopyLink(social.id, social.url)}
                      className="p-1.5 rounded-lg bg-zinc-950/40 border border-zinc-850/80 text-zinc-400 hover:text-cyan-400 hover:border-cyan-500/20 hover:bg-zinc-950/80 transition-all font-mono text-[9px] flex items-center gap-1 cursor-pointer"
                      title="Copy URL Link"
                    >
                      {copiedId === social.id ? (
                        <>
                          <Check className="h-3 w-3 text-emerald-400" />
                          <span className="text-emerald-400">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Link2 className="h-3 w-3" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>

                  <p className="text-[11px] text-zinc-400 leading-normal font-sans pl-1.5 z-10 border-l border-zinc-800/80">
                    {social.description}
                  </p>

                  <div className="pt-1 flex items-center justify-end z-10">
                    <a
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center gap-1 px-4 py-2 rounded-xl text-[11px] font-extrabold transition-all cursor-pointer ${social.btnClass}`}
                    >
                      <span>{social.actionText}</span>
                      <ExternalLink className="h-3.5 w-3.5 stroke-[2.5]" />
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {/* Fast-Pass verified indicator alert */}
            <div className="mt-4 p-4 rounded-2xl bg-cyan-950/20 border border-cyan-900/40 text-left relative overflow-hidden">
              <div className="absolute right-3 top-3 opacity-15">
                <Award className="h-10 w-10 text-cyan-400" />
              </div>
              <div className="flex gap-2.5 items-start">
                <span className="text-base">💡</span>
                <div className="space-y-1">
                  <h6 className="text-[11px] font-extrabold font-sans text-cyan-300 uppercase tracking-wider">
                    FAST-PASS VERIFICATION CODE
                  </h6>
                  <p className="text-[11px] text-zinc-300 leading-normal font-sans">
                    Fulfilling the follow actions on our <strong className="text-cyan-400">YouTube, LinkedIn,</strong> and <strong className="text-cyan-400">Instagram</strong> is highly recommended and acts as your official fast-track pass to physical sandbox meetups and webinars!
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* Footer inside popout card */}
          <div className="p-4 bg-zinc-950 border-t border-zinc-900 text-center flex flex-col items-center justify-center gap-1.5">
            <p className="text-[10px] text-zinc-500 leading-normal font-mono flex items-center gap-1 justify-center">
              Made with <Heart className="h-3 w-3 text-red-500 fill-red-500" /> for community builders
            </p>
            <p className="text-[9px] text-zinc-650 font-mono">
              BackToBase Official Channels • Snist/JNTUH Ecosystem
            </p>
          </div>
        </div>
      )}
    </>
  );
}
