export const profile = {
  name: "Mohammed Mohasin",
  photo: "/images/mohammed-mohasin.jpg",
  title: "Full-Stack Developer — Node.js · TypeScript · Next.js · React · NestJS · PHP · WordPress",
  location: "Chattogram, Bangladesh",
  email: "devctg01@gmail.com",
  phone: "+8801815623468",
  linkedin: "https://linkedin.com/in/mohammed-mohasin",
  github: "https://github.com/mohsin86",
  tagline:
    "I build things that work: eCommerce platforms, business websites, and SaaS apps focused on solving the actual problem, not just checking boxes.",
  about: [
  "I got into web development early on — started as a developer, and made it a point to own what I built end to end, not just hand it off once the code was written. Most of that time has been at SEBPO, working on eCommerce and business platforms for clients across the US, Australia, and a few other places.",
  "Day to day that's understanding what a client actually needs, keeping stakeholders in the loop, and making sure what ships lines up with the business goal — not just what's easiest to build. Code reviews and sprint planning keep the team aligned along the way.",
  "I've been using AI tools — Claude Code, Codex — as part of how I actually build, not just for quick snippets, using MCP servers and custom skills to fit them into real workflows. I'm also finishing my PMP certification, mostly to put a formal label on the project management side I've already been doing for years.",
  ],

};

export const skills: { category: string; items: string[] }[] = [
  {
    category: "Tech Stack",
    items: [
      "PHP",
      "Laravel",
      "Node.js",
      "Express.js",
      "TypeScript",
      "React",
      "Next.js",
      "NestJS",
      "WordPress",
      "WooCommerce",
      "MySQL",
      "PostgreSQL",
      "MongoDB",
      "TypeORM",
    ],
  },
  {
    category: "AI-Assisted Development",
    items: [
      "Claude Code & Codex (agentic coding)",
      "MCP (Model Context Protocol) integration",
      "Claude Skills integration",
      "Hooks & workflow automation",
      "AI pair-programming",
      "Prompt-driven development workflows",
      "Rapid prototyping & shipping with AI agents",
    ],
  },
  {
    category: "Cloud & DevOps",
    items: ["AWS (Lambda, S3, CloudFront)", "Docker", "CI/CD", "Git", "Hosting, DNS, server management"],
  },
  {
    category: "Leadership & Coordination",
    items: [
      "Team & task coordination",
      "Vendor communication",
      "Stakeholder communication",
      "System architecture & design",
    ],
  },
  {
    category: "Project Management & Collaboration Tools",
    items: ["Jira", "Asana", "Trello", "Slack", "Zoom", "Time Doctor", "Google Docs / Sheets", "Microsoft Excel", "Microsoft Word"],

  },

];

export const experience: {
  role: string;
  company: string;
  type?: string;
  location?: string;
  period: string;
  bullets: string[];
}[] = [
  {
    role: "Senior Software Engineer",
    company: "SEBPO",
    type: "Full-time",
    location: "Dhaka, Bangladesh · Hybrid",
    period: "Sep 2015 – Present",
    bullets: [
      "Coordinate a team of 8 developers day to day — task assignment, sprint planning, and delivery tracking across up to 5 concurrent projects",
      "Design system architecture and database schemas for 4 eCommerce/business platforms — including fullycharged.com, forestgallery.com, chartwellspeakers.com, and snehomart.com — serving roughly 2,000–3,000 daily users",
      "Work directly with clients across the US, Australia, and other regions to gather requirements and manage delivery expectations",
      "Manage vendor communication for third-party integrations — a payment gateway and an SMS gateway (OTP-based login authentication)",
      "Run code reviews across the team, identifying bottlenecks — improved page load performance by roughly 25–30% on a legacy project",
    ],
  },
  {
    role: "Frontend Developer",
    company: "Compare Club",
    type: "Contract",
    location: "Remote — Sydney, Australia",
    period: "Jul 2021 – Jul 2022",
    bullets: [
      "Built custom WordPress plugins, themes, and ACF integrations for YourLifeChoices (yourlifechoices.com.au), one of Australia's larger lifestyle platforms",
      "Used AWS Lambda for serverless functions and S3 + CloudFront for static content delivery, supporting 5,000+ users including during high-traffic periods",
      "Maintained CI/CD pipelines with Lambda automation, helping cut deployment time by 40%",
      "Converted Figma/UI designs into accessible web pages; ran Lighthouse audits and brought performance scores up to 98",
    ],
  },
  {
    role: "Software Engineer",
    company: "Dropndot Solutions",
    period: "Apr 2014 – Aug 2015",
    bullets: [
      "Built websites and web apps for 10 small businesses — this is where I got solid in PHP, JavaScript, HTML, and CSS",
      "Delivered completed projects to senior engineers for client hand-off and final sign-off",
    ],
  },
];

export const education = [
  {
    degree: "Bachelor of Engineering (BE) — Computer Science",
    school: "International Islamic University Chittagong",
    period: "Dec 2009 – Dec 2012",
  },
];

export const certifications = [
  "PMP Exam Preparation — 35 Contact Hours (In Progress)",
  "AWS Fundamentals",
  "MongoDB Certifications",
  "DataCamp Python Courses",
];

