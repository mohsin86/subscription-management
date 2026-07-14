export const profile = {
  name: "Mohammed Mohasin",
  photo: "/images/mohammed-mohasin.jpg",
  title: "Senior Full Stack Developer",
  location: "Chattogram, Bangladesh",
  email: "devctg01@gmail.com",
  phone: "+8801815623468",
  linkedin: "https://linkedin.com/in/mohammed-mohasin",
  github: "https://github.com/mohsin86",
  tagline:
    "Senior full stack developer with 10+ years leading structured project delivery on eCommerce platforms and business websites, and building SaaS applications end-to-end.",
  about: [
    "I've been working in web development and technical leadership since 2012, with over 10 years of experience in full-stack development, team management, and client delivery. Most of my career has been at SEBPO, where I progressed from developer to team lead, building eCommerce platforms and business websites for international clients.",
    "I work with PHP, Node.js, Express.js, TypeScript, React, Next.js, NestJS, and AWS, and rely on tools like Jira, Asana, Trello, Slack, and Zoom in my daily workflow. I'm currently preparing for my PMP certification.",
    "I also use AI coding tools like Claude Code and Codex for development, debugging, and routine tasks — freeing me up to focus on solving problems and delivering quality software. Beyond just using them, I configure and extend these tools myself: setting up MCP servers, integrating Claude Skills, and writing hooks so they fit real development workflows and how my teams actually work.",
  ],
};

export const skills: { category: string; items: string[] }[] = [
  {
    category: "Tech Stack",
    items: [
      "PHP",
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
    category: "Tools & Platforms",
    items: ["Jira", "Asana", "Trello", "Slack", "Zoom", "Time Doctor", "Google Docs / Sheets"],
  },
];

export const experience: {
  role: string;
  company: string;
  location?: string;
  period: string;
  bullets: string[];
}[] = [
  {
    role: "Senior Software Engineer",
    company: "SEBPO",
    period: "Sep 2015 – Present",
    bullets: [
      "Manage and coordinate development teams day to day — task assignment, sprint planning, and keeping delivery on track across multiple projects",
      "Design system architecture and database schemas for large-scale web and eCommerce platforms built on PHP, Node.js, and WordPress",
      "Work directly with international clients to gather requirements, set expectations, and keep communication clear throughout delivery",
      "Handle vendor relationships and third-party integrations — payment gateways, APIs, automation tools",
      "Run regular code reviews, identify bottlenecks, and push performance improvements across the team's output",
    ],
  },
  {
    role: "Frontend Developer",
    company: "Compare Club",
    location: "Remote — Sydney, Australia",
    period: "Jul 2021 – Jul 2022",
    bullets: [
      "Worked on WordPress-based platforms — built custom plugins, themes, WooCommerce features, and ACF integrations",
      "Used AWS Lambda for serverless functions and S3 + CloudFront for static content delivery on a high-traffic financial platform",
      "Set up CI/CD pipelines with Lambda automation to make deployments faster and less manual",
      "Turned Figma/UI designs into fast, accessible web pages — ran Lighthouse audits and fixed what was slowing things down",
      "Helped maintain YourLifeChoices, one of Australia's larger lifestyle platforms, during high-traffic periods",
    ],
  },
  {
    role: "Software Engineer",
    company: "Dropndot Solutions",
    period: "Apr 2014 – Aug 2015",
    bullets: [
      "Built websites and web apps for small businesses — this is where I got solid in PHP, JavaScript, HTML, and CSS",
      "Worked closely with clients from brief to delivery — handled requirements, timelines, and handoffs",
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
    tech: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "Auth.js", "TanStack Query", "Zod", "Tailwind CSS"],
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
    hidden: true,
  },
  {
    name: "Al Musaidah Foundation",
    category: "Website",
    summary:
      "Website for a non-political, non-profit voluntary organization focused on community development in Bangladesh — supporting education, socioeconomic welfare, culture, sports, youth development, and humanitarian programs for underprivileged communities.",
    tech: ["WordPress", "PHP", "Custom Plugin Development", "Bootstrap"],
    url: "https://www.almusaidahfoundation.com/",
  },
  {
    name: "Star Plus Home Care",
    category: "Website",
    summary:
      "Site for a home health care provider offering non-medical personal and home care services to seniors and individuals in need of care, including transitional care from assisted living, hospitals, and similar settings — helping clients stay safely and comfortably in their own homes.",
    tech: ["WordPress", "PHP", "Custom Plugin Development", "Bootstrap"],
    url: "https://starplushomecare.com/",
  },
  {
    name: "Forest Gallery",
    category: "eCommerce",
    summary:
      "Art gallery eCommerce site showcasing original art from British and international artists. Built a custom plugin with a scheduled cron job that syncs the latest catalogue data from Artlogic automatically — no manual admin work needed.",
    tech: ["PHP", "WordPress", "WooCommerce", "JavaScript"],
    url: "https://www.forestgallery.com/",
    hidden: true,
  },
  {
    name: "Chartwell Speakers",
    category: "Website",
    summary:
      "Speaker agency site listing thousands of speakers with their lectures, books, and videos, plus a searchable directory and fee/availability request forms.",
    tech: ["PHP", "WordPress", "JavaScript"],
    url: "https://www.chartwellspeakers.com/",
    hidden: true,
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
    hidden: true,
  },
  {
    name: "Sneho",
    category: "eCommerce",
    summary:
      "Parenting and baby-essentials eCommerce platform with full product/stock management and user-role controls.",
    tech: ["PHP", "WordPress", "WooCommerce", "JavaScript"],
    url: "https://sneho.com.bd/",
    hidden: true,
  },
  {
    name: "School Management System",
    category: "Web Application",
    summary:
      "A school administration platform covering admissions, reporting, attendance, and login. Worked on the Admission and Report modules, fixed bugs in the Attendance and Login modules, and built student profile creation/update. The project was not released before I moved on from the role.",
    tech: ["PHP", "JavaScript"],
  },
];

export const cvDownloadUrl = "/cv/Mohammed-Mohasin-CV.docx";
