export interface Testimonial {
  name: string;
  role: string;
  text: string;
  rating: number;
  date: string;
  image: string;
}

export const initialTestimonials: Testimonial[] = [
  {
    name: 'Rahul Sharma',
    role: 'Startup Founder',
    text: 'Prince transformed our online presence completely. The website he built and the SEO strategy he executed exceeded all expectations! The attention to detail and modern design truly set him apart.',
    rating: 5,
    date: '2 months ago',
    image: '/professional_man_avatar.png'
  },
  {
    name: 'Priya Singh',
    role: 'Business Owner',
    text: "His Meta Ads expertise doubled our leads in just 2 months. Truly exceptional work — he really understands digital marketing and how to drive ROAS. A reliable partner for any growing business.",
    rating: 5,
    date: '1 month ago',
    image: '/business_woman_avatar.png'
  },
  {
    name: 'Amit Kumar',
    role: 'Fresh Graduate',
    text: 'The career advisory session with Prince gave me a clear roadmap into tech. I landed my first job within 3 months of following his plan! His guidance is practical, honest, and extremely effective.',
    rating: 5,
    date: '3 weeks ago',
    image: '/young_graduate_avatar.png'
  },
  {
    name: 'Ranjan',
    role: 'Manager, ZillionIQ',
    text: 'I really full fill with the service which i received by the Mr. Prince Ranjan, Excellent work and also i recommended to all kindly connect with him and experience the wonderfull service. I really satisfied....',
    rating: 5,
    date: 'Just now',
    image: '/prishal-logo.png' // Using this as a placeholder based on the user's screenshot
  }
];
