import { useState, FormEvent } from "react";
import { User, Search, MessageSquare, HelpCircle, Calendar, Clock, Sparkles, Check, ChevronRight, X, Star, Link, Compass, Send } from "lucide-react";
import { Mentor, MentorSession } from "../types";
import { initialMentors } from "../data";

interface Props {
  onBookSessionSuccess: (newSession: MentorSession) => void;
}

export default function MentorMarketplace({ onBookSessionSuccess }: Props) {
  const [mentors, setMentors] = useState<Mentor[]>(initialMentors);
  const [searchQuery, setSearchQuery] = useState("");
  const [skillFilter, setSkillFilter] = useState<string | null>(null);

  // Booking states
  const [bookingMentor, setBookingMentor] = useState<Mentor | null>(null);
  const [bookingDate, setBookingDate] = useState("2026-05-28");
  const [bookingTime, setBookingTime] = useState("04:30 PM");
  const [bookingAgenda, setBookingAgenda] = useState("");
  const [bookingSuccess, setBookingSuccess] = useState(false);

  // Q&A States
  const [questions, setQuestions] = useState([
    {
      id: "qa-1",
      mentorId: "men-1",
      mentorName: "Rahul Verma",
      studentName: "Preeti Singh",
      question: "Which cloud instance is cheap and reliable for deploying deep learning models for side projects?",
      answer: "I highly advise huggingface spaces or Google Cloud Run for containerized serverless LLM apps. They hold a generous free tier of $10-$20 a month, fully sufficient for testing prototypes!",
      date: "2026-05-22",
    },
    {
      id: "qa-2",
      mentorId: "men-2",
      mentorName: "Ananya Rao",
      studentName: "Aditya Hegde",
      question: "Should I focus on LeetCode or open-source contribution to get Google or Amazon off-campus interviews?",
      answer: "It is a balance, off-campus referrals are triggered by high quality visibility on projects. Make an outstanding, highly optimized full-stack system, document it step-by-step on GitHub/LinkedIn, then ask senior developers for reviews. That triggers a referral 10x faster than raw LeetCode grind alone!",
      date: "2026-05-19",
    },
  ]);
  const [newQuestionUser, setNewQuestionUser] = useState("");
  const [selectedQA_MentorId, setSelectedQA_MentorId] = useState("men-1");

  // Collected unique skills for filtering
  const allSkills = Array.from(new Set(mentors.flatMap((m) => m.skills)));

  // Filter Logic
  const filteredMentors = mentors.filter((m) => {
    const matchesSearch =
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.company.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSkill = skillFilter ? m.skills.includes(skillFilter) : true;
    return matchesSearch && matchesSkill;
  });

  const handleOpenBooking = (men: Mentor) => {
    setBookingMentor(men);
    setBookingSuccess(false);
    setBookingAgenda("");
  };

  const submitBooking = (e: FormEvent) => {
    e.preventDefault();
    if (!bookingMentor) return;

    const newSes: MentorSession = {
      id: `ses-${Date.now()}`,
      mentorId: bookingMentor.id,
      mentorName: bookingMentor.name,
      date: bookingDate,
      time: bookingTime,
      status: "Scheduled",
      agenda: bookingAgenda || "Discuss general career outline and project design review.",
      meetingLink: "https://meet.google.com/b2b-active-session",
    };

    onBookSessionSuccess(newSes);
    setBookingSuccess(true);
  };

  const handleAskQuestion = (e: FormEvent) => {
    e.preventDefault();
    if (!newQuestionUser.trim()) return;

    const targetMentor = mentors.find((m) => m.id === selectedQA_MentorId);
    if (!targetMentor) return;

    const newQA = {
      id: `qa-${Date.now()}`,
      mentorId: targetMentor.id,
      mentorName: targetMentor.name,
      studentName: "Vennela Ankam",
      question: newQuestionUser,
      answer: "Thank you for the wonderful question! I have added this on my active thread and will respond during our upcoming scheduled office hours session on meet.google.com. Please register to attend!",
      date: new Date().toISOString().split("T")[0],
    };

    setQuestions((prev) => [newQA, ...prev]);
    setNewQuestionUser("");
  };

  return (
    <section id="mentorship" className="py-20 bg-zinc-50 dark:bg-zinc-950 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title Block */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold font-mono tracking-widest text-[#0066FF] bg-[#0066FF]/10 px-3 py-1.5 rounded-full inline-block mb-3.5">
            MENTOR MARKETPLACE
          </span>
          <h2 className="text-3xl sm:text-4xl font-sans font-bold text-zinc-900 dark:text-white tracking-tight">
            Consult the Base. Book Sessions.
          </h2>
          <p className="mt-4 text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 font-sans leading-relaxed">
            Connect directly with SNIST, JNTU, and major Indian engineering college alumni now leading teams at Google, BaseLabs, and prominent startups worldwide.
          </p>
        </div>

        {/* Outer Grid: Mentors and Office Hours / Q&A switch */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Browsing area: Left 8 cols */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Filters dashboard */}
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800 p-5 rounded-2xl shadow-sm flex flex-col sm:flex-row gap-4 items-center justify-between">
              
              {/* Search text */}
              <div className="relative w-full sm:max-w-xs">
                <Search className="absolute left-3.5 top-1/2 transform -translate-y-1/2 h-4 w-4 text-zinc-400" />
                <input
                  type="text"
                  placeholder="Search mentors, companies, roles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl pl-10 pr-3.5 py-2 text-xs text-zinc-800 dark:text-zinc-100 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              {/* Skills filter bullets */}
              <div className="flex gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 scrollbar-none">
                <button
                  onClick={() => setSkillFilter(null)}
                  className={`text-[10px] font-mono font-bold uppercase shrink-0 px-3 py-1.5 rounded-lg transition-all ${
                    skillFilter === null
                      ? "bg-zinc-950 dark:bg-white text-white dark:text-zinc-950"
                      : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200"
                  }`}
                >
                  All Skills
                </button>
                {allSkills.slice(0, 5).map((skill) => (
                  <button
                    key={skill}
                    onClick={() => setSkillFilter(skill)}
                    className={`text-[10px] font-mono font-bold uppercase shrink-0 px-3 py-1.5 rounded-lg transition-all ${
                      skillFilter === skill
                        ? "bg-zinc-950 dark:bg-white text-white dark:text-zinc-950"
                        : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200/80"
                    }`}
                  >
                    {skill}
                  </button>
                ))}
              </div>
            </div>

            {/* Mentors Grid deck */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredMentors.map((men) => (
                <div
                  key={men.id}
                  className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 shadow-xs flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex gap-4 items-start">
                      <img
                        src={men.avatar}
                        alt={men.name}
                        className="h-14 w-14 rounded-xl object-cover ring-1 ring-zinc-200/60 "
                      />
                      <div>
                        <h3 className="font-bold text-sm sm:text-base text-zinc-950 dark:text-white flex items-center gap-1.5">
                          {men.name}
                        </h3>
                        <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 font-sans leading-none mt-1">
                          {men.role} &bull; <strong className="text-zinc-700 dark:text-zinc-300 font-medium">{men.company}</strong>
                        </p>
                        
                        <div className="mt-1 pb-1 flex items-center gap-1">
                          <Star className="h-3.5 w-3.5 text-amber-400 fill-current" />
                          <span className="text-[11px] font-bold text-zinc-700 dark:text-zinc-300 font-mono">{men.rating}</span>
                          <span className="text-[10px] text-zinc-400">({men.reviewsCount} sessions)</span>
                        </div>
                      </div>
                    </div>

                    <p className="mt-4 text-xs text-zinc-600 dark:text-zinc-400 font-sans leading-relaxed line-clamp-2">
                      {men.bio}
                    </p>

                    <div className="mt-3.5 flex flex-wrap gap-1">
                      {men.skills.map((skill) => (
                        <span key={skill} className="text-[9px] font-mono font-bold uppercase tracking-wider bg-zinc-100 dark:bg-emerald-950/20 text-zinc-550 dark:text-emerald-300 px-2.5 py-0.5 rounded">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-zinc-100 dark:border-zinc-800/80 flex gap-2">
                    <button
                      onClick={() => handleOpenBooking(men)}
                      id={`book-btn-${men.id}`}
                      className="flex-1 bg-zinc-950 dark:bg-white dark:hover:bg-zinc-100 text-white dark:text-zinc-950 hover:bg-zinc-850 font-sans text-xs font-bold py-2 rounded-xl transition duration-300 cursor-pointer text-center"
                    >
                      Book 1-on-1 Session
                    </button>
                  </div>
                </div>
              ))}
            </div>

          </div>

          {/* Right column: Interactive Public Q&A and Office hours widget */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Live Office Hours Card */}
            <div className="bg-gradient-to-br from-blue-750 to-emerald-700 text-white p-6 rounded-3xl relative overflow-hidden shadow-md">
              <span className="text-[10px] uppercase font-mono font-bold tracking-widest text-emerald-200 bg-white/10 px-2.5 py-1 rounded-full">
                Live Office Hours
              </span>
              
              <h3 className="mt-3 text-lg font-bold leading-tight">
                Weekly Interactive Audio/Video Gmeet
              </h3>
              <p className="mt-1 text-[11px] text-emerald-100 leading-relaxed font-sans">
                No bookings required. Grab your laptop, join the open link, and present your bugs or pitch your startups directly.
              </p>

              <div className="mt-5 space-y-3.5">
                {mentors.filter(m => m.upcomingOfficeHour).map((m) => (
                  <div key={m.id} className="p-3 bg-white/10 rounded-xl border border-white/10 text-xs">
                    <p className="font-semibold text-emerald-200">Host: {m.name}</p>
                    <p className="mt-0.5 font-bold line-clamp-1">{m.upcomingOfficeHour?.topic}</p>
                    <div className="mt-2.5 flex justify-between items-center text-[10px] text-zinc-100">
                      <span>{m.upcomingOfficeHour?.date} &bull; {m.upcomingOfficeHour?.time}</span>
                      <a
                        href={m.upcomingOfficeHour?.joinUrl}
                        target="_blank"
                        referrerPolicy="no-referrer"
                        className="bg-white text-zinc-900 font-bold px-2 py-1 rounded inline-flex items-center gap-1 hover:bg-emerald-50 active:scale-95 transition-all text-[9px]"
                      >
                        <Compass className="h-3 w-3" /> Join Meet
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Q&A WALL INTERACTION (Ask questions, view replies) */}
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800 rounded-3xl p-5 shadow-xs">
              <span className="text-[10px] font-bold font-mono text-zinc-400 dark:text-zinc-500 uppercase flex items-center gap-1">
                <HelpCircle className="h-4 w-4" /> Student Q&amp;A Thread
              </span>
              
              <h3 className="mt-1.5 font-sans font-bold text-sm sm:text-base text-zinc-950 dark:text-white">
                Submit Public Tech Question
              </h3>
              
              <form onSubmit={handleAskQuestion} className="mt-3 space-y-2.5">
                <div className="grid grid-cols-2 gap-2">
                  <span className="text-[10px] text-zinc-400 flex items-center pl-1 font-mono uppercase">Assign Mentor:</span>
                  <select
                    value={selectedQA_MentorId}
                    onChange={(e) => setSelectedQA_MentorId(e.target.value)}
                    className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 px-2 py-1 rounded-md text-[11px]"
                  >
                    {mentors.map((m) => (
                      <option key={m.id} value={m.id}>{m.name}</option>
                    ))}
                  </select>
                </div>

                <div className="flex gap-2">
                  <input
                    type="text"
                    required
                    placeholder="e.g. How to learn system design off-campus?"
                    value={newQuestionUser}
                    onChange={(e) => setNewQuestionUser(e.target.value)}
                    className="flex-1 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-850 p-2 text-xs rounded-xl focus:ring-1 focus:ring-blue-500"
                  />
                  <button
                    type="submit"
                    className="bg-emerald-600 hover:bg-emerald-500 text-white px-3.5 rounded-xl flex items-center justify-center transition-all cursor-pointer"
                    title="Send Question"
                  >
                    <Send className="h-3.5 w-3.5" />
                  </button>
                </div>
              </form>

              {/* QA Display map */}
              <div className="mt-5 space-y-4 max-h-[280px] overflow-y-auto pr-1">
                {questions.map((q) => (
                  <div key={q.id} className="text-xs border-b border-zinc-150 dark:border-zinc-800/60 pb-3 last:border-0">
                    <p className="font-bold text-zinc-900 dark:text-zinc-200 flex justify-between">
                      <span>{q.studentName}Asked:</span>
                      <span className="text-[9px] font-mono text-zinc-400">{q.date}</span>
                    </p>
                    <p className="mt-1 text-zinc-650 dark:text-zinc-400 italic leading-snug">
                      &ldquo;{q.question}&rdquo;
                    </p>
                    {q.answer && (
                      <div className="mt-2 p-2.5 rounded-lg bg-zinc-50 dark:bg-zinc-950/50 border border-zinc-100 dark:border-zinc-850">
                        <p className="font-bold text-emerald-600 dark:text-emerald-400 text-[10px] uppercase font-mono">
                          Reply from {q.mentorName}:
                        </p>
                        <p className="mt-0.5 text-zinc-600 dark:text-zinc-400 leading-snug">
                          {q.answer}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>

            </div>

          </div>

        </div>

        {/* Dynamic Scheduler Panel (Booking modal popup) */}
        {bookingMentor && (
          <div
            id="booking-modal-overlay"
            className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn"
          >
            <div
              id="booking-modal-content"
              className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl w-full max-w-md overflow-hidden relative shadow-2xl p-6 sm:p-8"
            >
              {/* Close Button */}
              <button
                onClick={() => setBookingMentor(null)}
                className="absolute top-4 right-4 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-750 p-2 rounded-full transition-colors font-bold cursor-pointer"
                title="Dismiss"
              >
                <X className="h-4.5 w-4.5" />
              </button>

              {!bookingSuccess ? (
                <form onSubmit={submitBooking} className="space-y-4">
                  <span className="text-[10px] font-bold font-mono tracking-wider bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full uppercase">
                    Slot Selector Workspace
                  </span>
                  
                  <div className="pt-2">
                    <h3 className="font-sans font-bold text-lg text-zinc-900 dark:text-white">
                      Book 1-on-1 Mentorship Session
                    </h3>
                    <p className="text-xs text-zinc-500 mt-1">
                      Schedule a private workspace session with <strong>{bookingMentor.name}</strong> to outline career choices and audit prototypes.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[10px] font-bold uppercase font-mono tracking-wide text-zinc-400">Date Target</label>
                      <input
                        type="date"
                        required
                        value={bookingDate}
                        onChange={(e) => setBookingDate(e.target.value)}
                        className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 px-2.5 py-1.5 rounded-lg text-xs"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold uppercase font-mono tracking-wide text-zinc-400">Time Slot</label>
                      <select
                        value={bookingTime}
                        onChange={(e) => setBookingTime(e.target.value)}
                        className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 px-2.5 py-2.5 rounded-lg text-xs focus:ring-1 focus:ring-blue-500"
                      >
                        <option value="09:00 AM">09:00 AM</option>
                        <option value="11:30 AM">11:30 AM</option>
                        <option value="02:00 PM">02:00 PM</option>
                        <option value="04:30 PM">04:30 PM</option>
                        <option value="06:00 PM">06:00 PM</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] font-bold uppercase font-mono tracking-wide text-zinc-400">Session Objectives & Agenda</label>
                    <textarea
                      required
                      value={bookingAgenda}
                      onChange={(e) => setBookingAgenda(e.target.value)}
                      rows={3}
                      placeholder="e.g. review my code repository on Pinecone DB, mock technical interview preparation..."
                      className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 px-3 py-2 text-xs rounded-xl focus:ring-1 focus:ring-blue-500"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 hover:bg-zinc-850 py-3 rounded-xl font-bold font-sans text-xs flex items-center justify-center gap-1.5 cursor-pointer mt-2"
                  >
                    Confirm Booking Session
                    <ChevronRight className="h-4.5 w-4.5" />
                  </button>
                </form>
              ) : (
                <div className="text-center py-6 flex flex-col items-center">
                  <div className="h-12 w-12 bg-emerald-100 dark:bg-emerald-950 rounded-full flex items-center justify-center mb-4">
                    <Check className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <h3 className="font-bold text-base text-zinc-950 dark:text-white">Session Scheduled Successfully!</h3>
                  <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-400 font-sans leading-relaxed">
                    Mentor slot locked with <strong>{bookingMentor.name}</strong> on <strong>{bookingDate}</strong> at {bookingTime}.
                  </p>
                  <p className="mt-1 text-[11px] text-zinc-400 font-sans">
                    The session has been booked successfully. Check your email for dynamic calendar updates and Google Meet credentials!
                  </p>

                  <button
                    onClick={() => setBookingMentor(null)}
                    className="mt-6 text-xs text-blue-600 hover:underline font-semibold cursor-pointer"
                  >
                    Return to gallery
                  </button>
                </div>
              )}

            </div>
          </div>
        )}

      </div>
    </section>
  );
}
