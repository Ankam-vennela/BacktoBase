export interface EventOpportunity {
  id: string;
  title: string;
  description: string;
  place: string;
  speakerNames: string[];
  attendeesCount: number;
  keyOutcomes: string[];
  studentFeedback: {
    studentName: string;
    text: string;
    rating: number;
  }[];
  date: string;
  time: string;
  category: "AI" | "Engineering" | "Data" | "Design" | "Creator";
  status: "live" | "upcoming" | "completed";
  videoUrl?: string; // YouTube video ID or full embed link
  thumbnailUrl?: string; // Custom preview thumbnail image/URL
  agenda: string[];
  founderName?: string;
  venuePartner?: string;
  feedbackShorts?: string[];
}

export interface Mentor {
  id: string;
  name: string;
  role: string;
  company: string;
  bio: string;
  avatar: string;
  skills: string[];
  rating: number;
  reviewsCount: number;
  upcomingOfficeHour?: {
    date: string;
    time: string;
    topic: string;
    joinUrl: string;
  };
}

export interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  status: "Completed" | "In_Progress";
  completedDate?: string;
  githubUrl?: string;
}

export interface MentorSession {
  id: string;
  mentorId: string;
  mentorName: string;
  date: string;
  time: string;
  status: "Scheduled" | "Completed" | "Cancelled";
  agenda: string;
  meetingLink?: string;
}

export interface Certificate {
  id: string;
  eventName: string;
  issueDate: string;
  credentialId: string;
}

export interface StudentProfile {
  name: string;
  email: string;
  college: string;
  bio: string;
  avatar: string;
  streakCount: number;
  lastActiveDate: string;
  streakHistory: string[]; // dates of active learning: YYYY-MM-DD
  history: {
    eventId: string;
    eventTitle: string;
    date: string;
    status: "attended" | "registered";
  }[];
  certificates: Certificate[];
  projects: Project[];
  sessions: MentorSession[];
}

export interface ChatMessage {
  id: string;
  role: "user" | "model";
  content: string;
  timestamp: string;
}
