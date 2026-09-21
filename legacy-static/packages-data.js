/* Preventive Health Check-Up Packages.
   Transcribed from the lab's package chart (packages-chart.webp).
   Wording is exact. Packages are named Package 1 to 4 and Gold. Every test lists the first package that includes it (from: 0-4);
   every later package includes it too.  Shared by packages.html and the home search. */

const APL_PACKAGES = [
  {id:'package-1', name:'Package 1', num:'1',    mrp:2650,  offer:1499, save:1151, color:'#8FA3B8', ink:'#C9D5E2'},
  {id:'package-2', name:'Package 2', num:'2',    mrp:3150,  offer:1700, save:1450, color:'#C7CCD4', ink:'#E9ECF0'},
  {id:'package-3', name:'Package 3', num:'3',    mrp:6450,  offer:3800, save:2650, color:'#B98D62', ink:'#E3C7A6'},
  {id:'package-4', name:'Package 4', num:'4',    mrp:8500,  offer:5000, save:3500, color:'#DE8763', ink:'#F7CBB4'},
  {id:'gold',      name:'Gold',      num:'Gold', mrp:18500, offer:9999, save:8501, color:'#E8C56E', ink:'#F7E2A4'}
];

/* Groups run in the order a package grows: everything in Package 1 first, then what each higher package adds.
   A test is [name, from, note?]. A note marks a test that is also listed under another group. */
const APL_GROUPS = [
  /* Package 1 and up */
  {id:'blood', name:'Complete Blood & General Health', keywords:'blood cbc anemia anaemia hemoglobin haemoglobin urine general fever infection weakness',
   tests:[['Complete Blood Count (CBC)',0],['ESR',0],['Absolute Eosinophil Count (AEC)',0],['Urine Routine',0]]},
  {id:'kidney', name:'Kidney Function', keywords:'kidney renal urea creatinine uric acid gout calcium egfr stone',
   tests:[['Urea',0],['Creatinine',0],['Uric Acid',0],['Calcium',0],['eGFR',0]]},
  {id:'diabetes-screening', name:'Diabetes Screening', keywords:'diabetes sugar glucose fasting hba1c pp',
   tests:[['Fasting Blood Sugar (FBS)',0],['HbA1c',0],['PP2 BS',0]]},
  {id:'lipid', name:'Lipid Profile', keywords:'cholesterol lipid triglyceride hdl ldl fat heart',
   tests:[['Lipid Profile',0]]},
  {id:'liver', name:'Liver Function', keywords:'liver sgpt sgot bilirubin jaundice lft hepatic full panel',
   tests:[['SGPT',0],['SGOT',0],['Bilirubin',0],['Liver Function Tests (10 Tests)',3]]},
  /* Package 2 and up */
  {id:'thyroid', name:'Thyroid Profile', keywords:'thyroid t3 t4 tsh hormone weight tired',
   tests:[['T3',1],['T4',1],['TSH',1]]},
  /* Package 3 and up */
  {id:'vitamins', name:'Vitamins & Minerals', keywords:'vitamin b12 d3 d2 ferritin electrolytes sodium potassium weakness hair bone',
   tests:[['Vitamin B12',2],['Vitamin D (D2 + D3)',2],['Ferritin',2],['Electrolytes',2]]},
  /* Package 4 and up */
  {id:'iron', name:'Iron Studies', keywords:'iron anemia anaemia weakness',
   tests:[['Serum Iron',3]]},
  {id:'inflammation', name:'Inflammation & Arthritis', keywords:'inflammation arthritis joint pain crp rheumatoid ra factor',
   tests:[['CRP',3],['Rheumatoid Factor (RA)',3]]},
  {id:'tumor', name:'Tumor Markers', keywords:'tumor tumour cancer marker psa prostate ca-125 ovarian screening',
   tests:[['PSA (Male) / CA-125 (Female)',3]]},
  /* Gold only */
  {id:'metabolic', name:'Diabetes & Metabolic Health', keywords:'insulin homa resistance microalbumin albumin creatinine ratio metabolic diabetes kidney',
   tests:[['Serum Insulin (Fasting)',4],['HOMA-IR',4],['Urine Microalbumin',4],['Urine Albumin/Creatinine Ratio',4]]},
  {id:'eye', name:'Eye Health', keywords:'eye eyes vision retina retinopathy diabetic microvascular microalbumin',
   tests:[['Urine Microalbumin',4,'Also under Diabetes & Metabolic Health']]},
  {id:'heart', name:'Heart Health', keywords:'heart cardiac homocysteine hscrp apo lipoprotein bnp troponin chest pain',
   tests:[['Homocysteine',4],['hsCRP',4],['Apo A1 + B',4],['Lp(a)',4],['NT-proBNP',4],['Troponin-I',4]]},
  {id:'digestive', name:'Digestive Health', keywords:'digestive pancreas amylase stomach gut',
   tests:[['Amylase',4]]},
  {id:'clots', name:'For Blood Clots', keywords:'clot clots d-dimer dimer thrombosis embolism',
   tests:[['D-Dimer',4]]}
];

const aplInr = n => '₹' + n.toLocaleString('en-IN');

/* Flat list of every test, for search. */
/* A test listed under two groups is searched once, under the first. */
const APL_TESTS = APL_GROUPS.flatMap(g => g.tests.map(([name, from]) => ({name, from, group:g})))
  .filter((t, i, all) => all.findIndex(o => o.name === t.name) === i);
