export interface Dentist {
  id: string;
  name: string;
  role: string;
  specialization: string;
  experience: string;
  education: string[];
  bio: string;
  image: string;
  badges: string[];
}

export const dentists: Dentist[] = [
  {
    id: "dr-harjinder",
    name: "Dr. Harjinder Singh",
    role: "Principal Dentist & Founder",
    specialization: "Implantology & Oral Surgery",
    experience: "22 years",
    education: [
      "BDS (Hons) – University of Malaya",
      "Fellowship in Implantology – ITI, Switzerland",
      "Advanced Diploma in Oral Surgery – Singapore",
    ],
    bio: "Dr. Harjinder Singh founded Singh Dental Clinic with a singular vision: to bring world-class dentistry to every patient who walks through our doors. With over 22 years of clinical experience, he specialises in complex implant cases and full-arch rehabilitations. A passionate educator, he regularly lectures at dental conferences across Southeast Asia and mentors the next generation of clinicians.",
    image: "/images/dentist-1.jpg",
    badges: ["ITI Fellow", "MFDS RCS", "Implant Specialist"],
  },
  {
    id: "dr-preethi",
    name: "Dr. Preethi Kaur",
    role: "Senior Associate Dentist",
    specialization: "Orthodontics & Invisalign",
    experience: "12 years",
    education: [
      "BDS – National University of Singapore",
      "MSc Orthodontics – King's College London",
      "Invisalign Diamond Provider",
    ],
    bio: "Dr. Preethi is our resident orthodontic expert, transforming smiles with both precision and artistry. With a Master's from King's College London, she brings a highly refined approach to every case — from traditional braces to complex Invisalign treatments. Her warm chairside manner makes patients feel at ease throughout their smile journey.",
    image: "/images/dentist-2.jpg",
    badges: ["MSc Orthodontics", "Diamond Invisalign", "KCL Alumna"],
  },
  {
    id: "dr-rajiv",
    name: "Dr. Rajiv Bhatia",
    role: "Associate Dentist",
    specialization: "Aesthetics & Restorative",
    experience: "8 years",
    education: [
      "BDS – University of Sydney",
      "Graduate Diploma in Aesthetic Dentistry – AEEDC",
      "Certified CEREC Operator",
    ],
    bio: "Dr. Rajiv brings a fresh, contemporary perspective to aesthetic and restorative dentistry. Trained in Sydney and certified in CEREC CAD/CAM technology, he crafts porcelain veneers, crowns, and smile makeovers with meticulous attention to detail. He believes every smile tells a story — and he's here to help you tell yours beautifully.",
    image: "/images/dentist-3.jpg",
    badges: ["Aesthetic Dentistry", "CEREC Certified", "Sydney Grad"],
  },
];
