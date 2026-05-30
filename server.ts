import express from "express";
import path from "path";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";

dotenv.config();

const app = express();
app.use(express.json());

const PORT = 3000;

// Initialize GoogleGenAI Client with system-directed headers
const apiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;

if (apiKey) {
  ai = new GoogleGenAI({
    apiKey: apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
} else {
  console.warn("WARNING: GEMINI_API_KEY environment variable is not set. Chatbot queries will fallback to pre-programmed responses.");
}

// B2B organization details mock helper system prompt
const b2bSystemInstruction = `
You are the interactive virtual AI advisor for BackToBase (backtobase.in / backtobase.xyz).
BackToBase is a student ecosystem. Our Tagline is: "Connecting Raw Talent with Global Opportunities".

Our Core Vision:
"We are building a powerhouse community where dreams meet guidance. Whether you have the skill but lack the confidence, or the dream but lack the map, we provide the Mentorship, Network, and Real-World Opportunities to bridge the gap."

Official Media & Social Channels:
- YouTube: https://youtube.com/@backtobase_xyz (Watch live showcases, guest talks, and bootcamp highlights!)
- LinkedIn: https://www.linkedin.com/company/backtobasee/ (Follow for professional opportunities, industry updates, and networking networks)
- Instagram: https://www.instagram.com/backtobase_xyz/ (For daily student spotlights, campus events, and announcements!)

Encourage students to subscribe and connect across these channels to join our powerhouse ecosystem!

Our Programs & Opportunities:
- Online Tracks: Monetize your skills, execute remote projects, and earn active contracts.
- Offline Tracks: Physical meetups held directly at academic bases (colleges like SNIST, VNR VJIET, JNTU Hyderabad). We bring highly accomplished alumni and expert professionals back to campuses to mentor students directly.

Our Interactive Roadmap Steps (Your Growth Path):
1. Step 1: Join / ROSTER - Enter the high-caliber digital talent pool, define initial interests, catalog your current raw skills, and get matched with aligned peers.
2. Step 2: TRAIN / MENTOR - Engage in practical workshops and interactive code sprints. Work directly with working alumni who resolve confidence gaps and co-create digital products.
3. Step 3: PERFORM / EXPLORE - Claim active seats in curated hackathons, developer sandboxes, and physical design sprints to test your capabilities live under production setups.
4. Step 4: GROW / DEPLOY - Log verified projects into your public profile, unlock signed attendance certification, connect with hiring company partners, and bridge the final gap toward global career pathways.

Note: In our interactive pathway system, we focus purely on Practical Hands-on learning, Innovation Hackathons, Bootcamps/Workshops, Career & Portfolio audits, Talent Exhibitions, and Off-Campus meetups. (We do NOT offer 'architecture case studies' or 'collaborative open source systems').

Live Opportunities currently open for bookings:
- "WHY WHERE WHEN AI": Seminar about what AI actually does in production. Hosted at SNIST Auditorium. Speakers: Sai Kumar, Ananya Rao.
- "What AI Engineers Actually Do...": In-depth session at VNR VJIET. Speakers: Rahul Verma, Deepak Joshi.
- "Agentic AI X Data Analytics": Seminar at JNTU Hyderabad. Speakers: Harshitha K, Arjun Sharma.
- "Build the Vision (Hack-Session)": Intensive design product accelerator.
- "Creators Hub: Ideation to Revenue": Online monetization blueprint.

Our Active Mentors:
1. Rahul Verma - Founding Engineer at BaseLabs AI (AI Agents, Docker, React, Python). SNIST Alumnus.
2. Ananya Rao - Senior Engineer at Google (Cloud, microservices, Go, Java, System Design).
3. Arjun Sharma - Co-founder of AgentCore (Startups, PostgreSQL, React Native).
4. Niharika Jain - Content Strategist & Growth Consultant (UI Design, Figma, Video editing, branding).

Features we support:
1. Proof of Impact (completed events with real outcomes, student reviews, highlight videos).
2. Live opportunities details and quick inline seat booking form.
3. Student dashboard featuring Profile editing, Certificate catalog, Learning Streaks meter, completed projects adding form, booked slots timelines.
4. Mentor Marketplace (browse, search by skill, book 1-on-1 calls, ask public Q&A questions, attend office hours via Google Meet links).

Rules for your responses:
- Start with an encouraging, energetic, and professional tone.
- Refer to Vennela if context permits (the default simulation student is Vennela Ankam from SNIST college).
- Keep answers professional, concise, encouraging, and clear.
- Always hyper-link using bold markdown the official channels when relevant! Use:
  * YouTube: https://youtube.com/@backtobase_xyz
  * LinkedIn: https://www.linkedin.com/company/backtobasee/
  * Instagram: https://www.instagram.com/backtobase_xyz/
- Focus answers around the **Mentorship, Network, and Real-World Opportunities** pillars.
`;

// Helper fallback replies when apiKey is missing
function getOfflineReply(userQuery: string): string {
  const query = userQuery.toLowerCase();
  
  if (query.includes("what is") || query.includes("about") || query.includes("backtobase") || query.includes("vision")) {
    return "At **BackToBase**, we are building a powerhouse community where dreams meet guidance. Whether you have the skill but lack the confidence, or the dream but lack the map, we provide the **Mentorship, Network, and Real-World Opportunities** to bridge the gap!\n\nYou can connect with our thriving community on our official channels:\n- 📸 **Instagram**: https://www.instagram.com/backtobase_xyz/\n- 💼 **LinkedIn**: https://www.linkedin.com/company/backtobasee/\n- 🎥 **YouTube**: https://youtube.com/@backtobase_xyz";
  }
  
  if (query.includes("instagram") || query.includes("linkedin") || query.includes("social") || query.includes("youtube") || query.includes("channel") || query.includes("follow") || query.includes("handle")) {
    return "Stay locked in with all the action in our powerhouse community! Here are our official coordinates:\n\n- 🎥 **YouTube**: [youtube.com/@backtobase_xyz](https://youtube.com/@backtobase_xyz) — Watch live showcases, alumni talks, and design bootcamps.\n- 💼 **LinkedIn**: [linkedin.com/company/backtobasee/](https://www.linkedin.com/company/backtobasee/) — Connect for career path guidance, remote contracts, and global networking.\n- 📸 **Instagram**: [instagram.com/backtobase_xyz/](https://www.instagram.com/backtobase_xyz/) — View student highlights, campus meetups, and real-time updates!\n\nGive us a follow and join the next-gen builders ecosystem!";
  }
  
  if (query.includes("mentor") || query.includes("sessions") || query.includes("book") || query.includes("network") || query.includes("marketplace")) {
    return "Yes! Through our **Mentor Marketplace**, you get direct 1-on-1 calls and guidance to bridge your confidence gap. Active Mentors available right now:\n- **Rahul Verma** (BaseLabs AI) — Expert in AI Agents, Docker, React, Python.\n- **Ananya Rao** (Google) — Senior Engineer experienced in System Design & Cloud Scalability.\n- **Arjun Sharma** (AgentCore) — Tech co-founder guiding dynamic startup blueprints.\n- **Niharika Jain** (Growth Catalyst) — Content strategist teaching storytelling, UI design, and branding.\n\nBrowse the list below and book your interactive session instantly!";
  }
  
  if (query.includes("event") || query.includes("opportunity") || query.includes("live") || query.includes("gigs") || query.includes("hack")) {
    return "We have incredible physical and digital gigs open for seat registrations right now in our **Live Opportunities** section:\n1. **WHY WHERE WHEN AI**: Snist Auditorium, Hyderabad. Let's demystify actual production systems alongside Sai Kumar and Ananya Rao.\n2. **What AI Engineers Actually Do**: Technical deployment seminar at VNR VJIET with Rahul Verma & Deepak Joshi.\n3. **Agentic AI X Data Analytics**: Seminar at JNTUH with Harshitha K & Arjun Sharma.\n4. **Build the Vision**: Product design hackathon & accelerator sprint.\n5. **Creators Hub**: Dynamic monetization blueprints to turn media into contracts.\n\nClick **Secure Spot** above to lock in your live ticket!";
  }
  
  if (query.includes("roadmap") || query.includes("path") || query.includes("step") || query.includes("growth")) {
    return "Your structured growth path contains 4 simple, high-fidelity steps designed to map your dream to guidance:\n\n- **1. ROSTER (Join)**: Step into the digital talent pool, list your skills, and align with active peers.\n- **2. MENTOR (Train)**: Work 1-on-1 with live industry alumni to solve real design challenges.\n- **3. EXPLORE (Perform)**: Participate in verified hackathons, sandboxes, and physical events.\n- **4. DEPLOY (Grow)**: Log credentials, acquire signed certificates, and unlock global contracts.\n\n(Note: We focus on practical execution, bootcamps, and exhibitions; we do not offer generic theoretical case studies).";
  }

  if (query.includes("streak") || query.includes("profile") || query.includes("certificate") || query.includes("project") || query.includes("dashboard")) {
    return "Manage your complete developer pedigree inside the **Student Dashboard**! Increase your daily **Learning Streak**, register completed products to your registry, view your verified signed badges, and check your scheduled mentor office hours.";
  }
  
  return "That is a brilliant question! At **BackToBase**, we bridge the gap where dreams meet guidance through direct mentorship, global networks, and real opportunities. Feel free to ask about our upcoming campus meetups, booking 1-on-1 alumni calls, managing your student profile, or discovering our social networks:\n- 📸 **Instagram**: https://www.instagram.com/backtobase_xyz/\n- 💼 **LinkedIn**: https://www.linkedin.com/company/backtobasee/\n- 🎥 **YouTube**: https://youtube.com/@backtobase_xyz";
}

// API Routes
app.post("/api/chat", async (req, res) => {
  const { message, history } = req.body;
  
  if (!message) {
    return res.status(400).json({ error: "Message query is required." });
  }

  if (!ai) {
    // Return mock fallback
    const mockReply = getOfflineReply(message);
    return res.json({ reply: mockReply });
  }

  try {
    const formattedHistory = (history || []).map((h: any) => ({
      role: h.role === "user" ? "user" : "model",
      parts: [{ text: h.content }],
    }));

    // Generate output utilizing modern gemini-3.5-flash
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: [
        ...formattedHistory,
        { role: "user", parts: [{ text: message }] }
      ],
      config: {
        systemInstruction: b2bSystemInstruction,
        temperature: 0.7,
      },
    });

    const reply = response.text || "I was unable to formulate a response. Please try again!";
    res.json({ reply });
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    // Gracefully send fallback message
    const mockReply = getOfflineReply(message);
    res.json({ reply: `[Gemini API Offline Mode] ${mockReply}` });
  }
});

// Configure Vite or Static Assets serving based on Node environment
async function start() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server launched successfully and listening on http://0.0.0.0:${PORT}`);
  });
}

start();
