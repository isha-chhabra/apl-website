import { Activity, Bone, Bug, Dna, Droplets, FlaskConical, Heart, ShieldPlus, Syringe, TestTubes } from "lucide-react";

/** What the lab offers, as shown on the About page. Wording is the lab's own. */
export const OFFER = [
  { id: 1, title: "Hormone Tests", content: "Thyroid (T3, T4, TSH), Vitamin B12, D3, fertility tests (AMH), testosterone.", category: "Hormones", icon: Activity, relatedIds: [] },
  { id: 2, title: "Cardiac Tests", content: "Cholesterol, lipid profile, Troponin I, HS-CRP, Homocysteine.", category: "Cardiac", icon: Heart, relatedIds: [] },
  { id: 3, title: "Diabetes Testing", content: "HbA1c, fasting and post-meal blood sugar testing.", category: "Diabetes", icon: Droplets, relatedIds: [] },
  { id: 4, title: "Infectious Disease Testing", content: "Malaria, typhoid, hepatitis B, COVID-19, dengue, HIV.", category: "Infection", icon: Bug, relatedIds: [] },
  { id: 5, title: "FNAC & Biopsy", content: "Including sonography-guided FNAC for outpatient diagnosis.", category: "Pathology", icon: Syringe, relatedIds: [] },
  { id: 6, title: "Culture & Sensitivity", content: "Detecting bacteria and recommending antibiotics in urine, blood, and body fluids.", category: "Microbiology", icon: FlaskConical, relatedIds: [] },
  { id: 7, title: "Nephelometry", content: "Accurate diagnosis of renal conditions and rheumatoid arthritis.", category: "Nephelometry", icon: TestTubes, relatedIds: [] },
  { id: 8, title: "Bone Marrow Reporting", content: "For diagnosing complicated anemia and other blood conditions.", category: "Haematology", icon: Bone, relatedIds: [] },
  { id: 9, title: "Genetic Tests", content: "Double, triple & quadruple marker, chromosomal analysis, karyotyping.", category: "Genetics", icon: Dna, relatedIds: [] },
  { id: 10, title: "Cancer Markers & Allergy", content: "PSA, CA-125, CEA, plus in-vitro allergy testing.", category: "Markers", icon: ShieldPlus, relatedIds: [] },
];
