// Everything the site says about me lives here, so updating the portfolio means editing this file.
import Vihari from '../assets/Vihari.jpg';
import CodeIt from '../assets/Code It.jpg';
import Learnify from '../assets/Learnify.jpg';
import DailyTools from '../assets/DailyTools.jpg';
import BookList from '../assets/BookListApplication.jpg';
import ImageSearch from '../assets/ImageSearch.jpg';
import AnimalsApp from '../assets/AnimalsApp.jpg';
import MeeshoLogo from '../assets/logos/meesho.png';
import IrageLogo from '../assets/logos/irage.png';
import QuestLogo from '../assets/logos/questglobal.png';
import IiitsLogo from '../assets/logos/iiits.png';
import SriChaitanyaLogo from '../assets/logos/srichaitanya.png';
import KkrGowthamLogo from '../assets/logos/kkrgowtham.jpg';

export const profile = {
  name: 'Srikar Ambula',
  firstName: 'Srikar',
  role: 'Software Engineer I · DevOps Platform',
  company: 'Meesho',
  location: 'Bangalore, India',
  hometown: 'Eluru, Andhra Pradesh',
  email: 'srikarambula.1924@gmail.com',
  resume: '/Srikar_Ambula_Resume.pdf',
  typewriter: [
    'Software Engineer',
    'Platform & DevOps',
    'Go · React · Kubernetes',
    'Full-stack developer',
  ],
  intro:
    'I build the internal platform that engineering teams at Meesho use every day to ship: self-service DevOps workflows, CI/CD with canary releases and rollbacks, and the observability around it.',
};

export const socials = [
  { name: 'LinkedIn', href: 'https://www.linkedin.com/in/srikar-ambula-66a647277/', icon: 'linkedin' },
  { name: 'GitHub', href: 'https://github.com/Srikar4510', icon: 'github' },
  { name: 'LeetCode', href: 'https://leetcode.com/u/Srikar4510/', icon: 'leetcode' },
  { name: 'GeeksforGeeks', href: 'https://www.geeksforgeeks.org/user/srikara21/', icon: 'gfg' },
];

export const about = [
  "I'm a Software Engineer on the DevOps Platform team at Meesho in Bangalore, where I've been since June 2025.",
  'Day to day I work in Go and React on the platform engineering teams use to ship: deployments, canary releases, automated rollbacks, cluster migrations, on-call tooling and incident reporting. I am currently co-leading the move to a cell-based architecture.',
  'Before Meesho I built low-latency backend services in Go at iRage for Arrow, their trading platform, and data visualisation dashboards at Quest Global. I graduated from IIIT Sri City in 2025.',
  'Outside work you will find me watching or playing cricket, following Formula 1 race weekends, or heading off on a trip decided at the last minute.',
];

export const experience = [
  {
    company: 'Meesho',
    logo: MeeshoLogo,
    role: 'Software Engineer I, DevOps Platform',
    period: 'Dec 2025 - Present',
    location: 'Bangalore',
    points: [
      'Build a full-stack Internal Developer Platform (Go, React) that turns day-to-day DevOps operations into self-service workflows for teams across the company.',
      'Engineered a DevOps operations platform (Go, MongoDB, Redis queues) that automates on-call rosters, ticket SLA tracking and leave-aware round-robin assignment.',
      'Scaled and extended the CI/CD and deployment platform: multi-zone deployments, canary releases, auto-rollbacks and release-safety controls.',
      'Drove platform changes for Kubernetes cluster migrations and zone expansions with zero downtime.',
      'Added LLM-powered ticket summaries, incident report drafts and weekly team digests to internal tools.',
      'Co-leading the shift from shared business-unit clusters to a cell-based architecture with live, zero-drop migrations.',
    ],
    tags: ['Go', 'React', 'Kubernetes', 'ArgoCD', 'Helm', 'Prometheus', 'Grafana', 'LLMs'],
  },
  {
    company: 'Meesho',
    logo: MeeshoLogo,
    role: 'Software Development Engineer Intern',
    period: 'Jun 2025 - Dec 2025',
    location: 'Bangalore',
    points: [
      'Delivered frontend and backend workflows for internal DevOps platform tools used by engineering teams.',
      'Automated repetitive infrastructure and CI/CD tasks with Kubernetes, ArgoCD, Helm and Jenkins pipelines.',
    ],
    tags: ['Kubernetes', 'ArgoCD', 'Helm', 'Jenkins'],
  },
  {
    company: 'iRage Broking Services',
    logo: IrageLogo,
    role: 'Software Development Engineer Intern',
    period: 'Dec 2024 - Jun 2025',
    location: 'Mumbai',
    link: 'https://arrow.trade/',
    points: [
      'Designed and implemented backend services in Go for Arrow, an ultra-low-latency trading platform (99% of orders executed under 4 ms).',
      'Focused on performance and reliability of critical order workflows.',
    ],
    tags: ['Go', 'Low latency', 'Trading systems'],
  },
  {
    company: 'Quest Global',
    logo: QuestLogo,
    role: 'Intern, Data Visualization',
    period: 'Jun 2024 - Jul 2024',
    location: 'Bangalore',
    points: ['Developed data visualisation tools and interactive dashboards to explore complex data relationships.'],
    tags: ['Dashboards', 'Data visualisation'],
  },
];

