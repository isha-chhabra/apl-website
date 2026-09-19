/**
 * Preventive Health Check-Up Packages.
 * Transcribed from the lab's package chart (public/packages-chart.webp).
 * Wording is exact. Do not paraphrase names or test labels.
 */

export type PackageId = "package-1" | "package-2" | "package-3" | "package-4" | "gold";

export type HealthPackage = {
  id: PackageId;
  /** Position in the ladder, 0 to 4. */
  index: number;
  /** "Package 1" */
  name: string;
  /** "Basic" */
  tier: string;
  /** "Package 1 (Basic)" as printed on the chart. */
  label: string;
  /** Short column label for tight spaces. */
  short: string;
  mrp: number;
  offer: number;
  save: number;
};

export const PACKAGES: HealthPackage[] = [
  { id: "package-1", index: 0, name: "Package 1", tier: "Basic", label: "Package 1 (Basic)", short: "1", mrp: 2650, offer: 1499, save: 1151 },
  { id: "package-2", index: 1, name: "Package 2", tier: "Standard", label: "Package 2 (Standard)", short: "2", mrp: 3150, offer: 1700, save: 1450 },
  { id: "package-3", index: 2, name: "Package 3", tier: "Advanced", label: "Package 3 (Advanced)", short: "3", mrp: 6450, offer: 3800, save: 2650 },
  { id: "package-4", index: 3, name: "Package 4", tier: "Comprehensive", label: "Package 4 (Comprehensive)", short: "4", mrp: 8500, offer: 5000, save: 3500 },
  { id: "gold", index: 4, name: "Gold Package", tier: "Complete Health", label: "Gold Package (Complete Health)", short: "Gold", mrp: 18500, offer: 9999, save: 8501 },
];

export type IconKey =
  | "blood"
  | "kidney"
  | "diabetes"
  | "lipid"
  | "liver"
  | "thyroid"
  | "vitamins"
  | "metabolic"
  | "inflammation"
  | "iron"
  | "tumor"
  | "heart"
  | "digestive"
  | "clots";

export type PackageTest = {
  name: string;
  /** Index of the first package that includes this test. Every later package includes it too. */
  from: number;
};

export type TestGroup = {
  id: string;
  /** Body function, as printed on the chart. */
  name: string;
  icon: IconKey;
  /** Extra words people might search for. Not shown. */
  keywords: string;
  tests: PackageTest[];
};

const t = (name: string, from: number): PackageTest => ({ name, from });

