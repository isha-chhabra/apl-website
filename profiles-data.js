/* Profiles: focused test sets for one health concern.
   Carried over from the lab's earlier website (packages-profiles page), with two changes:
     1. Diabetes Profile and Diabetes Profile Plus follow the lab's updated sheets (prices, tests, groups).
     2. "Hair Loss Profile" is now "Hair Loss Profile / Vitamin and Mineral Profile".
   A test is a text, or {n:'name', note:'small line', sub:['part','part']}.
   A section is {title?, note?, tests:[...]}; tests are numbered across the whole profile.
   Shared by packages.html (Profiles tab) and the home-page search. */

const APL_PROFILE_GROUPS = [
  {id:'sugar-heart', name:'Diabetes and Heart',        ids:['diabetes-profile','diabetes-profile-plus','cardiac-profile-advanced','extended-lipid-hypertension-profile']},
  {id:'fever',       name:'Fever',                     ids:['fever-profile','fever-profile-advanced']},
  {id:'blood',       name:'Blood, Hair and Vitamins',  ids:['anemia-profile','hair-loss-profile']},
  {id:'bones',       name:'Joints and Kidney Stones',  ids:['joint-pain-arthritis-profile','kidney-stone-profile']},
  {id:'family',      name:'Family and Marriage',       ids:['infertility-profile-female','infertility-profile-male','pre-marriage-check-up-female','pre-marriage-check-up-male']},
  {id:'allergy',     name:'Allergy',                   ids:['allergy-profile']}
];

const APL_LIPID = {n:'Lipid Profile', sub:['Serum Cholesterol','Serum Triglyceride','Serum HDL Cholesterol','Serum LDL Cholesterol','Serum VLDL Cholesterol']};