// Schooling before college, shown under Education on the Experience page.
export const schooling = [
  {
    school: 'Sri Chaitanya, Vijayawada',
    logo: SriChaitanyaLogo,
    degree: 'Intermediate',
    period: '2019 - 2021',
    score: '97.8%',
  },
  {
    school: "Dr. K.K.R's Gowtham School, Eluru",
    logo: KkrGowthamLogo,
    degree: 'Secondary School (SSC)',
    period: '2019',
    score: '10/10 GPA',
  },
];

export const education = {
  logo: IiitsLogo,
  short: 'IIIT Sri City',
  school: 'Indian Institute of Information Technology, Sri City',
  degree: 'B.Tech, Computer Science and Engineering',
  period: '2021 - 2025',
  score: 'CGPA 9.17',
};

export const projects = [
  {
    title: 'Vihari',
    subtitle: 'Bus & tour booking platform',
    period: 'Dec 2023 - May 2024',
    featured: true,
    category: 'Full-stack',
    image: Vihari,
    description:
      'Book buses with seat-level reservations (seater and sleeper layouts) and curated tours, pay with Razorpay, and get a PDF e-ticket by email. Partners manage buses and tours; admins approve partners and run the platform.',
    highlights: ['60+ REST APIs', '3 role-based portals', 'Razorpay payments', 'Booking chat assistant'],
    stack: ['MongoDB', 'Express', 'React', 'Node.js', 'Razorpay', 'Redis', 'Cloudinary'],
    repo: 'https://github.com/Srikar4510/vihari',
    live: 'https://vihari-nine.vercel.app/',
  },
  {
    title: 'Learnify',
    subtitle: 'Video learning platform',
    period: 'Apr 2024 - Jun 2024',
    featured: true,
    category: 'Full-stack',
    image: Learnify,
    description:
      'Creators upload course videos and students watch them. Google sign-in with OAuth 2.0, role-based access, threaded comments, and media served from AWS S3 and a CDN with pre-signed direct uploads.',
    highlights: ['OAuth 2.0', 'Pre-signed S3 uploads', 'Threaded comments'],
    stack: ['Node.js', 'Express', 'MongoDB', 'EJS', 'AWS S3'],
    repo: 'https://github.com/Srikar4510/Learnify',
    live: 'https://learnify-n5gh.onrender.com/',
  },
  {
    title: 'CodeIt',
    subtitle: 'Search engine for coding problems',
    featured: true,
    category: 'Full-stack',
    image: CodeIt,
    description:
      'Finds coding problems across LeetCode, Codeforces and InterviewBit. Uses NLP preprocessing, BM25 ranking and custom scoring to return the most relevant problems.',
    highlights: ['BM25 ranking', 'NLP', 'Web scraping'],
    stack: ['Node.js', 'Express', 'EJS', 'Selenium'],
    repo: 'https://github.com/Srikar4510/Codeit',
    live: 'https://codeit-ygfq.onrender.com/',
  },
  {
    title: 'Daily Tools',
    subtitle: 'Everyday utilities',
    category: 'Full-stack',
    image: DailyTools,
    description: 'A set of daily utilities, including a Twitter video downloader, backed by a small REST API.',
    stack: ['React', 'Node.js', 'Express'],
    repo: 'https://github.com/Srikar4510/daily-tools',
    live: 'https://daily-tools-vrv1.onrender.com/api/twitter/download',
  },
  {
    title: 'BookList',
    subtitle: 'CRUD reading list',
    category: 'Frontend',
    image: BookList,
    description: 'Add, edit and delete books, with a JSON server standing in for the backend API.',
    stack: ['React', 'JSON Server'],
    repo: 'https://github.com/Srikar4510/BookListApplication',
    live: 'https://stackblitz.com/edit/vitejs-vite-ciugny',
  },
  {
    title: 'ImageSearch',
    subtitle: 'Unsplash image search',
    category: 'Frontend',
    image: ImageSearch,
    description: 'A clean, responsive image search powered by the Unsplash API.',
    stack: ['React', 'Axios', 'Unsplash API'],
    repo: 'https://github.com/Srikar4510/ImageSearch',
    live: 'https://stackblitz.com/edit/vitejs-vite-zem7by',
  },
  {
    title: 'AnimalsApp',
    subtitle: 'React state playground',
    category: 'Frontend',
    image: AnimalsApp,
    description: 'Random animals with hearts that grow every time you click them: a small exercise in state and events.',
    stack: ['React'],
    repo: 'https://github.com/Srikar4510/AnimalsApp',
    live: 'https://stackblitz.com/edit/vitejs-vite-6mjwvz',
  },
];

// Icons are resolved in components/SkillIcon.jsx by key.
export const skillGroups = [
  { title: 'Languages', items: ['Go', 'C++', 'C', 'JavaScript', 'TypeScript', 'Python', 'SQL'] },
  { title: 'Backend & Web', items: ['Node.js', 'Express', 'React', 'REST APIs', 'gRPC', 'Temporal', 'Tailwind CSS'] },
  {
    title: 'Platform & DevOps',
    items: ['Kubernetes', 'Docker', 'ArgoCD', 'Helm', 'Terraform', 'Jenkins', 'GCP', 'Prometheus', 'Grafana'],
  },
  { title: 'Data', items: ['MongoDB', 'MySQL', 'PostgreSQL', 'Redis'] },
  { title: 'Tools & AI', items: ['Linux', 'Git', 'Postman', 'Claude', 'ChatGPT', 'Gemini', 'Grok'] },
];
