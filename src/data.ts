import { EventOpportunity, Mentor, StudentProfile } from "./types";
// @ts-ignore
import edition6Thumbnail from "./assets/images/edition_six_thumbnail_1780147479318.png";

export const initialEvents: EventOpportunity[] = [
  {
    id: "evt-b2b-ed1",
    title: "BacktoBase Edition 1",
    description: "The inauguration flagship edition of Sreenidhi's borderless developer series. An immersive tech interaction bridging the gap between theoretical classroom learning and modern high-scale development engineering.",
    place: "Health Catalyst Hyderabad Office",
    speakerNames: ["Om Ashish Mishra", "Jai Raghavendra Reddy", "Amarnath Sagala"],
    attendeesCount: 220,
    keyOutcomes: [
      "Fireside session led by Founder Yashwanth Bondapalli setting regional open-source benchmarks",
      "Dynamic systems architecture insights by industry specialist Om Ashish Mishra",
      "Actionable engineering scaling roadmaps by Jai Raghavendra Reddy & Amarnath Sagala",
      "Interactive QA covering global remote gigs and high-caliber portfolio building"
    ],
    studentFeedback: [
      { studentName: "Srinivas K.", text: "This first edition changed how we see production work. Hearing the real challenges directly from the speakers and the founder was highly illuminating.", rating: 5 },
      { studentName: "Aadhya Gopal", text: "Health Catalyst venue partner was phenomenal. Real corporate insight paired with absolute raw coding guides. Bring on Edition 2!", rating: 5 },
      { studentName: "Rithvik S.", text: "Mind-blowing experience. Yashwanth and the mentors simplified complex distributed systems concepts down to earth.", rating: 5 }
    ],
    date: "2026-04-18",
    time: "10:30 AM - 04:30 PM",
    category: "Engineering",
    status: "completed",
    videoUrl: "https://www.youtube.com/embed/_jbUt6T5eF8",
    agenda: [
      "10:30 AM - Open-source Ecosystem Keynote by Founder Yashwanth Bondapalli",
      "11:30 AM - Fireside session with Om Ashish Mishra, Jai Raghavendra Reddy, Amarnath Sagala",
      "01:30 PM - Tech Talk on Enterprise Engineering with Health Catalyst leadership",
      "03:00 PM - Panel discussion & Core codebase audits with students"
    ],
    founderName: "Yashwanth Bondapalli",
    venuePartner: "Health Catalyst",
    feedbackShorts: [
      "https://www.youtube.com/embed/D6OTEvJCgSg",
      "https://www.youtube.com/embed/54qOPlyPZA4"
    ]
  },
  {
    id: "evt-b2b-ed2",
    title: "BacktoBase Edition 2",
    description: "The double-volume sequel focusing heavily on modular system architecture, containers, package registry alignment, and setting up reproducible local runtimes.",
    place: "Seminar Hall Base SNIST, Hyderabad",
    speakerNames: ["Yashwanth Bondapalli", "Regional Engineering Mentors"],
    attendeesCount: 240,
    keyOutcomes: [
      "Configured multi-tier microservices with high environmental consistency",
      "Demonstrated system state preservation techniques",
      "Conducted interactive code audits detailing optimal resource utilization"
    ],
    studentFeedback: [
      { studentName: "Siddharth Raj", text: "Seeing standard application containers explained simply without high jargon was absolute gold.", rating: 5 }
    ],
    date: "2026-04-25",
    time: "10:30 AM - 04:30 PM",
    category: "Engineering",
    status: "completed",
    videoUrl: "https://www.youtube.com/embed/AgFILhadWeI",
    agenda: [
      "10:30 AM - Opening & Local environment checklists with Yashwanth",
      "12:00 PM - Docker virtualization & system parameters demonstration",
      "02:00 PM - Decoupling frontend and backend containers and codebases",
      "03:30 PM - Live build feedback session and project deployment checklists"
    ],
    founderName: "Yashwanth Bondapalli"
  },
  {
    id: "evt-b2b-ed3",
    title: "BacktoBase Edition 3",
    description: "The mid-series sandbox event centered around production API resilience, asynchronous jobs, test frameworks, and security hardening for student creations.",
    place: "Auditorium JNTU Base, Hyderabad",
    speakerNames: ["Yashwanth Bondapalli", "Senior Tech Architects"],
    attendeesCount: 280,
    keyOutcomes: [
      "Designed and deployed production-grade secure RESTful endpoints live",
      "Configured automatic unit and integration testing pipelines",
      "Tuned request throttling and API shielding mechanisms"
    ],
    studentFeedback: [
      { studentName: "Priyanka T.", text: "The live testing part was fantastic. Yashwanth gave straightforward insights that are instantly applicable.", rating: 5 }
    ],
    date: "2026-05-02",
    time: "10:30 AM - 04:30 PM",
    category: "Engineering",
    status: "completed",
    videoUrl: "https://www.youtube.com/embed/t43Nfbblu20",
    agenda: [
      "10:30 AM - Secure API schemas, routing patterns, and data sanitation",
      "12:00 PM - Continuous testing sandbox with automatic CI assertions",
      "02:00 PM - Real-time state replication setups using message systems",
      "03:30 PM - Strategic reviews of student project portfolios"
    ],
    founderName: "Yashwanth Bondapalli"
  },
  {
    id: "evt-b2b-ed4",
    title: "BacktoBase Edition 4",
    description: "An intensive systems architecture meet. Focused on memory management, caching models, and non-blocking asynchronous event queues to eliminate system lag under high volumes.",
    place: "Base-2 VNR VJIET Hall, Hyderabad",
    speakerNames: ["Yashwanth Bondapalli", "Platform Engineers Pool"],
    attendeesCount: 310,
    keyOutcomes: [
      "Diagnosed database connection bottlenecks using professional telemetry layers",
      "Configured local cluster setups showing real-time background job offloading",
      "Analyzed code submissions of student hackers live on screen"
    ],
    studentFeedback: [
      { studentName: "Harsh Vardhan", text: "Extremely useful walkthrough showing how async job queues prevent server lockups.", rating: 5 }
    ],
    date: "2026-05-09",
    time: "10:30 AM - 04:30 PM",
    category: "Engineering",
    status: "completed",
    videoUrl: "https://www.youtube.com/embed/UvLzX8XCinM",
    agenda: [
      "10:30 AM - Distributed system parameters and performance auditing",
      "12:00 PM - Handling background web sockets and polling frameworks",
      "02:00 PM - Stencil live demo and codebase tuning hacks",
      "03:30 PM - One-on-one resume alignments and engineering career Q&A"
    ],
    founderName: "Yashwanth Bondapalli"
  },
  {
    id: "evt-b2b-ed5",
    title: "BacktoBase Edition 5",
    description: "The grand full-stack deployment showcase. Bridging modern highly reactive user interfaces with scalable servers, and cloud delivery optimization techniques.",
    place: "Health Catalyst Hyderabad Office",
    speakerNames: ["Yashwanth Bondapalli", "Cloud Solutions Architects"],
    attendeesCount: 350,
    keyOutcomes: [
      "Assembled and launched a secured full-stack app into active cloud runner pipelines",
      "Demonstrated optimal API key isolation and lazy-load security strategies",
      "Awarded regional verification check achievements to active developers"
    ],
    studentFeedback: [
      { studentName: "Meghana R.", text: "A complete end-to-end cloud deployment experience. Outstanding from start to finish!", rating: 5 }
    ],
    date: "2026-05-16",
    time: "10:30 AM - 04:30 PM",
    category: "Engineering",
    status: "completed",
    videoUrl: "https://www.youtube.com/embed/bCVZ2DFjI14",
    agenda: [
      "10:30 AM - System blueprinting and architectural outline review",
      "11:30 AM - Fluid responsive client UI assembly and testing",
      "01:30 PM - Secure API routing with environment variable safeguards",
      "03:00 PM - Deploy-a-thon: Moving from local dev tools to cloud runners"
    ],
    founderName: "Yashwanth Bondapalli",
    venuePartner: "Health Catalyst"
  },
  {
    id: "evt-b2b-ed6",
    title: "BacktoBase Edition 6: The AI Era",
    description: "Our signature high-intensity edition focused on the intersection of AI × Cyber Security. As Artificial Intelligence continues to reshape industries, the importance of digital security and ethical innovation has never been larger. This edition brings together curious minds, innovators, students, and tech enthusiasts for an exciting session filled with insights and direct networking.",
    place: "Thoughtworks Technologies (India), Hyderabad",
    speakerNames: ["Bhasker Patel (CSRM AppSec, Tech Mahindra)", "Venkata Sriram (CEO, Evaluators AI)", "Yashwanth Bondapalli (Founder)"],
    attendeesCount: 450,
    keyOutcomes: [
      "Deep dive into the critical intersection of AI and Cyber Security and ethical innovation",
      "Interactive strategy pipelines for AI-native app security and AppSec models",
      "Acquired strategic knowledge on scaling startup frameworks with LLMs safely",
      "Connected directly with top-tier technical leads and engineering heads"
    ],
    studentFeedback: [
      { studentName: "Varun Reddy", text: "Finally an outstanding session that didn't just show slides! Built our backend and checked staging with real terminal code, then understood the security boundaries live.", rating: 5 }
    ],
    date: "2026-05-23",
    time: "09:30 AM Onwards",
    category: "Engineering",
    status: "completed",
    videoUrl: "https://www.linkedin.com/posts/yashwanth-bondapalli-37b6a7255_thanks-for-your-efforts-and-love-g-kaveri-ugcPost-7464323463911071744-dG1s/?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAAFCOGwQByhGwDSPAguSkHWMRiHRqThA5hdM",
    thumbnailUrl: edition6Thumbnail,
    agenda: [
      "09:30 AM - Opening Keynote: AI Era & Inspiring Perspectives",
      "10:15 AM - Interactive Session: Cyber Security & AppSec with Bhasker Patel",
      "11:30 AM - Startup Acceleration and AI Strategy with Venkata Sriram",
      "01:00 PM - Panel Talk & Live Code Review with Yashwanth Bondapalli"
    ]
  }
];

