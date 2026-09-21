import type { ReactNode } from "react";

export type Faq = { id: string; q: string; a: ReactNode; text: string };

const f = (id: string, q: string, a: ReactNode, text: string): Faq => ({ id, q, a, text });

export const POPULAR_FAQS: Faq[] = [
  f(
    "timings",
    "What are the lab timings?",
    <p>
      Monday to Saturday, 7 am to 9 pm. Sunday, 7 am to 2 pm. Collection centres can keep slightly
      different hours, and holidays vary, so call ahead to confirm.
    </p>,
    "lab timings hours open close monday saturday sunday holiday",
  ),
  f(
    "prescription",
    "Do I need a prescription for my tests?",
    <p>
      Usually not, for most pathology and microbiology tests. Some tests need a signed consent form
      to meet government and medical-legal guidelines.
    </p>,
    "prescription doctor consent form",
  ),
  f(
    "reports",
    "When will I get my report?",
    <p>
      Most tests run in our own lab, so reports are usually ready the same day. We tell you the exact
      time when we collect your sample, and it is written on your acknowledgement slip.
    </p>,
    "report time ready same day acknowledgement slip turnaround",
  ),
  f(
    "cancel",
    "What is your cancellation policy?",
    <>
      <p>Choose your tests carefully before you register. Cancellation fees:</p>
      <ol>
        <li>Free before registration.</li>
        <li>₹50 after registration.</li>
        <li>Full fee once the sample is sent for processing.</li>
        <li>For tests sent to an outside lab, we try to cancel before processing starts. If it has started, the full fee applies.</li>
        <li>Home visit charges stay with the patient.</li>
      </ol>
    </>,
    "cancel cancellation fee refund registration",
  ),
  f(
    "emergency",
    "Is there an extra charge on Sundays and holidays?",
    <p>
      We keep limited hours on Sundays and public holidays so reports are not delayed. Costs are
      higher on those days, so a small fee of ₹50 to 100 per patient may apply. It is waived if
      your bill is above ₹500.
    </p>,
    "emergency extra charge sunday holiday fee",
  ),
  f(
    "appointment",
    "Do I need an appointment to give a sample?",
    <p>
      No, for most tests. Walk in during opening hours. FNAC and other special procedures need an
      appointment, and so do home or hospital collections.
    </p>,
    "appointment walk in fnac home collection",
  ),
  f(
    "prepare",
    "How should I prepare for my test?",
    <p>
      Most tests need no preparation. Some need 10 to 12 hours of fasting. See the Test preparation
      tab for details.
    </p>,
    "prepare preparation fasting before test",
  ),
  f(
    "sharing",
    "Who can see my report?",
    <p>
      Only you and your attending doctor. Please give us your doctor&rsquo;s name and contact details when
      you register.
    </p>,
    "privacy report shared doctor confidential",
  ),
  f(
    "data",
    "What happens to my phone number and other details?",
    <p>
      We do not share your details with anyone without your consent. The exceptions are Mediclaim
      reimbursement, where authorised staff at your insurer may see them, and government orders.
    </p>,
    "data privacy mobile number details mediclaim",
  ),
  f(
    "secrecy",
    "What if I need extra confidentiality?",
    <p>
      All tests and reports are kept confidential. If you want extra privacy, call our pathologist on
      93283 92835.
    </p>,
    "confidential secrecy privacy pathologist",
  ),
  f(
    "unsatisfied",
    "What if I am not satisfied with my report?",
    <p>
      Call the helpline. Our pathologist will listen to your concerns and, if needed, repeat the
      collection and retest at our cost.
    </p>,
    "not satisfied doubt retest repeat free report",
  ),
  f(
    "extra-tests",
    "Can I add tests after registering?",
    <p>
      Yes, for individual tests. Extra tests are paid for upfront and may need another sample.
      Once a preventive package or profile is registered, it cannot be changed or converted, so
      finalise it before you register.
    </p>,
    "add extra tests package profile change modify",
  ),
  f(
    "home",
    "Do you offer home visits?",
    <p>
      Yes, with an appointment. Call +91 63533 15640 or +91 98240 15108 to book one.
    </p>,
    "home visit collection appointment",
  ),
  f(
    "digital",
    "Can I get my report on email or WhatsApp?",
    <p>
      Yes, along with a printed copy. Share your correct WhatsApp number or email and we will send it
      there. These services depend on servers, so they can occasionally be delayed.
    </p>,
    "email whatsapp report digital",
  ),
  f(
    "feedback",
    "Where can I leave feedback?",
    <p>
      Call 98240 15108 or email akashchhabra2020@gmail.com. For urgent concerns, use the numbers on
      the notice board at any of our centres.
    </p>,
    "feedback complaint concern email",
  ),
  f(
    "payment",
    "How can I pay?",
    <p>
      Cash, UPI, Google Pay, PhonePe, Paytm or online banking. There is a QR code at the counter in
      every centre.
    </p>,
    "payment pay cash upi card google pay phonepe paytm",
  ),
];

