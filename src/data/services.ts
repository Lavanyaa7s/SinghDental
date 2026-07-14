export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
  color: string;
}

export const services: Service[] = [
  {
    id: "general",
    title: "General Dentistry",
    description: "Comprehensive oral health care for the whole family. From routine check-ups to fillings, we keep your smile healthy and bright.",
    icon: "Stethoscope",
    features: ["Annual check-ups", "Composite fillings", "Tooth extractions", "Preventive care"],
    color: "#4FB7C5",
  },
  {
    id: "braces",
    title: "Braces & Invisalign",
    description: "Straighten your smile with precision. We offer traditional metal braces and clear Invisalign aligners tailored to your lifestyle.",
    icon: "Smile",
    features: ["Metal braces", "Clear aligners", "Ceramic braces", "Retainers"],
    color: "#7C3AED",
  },
  {
    id: "implants",
    title: "Dental Implants",
    description: "Permanent, natural-looking tooth replacements that restore both function and aesthetics — designed to last a lifetime.",
    icon: "Shield",
    features: ["Single implants", "Full-arch restoration", "Bone grafting", "Implant crowns"],
    color: "#059669",
  },
  {
    id: "whitening",
    title: "Teeth Whitening",
    description: "Professional-grade whitening that delivers dramatic results safely. Achieve a brilliantly radiant smile in a single visit.",
    icon: "Sparkles",
    features: ["In-chair whitening", "Take-home kits", "LED acceleration", "Sensitivity care"],
    color: "#D97706",
  },
  {
    id: "scaling",
    title: "Scaling & Polishing",
    description: "Expert plaque and tartar removal to maintain optimal gum health. Your foundation for a lifetime of healthy teeth.",
    icon: "Wind",
    features: ["Ultrasonic scaling", "Air polishing", "Gum assessment", "Stain removal"],
    color: "#0EA5E9",
  },
  {
    id: "rootcanal",
    title: "Root Canal",
    description: "Pain-free root canal therapy using modern techniques and anesthesia. Save your natural tooth with expert endodontic care.",
    icon: "Activity",
    features: ["Single-visit RCT", "Digital X-rays", "Pain management", "Crown restoration"],
    color: "#DC2626",
  },
  {
    id: "children",
    title: "Children Dentistry",
    description: "A gentle, fun-filled dental experience designed for little smiles. We build lifelong healthy habits from an early age.",
    icon: "Heart",
    features: ["Fluoride treatment", "Fissure sealants", "Behaviour guidance", "First visit care"],
    color: "#EC4899",
  },
  {
    id: "emergency",
    title: "Emergency Dental",
    description: "When dental pain strikes, we're here. Same-day emergency appointments for urgent care when you need it most.",
    icon: "AlertCircle",
    features: ["Same-day care", "Pain relief", "Broken teeth", "Lost fillings"],
    color: "#F97316",
  },
];