export const initialMentors: Mentor[] = [
  {
    id: "men-1",
    name: "Rahul Verma",
    role: "Founding Engineer",
    company: "BaseLabs AI",
    bio: "Rahul specializes in deploying large vision models and LLM agents into web products. SNIST Alumnus, ex-Razorpay, passionate about bringing deep-tech skills to undergrads.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=250",
    skills: ["AI Agents", "Docker", "Node.js", "Python", "React", "Vector DBs"],
    rating: 4.9,
    reviewsCount: 42,
    upcomingOfficeHour: {
      date: "2026-05-28",
      time: "05:00 PM",
      topic: "How to Build and Host Your First AI Wrapper App",
      joinUrl: "https://meet.google.com/abc-defg-hij"
    }
  },
  {
    id: "men-2",
    name: "Ananya Rao",
    role: "Senior Software Engineer",
    company: "Google",
    bio: "Ex-Amazon, SNIST Graduate. Ananya builds distributed server applications that scale globally. She is specialized in microservice grids, cloud performance auditing, and data pipelines.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=250",
    skills: ["Cloud Systems", "Go", "Java", "Kubernetes", "System Design"],
    rating: 5.0,
    reviewsCount: 56,
    upcomingOfficeHour: {
      date: "2026-05-30",
      time: "04:00 PM",
      topic: "System Design for Realtime Collaborative Whiteboards",
      joinUrl: "https://meet.google.com/xyz-mno-pqr"
    }
  },
  {
    id: "men-3",
    name: "Arjun Sharma",
    role: "Co-Founder",
    company: "AgentCore",
    bio: "Arjun built database engines before raising $2M seed for AgentCore. He guides students in open-source development, tech stack trade-offs, and raising early funding.",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=250",
    skills: ["Startups", "Pitching", "PostgreSQL", "React Native", "TypeScript"],
    rating: 4.8,
    reviewsCount: 29,
    upcomingOfficeHour: {
      date: "2026-06-02",
      time: "06:00 PM",
      topic: "From Final Year Product to Funded Tech Startup",
      joinUrl: "https://meet.google.com/vwy-fgh-ijk"
    }
  },
  {
    id: "men-4",
    name: "Niharika Jain",
    role: "Growth Consultant & Content Strategist",
    company: "IndieCreator",
    bio: "Niharika helps creators build and scale their technical portfolios, newsletters, and YouTube presence. She loves guiding students on visual storytelling and remote opportunities.",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=250",
    skills: ["Branding", "Content Writing", "Figma", "UI Design", "Video Editing"],
    rating: 4.9,
    reviewsCount: 38,
    upcomingOfficeHour: {
      date: "2026-06-05",
      time: "03:00 PM",
      topic: "Building in Public: Getting Internships via Twitter & LinkedIn",
      joinUrl: "https://meet.google.com/xyz-abc-tuv"
    }
  }
];