const APL_PROFILES = [
  /* ---------- Diabetes and Heart ---------- */
  {id:'diabetes-profile', name:'Diabetes Profile', mrp:2180, offer:1499, fasting:true,
   tag:'Comprehensive diabetes screening package',
   keywords:'diabetes sugar glucose hba1c kidney liver cholesterol screening',
   sections:[
    {title:'Glycemic Control', note:'To assess blood sugar levels and overall glycemic control.', tests:['Fasting Blood Sugar (FBS)','Post Meal Blood Sugar (PP2BS)',{n:'3 Months Average Blood Sugar (HbA1c)', note:'Reflects average blood sugar over the past 3 months.'}]},
    {title:'Kidney Function Tests', note:'To evaluate kidney health and detect early kidney problems.', tests:['Serum Urea','Serum Creatinine','Serum Uric Acid','eGFR (Estimated Glomerular Filtration Rate)']},
    {title:'Liver Function Test', note:'To assess liver health.', tests:['SGPT (ALT)']},
    {title:'Hematology', note:'To evaluate blood cells and detect anemia or infection.', tests:['Complete Blood Count (CBC)','Erythrocyte Sedimentation Rate (ESR)','Absolute Eosinophil Count (AEC)']},
    {title:'Lipid Profile', note:'To assess cholesterol levels and heart disease risk.', tests:['Serum Cholesterol','Serum Triglyceride','Serum HDL Cholesterol','Serum LDL Cholesterol','Serum VLDL Cholesterol']},
    {title:'Urine Examination', note:'To detect kidney and urinary tract problems.', tests:['Urine (Routine and Microscopic)']}
   ]},

  {id:'diabetes-profile-plus', name:'Diabetes Profile Plus', mrp:3999, offer:2499, fasting:true,
   tag:'Comprehensive diabetes screening package',
   keywords:'diabetes sugar glucose hba1c insulin resistance homa eye microalbumin kidney liver cholesterol screening',
   sections:[
    {title:'Glycemic Control', note:'To assess blood sugar levels and overall glycemic control.', tests:['Fasting Blood Sugar (FBS)','Post Meal Blood Sugar (PP2BS)',{n:'3 Months Average Blood Sugar (HbA1c)', note:'Reflects average blood sugar over the past 3 months.'}]},
    {title:'Kidney Function Tests', note:'To evaluate kidney health and detect early kidney problems.', tests:['Serum Urea','Serum Creatinine','Serum Uric Acid','eGFR (Estimated Glomerular Filtration Rate)']},
    {title:'Liver Function Tests', note:'To assess liver health.', tests:['SGPT (ALT)','SGOT (AST)']},
    {title:'Hematology', note:'To evaluate blood cells and detect anemia or infection.', tests:['Complete Blood Count (CBC)','Erythrocyte Sedimentation Rate (ESR)','Absolute Eosinophil Count (AEC)']},
    {title:'Lipid Profile', note:'To assess cholesterol levels and heart disease risk.', tests:['Serum Cholesterol','Serum Triglyceride','Serum HDL Cholesterol','Serum LDL Cholesterol','Serum VLDL Cholesterol']},
    {title:'Urine Examination', note:'To detect kidney and urinary tract problems.', tests:['Urine (Routine and Microscopic Examination)']},
    {title:'Eye Health Markers', note:'To detect early changes that may affect eyes due to diabetes.', tests:[{n:'Urine for Microalbumin', note:'Early marker'},'Urine Albumin Creatinine Ratio (UACR)']},
    {title:'Insulin Resistance and Metabolic Health', note:'To evaluate insulin function and metabolic health.', tests:['Serum Insulin','HOMA-IR (Homeostatic Model Assessment for Insulin Resistance)']}
   ]},

  {id:'cardiac-profile-advanced', name:'Cardiac Profile Advanced', mrp:6399, offer:5499, fasting:true,
   keywords:'cardiac heart cholesterol lipid homocysteine troponin bnp apolipoprotein chest',
   sections:[{tests:['Complete Blood Count (CBC)','Erythrocyte Sedimentation Rate (ESR)',APL_LIPID,'Homocysteine','High Sensitivity CRP (hs-CRP)','Lipoprotein A (Lp(a))','Apolipoprotein A1','Apolipoprotein B','Troponin I','Serum Creatinine','SGPT','Serum Uric Acid','Fasting Blood Sugar (FBS)','Post Meal Blood Sugar (PP2BS)','Urine (Routine and Microscopic)','NT-proBNP']}]},

  {id:'extended-lipid-hypertension-profile', name:'Extended Lipid Profile / Hypertension Profile', mrp:2660, offer:1950, fasting:true,
   keywords:'lipid cholesterol hypertension blood pressure homocysteine apolipoprotein',
   sections:[{tests:['Fasting Blood Sugar (FBS)','Post Meal Blood Sugar (PP2BS)','Uric Acid','Serum Creatinine','Lipid Profile','Apolipoprotein A1','Apolipoprotein B','Homocysteine']}]},

  /* ---------- Fever ---------- */
  {id:'fever-profile', name:'Fever Profile', mrp:3799, offer:1899,
   keywords:'fever malaria typhoid dengue infection temperature',
   sections:[{tests:['Complete Blood Count (CBC)','Malarial Parasite (MP) on Peripheral Smear','Malarial Parasite by Antigen Card (PF/PV)','Typhidot Test','Random Blood Sugar','SGPT','Dengue Test (NS1 + IgG + IgM)','C-Reactive Protein (CRP)','D-Dimer Test','Urine Complete Examination']}]},

  {id:'fever-profile-advanced', name:'Fever Profile Advanced', mrp:4399, offer:2199,
   keywords:'fever malaria typhoid widal dengue infection temperature',
   sections:[{tests:['Complete Blood Count (CBC)','Malarial Parasite (MP) on Peripheral Smear','Malarial Parasite by Antigen Card (PF/PV)','Widal Test','Typhidot Test','Random Blood Sugar','SGPT','Serum Creatinine','Serum Bilirubin (Total, Direct and Indirect)','Dengue Test (NS1 + IgG + IgM)','C-Reactive Protein (CRP)','D-Dimer Test','Urine Complete Examination']}]},

  /* ---------- Blood, Hair and Vitamins ---------- */
  {id:'anemia-profile', name:'Anemia Profile', mrp:2499, offer:1850,
   keywords:'anemia anaemia iron ferritin hemoglobin haemoglobin b12 weakness tired',
   sections:[{tests:['Complete Blood Count with Peripheral Smear Examination',{n:'Iron Profile', sub:['Serum Iron Level','Serum Ferritin Level','Total Iron Binding Capacity','Transferrin Saturation']},'Vitamin B12 Test','Hemoglobin Electrophoresis']}]},

  {id:'hair-loss-profile', name:'Hair Loss Profile / Vitamin and Mineral Profile', mrp:3030, offer:2499,
   keywords:'hair loss vitamin mineral b12 d3 calcium ferritin',
   sections:[{tests:['Complete Blood Count (CBC)','Random Blood Sugar (RBS)','Vitamin B12','Vitamin D3','Serum Calcium','Serum Ferritin']}]},

  /* ---------- Joints and Kidney Stones ---------- */
  {id:'joint-pain-arthritis-profile', name:'Joint Pain Profile / Arthritis Profile', mrp:4780, mrpPlus:true, offer:3299,
   keywords:'joint pain arthritis rheumatoid ra factor crp calcium ccp',
   sections:[{tests:['Complete Blood Count (CBC)','Erythrocyte Sedimentation Rate (ESR)','Rheumatoid Arthritis (RA Factor) Test','C-Reactive Protein (CRP)','Total Calcium','Ionised Calcium','Phosphorus',{n:'Proteins', sub:['Total','Albumin','Globulin','A/G Ratio']},'Uric Acid Levels','Alkaline Phosphatase','Vitamin D3 Levels','Serum Electrolytes','Urine (Routine and Microscopic)','Anti-CCP Test']}]},

  {id:'kidney-stone-profile', name:'Kidney Stone Profile', from:1499,
   keywords:'kidney stone renal calculi uric acid calcium urine',
   intro:{title:'Who should have this testing', text:'This testing is specially indicated when any one of these applies:', list:['Renal stone in a patient under 30 years of age','Renal stones present in both kidneys','Renal stone recurs within 1 year of treatment','Family history of renal stones','Person has only 1 kidney','Renal stones keep occurring again and again']},
   options:[
    {name:'A) Renal Stone Analysis', mrp:1999, mrpPlus:true, offer:1499, note:'Stone sample required'},
    {name:'B) Renal Stone Profile', mrp:3760, mrpPlus:true, offer:2899}
   ],
   sections:[{title:'B) Renal Stone Profile Includes', tests:['Urine Routine and Microscopic (including pH, Crystals, Pus Cells and Blood)','Urine Culture and Sensitivity','Serum Uric Acid','Serum Total Calcium','Serum Ionised Calcium','Serum Phosphorus','Serum Electrolytes (Na+, K+, Cl-)','Vitamin D3 Levels','Blood Urea Nitrogen','Serum Creatinine']}],
   notes:['These investigations help find the cause of renal stones in most cases. In some cases the cause cannot be found. A 24-hour urinary study (done separately) may also be needed in some cases.'],
   report:{label:'Download Sample Report', file:'assets/reports/kidney-stone-sample-report.pdf'}},

  /* ---------- Family and Marriage ---------- */
  {id:'infertility-profile-female', name:'Infertility Profile (Female)', mrp:6199, mrpPlus:true, offer:5199,
   keywords:'infertility female women pregnancy fertility amh fsh lh prolactin',
   sections:[{tests:['Complete Blood Count (CBC)','Random Blood Sugar / Fasting Blood Sugar','HbA1c (3 Month Average Glucose)','Serum Urea','Serum Creatinine','FSH, LH, Prolactin Levels (Hormones)','AMH Levels (Ovary Function)','Vitamin B12 Levels (Vitamin Deficiency)','Serum Ferritin Levels (Iron Deficiency)','Vitamin D3 Levels (Vitamin Deficiency)']}],
   notes:['All additional tests as required at 10% discount on MRP.']},

  {id:'infertility-profile-male', name:'Infertility Profile (Male)', mrp:3899, mrpPlus:true, offer:3299,
   keywords:'infertility male men fertility semen testosterone fsh lh prolactin',
   sections:[{tests:['Complete Blood Count (CBC)','Random Blood Sugar / Fasting Blood Sugar','HbA1c (3 Month Average Glucose)','Serum Urea','Serum Creatinine','FSH, LH, Prolactin Levels (Hormones)','Testosterone Levels (Hormones)','Vitamin B12 Levels','Semen Examination']}]},

  {id:'pre-marriage-check-up-female', name:'Pre-Marriage / Pre-Marital Check Up (Female)', mrp:2799, mrpPlus:true, offer:2499,
   keywords:'pre marriage marital check up female women wedding hiv thalassemia',
   sections:[{tests:['Complete Blood Count (CBC)','Random Blood Sugar / Fasting Blood Sugar','SGPT','Serum Creatinine','HIV Test','HBsAg Test','HCV Test','VDRL Test','Blood Group','Haemoglobin Electrophoresis (for screening of Thalassemia, Sickle Cell Anemia and more)','Urine Complete Examination Test']}],
   notes:['All additional tests as required at 10% discount on MRP.']},

  {id:'pre-marriage-check-up-male', name:'Pre-Marriage / Pre-Marital Check Up (Male)', mrp:2799, mrpPlus:true, offer:2499,
   keywords:'pre marriage marital check up male men wedding hiv thalassemia',
   sections:[{tests:['Complete Blood Count (CBC)','Random Blood Sugar / Fasting Blood Sugar','SGPT','Serum Creatinine','HIV Test','HBsAg Test','HCV Test','VDRL Test','Blood Group','Haemoglobin Electrophoresis (for screening of Thalassemia, Sickle Cell Anemia and more)','Urine Complete Examination Test']}],
   notes:['All additional tests as required at 10% discount on MRP.']},

  /* ---------- Allergy ---------- */
  {id:'allergy-profile', name:'Allergy Profile', from:1999,
   keywords:'allergy allergen food drug inhalant contact skin sneezing',
   unit:'allergen groups',
   sections:[{title:'Allergen Groups', tests:['Contact Allergens','Inhalant Allergens','Veg Food Allergens','Non Veg Food Allergens','Drug Allergens']}],
   options:[
    {name:'Allergy Test (Drugs Only)', offer:1999},
    {name:'Allergy Test (Veg Food Only)', offer:2099},
    {name:'Allergy Test (Veg Food + Inhalant + Contact)', offer:2599},
    {name:'Allergy Test (Veg Food + Non Veg Food + Inhalant + Contact)', offer:3699},
    {name:'Allergy Test (Veg Food, Non Veg Food + Inhalants + Contact + Drugs)', offer:4799}
   ],
   notes:['These are outsourced tests, and the outside lab sometimes changes its prices. Please call our helpline to confirm the price.'],
   report:{label:'Download Sample Report', file:'assets/reports/allergy-profile-sample-report.pdf'}}
];

/* Handy lookups */
const aplProfileById = id => APL_PROFILES.find(p => p.id === id);
const aplTestCount = p => p.sections.reduce((n, s) => n + s.tests.length, 0);
