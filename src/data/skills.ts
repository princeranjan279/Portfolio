import {
  Code2, FileCode2, FileJson, Layout, LayoutTemplate,
  PanelTop, Coffee, TrendingUp, MousePointerClick,
  Search, Bot, Smartphone, MapPin, BarChart2, LineChart,
  Activity, FileSpreadsheet, Users, Compass, Briefcase,
  PenTool,
} from 'lucide-react';
import { GithubIcon, FacebookIcon } from '../components/SocialIcons';

export interface Lesson {
  title: string;
  desc: string;
}

export interface Skill {
  id: string;
  name: string;
  icon: React.ComponentType<{ size?: number; className?: string; style?: React.CSSProperties; color?: string }>;
  level: string;
  color: string;
  shortDesc: string;
  lessons: Lesson[];
  youtubeVideoId: string;
  youtubeSearchQuery: string;
}

export interface SkillGroup {
  category: string;
  icon: React.ComponentType<{ size?: number }>;
  color: string;
  gradient: string;
  desc: string;
  skills: Skill[];
}

export const skillGroups: SkillGroup[] = [
  {
    category: 'Development & Design',
    icon: Code2,
    color: '#6366f1',
    gradient: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
    desc: 'Building fast, modern web experiences',
    skills: [
      {
        id: 'react-js',
        name: 'React.js',
        level: 'Expert',
        icon: Code2,
        color: '#61dafb',
        shortDesc: 'React.js is a powerful JavaScript library for building interactive user interfaces. It uses a component-based architecture that makes building and maintaining complex UIs much simpler.',
        youtubeVideoId: 'SqcY0GlETPk',
        youtubeSearchQuery: 'react js full course',
        lessons: [
          { title: 'What is React?', desc: 'Understand the component-based model, the virtual DOM, and why React is the most popular front-end library.' },
          { title: 'JSX & Rendering', desc: 'Learn how to write JSX syntax, render elements, and embed JavaScript expressions in your markup.' },
          { title: 'Components & Props', desc: 'Create functional components, pass data via props, and compose complex UIs from simple building blocks.' },
          { title: 'State & useState Hook', desc: 'Manage dynamic data inside components using the useState hook and understand re-rendering.' },
          { title: 'useEffect & Lifecycle', desc: 'Handle side effects like API calls, subscriptions, and DOM updates with the useEffect hook.' },
          { title: 'React Router', desc: 'Build multi-page SPAs with client-side routing using react-router-dom.' },
          { title: 'State Management (Context API / Redux)', desc: 'Share state across components globally using Context API or Redux Toolkit.' },
          { title: 'Performance & Optimization', desc: 'Use React.memo, useMemo, useCallback, and lazy loading to build high-performance apps.' },
        ],
      },
      {
        id: 'typescript',
        name: 'TypeScript',
        level: 'Advanced',
        icon: FileCode2,
        color: '#3178c6',
        shortDesc: 'TypeScript is a statically typed superset of JavaScript that helps catch errors at compile time, making your code safer and more maintainable.',
        youtubeVideoId: 'BCg4U1FzuPE',
        youtubeSearchQuery: 'typescript full course beginners',
        lessons: [
          { title: 'Why TypeScript?', desc: 'Understand the problems TypeScript solves over plain JavaScript and how it improves developer experience.' },
          { title: 'Types & Interfaces', desc: 'Define custom types and interfaces to describe the shape of your data.' },
          { title: 'Generics', desc: 'Write reusable, type-safe functions and components using generics.' },
          { title: 'TypeScript with React', desc: 'Type your props, state, hooks, and event handlers in React components.' },
          { title: 'tsconfig & Tooling', desc: 'Configure your TypeScript project and integrate it with bundlers like Vite.' },
        ],
      },
      {
        id: 'javascript',
        name: 'JavaScript',
        level: 'Expert',
        icon: FileJson,
        color: '#f7df1e',
        shortDesc: 'JavaScript is the language of the web. It enables dynamic content, interactive UIs, and runs both in the browser and on the server (Node.js).',
        youtubeVideoId: 'hdI2bqOjy3c',
        youtubeSearchQuery: 'javascript full course beginners',
        lessons: [
          { title: 'Variables & Data Types', desc: 'Learn var, let, const, and the primitive types: string, number, boolean, null, undefined, symbol.' },
          { title: 'Functions & Scope', desc: 'Understand function declarations, expressions, arrow functions, closures, and the scope chain.' },
          { title: 'DOM Manipulation', desc: 'Select, create, update, and delete HTML elements using the Document Object Model.' },
          { title: 'Asynchronous JS (Promises & Async/Await)', desc: 'Handle async operations like API calls using callbacks, Promises, and async/await.' },
          { title: 'ES6+ Modern Features', desc: 'Destructuring, spread/rest, optional chaining, modules, and more.' },
          { title: 'Event Loop & Performance', desc: 'Understand how the event loop, call stack, and microtask queue work under the hood.' },
        ],
      },
      {
        id: 'html5-css3',
        name: 'HTML5 / CSS3',
        level: 'Expert',
        icon: Layout,
        color: '#e34c26',
        shortDesc: 'HTML5 and CSS3 are the building blocks of the web. HTML provides the structure and CSS handles the visual presentation and animations.',
        youtubeVideoId: 'G3e-cpL7ofc',
        youtubeSearchQuery: 'html css full course',
        lessons: [
          { title: 'Semantic HTML5', desc: 'Use meaningful tags like <header>, <main>, <section>, <article> for better accessibility and SEO.' },
          { title: 'CSS Selectors & Specificity', desc: 'Master class, ID, attribute, pseudo-class and pseudo-element selectors.' },
          { title: 'Flexbox Layout', desc: 'Build flexible one-dimensional layouts with CSS Flexbox.' },
          { title: 'CSS Grid Layout', desc: 'Create complex two-dimensional layouts with CSS Grid.' },
          { title: 'Responsive Design', desc: 'Use media queries, relative units, and fluid layouts to support all screen sizes.' },
          { title: 'CSS Animations & Transitions', desc: 'Add life to your UI with keyframe animations, transitions, and transforms.' },
        ],
      },
      {
        id: 'wordpress',
        name: 'WordPress',
        level: 'Expert',
        icon: LayoutTemplate,
        color: '#21759b',
        shortDesc: 'WordPress powers 43% of all websites. It is a flexible CMS that enables building everything from blogs to full e-commerce stores without deep coding knowledge.',
        youtubeVideoId: 'O79pJ7qXwoE',
        youtubeSearchQuery: 'wordpress full course beginners 2024',
        lessons: [
          { title: 'WordPress Installation & Hosting', desc: 'Install WordPress locally (LocalWP) and on a live server (cPanel / Hosting panel).' },
          { title: 'Themes & Customization', desc: 'Choose, install, and customize WordPress themes using the Customizer.' },
          { title: 'Plugins & WooCommerce', desc: 'Extend WordPress with plugins for forms, SEO, e-commerce, and more.' },
          { title: 'Custom Post Types & Taxonomies', desc: 'Create structured content beyond posts and pages.' },
          { title: 'WordPress SEO (Yoast/RankMath)', desc: 'Optimize WordPress sites for search engines using leading SEO plugins.' },
          { title: 'Security & Performance', desc: 'Secure your site against attacks and optimize for speed with caching and CDN.' },
        ],
      },
      {
        id: 'elementor',
        name: 'Elementor',
        level: 'Advanced',
        icon: PanelTop,
        color: '#92003b',
        shortDesc: 'Elementor is the leading visual page builder for WordPress. It lets you design pixel-perfect websites with a drag-and-drop interface — no coding needed.',
        youtubeVideoId: 'jmqu89K_LHY',
        youtubeSearchQuery: 'elementor full tutorial beginners',
        lessons: [
          { title: 'Elementor Interface Overview', desc: 'Learn the panel, canvas, sections, columns, and widget library.' },
          { title: 'Building Layouts', desc: 'Design responsive multi-column layouts using sections and inner sections.' },
          { title: 'Theme Builder', desc: 'Create custom headers, footers, single post templates, and archive pages.' },
          { title: 'Dynamic Content & Popups', desc: 'Connect to ACF, custom fields, and build marketing popups.' },
          { title: 'WooCommerce Integration', desc: 'Design custom shop, product, and cart pages with the WooCommerce builder.' },
        ],
      },
      {
        id: 'github',
        name: 'GitHub',
        level: 'Advanced',
        icon: GithubIcon,
        color: '#a5b4fc',
        shortDesc: 'GitHub is the world\'s leading platform for version control and collaboration. It uses Git to track code changes and enables teams to work together on projects.',
        youtubeVideoId: 'RGOj5yH7evk',
        youtubeSearchQuery: 'git github full course beginners',
        lessons: [
          { title: 'Git Basics (init, add, commit)', desc: 'Initialize a repository and track changes with the core Git workflow.' },
          { title: 'Branching & Merging', desc: 'Create feature branches, merge them, and resolve conflicts.' },
          { title: 'Remote Repositories & GitHub', desc: 'Push and pull code between local and remote repos on GitHub.' },
          { title: 'Pull Requests & Code Reviews', desc: 'Collaborate with teams using pull requests, reviews, and GitHub Actions.' },
          { title: 'GitHub Pages & Deployment', desc: 'Deploy static sites directly from a GitHub repository for free.' },
        ],
      },
      {
        id: 'java',
        name: 'Java',
        level: 'Intermediate',
        icon: Coffee,
        color: '#f89820',
        shortDesc: 'Java is a robust, object-oriented programming language used for enterprise applications, Android development, and backend services.',
        youtubeVideoId: 'eIrMbAQSU34',
        youtubeSearchQuery: 'java full course beginners',
        lessons: [
          { title: 'Java Basics & Setup', desc: 'Install JDK, write your first "Hello World" program, and understand the Java compilation model.' },
          { title: 'OOP Principles', desc: 'Understand classes, objects, inheritance, polymorphism, encapsulation, and abstraction.' },
          { title: 'Collections & Generics', desc: 'Use ArrayList, HashMap, and typed generics to manage data.' },
          { title: 'Exception Handling', desc: 'Handle runtime errors gracefully with try/catch/finally blocks.' },
          { title: 'Multithreading & Concurrency', desc: 'Run tasks in parallel with threads and the ExecutorService.' },
        ],
      },
    ],
  },
  {
    category: 'Marketing & SEO',
    icon: TrendingUp,
    color: '#10b981',
    gradient: 'linear-gradient(135deg, #10b981, #059669)',
    desc: 'Driving traffic, leads & brand growth',
    skills: [
      {
        id: 'meta-ads',
        name: 'Meta Ads',
        level: 'Expert',
        icon: FacebookIcon,
        color: '#1877f2',
        shortDesc: 'Meta Ads (Facebook & Instagram) is the most powerful paid social platform. Mastering it lets you precisely reach your target audience and generate high-ROI leads and sales.',
        youtubeVideoId: 'sOGCEqVozmA',
        youtubeSearchQuery: 'meta ads facebook ads full course 2024',
        lessons: [
          { title: 'Meta Business Suite Setup', desc: 'Set up your Business Manager, Ad Account, Facebook Page, and Meta Pixel.' },
          { title: 'Campaign Objectives', desc: 'Choose the right objective: Awareness, Traffic, Engagement, Leads, Sales.' },
          { title: 'Audience Targeting', desc: 'Build custom audiences, lookalike audiences, and interest-based targeting.' },
          { title: 'Ad Creative Best Practices', desc: 'Design high-converting images, videos, carousels, and ad copy.' },
          { title: 'A/B Testing & Optimization', desc: 'Test variables systematically and optimize for the best ROAS.' },
          { title: 'Retargeting Funnels', desc: 'Re-engage website visitors and warm leads with retargeting campaigns.' },
        ],
      },
      {
        id: 'google-ads',
        name: 'Google Ads',
        level: 'Advanced',
        icon: MousePointerClick,
        color: '#4285f4',
        shortDesc: 'Google Ads lets you appear at the top of Google Search when someone is actively looking for your product or service — making it one of the highest-intent ad platforms.',
        youtubeVideoId: 'JGc-BahBdFU',
        youtubeSearchQuery: 'google ads full course beginners 2024',
        lessons: [
          { title: 'Google Ads Account Structure', desc: 'Understand Campaigns, Ad Groups, and Ads hierarchy.' },
          { title: 'Keyword Research & Match Types', desc: 'Find the right keywords using Google Keyword Planner and match types.' },
          { title: 'Search Ad Copywriting', desc: 'Write compelling headlines and descriptions that drive clicks.' },
          { title: 'Bidding Strategies', desc: 'Compare Manual CPC, Target CPA, Target ROAS, and Maximize Conversions.' },
          { title: 'Conversion Tracking', desc: 'Track leads, purchases, and phone calls with Google Tag Manager.' },
          { title: 'Performance Max Campaigns', desc: 'Run AI-powered campaigns across all Google properties at once.' },
        ],
      },
      {
        id: 'seo-geo',
        name: 'SEO / GEO',
        level: 'Expert',
        icon: Search,
        color: '#10b981',
        shortDesc: 'SEO (Search Engine Optimization) improves your organic Google rankings. GEO (Generative Engine Optimization) is the emerging practice of optimizing for AI search engines like ChatGPT and Perplexity.',
        youtubeVideoId: 'xsVTqzratPs',
        youtubeSearchQuery: 'seo full course beginners 2024',
        lessons: [
          { title: 'On-Page SEO', desc: 'Optimize titles, meta descriptions, headings, URL structure, and content for search.' },
          { title: 'Technical SEO', desc: 'Fix crawl errors, improve site speed, implement schema markup, and manage sitemaps.' },
          { title: 'Off-Page SEO & Link Building', desc: 'Build high-quality backlinks through outreach, guest posting, and digital PR.' },
          { title: 'Local SEO & GMB', desc: 'Rank for "near me" searches and optimize your Google Business Profile.' },
          { title: 'Keyword Research', desc: 'Use Ahrefs, SEMrush, and Google Search Console to find and prioritize keywords.' },
          { title: 'GEO: Optimizing for AI Search', desc: 'Structure content to appear as AI citations in ChatGPT, Gemini, and Perplexity.' },
        ],
      },
      {
        id: 'ai-seo-tools',
        name: 'AI SEO Tools',
        level: 'Advanced',
        icon: Bot,
        color: '#8b5cf6',
        shortDesc: 'AI-powered SEO tools like Surfer SEO, Jasper, and SEOwind automate content optimization, competitive analysis, and keyword clustering at scale.',
        youtubeVideoId: 'oGCGUZLHjxM',
        youtubeSearchQuery: 'ai seo tools 2024 tutorial',
        lessons: [
          { title: 'Introduction to AI SEO', desc: 'Understand how AI is transforming the SEO landscape and what tools lead the market.' },
          { title: 'Content Optimization with Surfer SEO', desc: 'Use Surfer\'s Content Editor to score and optimize articles for top rankings.' },
          { title: 'AI Content Generation', desc: 'Use AI writers (Jasper, ChatGPT) to scale content production responsibly.' },
          { title: 'Keyword Clustering with AI', desc: 'Group thousands of keywords into topic clusters using AI tools.' },
          { title: 'Automated Reporting', desc: 'Set up automated SEO reports and alerts using DataStudio and AI dashboards.' },
        ],
      },
      {
        id: 'social-media',
        name: 'Social Media',
        level: 'Expert',
        icon: Smartphone,
        color: '#e1306c',
        shortDesc: 'Social media management covers strategy, content creation, community management, and analytics across LinkedIn, Instagram, Facebook, and Twitter/X.',
        youtubeVideoId: 'Q06MDGO8rYE',
        youtubeSearchQuery: 'social media marketing full course 2024',
        lessons: [
          { title: 'Platform Strategy', desc: 'Understand which platforms suit which business types and audience demographics.' },
          { title: 'Content Calendar Planning', desc: 'Plan, batch, and schedule content for consistent brand presence.' },
          { title: 'Copywriting for Social', desc: 'Write captions that stop the scroll, drive engagement, and include strong CTAs.' },
          { title: 'Reels & Short Video', desc: 'Create high-performing short-form videos for Instagram, Facebook, and YouTube Shorts.' },
          { title: 'Analytics & Reporting', desc: 'Track reach, engagement, follower growth, and tie results to business goals.' },
        ],
      },
      {
        id: 'gmb-optimization',
        name: 'GMB Optimization',
        level: 'Advanced',
        icon: MapPin,
        color: '#ea4335',
        shortDesc: 'Google Business Profile (GMB) optimization gets local businesses ranking in Google Maps and the "Local Pack" — critical for foot traffic and local lead generation.',
        youtubeVideoId: 'bMO5xc5GDMY',
        youtubeSearchQuery: 'google my business optimization 2024',
        lessons: [
          { title: 'Setting Up Google Business Profile', desc: 'Claim, verify, and fully complete your business listing.' },
          { title: 'Category & Attribute Optimization', desc: 'Select the most relevant primary and secondary categories.' },
          { title: 'Review Management Strategy', desc: 'Generate, respond to, and leverage customer reviews for ranking.' },
          { title: 'GMB Posts & Offers', desc: 'Keep your profile active with regular posts, offers, and events.' },
          { title: 'Citation Building & NAP Consistency', desc: 'Ensure your Name, Address, Phone are consistent across all directories.' },
        ],
      },
    ],
  },
  {
    category: 'Trading & Markets',
    icon: BarChart2,
    color: '#f59e0b',
    gradient: 'linear-gradient(135deg, #f59e0b, #d97706)',
    desc: 'Indian stock market analysis & strategy',
    skills: [
      {
        id: 'equity-trading',
        name: 'Equity Trading',
        level: 'Intermediate',
        icon: LineChart,
        color: '#f59e0b',
        shortDesc: 'Equity trading involves buying and selling stocks on exchanges like NSE/BSE. Understanding fundamentals, market structure, and order types is the foundation.',
        youtubeVideoId: 'p7HKvqRI_Bo',
        youtubeSearchQuery: 'equity trading india beginners 2024',
        lessons: [
          { title: 'Stock Market Basics', desc: 'Understand what stocks are, how exchanges work (NSE/BSE), and market participants.' },
          { title: 'Demat & Trading Account', desc: 'Open a Demat account with a broker (Zerodha/Groww) and understand the trading interface.' },
          { title: 'Order Types', desc: 'Market, limit, stop-loss, and bracket orders — when and how to use each.' },
          { title: 'Fundamental Analysis', desc: 'Evaluate company financials: P/E ratio, EPS, revenue growth, and debt levels.' },
          { title: 'Portfolio Construction', desc: 'Diversify across sectors, manage position sizing, and set a long-term strategy.' },
        ],
      },
      {
        id: 'intraday-analysis',
        name: 'Intraday Analysis',
        level: 'Intermediate',
        icon: Activity,
        color: '#ef4444',
        shortDesc: 'Intraday trading involves buying and selling stocks within the same trading day. It requires discipline, fast decision-making, and a solid risk management strategy.',
        youtubeVideoId: '4DSJjJFTLh8',
        youtubeSearchQuery: 'intraday trading strategy india beginners',
        lessons: [
          { title: 'Intraday vs. Delivery Trading', desc: 'Understand the key differences, margin requirements, and risk profiles.' },
          { title: 'Opening Range Breakout (ORB)', desc: 'A popular strategy based on the price range in the first 15 minutes of trading.' },
          { title: 'VWAP Strategy', desc: 'Use Volume Weighted Average Price as a reference point for intraday entries.' },
          { title: 'Risk Management & Stop Loss', desc: 'Set stop-loss levels, define your risk per trade, and protect your capital.' },
          { title: 'Trading Psychology', desc: 'Manage emotions like fear and greed that cause costly intraday mistakes.' },
        ],
      },
      {
        id: 'technical-analysis',
        name: 'Technical Analysis',
        level: 'Advanced',
        icon: TrendingUp,
        color: '#10b981',
        shortDesc: 'Technical analysis uses price charts, patterns, and indicators to predict future price movements. It is the primary toolkit for traders worldwide.',
        youtubeVideoId: 'eynxyoKgpng',
        youtubeSearchQuery: 'technical analysis stock market full course',
        lessons: [
          { title: 'Candlestick Patterns', desc: 'Read bullish/bearish engulfing, doji, hammer, and shooting star patterns.' },
          { title: 'Support & Resistance', desc: 'Identify key price levels where buying or selling pressure emerges.' },
          { title: 'Moving Averages (SMA/EMA)', desc: 'Use moving averages to identify trends and generate buy/sell signals.' },
          { title: 'RSI & MACD Indicators', desc: 'Gauge momentum and identify overbought/oversold conditions.' },
          { title: 'Chart Patterns', desc: 'Trade breakouts from Head & Shoulders, double tops, triangles, and flags.' },
          { title: 'Volume Analysis', desc: 'Confirm price moves with volume to differentiate real breakouts from fakeouts.' },
        ],
      },
      {
        id: 'ipo-analysis',
        name: 'IPO Analysis',
        level: 'Intermediate',
        icon: FileSpreadsheet,
        color: '#8b5cf6',
        shortDesc: 'IPO analysis involves evaluating a company\'s prospectus (DRHP), financials, and market conditions to decide whether to subscribe to an initial public offering.',
        youtubeVideoId: 'N0RYbWRFbI4',
        youtubeSearchQuery: 'ipo analysis india how to evaluate',
        lessons: [
          { title: 'What is an IPO?', desc: 'Understand the process of a company going public via the NSE/BSE.' },
          { title: 'Reading the DRHP', desc: 'Analyze the Draft Red Herring Prospectus: business model, financials, and risks.' },
          { title: 'Valuation Analysis', desc: 'Compare IPO price with listed peers using P/E, P/S, and EV/EBITDA ratios.' },
          { title: 'GMP (Grey Market Premium)', desc: 'Understand what GMP indicates and how to factor it into your decision.' },
          { title: 'Subscription Strategy', desc: 'Decide between retail, HNI, and QIB categories for IPO allocation.' },
        ],
      },
    ],
  },
  {
    category: 'Consulting',
    icon: Users,
    color: '#06b6d4',
    gradient: 'linear-gradient(135deg, #06b6d4, #0891b2)',
    desc: 'Mentoring the next generation of talent',
    skills: [
      {
        id: 'career-advisory',
        name: 'Career Advisory',
        level: 'Expert',
        icon: Compass,
        color: '#06b6d4',
        shortDesc: 'Career advisory helps individuals map out a clear path from education to employment or entrepreneurship. It covers skill assessment, roadmapping, and interview preparation.',
        youtubeVideoId: 'XY0moFu6CqE',
        youtubeSearchQuery: 'career guidance it jobs india roadmap 2024',
        lessons: [
          { title: 'Self-Assessment & Skills Gap', desc: 'Identify your current skills, strengths, and gaps relative to your target role.' },
          { title: 'Career Roadmapping', desc: 'Build a 6-month to 2-year career plan with milestones and learning goals.' },
          { title: 'Resume & LinkedIn Optimization', desc: 'Craft a standout resume and LinkedIn profile that gets recruiter attention.' },
          { title: 'Interview Preparation', desc: 'Practice behavioral (STAR method), technical, and HR interview rounds.' },
          { title: 'Salary Negotiation', desc: 'Research market rates and negotiate your compensation confidently.' },
        ],
      },
      {
        id: 'tech-mentorship',
        name: 'Tech Mentorship',
        level: 'Expert',
        icon: Users,
        color: '#8b5cf6',
        shortDesc: 'Tech mentorship provides personalized guidance to developers and digital marketers learning to break into the industry or advance their careers.',
        youtubeVideoId: 'ysEN5RaKOlA',
        youtubeSearchQuery: 'how to learn programming and get a job 2024',
        lessons: [
          { title: 'Choosing Your Tech Stack', desc: 'Decide between front-end, back-end, full-stack, or digital marketing paths.' },
          { title: 'Building a Learning System', desc: 'Create a structured daily learning habit using free and paid resources.' },
          { title: 'Project-Based Learning', desc: 'Build real-world projects that solve actual problems and impress employers.' },
          { title: 'Building in Public', desc: 'Share your learning journey on LinkedIn and Twitter/X to build an audience.' },
          { title: 'Finding Freelance & Full-Time Work', desc: 'Use platforms like LinkedIn, Upwork, and Toptal to land your first clients or job.' },
        ],
      },
      {
        id: 'portfolio-review',
        name: 'Portfolio Review',
        level: 'Advanced',
        icon: Briefcase,
        color: '#f59e0b',
        shortDesc: 'A portfolio review critically evaluates a developer\'s or designer\'s work portfolio for quality, presentation, and market-readiness to attract clients or employers.',
        youtubeVideoId: 'V1vvGjGSUVM',
        youtubeSearchQuery: 'developer portfolio review tips 2024',
        lessons: [
          { title: 'What Makes a Great Portfolio?', desc: 'Understand what hiring managers and clients look for in a developer portfolio.' },
          { title: 'Selecting the Right Projects', desc: 'Curate 3-5 strong projects that showcase range and problem-solving ability.' },
          { title: 'Case Study Writing', desc: 'Write compelling case studies: problem → solution → result format.' },
          { title: 'Portfolio Website Design', desc: 'Design a clean, fast, and memorable personal portfolio website.' },
          { title: 'Getting Feedback & Iterating', desc: 'Share your portfolio for peer and mentor review and continuously improve it.' },
        ],
      },
      {
        id: 'figma-ui-design',
        name: 'Figma / UI Design',
        level: 'Advanced',
        icon: PenTool,
        color: '#a259ff',
        shortDesc: 'Figma is the industry-standard UI/UX design tool. It enables designers and developers to collaborate on wireframes, prototypes, and design systems.',
        youtubeVideoId: 'FTFaQWZBqQ8',
        youtubeSearchQuery: 'figma full course beginners ui design',
        lessons: [
          { title: 'Figma Interface & Basics', desc: 'Navigate frames, layers, the toolbar, and Figma\'s collaboration features.' },
          { title: 'Components & Variants', desc: 'Build reusable component libraries with variants for states and sizes.' },
          { title: 'Auto Layout', desc: 'Create responsive, dynamic layouts that adapt automatically using Auto Layout.' },
          { title: 'Prototyping & Interactions', desc: 'Link frames and add interactions to create clickable, realistic prototypes.' },
          { title: 'Design Systems', desc: 'Build a consistent design system with tokens, typography, and color styles.' },
          { title: 'Handing Off to Developers', desc: 'Export assets, inspect CSS values, and use Dev Mode for seamless developer handoff.' },
        ],
      },
    ],
  },
];

export const flatSkills: Skill[] = skillGroups.flatMap(g =>
  g.skills.map(s => ({ ...s, color: s.color || g.color }))
);

export const skillsById: Record<string, Skill & { groupColor: string; groupName: string }> = {};
skillGroups.forEach(g => {
  g.skills.forEach(s => {
    skillsById[s.id] = { ...s, groupColor: g.color, groupName: g.category };
  });
});
