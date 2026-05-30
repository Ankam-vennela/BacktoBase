import { useState, FormEvent } from "react";
import { Info, HelpCircle, Calendar, Clock, MapPin, Sparkles, Check, CheckCircle2, ChevronRight, X, ArrowUpRight } from "lucide-react";
import { EventOpportunity, StudentProfile } from "../types";
import { initialEvents } from "../data";
import { motion } from "motion/react";

interface Props {
  onRegisterSuccess: (eventTitle: string, eventId: string) => void;
  studentProfile: StudentProfile;
}

export default function LiveOpportunities({ onRegisterSuccess, studentProfile }: Props) {
  const upcomingEvents = [...initialEvents].sort((a, b) => {
    const statusOrder: Record<string, number> = {
      live: 1,
      upcoming: 2,
      completed: 3,
    };
    const orderA = statusOrder[a.status || "upcoming"] || 2;
    const orderB = statusOrder[b.status || "upcoming"] || 2;
    if (orderA !== orderB) return orderA - orderB;
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  const [selectedEvent, setSelectedEvent] = useState<EventOpportunity | null>(null);
  const [registrations, setRegistrations] = useState<string[]>([]);
  const [isRegistering, setIsRegistering] = useState(false);
  const [regSuccess, setRegSuccess] = useState(false);

  // Form Inputs
  const [fullName, setFullName] = useState(studentProfile.name);
  const [email, setEmail] = useState(studentProfile.email);
  const [college, setCollege] = useState(studentProfile.college);

  const handleOpenDetails = (evt: EventOpportunity) => {
    setSelectedEvent(evt);
    setRegSuccess(false);
  };

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!selectedEvent) return;

    setIsRegistering(true);
    setTimeout(() => {
      setRegistrations((prev) => [...prev, selectedEvent.id]);
      onRegisterSuccess(selectedEvent.title, selectedEvent.id);
      setIsRegistering(false);
      setRegSuccess(true);
    }, 1200);
  };

  return (
    <section id="events" className="py-24 bg-transparent border-b border-zinc-900/10 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Visual Branch Line for Desktop */}
        <div className="hidden lg:block absolute left-12 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-500/15 via-blue-500/15 to-transparent pointer-events-none z-0"></div>

        <div className="relative z-10 pl-0 lg:pl-16">
          
          {/* Glowing branch milestone circle */}
          <div className="hidden lg:flex absolute left-[41px] top-2 h-6 w-6 rounded-full bg-zinc-950 border border-cyan-500/50 items-center justify-center shadow-[0_0_12px_rgba(6,182,212,0.3)] z-10">
            <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse"></span>
          </div>

          {/* Title Heading */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
            <div className="max-w-xl">
              <span className="text-xs font-bold font-mono tracking-widest text-cyan-400 bg-cyan-950/40 border border-cyan-900/40 px-3.5 py-1.5 rounded-full inline-block mb-3.5 glow-cyan">
                UPCOMING EVENTS &amp; SESSIONS
              </span>
              <h2 className="text-3xl sm:text-4xl font-sans font-extrabold text-zinc-100 tracking-tight leading-tight">
                Upcoming Events &amp; Workshops
              </h2>
              <p className="mt-3 text-sm text-zinc-400 font-sans">
                Book your seats for direct entry to upcoming hand-on sessions, or explore past workshops under base.
              </p>
            </div>
            
            <div className="flex gap-2 text-xs font-mono">
              <span className="flex items-center gap-1.5 px-3 py-1 bg-cyan-950/50 text-cyan-400 rounded-full border border-cyan-900/40">
                <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
                Active Sessions
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1 bg-zinc-900 text-zinc-450 rounded-full border border-zinc-800 text-zinc-400">
                100% Free Entry
              </span>
            </div>
          </div>

          {/* Opportunities grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingEvents.map((evt) => {
              const isRegistered = registrations.includes(evt.id);
              return (
                <motion.div
                  key={evt.id}
                  whileHover={{ y: -6, borderColor: "rgba(6, 182, 212, 0.45)" }}
                  transition={{ type: "spring", stiffness: 350, damping: 25 }}
                  className="glass-card-premium rounded-2xl p-6 shadow-md flex flex-col justify-between hover:border-cyan-500/25 transition-all duration-300 group relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/[0.015] to-transparent rounded-2xl pointer-events-none"></div>

                  <div className="relative z-10">
                    <div className="flex justify-between items-center">
                      <span className="text-[9px] font-mono font-bold px-2.5 py-1 uppercase rounded bg-cyan-950 text-cyan-400 border border-cyan-900/30">
                        {evt.category}
                      </span>
                      {evt.status === "completed" ? (
                        <span className="text-[10px] uppercase tracking-wide font-mono font-bold text-zinc-400 bg-zinc-800/20 border border-zinc-700/30 px-2.5 py-0.5 rounded">
                          Completed
                        </span>
                      ) : evt.status === "live" ? (
                        <span className="text-[10px] uppercase tracking-wide font-mono font-bold text-emerald-400 bg-emerald-950/30 border border-emerald-900/30 px-2.5 py-0.5 rounded animate-pulse">
                          Live Now
                        </span>
                      ) : (
                        <span className="text-[10px] uppercase tracking-wide font-mono font-bold text-amber-500 bg-amber-550/10 px-2.5 py-0.5 rounded">
                          Open Slots
                        </span>
                      )}
                    </div>

                    <h3 className="mt-4 text-base font-extrabold text-zinc-100 group-hover:text-cyan-400 transition-colors">
                      {evt.title}
                    </h3>
                    
                    <p className="mt-2 text-xs text-zinc-400 font-sans leading-relaxed line-clamp-3">
                      {evt.description}
                    </p>

                    {/* Core details layout snippet */}
                    <div className="mt-5 space-y-2 text-xs text-zinc-400 border-t border-zinc-850 pt-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-3.5 w-3.5 text-cyan-400 shrink-0" />
                        <span>{evt.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-3.5 w-3.5 text-cyan-400 shrink-0" />
                        <span>{evt.time}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-3.5 w-3.5 text-cyan-400 shrink-0" />
                        <span className="truncate">{evt.place.split(",")[0]}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 flex gap-2 relative z-10">
                    <button
                      onClick={() => handleOpenDetails(evt)}
                      id={`details-btn-${evt.id}`}
                      className="flex-grow text-center bg-zinc-950 hover:bg-zinc-900 border border-zinc-850 text-zinc-100 font-mono text-xs font-semibold py-2.5 rounded-xl transition-all flex items-center justify-center gap-1 hover:gap-1.5 active:scale-95 cursor-pointer"
                    >
                      View Details
                      <ChevronRight className="h-4 w-4" />
                    </button>

                    {isRegistered && evt.status !== "completed" && (
                      <span className="px-3.5 py-2.5 bg-emerald-950 text-emerald-400 border border-emerald-900/40 rounded-xl flex items-center justify-center" title="Registered">
                        <Check className="h-4 w-4" />
                      </span>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>

        {/* Dynamic Detail Modal Panel (View Details Inline/Modal) */}
        {selectedEvent && (
          <div
            id="details-modal-overlay"
            className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex items-start sm:items-center justify-center p-3 sm:p-4 py-8 animate-in fade-in-40"
          >
            <div
              id="details-modal-content"
              className="bg-zinc-900 border border-zinc-850 rounded-3xl w-full max-w-2xl overflow-hidden relative shadow-2xl animate-in fade-in-50 zoom-in-95 duration-200"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedEvent(null)}
                className="absolute top-4 right-4 bg-black/40 hover:bg-black/60 border border-white/10 text-white/80 hover:text-white p-2 rounded-full transition-all duration-200 z-10 cursor-pointer"
                title="Close"
              >
                <X className="h-5 w-5" />
              </button>

              {/* Cover Header */}
              <div className="bg-gradient-to-r from-[#082a3a] via-[#12102e] to-[#250d3c] border-b border-zinc-800 px-6 sm:px-8 py-8 relative">
                <span className="text-[9px] font-mono font-black tracking-widest uppercase bg-[#00F0FF]/15 text-[#00F0FF] border border-[#00F0FF]/25 px-3 py-1 rounded-full">
                  {selectedEvent.category} OPPORTUNITY
                </span>
                <h3 className="mt-3 text-lg sm:text-xl font-extrabold leading-snug text-white">
                  {selectedEvent.title}
                </h3>
                <p className="mt-2 text-xs text-slate-250 font-sans leading-relaxed max-w-lg text-white/90">
                  {selectedEvent.description}
                </p>
              </div>

              {/* Grid content */}
              <div className="p-6 sm:p-8 grid grid-cols-1 md:grid-cols-12 gap-6 pb-12">
                
                {/* Event core stats & Curriculum agenda: Left */}
                <div className="md:col-span-7 space-y-5 text-left">
                  <div>
                    <h4 className="text-[10px] font-semibold tracking-wider font-mono uppercase text-zinc-500 mb-2">
                      Event Parameters
                    </h4>
                    <div className="space-y-2 text-xs text-zinc-300 bg-zinc-950/60 p-4 rounded-xl border border-zinc-850">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-cyan-400 shrink-0" />
                        <span><strong>Date:</strong> {selectedEvent.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-cyan-400 shrink-0" />
                        <span><strong>Timings:</strong> {selectedEvent.time}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-cyan-400 shrink-0" />
                        <span><strong>Location:</strong> {selectedEvent.place}</span>
                      </div>
                      {selectedEvent.speakerNames && (
                        <div className="flex items-start gap-2 pt-1.5 border-t border-zinc-850">
                          <span className="text-zinc-500 font-semibold shrink-0 uppercase tracking-widest text-[9px] mt-0.5 font-mono">GUIDES:</span>
                          <span className="font-bold text-zinc-100">{selectedEvent.speakerNames.join(", ")}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-[10px] font-semibold tracking-wider font-mono uppercase text-zinc-500 mb-2">
                      Staging Agenda &amp; Outcomes
                    </h4>
                    <div className="space-y-2">
                      {selectedEvent.keyOutcomes.map((item, idx) => (
                        <div key={idx} className="flex gap-2 items-start text-xs text-zinc-400">
                          <Check className="h-4 w-4 text-cyan-400 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Registration Form Right Block: Right */}
                <div className="md:col-span-5 bg-zinc-950/80 border border-zinc-850 rounded-2xl p-5 text-left">
                  {selectedEvent.status === "completed" ? (
                    <div className="h-full flex flex-col justify-center items-center text-center space-y-3 py-6 animate-in fade-in">
                      <div className="h-11 w-11 bg-zinc-800 text-zinc-400 border border-zinc-700/30 rounded-full flex items-center justify-center">
                        <CheckCircle2 className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-zinc-200">Event Completed</h4>
                        <p className="text-[10px] text-zinc-550 mt-1 leading-normal">
                          This workshop has concluded. Explore the videos, takeaways, and outcomes in our Impact Gallery.
                        </p>
                      </div>
                      <button
                        onClick={() => setSelectedEvent(null)}
                        className="w-full bg-zinc-900 border border-zinc-805 text-xs text-zinc-100 py-2 rounded-xl mt-4 hover:bg-zinc-850"
                      >
                        Close Panel
                      </button>
                    </div>
                  ) : regSuccess ? (
                    <div className="h-full flex flex-col justify-center items-center text-center space-y-3 py-6">
                      <div className="h-11 w-11 bg-emerald-900/40 text-emerald-400 rounded-full flex items-center justify-center border border-emerald-700/30">
                        <CheckCircle2 className="h-6 w-6" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-zinc-100">Entry Secured!</h4>
                        <p className="text-[11px] text-zinc-400 mt-1 leading-relaxed">
                          Your pass token has been generated and entry logged successfully.
                        </p>
                      </div>
                      <button
                        onClick={() => setSelectedEvent(null)}
                        className="w-full bg-zinc-900 border border-zinc-800 text-xs text-zinc-100 py-2 rounded-xl mt-4 hover:bg-zinc-850"
                      >
                        Close Panel
                      </button>
                    </div>
                  ) : registrations.includes(selectedEvent.id) ? (
                    <div className="h-full flex flex-col justify-center items-center text-center space-y-3 py-6 animate-in fade-in">
                      <div className="h-11 w-11 bg-cyan-950 text-cyan-400 border border-cyan-900/40 rounded-full flex items-center justify-center">
                        <Check className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-zinc-200">Already Registered!</h4>
                        <p className="text-[10px] text-zinc-500 mt-1">
                          You secured a seat code for this gig. Let's showcase your talent!
                        </p>
                      </div>
                    </div>
                  ) : (
                    <form onSubmit={handleFormSubmit} className="space-y-3.5">
                      <h4 className="text-[10px] font-bold font-mono tracking-wide text-zinc-400 uppercase">
                        Secure Live Entry Pass
                      </h4>
                      
                      <div>
                        <label className="text-[9px] uppercase font-mono text-zinc-500 tracking-wider">Your Name</label>
                        <input
                          type="text"
                          required
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          className="w-full bg-zinc-900 border border-zinc-850 px-2.5 py-1.5 rounded-xl text-xs text-zinc-150 focus:outline-none focus:ring-1 focus:ring-cyan-500 text-zinc-100"
                        />
                      </div>

                      <div>
                        <label className="text-[9px] uppercase font-mono text-zinc-500 tracking-wider">Academic Email</label>
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full bg-zinc-900 border border-zinc-850 px-2.5 py-1.5 rounded-xl text-xs text-zinc-150 focus:outline-none focus:ring-1 focus:ring-cyan-500 text-zinc-100"
                        />
                      </div>

                      <div>
                        <label className="text-[9px] uppercase font-mono text-zinc-500 tracking-wider">College Base</label>
                        <input
                          type="text"
                          required
                          value={college}
                          onChange={(e) => setCollege(e.target.value)}
                          className="w-full bg-zinc-900 border border-zinc-850 px-2.5 py-1.5 rounded-xl text-xs text-zinc-150 focus:outline-none focus:ring-1 focus:ring-cyan-500 text-zinc-100"
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={isRegistering}
                        className="w-full bg-cyan-500 hover:bg-cyan-400 text-zinc-950 text-xs font-mono font-bold leading-none py-2.5 rounded-xl transition duration-300 glow-cyan flex items-center justify-center gap-2 cursor-pointer mt-3"
                      >
                        {isRegistering ? (
                          <>
                            <span className="h-3 w-3 border-2 border-zinc-950/40 border-t-zinc-950 rounded-full animate-spin"></span>
                            <span>Securing...</span>
                          </>
                        ) : (
                          <>
                            <span>Register Seat</span>
                            <ArrowUpRight className="h-3.5 w-3.5" />
                          </>
                        )}
                      </button>
                    </form>
                  )}
                </div>

              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
