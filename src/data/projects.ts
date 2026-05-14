export interface Project {
  id: string;
  title: string;
  category: string;
  tags: string[];
  desc: string;
  color: string;
  emoji: string;
  live: string;
  image: string;
  github?: string;
  isFeatured: boolean;
}

export const projectCategories = [
  "All",
  "Corporate & IT",
  "Healthcare",
  "Real Estate",
  "Hospitality",
  "Education",
  "E-commerce",
  "Marketing",
  "Others"
];

export const allProjects: Project[] = [
  // Corporate & IT
  {
    id: "prishal-ai",
    title: "Prishal Technolabs",
    category: "Corporate & IT",
    tags: ["React", "AI", "Corporate"],
    desc: "Official digital presence for Prishal Technolabs, an innovative AI and IT solutions provider.",
    color: "#5e72e4",
    emoji: "🏢",
    live: "https://prishal.ai/",
    image: "/prishal-logo.png",
    isFeatured: true
  },
  {
    id: "callix",
    title: "Callix AI",
    category: "Corporate & IT",
    tags: ["SaaS", "USA", "AI"],
    desc: "A USA-based platform utilizing advanced AI technologies for streamlined business communications.",
    color: "#8b5cf6",
    emoji: "🤖",
    live: "https://callix.ai/",
    image: "/callix-logo.png",
    isFeatured: true
  },
  {
    id: "wealthopedia",
    title: "Wealthopedia",
    category: "Corporate & IT",
    tags: ["Finance", "USA", "Consulting"],
    desc: "A financial consulting and wealth management platform based in the USA.",
    color: "#10b981",
    emoji: "📈",
    live: "https://wealthopedia.com/",
    image: "https://unavatar.io/wealthopedia.com",
    isFeatured: false
  },
  {
    id: "vmslide",
    title: "VM Slide",
    category: "Corporate & IT",
    tags: ["Tech", "USA", "B2B"],
    desc: "A technology-driven B2B platform based in the USA focusing on modern digital solutions.",
    color: "#3b82f6",
    emoji: "💻",
    live: "https://vmslide.com/",
    image: "/vmslide-logo.png",
    isFeatured: false
  },
  {
    id: "gtknetworks",
    title: "GTK Networks",
    category: "Corporate & IT",
    tags: ["IT Services", "USA", "Network"],
    desc: "An IT and networking infrastructure solutions provider operating in the USA.",
    color: "#0ea5e9",
    emoji: "🌐",
    live: "https://gtknetworks.com/",
    image: "/gtknetworks-logo.png",
    isFeatured: false
  },

  // Healthcare
  {
    id: "rajshree-healthcare",
    title: "Rajshree Healthcare",
    category: "Healthcare",
    tags: ["Medical", "Hospital", "Care"],
    desc: "A comprehensive digital platform for Rajshree Healthcare, showcasing their medical facilities and services.",
    color: "#ef4444",
    emoji: "🏥",
    live: "https://rajshreehealthcare.com/",
    image: "/rajshreehealthcare-logo.png",
    isFeatured: true
  },
  {
    id: "metro-care-imaging",
    title: "Metro Care Imaging",
    category: "Healthcare",
    tags: ["Diagnostics", "Medical", "Clinic"],
    desc: "A diagnostic and imaging center website providing easy access to patient services and facility details.",
    color: "#06b6d4",
    emoji: "🩺",
    live: "https://metrocareimaging.com/",
    image: "https://unavatar.io/metrocareimaging.com",
    isFeatured: false
  },
  {
    id: "dr-rajesh-ranjan",
    title: "Dr. Rajesh Ranjan",
    category: "Healthcare",
    tags: ["Doctor", "Portfolio", "Medical"],
    desc: "Personalized professional portfolio and appointment booking system for Dr. Rajesh Ranjan.",
    color: "#14b8a6",
    emoji: "👨‍⚕️",
    live: "https://drrajeshranjan.com/",
    image: "https://unavatar.io/drrajeshranjan.com",
    isFeatured: false
  },
  {
    id: "dr-manshi-rajput",
    title: "Dr. Manshi Rajput Dental Clinic",
    category: "Healthcare",
    tags: ["Dental", "Clinic", "Medical"],
    desc: "A dedicated dental clinic website associated with Rajdev Hospital for patient outreach.",
    color: "#f43f5e",
    emoji: "🦷",
    live: "https://dentalclinic.rajdevhospital.com/",
    image: "/rajdevdental-logo.png",
    isFeatured: false
  },
  {
    id: "narsingh-derma",
    title: "Narsingh Derma Clinic",
    category: "Healthcare",
    tags: ["Dermatology", "Clinic", "Care"],
    desc: "A specialized dermatology clinic website focusing on skin care treatments and patient appointments.",
    color: "#ec4899",
    emoji: "✨",
    live: "https://narsinghdermaclinic.com/",
    image: "https://unavatar.io/narsinghdermaclinic.com",
    isFeatured: false
  },
  {
    id: "shishulok",
    title: "Shishulok Children Hospital",
    category: "Healthcare",
    tags: ["Pediatrics", "Hospital", "Care"],
    desc: "A pediatric hospital website ensuring a comforting digital presence for parents seeking specialized care.",
    color: "#8b5cf6",
    emoji: "👶",
    live: "https://shishulokchildrenhospital.com/",
    image: "https://unavatar.io/shishulokchildrenhospital.com",
    isFeatured: false
  },

  // Real Estate
  {
    id: "peppl-in",
    title: "Peppl Group",
    category: "Real Estate",
    tags: ["Real Estate", "Corporate", "Group"],
    desc: "The central corporate portal for Peppl Group, a leading name in real estate and infrastructure.",
    color: "#f59e0b",
    emoji: "🏢",
    live: "https://peppl.in",
    image: "https://unavatar.io/peppl.in",
    isFeatured: true
  },
  {
    id: "peppl-construction",
    title: "Peppl Construction",
    category: "Real Estate",
    tags: ["Construction", "Builders", "Real Estate"],
    desc: "A subsidiary site showcasing large-scale construction projects and engineering capabilities.",
    color: "#eab308",
    emoji: "🏗️",
    live: "https://pepplconstruction.com",
    image: "https://unavatar.io/pepplconstruction.com",
    isFeatured: false
  },
  {
    id: "peppl-infracon",
    title: "Peppl Infracon",
    category: "Real Estate",
    tags: ["Infrastructure", "Development", "Real Estate"],
    desc: "Highlighting major infrastructure developments and urban planning initiatives by Peppl Group.",
    color: "#d97706",
    emoji: "🌉",
    live: "https://pepplinfracon.com",
    image: "https://unavatar.io/pepplinfracon.com",
    isFeatured: false
  },
  {
    id: "pragya-engicon",
    title: "Pragya Engicon (Peppl)",
    category: "Real Estate",
    tags: ["Engineering", "Real Estate", "Projects"],
    desc: "Focused on architectural engineering and execution for high-value real estate projects.",
    color: "#b45309",
    emoji: "📐",
    live: "https://pragyaengicon.com",
    image: "https://unavatar.io/pragyaengicon.com",
    isFeatured: false
  },

  // Hospitality & Food
  {
    id: "vrihiskydeck",
    title: "Vrihi SkyDeck",
    category: "Hospitality",
    tags: ["Restaurant", "Dining", "Meta Ads"],
    desc: "A premium dining experience website. Also managed highly successful Meta Ads campaigns for this brand.",
    color: "#f43f5e",
    emoji: "🍽️",
    live: "https://www.vrihiskydeck.com/",
    image: "/vrihiskydeck-logo.png",
    isFeatured: false
  },
  {
    id: "hotel-magadhi",
    title: "Hotel Magadhi",
    category: "Hospitality",
    tags: ["Hotel", "Stay", "Booking"],
    desc: "A full-featured hospitality website with room showcases, amenities, and reservation functionality.",
    color: "#8b5cf6",
    emoji: "🏨",
    live: "https://hotelmagadhi.com/",
    image: "/magadhi-logo.jpg",
    isFeatured: false
  },
  {
    id: "munnaji-catering",
    title: "Munna Ji Catering",
    category: "Hospitality",
    tags: ["Catering", "Events", "Food"],
    desc: "A service-oriented site for a leading catering business, highlighting their menu and event management.",
    color: "#f59e0b",
    emoji: "🍲",
    live: "https://munnajicateringservices.com/",
    image: "https://unavatar.io/munnajicateringservices.com",
    isFeatured: false
  },

  // Education & Academy
  {
    id: "bibinogs",
    title: "BibiNogs Pre-School",
    category: "Education",
    tags: ["School", "Kids", "Education"],
    desc: "A vibrant and engaging platform for a pre-school, designed specifically to appeal to parents.",
    color: "#ec4899",
    emoji: "🏫",
    live: "https://www.bibinogs.in/",
    image: "https://unavatar.io/bibinogs.in",
    isFeatured: false
  },
  {
    id: "sssasports",
    title: "Saket Singh Shooting Academy",
    category: "Education",
    tags: ["Sports", "Academy", "Training"],
    desc: "A professional sports academy website providing training details, schedules, and membership info.",
    color: "#10b981",
    emoji: "🎯",
    live: "https://sssasports.com/",
    image: "/sssa-logo.png",
    isFeatured: false
  },
  {
    id: "lakki-dance",
    title: "Lakkie Dance Academy",
    category: "Education",
    tags: ["Dance", "Academy", "Arts"],
    desc: "A creative digital space for a dance academy to showcase performances and class schedules.",
    color: "#8b5cf6",
    emoji: "💃",
    live: "https://lakkidanceacademy.com/",
    image: "/lakkie-logo.png",
    isFeatured: false
  },

  // E-commerce
  {
    id: "apex-enterprises",
    title: "Apex Enterprises",
    category: "E-commerce",
    tags: ["E-commerce", "Products", "Retail"],
    desc: "A fully functional product-based e-commerce platform designed for seamless online shopping.",
    color: "#06b6d4",
    emoji: "🛒",
    live: "https://apexenterprisesindia.com/",
    image: "/apexenterprises-logo.png",
    isFeatured: false
  },

  // Marketing Specific
  {
    id: "pangat",
    title: "Pangat Restaurant",
    category: "Marketing",
    tags: ["Meta Ads", "Restaurant", "Growth"],
    desc: "Executed comprehensive, high-conversion Meta Ads campaigns to significantly boost footfall and brand awareness.",
    color: "#fb923c",
    emoji: "📈",
    live: "#",
    image: "/pangat-logo.png",
    isFeatured: false
  },

  // Others
  {
    id: "lakkie-vishwakarma",
    title: "Lakkie Vishwakarma",
    category: "Others",
    tags: ["Portfolio", "Personal", "Creative"],
    desc: "A personal portfolio website designed to showcase individual creative work and achievements.",
    color: "#a855f7",
    emoji: "👤",
    live: "https://lakkievishwakarma.com/",
    image: "https://unavatar.io/lakkievishwakarma.com",
    isFeatured: false
  },
  {
    id: "kyms-mushroom",
    title: "Kyms Mushroom Farm",
    category: "Others",
    tags: ["Farming", "Agriculture", "Business"],
    desc: "A business website for a specialized mushroom farm, detailing their organic products and supply chain.",
    color: "#84cc16",
    emoji: "🍄",
    live: "https://kymsorgofarm.com/",
    image: "https://unavatar.io/kymsorgofarm.com",
    isFeatured: false
  },
  {
    id: "amritdhun",
    title: "Amrit Dhun",
    category: "Others",
    tags: ["Music", "Organization", "Arts"],
    desc: "A digital hub for a musical organization, featuring their releases and cultural contributions.",
    color: "#e11d48",
    emoji: "🎵",
    live: "https://amritdhun.com/",
    image: "/amritdhun-logo.png",
    isFeatured: false
  },
  {
    id: "krishnaamritfilms",
    title: "Krishna Amrit Films",
    category: "Others",
    tags: ["Production", "Films", "Media"],
    desc: "A media production company portfolio showcasing film projects, team members, and services.",
    color: "#4f46e5",
    emoji: "🎬",
    live: "https://krishnaamritfilms.com/",
    image: "/krishnaamritfilm-logo.png",
    isFeatured: false
  }
];