export const personalProjects: {
  name: string;
  description: string;
  tech: string[];
  liveUrl?: string;
  githubUrl?: string;
}[] = [
  {
    name: "Subscription Tracker",
    description:
      "The app you're on right now — a subscription-management tool built as a hands-on Next.js App Router project. Covers authentication (credentials + Google via Auth.js), a Prisma/PostgreSQL-backed CRUD flow, Zod validation, and TanStack Query on the client. Built collaboratively with Claude Code as a real, live example of agentic AI-assisted development — from database migrations to UI to shipping.",
    tech: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "Auth.js", "TanStack Query", "Zod", "Tailwind CSS","Docker",],
    liveUrl: "https://mohammed-mohasin.vercel.app/subscription-management/login",
    githubUrl: "https://github.com/mohsin86/subscription-management",
  },
  {
    name: "Auto Garage Services",
    description:
      "A full-stack, role-based garage operations platform for managing real garage workflows — customers, vehicles, service job cards, mechanic assignments, task progress, comments, parts/tools procurement, invoices, payments, reports, and dashboard analytics. Admins manage the whole operation, mechanics track assigned jobs, and customers follow their vehicle's service progress and invoices.",
    tech: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "shadcn/ui",
      "TanStack Query",
      "NestJS",
      "TypeORM",
      "PostgreSQL",
      "JWT Auth",
      "Docker",
    ],
    liveUrl: "https://auto-garage-services.vercel.app/",
    githubUrl: "https://github.com/mohsin86/auto-garage-services",
  },
  {
    name: "Al Musaidah Foundation",
    description:
      "Website for a non-political, non-profit voluntary organization focused on community development in Bangladesh — supporting education, socioeconomic welfare, culture, sports, youth development, and humanitarian programs for underprivileged communities.",
    tech: ["WordPress", "PHP", "Custom Plugin Development", "Bootstrap"],
    liveUrl: "https://www.almusaidahfoundation.com/",
  },
  {
    name: "Star Plus Home Care",
    description:
      "Site for a home health care provider offering non-medical personal and home care services to seniors and individuals in need of care, including transitional care from assisted living, hospitals, and similar settings — helping clients stay safely and comfortably in their own homes.",
    tech: ["WordPress", "PHP", "Custom Plugin Development", "Bootstrap"],
    liveUrl: "https://starplushomecare.com/",
  },
  {
    name: "School Management System",
    description:
      "A school administration platform covering admissions, reporting, attendance, and login. Worked on the Admission and Report modules, fixed bugs in the Attendance and Login modules, and built student profile creation/update. The project was not released before I moved on from the role.",
    tech: ["PHP", "JavaScript"],
  },
];

export const clientProjects: {
  name: string;
  category: string;
  summary: string;
  tech: string[];
  url?: string;
  hidden?: boolean;
}[] = [
  {
    name: "HTML5 Animated Banner Development",
    category: "Marketing Tool",
    summary:
      "A configurable, timeline-based animated HTML5 banner system. Clients edit a config file for their own content — title, tagline, images — which gets mapped and bound dynamically into an HTML5 template with JavaScript, then animated with GreenSock (GSAP) or jQuery depending on the requirements.",
    tech: ["HTML5", "JavaScript", "GreenSock (GSAP)", "jQuery"],
  },
  {
    name: "Your Life Choices",
    category: "Web Application",
    summary:
      "Worked across both frontend and backend for one of Australia's larger lifestyle platforms — developed custom plugins, integrated third-party APIs, optimized the community forum, and built HTML layouts from scratch.",
    tech: ["PHP", "JavaScript", "AWS CI/CD", "AWS S3", "AWS Elastic Beanstalk", "CloudFlare"],
    url: "https://www.yourlifechoices.com.au/",
  },
  {
    name: "Fully Charged",
    category: "eCommerce",
    summary:
      "UK-based retailer of e-bikes and electric bikes — stock control, customer reviews, test-ride booking, and a full product catalogue across online and offline sales.",
    tech: ["PHP", "OpenCart", "SASS", "JavaScript"],
    url: "https://www.fullycharged.com/",
    hidden: false,
  },
  {
    name: "Forest Gallery",
    category: "eCommerce",
    summary:
      "Art gallery eCommerce site showcasing original art from British and international artists. Built a custom plugin with a scheduled cron job that syncs the latest catalogue data from Artlogic automatically — no manual admin work needed.",
    tech: ["PHP", "WordPress", "WooCommerce", "JavaScript"],
    url: "https://www.forestgallery.com/",
    hidden: false,
  },
  {
    name: "Chartwell Speakers",
    category: "Website",
    summary:
      "Speaker agency site listing thousands of speakers with their lectures, books, and videos, plus a searchable directory and fee/availability request forms.",
    tech: ["PHP", "WordPress", "JavaScript"],
    url: "https://www.chartwellspeakers.com/",
    hidden: false,
  },
  {
    name: "Product Scrapper",
    category: "Web Application",
    summary:
      "Internal dashboard for GroupM that searches a product term and pulls back live stock, price, and image data from major retailers (Walmart, Amazon, Target, Kroger, Costco, Walgreens) using headless Chromium.",
    tech: ["Node.js", "Express.js", "Puppeteer", "Handlebars"],
  },
  {
    name: "AIIM Global",
    category: "Website",
    summary:
      "Corporate site for a global technology company listing their full service portfolio — BI, data center, network, cloud infrastructure, and IT security solutions — along with their partner/distributor network.",
    tech: ["PHP", "WordPress", "JavaScript"],
    url: "https://www.aiimglobal.com/",
    hidden: false,
  },
  {
    name: "Sneho",
    category: "eCommerce",
    summary:
      "Parenting and baby-essentials eCommerce platform with full product/stock management and user-role controls.",
    tech: ["PHP", "WordPress", "WooCommerce", "JavaScript"],
    url: "https://sneho.com.bd/",
    hidden: false,
  },
];

export const cvDownloadUrl = "/cv/Mohammed-Mohasin-CV.docx";
