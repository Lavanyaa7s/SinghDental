export interface Testimonial {
  id: string;
  name: string;
  rating: number;
  review: string;
  date: string;
  treatment: string;
  initials: string;
  color: string;
}

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    name: "Amelia Tan",
    rating: 5,
    review: "Absolutely incredible experience from start to finish. Dr. Harjinder is exceptionally skilled and made me feel completely at ease. My dental implants look and feel completely natural. Worth every penny!",
    date: "2 weeks ago",
    treatment: "Dental Implants",
    initials: "AT",
    color: "#4FB7C5",
  },
  {
    id: "t2",
    name: "Marcus Loh",
    rating: 5,
    review: "After years of crooked teeth, Dr. Preethi transformed my smile with Invisalign in just 14 months. The team's attention to detail is unmatched. I can't stop smiling now!",
    date: "1 month ago",
    treatment: "Invisalign",
    initials: "ML",
    color: "#7C3AED",
  },
  {
    id: "t3",
    name: "Rashida Begum",
    rating: 5,
    review: "I was terrified of dentists until I came here. The clinic is stunning, the staff are so warm, and Dr. Rajiv made my root canal completely painless. I actually look forward to my appointments now!",
    date: "3 weeks ago",
    treatment: "Root Canal",
    initials: "RB",
    color: "#EC4899",
  },
  {
    id: "t4",
    name: "David Chen",
    rating: 5,
    review: "The whitening treatment at Singh Dental gave me results I didn't think were possible. Six shades lighter in one session. My colleagues didn't recognise me on Monday morning!",
    date: "1 month ago",
    treatment: "Teeth Whitening",
    initials: "DC",
    color: "#D97706",
  },
  {
    id: "t5",
    name: "Siti Norzahra",
    rating: 5,
    review: "Brought my 5-year-old for her first dental visit and the team was phenomenal with her. She actually asked when she can go back! The children's area is adorable and welcoming.",
    date: "2 months ago",
    treatment: "Children Dentistry",
    initials: "SN",
    color: "#059669",
  },
  {
    id: "t6",
    name: "Arjun Mehta",
    rating: 5,
    review: "Had a dental emergency on a Sunday evening — cracked a tooth badly. Called Singh Dental and they had me in first thing Monday. The care and professionalism are second to none.",
    date: "3 months ago",
    treatment: "Emergency Dental",
    initials: "AM",
    color: "#F97316",
  },
  {
    id: "t7",
    name: "Hui Ling Tan",
    rating: 5,
    review: "Dr. Rajiv crafted my porcelain veneers with such precision — they're indistinguishable from my natural teeth but so much more beautiful. The whole experience was luxurious.",
    date: "6 weeks ago",
    treatment: "Porcelain Veneers",
    initials: "HL",
    color: "#0EA5E9",
  },
  {
    id: "t8",
    name: "Vikram Sharma",
    rating: 5,
    review: "Three years of braces with Dr. Preethi and the results are jaw-dropping. Her expertise and the clinic's technology made the journey smooth. My confidence has completely transformed.",
    date: "2 months ago",
    treatment: "Orthodontics",
    initials: "VS",
    color: "#DC2626",
  },
];