export const GROUPS: TestGroup[] = [
  {
    id: "blood",
    name: "Complete Blood & General Health",
    icon: "blood",
    keywords: "blood cbc anemia anaemia hemoglobin haemoglobin urine general fever infection weakness",
    tests: [t("Complete Blood Count (CBC)", 0), t("ESR", 0), t("Absolute Eosinophil Count (AEC)", 0), t("Urine Routine", 0)],
  },
  {
    id: "kidney",
    name: "Kidney Function",
    icon: "kidney",
    keywords: "kidney renal urea creatinine uric acid gout calcium egfr stone",
    tests: [t("Urea", 0), t("Creatinine", 0), t("Uric Acid", 0), t("Calcium", 0), t("eGFR", 0)],
  },
  {
    id: "diabetes-screening",
    name: "Diabetes Screening",
    icon: "diabetes",
    keywords: "diabetes sugar glucose fasting hba1c pp",
    tests: [t("Fasting Blood Sugar (FBS)", 0), t("HbA1c", 0), t("PP2 BS", 0)],
  },
  {
    id: "lipid",
    name: "Lipid Profile",
    icon: "lipid",
    keywords: "cholesterol lipid triglyceride hdl ldl fat heart",
    tests: [t("Lipid Profile", 0)],
  },
  {
    id: "liver",
    name: "Liver Function",
    icon: "liver",
    keywords: "liver sgpt sgot bilirubin jaundice lft hepatic",
    tests: [t("SGPT", 0), t("SGOT", 0), t("Bilirubin", 0), t("Liver Function Tests (10 Tests)", 3)],
  },
  {
    id: "thyroid",
    name: "Thyroid Profile",
    icon: "thyroid",
    keywords: "thyroid t3 t4 tsh hormone weight tired",
    tests: [t("T3", 1), t("T4", 1), t("TSH", 1)],
  },
  {
    id: "vitamins",
    name: "Vitamins & Minerals",
    icon: "vitamins",
    keywords: "vitamin b12 d3 d2 ferritin electrolytes sodium potassium weakness hair bone",
    tests: [t("Vitamin B12", 2), t("Vitamin D (D2 + D3)", 2), t("Ferritin", 2), t("Electrolytes", 2)],
  },
  {
    id: "metabolic",
    name: "Diabetes & Metabolic Health",
    icon: "metabolic",
    keywords: "insulin homa resistance microalbumin albumin creatinine ratio metabolic diabetes kidney",
    tests: [
      t("Serum Insulin (Fasting)", 4),
      t("HOMA-IR", 4),
      t("Urine Microalbumin", 4),
      t("Urine Albumin/Creatinine Ratio", 4),
    ],
  },
  {
    id: "inflammation",
    name: "Inflammation & Arthritis",
    icon: "inflammation",
    keywords: "inflammation arthritis joint pain crp rheumatoid ra factor",
    tests: [t("CRP", 3), t("Rheumatoid Factor (RA)", 3)],
  },
  {
    id: "iron",
    name: "Iron Studies",
    icon: "iron",
    keywords: "iron anemia anaemia weakness",
    tests: [t("Serum Iron", 3)],
  },
  {
    id: "tumor",
    name: "Tumor Markers",
    icon: "tumor",
    keywords: "tumor tumour cancer marker psa prostate ca-125 ovarian screening",
    tests: [t("PSA (Male) / CA-125 (Female)", 3)],
  },
  {
    id: "heart",
    name: "Heart Health",
    icon: "heart",
    keywords: "heart cardiac homocysteine hscrp apo lipoprotein bnp troponin chest pain",
    tests: [
      t("Homocysteine", 4),
      t("hsCRP", 4),
      t("Apo A1 + B", 4),
      t("Lp(a)", 4),
      t("NT-proBNP", 4),
      t("Troponin-I", 4),
    ],
  },
  {
    id: "digestive",
    name: "Digestive Health",
    icon: "digestive",
    keywords: "digestive pancreas amylase stomach gut",
    tests: [t("Amylase", 4)],
  },
  {
    id: "clots",
    name: "For Blood Clots",
    icon: "clots",
    keywords: "clot clots d-dimer dimer thrombosis embolism",
    tests: [t("D-Dimer", 4)],
  },
];

/* ---------- derived helpers ---------- */

export const formatInr = (n: number) => `₹${n.toLocaleString("en-IN")}`;

export const getPackage = (id: string) => PACKAGES.find((p) => p.id === id);

/** Groups, with only the tests that this package includes. Groups with no tests are dropped. */
export function includedGroups(pkgIndex: number) {
  return GROUPS.map((g) => ({ ...g, tests: g.tests.filter((x) => x.from <= pkgIndex) })).filter(
    (g) => g.tests.length > 0,
  );
}

/** Groups, with only the tests that this package adds on top of the one before it. */
export function newGroups(pkgIndex: number) {
  return GROUPS.map((g) => ({ ...g, tests: g.tests.filter((x) => x.from === pkgIndex) })).filter(
    (g) => g.tests.length > 0,
  );
}

/** How many of the 14 body functions a package covers. */
export const coverage = (pkgIndex: number) => includedGroups(pkgIndex).length;
export const TOTAL_GROUPS = GROUPS.length;

export type FlatTest = {
  key: string;
  name: string;
  from: number;
  group: TestGroup;
};

export const ALL_TESTS: FlatTest[] = GROUPS.flatMap((g) =>
  g.tests.map((x) => ({ key: `${g.id}:${x.name}`, name: x.name, from: x.from, group: g })),
);

/** Package colour tokens live in globals.css as --pk-1 .. --pk-5. */
export const pkColor = (index: number) => `var(--pk-${index + 1})`;
export const pkColor2 = (index: number) => `var(--pk-${index + 1}-2)`;