export const defaultStudentProfile: StudentProfile = {
  name: "Vennela Ankam",
  email: "ankamvennela2006@gmail.com",
  college: "Sreenidhi Institute of Science and Technology (SNIST)",
  bio: "Pre-final year CSE student eager to connect with industry mentors. Passionate about AI integrations, web engineering, and open-source ecosystems.",
  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250",
  streakCount: 5,
  lastActiveDate: "2026-05-24", // today
  streakHistory: ["2026-05-20", "2026-05-21", "2026-05-22", "2026-05-23", "2026-05-24"],
  history: [
    {
      eventId: "evt-b2b-ed5",
      eventTitle: "BacktoBase Edition 5",
      date: "2026-05-16",
      status: "attended"
    },
    {
      eventId: "evt-b2b-ed4",
      eventTitle: "BacktoBase Edition 4",
      date: "2026-05-09",
      status: "attended"
    },
    {
      eventId: "evt-b2b-ed6",
      eventTitle: "BacktoBase Edition 6",
      date: "2026-05-23",
      status: "attended"
    }
  ],
  certificates: [
    {
      id: "cert-6",
      eventName: "BacktoBase Edition 6: The AI Era",
      issueDate: "2026-05-24",
      credentialId: "B2B-ED6-3841-TW"
    },
    {
      id: "cert-2",
      eventName: "BacktoBase Edition 5",
      issueDate: "2026-05-17",
      credentialId: "B2B-ED5-9281-HC"
    },
    {
      id: "cert-3",
      eventName: "BacktoBase Edition 4",
      issueDate: "2026-05-10",
      credentialId: "B2B-ED4-7164-VNR"
    }
  ],
  projects: [
    {
      id: "proj-1",
      title: "Interactive Markdown Chatbot",
      description: "A chat engine querying dynamic documentation arrays, customized using local Tailwind structures and responsive styles.",
      techStack: ["React", "TypeScript", "TailwindCSS", "Express"],
      status: "Completed",
      completedDate: "2026-05-15",
      githubUrl: "https://github.com/vennela-ankam/b2b-chatbot"
    },
    {
      id: "proj-2",
      title: "Task Orchestrator Agent",
      description: "Working on building a task loop scheduler utilizing Gemini prompt execution pipelines and vector database checks.",
      techStack: ["Python", "Pinecone", "LangChain"],
      status: "In_Progress"
    }
  ],
  sessions: [
    {
      id: "ses-1",
      mentorId: "men-1",
      mentorName: "Rahul Verma",
      date: "2026-05-14",
      time: "04:30 PM",
      status: "Completed",
      agenda: "Reviewing resume bullet points and checking backend server design architecture, securing API endpoints.",
      meetingLink: "https://meet.google.com/completed"
    }
  ]
};

export const faqs = [
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
    k: "How can I seek custom 1-on-1 mentorship?",
    v: "Use the 'Mentor Marketplace' on this platform to review profile details, schedule live office hours, and book direct questions or booking requests."
  }
];
