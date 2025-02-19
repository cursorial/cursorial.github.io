const scenarios = {
  start: {
    text: "You are a junior doctor on call. A 77-year-old man is admitted with shortness of breath and green sputum. His past history includes COPD, bladder cancer, and type 2 diabetes. He recently finished a rescue pack of antibiotics and steroids with no improvement. What do you do first?",
    options: [
      { text: "Perform an A-E assessment", next: "ae_assessment" },
      { text: "Order urgent bloods, ABG, and chest X-ray", next: "investigations" },
      { text: "Review previous records and speak with the nurse", next: "review_history" }
    ],
    randomEvent: { chance: 0.1, next: "allergic_reaction" }
  },
  review_history: {
    text: "Reviewing the chart and talking to the nurse, you learn of multiple recent exacerbations and a suspicion of pneumonia. What next?",
    options: [
      { text: "Perform a full A-E assessment", next: "ae_assessment" },
      { text: "Call for senior review", next: "senior_consult" },
      { text: "Proceed directly with investigations", next: "investigations" }
    ],
    randomEvent: { chance: 0.05, next: "allergic_reaction" }
  },
  ae_assessment: {
    text: "Your A-E assessment shows: RR 28/min, SpO₂ 85% on air, HR 112, BP 110/65, Temp 37.8°C, and bilateral wheeze with reduced air entry. What do you do?",
    options: [
      { text: "Administer 24% oxygen via Venturi mask", next: "oxygen_given" },
      { text: "Order investigations immediately", next: "investigations" },
      { text: "Call for senior input", next: "senior_consult" }
    ],
    randomEvent: { chance: 0.15, next: "neurological_changes" }
  },
  oxygen_given: {
    text: "You administer 24% oxygen. The SpO₂ rises to 90% but tachypnoea persists. What next?",
    options: [
      { text: "Reassess with an ABG and expand investigations", next: "investigations" },
      { text: "Increase oxygen concentration", next: "oxygen_increase" },
      { text: "Begin empirical steroids and antibiotics", next: "initial_treatment" }
    ],
    randomEvent: { chance: 0.05, next: "allergic_reaction" }
  },
  oxygen_increase: {
    text: "Increasing oxygen to 28% improves SpO₂ to 94%, yet the patient becomes mildly confused. Your next step?",
    options: [
      { text: "Repeat ABG", next: "repeat_abg" },
      { text: "Consult the respiratory team", next: "resp_consult" },
      { text: "Monitor closely", next: "monitoring" }
    ],
    randomEvent: { chance: 0.05, next: "neurological_changes" }
  },
  resp_consult: {
    text: "You consult the respiratory team. They advise that optimizing oxygen delivery is crucial and recommend increasing oxygen, closely monitoring blood gases, and considering early initiation of non-invasive ventilation if CO₂ levels worsen. What do you do?",
    options: [
      { text: "Increase oxygen delivery further", next: "oxygen_increase" },
      { text: "Initiate non-invasive ventilation", next: "niv_initiation" },
      { text: "Continue current management and monitor", next: "monitoring" }
    ],
    randomEvent: { chance: 0.05, next: "repeat_abg_random" }
  },
  nebulizers: {
    text: "You administer nebulized bronchodilators. The patient's air entry improves temporarily, but his respiratory acidosis persists. What do you do next?",
    options: [
      { text: "Repeat ABG and reassess", next: "repeat_abg" },
      { text: "Call for senior assistance", next: "senior_consult" },
      { text: "Maintain current management and continue monitoring", next: "monitoring" }
    ],
    randomEvent: { chance: 0.05, next: "repeat_abg_random" }
  },
  investigations: {
    text: "Investigations return: Bloods show WCC 14.2, CRP 67; ABG on 24% oxygen shows pH 7.30, pCO₂ 6.5, pO₂ 8.2, HCO₃ 26; Chest X-ray reveals hyperinflated lungs with a possible left lower zone opacity. What do you conclude?",
    options: [
      { text: "Infective exacerbation of COPD", next: "interpret_results" },
      { text: "Heart failure", next: "diuretics" },
      { text: "Possibility of pulmonary embolism", next: "pe_suspicion" }
    ],
    randomEvent: { chance: 0.05, next: "allergic_reaction" }
  },
  pe_suspicion: {
    text: "Pulmonary embolism is a remote possibility, but overall the picture fits pneumonia on a COPD background. Your move?",
    options: [
      { text: "Proceed with COPD/pneumonia management", next: "interpret_results" },
      { text: "Order a CT pulmonary angiogram", next: "ctpa" },
      { text: "Call for senior advice", next: "senior_consult" }
    ],
    randomEvent: { chance: 0.05, next: "allergic_reaction" }
  },
  ctpa: {
    text: "CT pulmonary angiogram rules out embolism and confirms pneumonia. What next?",
    options: [
      { text: "Start steroids and antibiotics", next: "initial_treatment" },
      { text: "Reassess with a full A-E examination", next: "ae_assessment" },
      { text: "Consult infectious diseases", next: "id_consult" }
    ],
    randomEvent: { chance: 0.05, next: "allergic_reaction" }
  },
  interpret_results: {
    text: "Based on your findings, how will you manage this patient?",
    options: [
      { text: "Start steroids and antibiotics", next: "initial_treatment" },
      { text: "Order further imaging", next: "additional_imaging" },
      { text: "Opt for close monitoring", next: "monitoring" }
    ],
    randomEvent: { chance: 0.05, next: "allergic_reaction" }
  },
  additional_imaging: {
    text: "A CT chest confirms pneumonia with early sepsis signs. Next step?",
    options: [
      { text: "Initiate sepsis protocol with broad-spectrum antibiotics", next: "sepsis_management" },
      { text: "Stick with standard COPD management", next: "initial_treatment" },
      { text: "Consult ICU for potential escalation", next: "icu_consult" }
    ],
    randomEvent: { chance: 0.05, next: "allergic_reaction" }
  },
  resp_failure: {
    text: "The patient shows clear signs of impending respiratory failure. His oxygen saturation is dropping further and his work of breathing has markedly increased. You urgently need to decide on the next steps to stabilize him. What do you do?",
    options: [
      { text: "Prepare for immediate intubation and transfer to ICU", next: "icu_consult" },
      { text: "Call for senior assistance and escalate care", next: "senior_consult" }
    ],
    randomEvent: { chance: 0.05, next: "repeat_abg_random" }
  },
  senior_consult: {
    text: "You call for a senior review. The senior tells you to send the patient to ICU.",
    options: [
      { text: "Follow the senior's advice.", next: "icu_consult" },
      { text: "Repeat the ABG and reassess the patient's condition", next: "repeat_abg" },
    ],
  },
  initial_treatment: {
    text: "You start steroids and doxycycline. Two hours later, the patient’s confusion deepens and his respiratory rate increases. What do you do?",
    options: [
      { text: "Repeat ABG and reassess", next: "repeat_abg" },
      { text: "Further increase oxygen delivery", next: "oxygen_increase" },
      { text: "Call for senior assistance", next: "senior_consult" }
    ],
    randomEvent: { chance: 0.1, next: "allergic_reaction" }
  },
  repeat_abg: {
    text: "Repeat ABG shows: pH 7.28, pCO₂ 7.2, pO₂ 7.6, HCO₃ 24. Worsening respiratory acidosis is evident. Your options?",
    options: [
      { text: "Switch to 28% oxygen and prepare for respiratory failure", next: "resp_failure" },
      { text: "Initiate non-invasive ventilation (NIV)", next: "niv_initiation" },
      { text: "Administer nebulized bronchodilators", next: "nebulizers" }
    ],
    randomEvent: { chance: 0.1, next: "repeat_abg_random" }
  },
  repeat_abg_random: {
    text: "While repeating the ABG, the patient suddenly develops an acute tachyarrhythmia with a skyrocketing heart rate. What do you do?",
    options: [
      { text: "Order an ECG and check cardiac enzymes immediately", next: "cardiac_workup" },
      { text: "Administer rate control medication", next: "rate_control" },
      { text: "Call for urgent senior support", next: "senior_consult" }
    ],
    randomEvent: { chance: 0.05, next: "cardiac_workup" }
  },
  cardiac_workup: {
    text: "The ECG reveals atrial fibrillation with a rapid ventricular response, and cardiac enzymes are mildly elevated, suggesting myocardial stress. What is your next step?",
    options: [
      { text: "Initiate rate control therapy", next: "rate_control" },
      { text: "Consult cardiology immediately", next: "cardiology_consult" },
      { text: "Focus on respiratory management and monitor closely", next: "monitoring" }
    ],
    randomEvent: { chance: 0.05, next: "repeat_abg_random" }
  },

  niv_initiation: {
    text: "You start NIV. Oxygenation improves slightly, but CO₂ remains high. What now?",
    options: [
      { text: "Consult ICU for potential intubation", next: "icu_consult" },
      { text: "Adjust NIV settings and continue monitoring", next: "niv_adjust" },
      { text: "Continue current NIV settings", next: "monitoring" }
    ],
    randomEvent: { chance: 0.05, next: "neurological_changes" }
  },
  niv_adjust: {
    text: "After tweaking NIV, respiratory acidosis stabilizes, but blood pressure drops. Next?",
    options: [
      { text: "Administer IV fluids", next: "fluid_admin" },
      { text: "Reduce NIV support and revert to oxygen therapy", next: "oxygen_increase" },
      { text: "Call for immediate senior support", next: "senior_consult" }
    ],
    randomEvent: { chance: 0.05, next: "fluid_admin" }
  },
  fluid_admin: {
    text: "IV fluids boost BP, but now the patient shows signs of fluid overload with basal crackles. What is your move?",
    options: [
      { text: "Start diuretics", next: "diuretics" },
      { text: "Repeat a chest X-ray", next: "repeat_investigations" },
      { text: "Consult cardiology", next: "cardiology_consult" }
    ],
    randomEvent: { chance: 0.05, next: "cardiology_consult" }
  },
  diuretics: {
    text: "You start diuretics. Fluid status improves but oxygenation remains borderline. Your options?",
    options: [
      { text: "Repeat ABG and chest imaging", next: "repeat_investigations" },
      { text: "Consider ICU transfer for closer monitoring", next: "icu_consult" },
      { text: "Adjust oxygen therapy and continue ward management", next: "monitoring" }
    ],
    randomEvent: { chance: 0.05, next: "repeat_investigations" }
  },
  cardiology_consult: {
    text: "Cardiology reviews the case: they believe fluid overload is secondary to cardiac strain from sepsis. They advise cautious fluid management and rate control if needed. What do you do?",
    options: [
      { text: "Adjust fluids and continue diuretics", next: "diuretics" },
      { text: "Transfer the patient to ICU", next: "icu_consult" },
      { text: "Maintain current management with close monitoring", next: "monitoring" }
    ],
    randomEvent: { chance: 0.05, next: "diuretics" }
  },
  icu_consult: {
    text: "The ICU team evaluates the patient and notes a rapid deterioration in respiratory status. They warn that intubation may be required imminently. Your next step?",
    options: [
      { text: "Transfer the patient to the ICU", next: "icu_transfer" },
      { text: "Continue aggressive ward management with frequent checks", next: "monitoring" },
      { text: "Discuss ceiling of care with the family", next: "ceiling_of_care" }
    ],
    randomEvent: { chance: 0.15, next: "icu_transfer_random" }
  },
  icu_transfer: {
    text: "The patient is transferred to the ICU, intubated, and placed on mechanical ventilation. After several days of support, he gradually improves and is weaned off. Now he’s returning to the ward.",
    options: [
      { text: "Monitor closely on the ward", next: "post_icu_return" },
      { text: "Plan for discharge", next: "discharge_planning" }
    ],
    randomEvent: { chance: 0.2, next: "post_icu_return_random" }
  },
  icu_transfer_random: {
    text: "Unexpectedly, as you’re arranging the ICU transfer, the patient deteriorates further. A rapid response is called, and he is rushed to the ICU in extremis. In the ICU, you must quickly re-evaluate his management. What do you do?",
    options: [
      { text: "Reassess with a full panel of investigations", next: "repeat_investigations" },
      { text: "Initiate full resuscitative measures", next: "aggressive_treatment" },
      { text: "Call for senior support immediately", next: "senior_consult" }
    ],
    randomEvent: { chance: 0.1, next: "repeat_investigations" }
  },
  post_icu_return: {
    text: "Back on the ward from the ICU, the patient appears stable for now. What’s your plan?",
    options: [
      { text: "Continue monitoring with regular observations", next: "monitoring" },
      { text: "Plan discharge if conditions remain stable", next: "discharge_planning" }
    ],
    randomEvent: { chance: 0.05, next: "monitoring" }
  },
  post_icu_return_random: {
    text: "Shortly after returning from the ICU, the patient becomes febrile and develops signs of sepsis. His labs now hint at early disseminated intravascular coagulation (DIC). What do you do?",
    options: [
      { text: "Reassess urgently and start sepsis/DIC management", next: "sepsis_dic" },
      { text: "Call for ICU review immediately", next: "icu_consult" },
      { text: "Consult hematology", next: "hematology_consult" }
    ],
    randomEvent: { chance: 0.05, next: "sepsis_dic" }
  },
  rate_control: {
    text: "You initiate rate control therapy. The patient's heart rate begins to slow and his blood pressure stabilizes slightly, but his respiratory distress persists. What is your next step?",
    options: [
      { text: "Repeat ABG to assess his respiratory status", next: "repeat_abg" },
      { text: "Consult ICU for further management", next: "icu_consult" },
      { text: "Continue close monitoring on the ward", next: "monitoring" }
    ],
    randomEvent: { chance: 0.05, next: "repeat_abg_random" }
  },
  monitoring: {
    text: "You decide to continue close monitoring of the patient. His condition appears stable for now, but subtle changes could occur at any moment. What is your next step?",
    options: [
      { text: "Reassess with repeat ABG and imaging", next: "repeat_investigations" },
      { text: "Maintain current management and continue ward monitoring", next: "post_icu_return" },
      { text: "Call for a senior review", next: "senior_consult" }
    ],
    randomEvent: { chance: 0.05, next: "neurological_changes" }
  },
  sepsis_dic: {
    text: "The patient has developed sepsis with early DIC. You begin aggressive sepsis management, including broad-spectrum antibiotics, supportive care, and blood products as needed. What is your next move?",
    options: [
      { text: "Transfer back to the ICU", next: "icu_transfer" },
      { text: "Monitor closely and repeat labs frequently", next: "monitoring" },
      { text: "Consult hematology for DIC management", next: "hematology_consult" }
    ],
    randomEvent: { chance: 0.05, next: "icu_transfer" }
  },
  hematology_consult: {
    text: "Hematology advises on supportive management for DIC, recommending blood products and careful monitoring of coagulation parameters. What do you do?",
    options: [
      { text: "Follow their advice and monitor the patient", next: "monitoring" },
      { text: "Transfer the patient to the ICU for closer observation", next: "icu_transfer" }
    ],
    randomEvent: { chance: 0.05, next: "monitoring" }
  },
  discharge_planning: {
    text: "The patient appears ready for discharge. However, on his last day on the ward—as discharge is being finalized—he suddenly complains of severe chest pain and shortness of breath. What do you do?",
    options: [
      { text: "Perform an immediate ECG", next: "mi_ecg" },
      { text: "Order cardiac enzymes and provide oxygen", next: "mi_enzyme" },
      { text: "Administer nitroglycerin and morphine", next: "mi_management" }
    ],
    // On the last day, we force a random event that leads to MI.
    randomEvent: { chance: 1.0, next: "mi_start" }
  },
  repeat_investigations: {
    text: "Repeat labs and imaging now show worsening inflammatory markers and new consolidations. Your options?",
    options: [
      { text: "Adjust the antibiotic regimen per ID advice", next: "id_consult" },
      { text: "Reinitiate sepsis management", next: "sepsis_management" },
      { text: "Transfer the patient back to ICU", next: "icu_transfer" }
    ],
    randomEvent: { chance: 0.05, next: "sepsis_management" }
  },
  sepsis_management: {
    text: "You start the sepsis protocol with IV fluids, broad-spectrum antibiotics, and close monitoring. What next?",
    options: [
      { text: "Continue sepsis management and repeat labs", next: "monitoring" },
      { text: "Transfer to ICU for closer observation", next: "icu_transfer" },
      { text: "Consult infectious diseases", next: "id_consult" }
    ],
    randomEvent: { chance: 0.05, next: "monitoring" }
  },
  id_consult: {
    text: "The infectious diseases specialist recommends continuing the current regimen while obtaining further cultures. What do you do?",
    options: [
      { text: "Maintain current management and monitor", next: "monitoring" },
      { text: "Obtain additional cultures and adjust antibiotics if needed", next: "additional_imaging" }
    ],
    randomEvent: { chance: 0.05, next: "monitoring" }
  },
  aggressive_treatment: {
    text: "Despite aggressive measures, the patient’s condition deteriorates rapidly. Outcome: Poor prognosis.",
    options: [
      { text: "Restart", next: "start" }
    ],
    randomEvent: { chance: 0.0, next: null }
  },
  ceiling_of_care: {
    text: "After a detailed discussion with the family, a DNAR decision is agreed upon. The patient is transitioned to palliative care. Outcome: A peaceful passing with full family support.",
    options: [
      { text: "Restart", next: "start" }
    ],
    randomEvent: { chance: 0.0, next: null }
  },
  allergic_reaction: {
    text: "Suddenly, the patient develops an allergic reaction: hives, hypotension, and worsening wheeze. What do you do?",
    options: [
      { text: "Stop the offending agent and administer antihistamines with steroids", next: "initial_treatment" },
      { text: "Call for emergency resuscitation", next: "aggressive_treatment" },
      { text: "Begin IV fluids and supportive care", next: "fluid_admin" }
    ],
    randomEvent: { chance: 0.0, next: null }
  },
  neurological_changes: {
    text: "The patient becomes acutely confused with abnormal posturing. You suspect hypoxia-induced encephalopathy or a metabolic cause. What is your next move?",
    options: [
      { text: "Perform a focused neurological exam and check blood glucose", next: "neurology_assessment" },
      { text: "Order an urgent CT head", next: "ct_head" },
      { text: "Call for neurology input", next: "neurology_consult" }
    ],
    randomEvent: { chance: 0.05, next: "metabolic_derangements" }
  },
  neurology_assessment: {
    text: "Your neurological exam is inconclusive and blood glucose is normal. A CT head is now indicated. What do you do?",
    options: [
      { text: "Order an urgent CT head", next: "ct_head" },
      { text: "Consult neurology before imaging", next: "neurology_consult" }
    ],
    randomEvent: { chance: 0.0, next: null }
  },
  ct_head: {
    text: "CT head reveals no acute intracranial pathology. The confusion is most likely due to hypoxia and metabolic disturbances. How do you proceed?",
    options: [
      { text: "Optimize oxygen delivery and recheck labs", next: "oxygen_increase" },
      { text: "Order a full metabolic panel", next: "metabolic_derangements" }
    ],
    randomEvent: { chance: 0.0, next: null }
  },
  neurology_consult: {
    text: "Neurology advises supportive care while you investigate metabolic causes. What is your next step?",
    options: [
      { text: "Follow neurology advice and monitor", next: "monitoring" },
      { text: "Order a metabolic panel and adjust treatment as needed", next: "metabolic_derangements" }
    ],
    randomEvent: { chance: 0.0, next: null }
  },
  metabolic_derangements: {
    text: "The metabolic panel shows mild hyponatremia and elevated lactate. What do you do?",
    options: [
      { text: "Correct electrolytes cautiously", next: "electrolyte_correction" },
      { text: "Continue supportive care and monitor", next: "monitoring" },
      { text: "Consult endocrinology", next: "consult_endocrinology" }
    ],
    randomEvent: { chance: 0.0, next: null }
  },
  electrolyte_correction: {
    text: "Electrolytes are corrected slowly. The patient develops minor tremors. What is your next step?",
    options: [
      { text: "Monitor neurological status", next: "neurology_consult" },
      { text: "Request neurology to reassess", next: "neurology_consult" }
    ],
    randomEvent: { chance: 0.0, next: null }
  },
  consult_endocrinology: {
    text: "Endocrinology reviews the diabetic history and suggests tighter glycemic control. What do you do?",
    options: [
      { text: "Adjust the insulin regimen and monitor blood glucose", next: "insulin_adjustment" },
      { text: "Focus on respiratory support and continue monitoring", next: "monitoring" }
    ],
    randomEvent: { chance: 0.0, next: null }
  },
  insulin_adjustment: {
    text: "After adjusting insulin, blood sugars stabilize though the patient experiences occasional hypoglycemia. What now?",
    options: [
      { text: "Modify the insulin dose further", next: "consult_endocrinology" },
      { text: "Administer dextrose and monitor closely", next: "monitoring" }
    ],
    randomEvent: { chance: 0.0, next: null }
  },
  // MI Branches:
  mi_start: {
    text: "On his last day on the ward—as discharge is being finalized—the patient suddenly complains of severe chest pain and shortness of breath. You suspect an MI. What do you do?",
    options: [
      { text: "Perform an immediate ECG", next: "mi_ecg" },
      { text: "Order cardiac enzymes and provide oxygen", next: "mi_enzyme" },
      { text: "Administer nitroglycerin and morphine", next: "mi_management" }
    ],
    randomEvent: { chance: 0.2, next: "mi_random_complication" }
  },
  mi_random_complication: {
    text: "An unexpected arrhythmia complicates the picture, heightening the suspicion of an MI. What do you do?",
    options: [
      { text: "Stabilize the arrhythmia and re-assess with an ECG", next: "mi_ecg" },
      { text: "Proceed with immediate thrombolysis", next: "mi_management" }
    ],
    randomEvent: { chance: 0.1, next: "mi_ecg" }
  },
  mi_ecg: {
    text: "The ECG reveals ST-elevation in leads V2-V4, consistent with an anterior MI. What is your next step?",
    options: [
      { text: "Activate the cath lab for primary PCI", next: "mi_pci" },
      { text: "Initiate thrombolytic therapy if PCI is unavailable", next: "mi_thrombolysis" },
      { text: "Administer oxygen and prepare for transfer", next: "mi_management" }
    ],
    randomEvent: { chance: 0.05, next: "mi_random_complication" }
  },
  mi_enzyme: {
    text: "Cardiac enzymes return elevated, confirming myocardial injury. The ECG now shows subtle ST depressions. What do you do next?",
    options: [
      { text: "Activate the cath lab for urgent PCI", next: "mi_pci" },
      { text: "Start dual antiplatelet therapy and anticoagulation", next: "mi_management" },
      { text: "Consult cardiology for further management", next: "mi_management" }
    ],
    randomEvent: { chance: 0.05, next: "mi_random_complication" }
  },
  mi_management: {
    text: "You initiate standard MI management: oxygen, nitrates, morphine, aspirin, and clopidogrel, while consulting cardiology. The patient is prepped for further intervention. Outcome: The patient is stabilized and undergoes successful revascularization.",
    options: [
      { text: "Restart simulation", next: "start" }
    ],
    randomEvent: { chance: 0.0, next: null }
  },
  mi_pci: {
    text: "The cath lab is activated and the patient undergoes primary PCI. The culprit lesion is stented successfully. Outcome: The patient recovers with a plan for cardiac rehabilitation.",
    options: [
      { text: "Restart simulation", next: "start" }
    ],
    randomEvent: { chance: 0.0, next: null }
  },
  mi_thrombolysis: {
    text: "Thrombolytic therapy is initiated, and the patient's symptoms gradually improve as reperfusion is achieved. Outcome: The patient is monitored closely and recovers well.",
    options: [
      { text: "Restart simulation", next: "start" }
    ],
    randomEvent: { chance: 0.0, next: null }
  }
};

function loadScenario(scene) {
  // Retrieve the current scene
  let currentScene = scenarios[scene];
  // If the scene doesn't have a randomEvent, assign a default
  if (!currentScene.randomEvent) {
    currentScene.randomEvent = { chance: 0, next: null };
  }
  // If a random event is defined and triggered, override the scene
  if (currentScene.randomEvent.next && Math.random() < currentScene.randomEvent.chance) {
    scene = currentScene.randomEvent.next;
    currentScene = scenarios[scene];
  }
  // Load the scenario text and options
  document.getElementById("story-text").innerText = currentScene.text;
  const optionsContainer = document.getElementById("options");
  optionsContainer.innerHTML = "";
  currentScene.options.forEach(option => {
    const button = document.createElement("button");
    button.innerText = option.text;
    button.className = "button";
    button.onclick = () => loadScenario(option.next);
    optionsContainer.appendChild(button);
  });
}

// Start the dynamic scenario
loadScenario("start");
