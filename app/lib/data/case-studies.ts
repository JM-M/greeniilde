export type CaseStudy = {
  id: string;
  name: string;
  location: string;
  overview: string;
  technologies: string[];
  imageUrl: string;
  date: string;
  type: string;
};

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: "dutse-jigawa-residential",
    name: "Residential Solar Installation in Dutse",
    location: "Dutse, Jigawa State, Nigeria",
    overview:
      "Installation of a 10kVA solar energy system with 17.5kWh lithium battery backup for residential use. This system ensures reliable power supply and energy independence for the homeowner.",
    technologies: [
      "Africell 11KVA inverter (with 2 built-in MPPT charge controllers)",
      "Africell 17.5KWH lithium battery",
      "Africell 550Watt solar panel (16 units)",
      "Battery and Inverter Protection System",
      "Lightning Arrestors",
      "Earthing System",
    ],
    imageUrl: "/images/case-studies/image1.jpeg",
    date: "2024",
    type: "Residential",
  },
  {
    id: "tarauni-kano-commercial",
    name: "Commercial Solar System in Tarauni",
    location: "Tarauni, Kano State, Nigeria",
    overview:
      "Installation of a 20kVA solar energy system with 30kWh energy backup for commercial use. Designed to support heavy loads and ensure business continuity.",
    technologies: [
      "Felicity 10KVA inverter (2 units paralleled for 20kVA)",
      "Felicity 120A charge controller",
      "Felicity 100A charge controller (2 units)",
      "Felicity 10KWH lithium battery (2 units)",
      "Jinko Solar Panels 500W (60 units)",
      "Protection System",
      "Lightning Arrestors",
      "Earthing System",
      "Automatic Changeover System with Fast Bus Transfer",
    ],
    imageUrl: "/images/case-studies/image2.jpg",
    date: "2024",
    type: "Commercial",
  },
  {
    id: "maiduguri-borno-residential",
    name: "High-Capacity Residential System in Maiduguri",
    location: "Maiduguri, Borno State, Nigeria",
    overview:
      "A robust 20kVA solar energy installation with 50kWh energy backup system for residential use, providing extensive autonomy and power security.",
    technologies: [
      "Yohako 10kVA inverter (2 units in parallel)",
      "Yohako 10kWh lithium battery (5 units)",
      "Felicity 100A charge controller (4 units)",
      "Jinko Monocrystalline Solar Panel (50 units)",
      "Battery and Inverter Protection System",
      "Automatic Changeover Scheme with Fast Bus Transfer",
      "Lightning Arrestors",
      "Earthing System",
    ],
    imageUrl: "/images/case-studies/image3.jpg",
    date: "2024",
    type: "Residential",
  },
];