export const PREP_FAQS: Faq[] = [
  f(
    "fasting-tests",
    "Which tests need fasting?",
    <p>
      Fasting blood sugar, fasting insulin, fasting C-peptide, lipid profile, and electrolytes and
      calcium. If you are unsure, ask your doctor or call the helpline.
    </p>,
    "fasting tests which need sugar insulin lipid electrolytes calcium",
  ),
  f(
    "fasting-meaning",
    "What does fasting mean?",
    <p>
      Nothing but plain water for 10 to 12 hours. Eat normally the day before, and avoid tobacco,
      smoking and exercise during the fast. Keep taking prescribed medicines unless your doctor says
      otherwise.
    </p>,
    "fasting meaning water hours smoking exercise",
  ),
  f(
    "fasting-mistake",
    "What if I eat or drink before a fasting test?",
    <p>
      Tell us. Sometimes it will not affect the result. Other times we will need to reschedule the
      test for another day.
    </p>,
    "mistake ate drank before fasting test reschedule",
  ),
  f(
    "eat-after",
    "When can I eat again?",
    <p>Right after your sample is taken. Bringing a snack is a good idea.</p>,
    "eat drink after test snack",
  ),
  f(
    "medicines",
    "Should I stop my medicines before a thyroid or diabetes test?",
    <p>
      No, unless your doctor tells you to. Skipping medicine can change your results. If you are
      unsure, ask your doctor or call us.
    </p>,
    "medicine medication thyroid diabetes stop skip",
  ),
  f(
    "pp2bs",
    "How do I do the 2-hour post-meal sugar test (PP2BS)?",
    <>
      <p>
        Fast for 10 to 12 hours overnight. Then eat a normal meal with at least 75 g of
        carbohydrates, finishing within 15 to 20 minutes.
      </p>
      <p>
        Note the time of your first bite. Your blood is drawn exactly 2 hours later. If you start
        eating at 12:00 pm, come at 2:00 pm. Rest during the wait and reach the lab 15 minutes early.
      </p>
    </>,
    "pp2bs post meal post lunch sugar 2 hour glucose",
  ),
  f(
    "urine-culture",
    "How do I give a urine sample for culture?",
    <>
      <p>First-morning urine is best, though any time of day works. Collect a sterile container from us first.</p>
      <ol>
        <li>Pass the first stream into the toilet.</li>
        <li>Collect about 10 to 20 ml (half the container) in the container.</li>
        <li>Seal it tightly and bring it to the lab.</li>
      </ol>
      <p>If there is a delay, keep it in the fridge at 4 to 8 °C. Do not freeze it.</p>
    </>,
    "urine culture sample sterile container morning",
  ),
  f(
    "urine-24",
    "How do I prepare for a 24-hour urine test?",
    <>
      <p>Collect the special container from us first. The test needs a full day.</p>
      <ol>
        <li>Day 1, on waking: pass your first urine into the toilet, not the container.</li>
        <li>Collect all urine through the day and night in the container.</li>
        <li>Day 2, on waking: pass urine into the container to finish.</li>
      </ol>
      <p>
        Keep the container capped, labelled with your name, date and time, and refrigerated at 2 to
        8 °C the whole time. Do not freeze it.
      </p>
    </>,
    "24 hour urine test container collect refrigerate",
  ),
  f(
    "semen",
    "How do I prepare for a semen examination?",
    <p>
      Avoid ejaculation for at least 2 days, and ideally no more than 5 to 7, before the test. Stay
      relaxed and give the full sample in the labelled container we provide.
    </p>,
    "semen sperm count examination prepare abstinence",
  ),
];
