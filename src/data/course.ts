/* ============================================================
   COURSE CONTENT — single source of truth.
   Every item below is carried over from the original index.md
   (plus light structuring). Edit content here, not in markup.
   ============================================================ */

export type Material = { label: string; href: string };
export type Session = {
  id: string;
  term: string;
  dates: string;
  status: 'upcoming' | 'past';
  blurb: string;
  materials: Material[];
};

export const sessions: Session[] = [
  {
    id: 'june-2026',
    term: 'June 2026',
    dates: 'June 12–14, 2026',
    status: 'upcoming',
    blurb: 'The next cohort. Three intensive days of applied AI, from fundamentals to a working prototype.',
    materials: [
      {
        label: 'Friday · Day 1 — Slides',
        href: 'https://docs.google.com/presentation/d/1BHyxNmpQtiLSRxb3JcDp_c3Vb1Q9jJeW1z-lmVHHg0M/',
      },
    ],
  },
  {
    id: 'nov-2025',
    term: 'November 2025',
    dates: 'Nov 1–2, 2025',
    status: 'past',
    blurb: 'Weekend intensive covering the data science workflow, machine learning and modern LLM tooling.',
    materials: [
      {
        label: 'Day 1 — Slides',
        href: 'https://docs.google.com/presentation/d/18hQDZ2fmXt_OOeSE0viE09cnlMb7p2gIh3a9ERjUew8/edit?slide=id.g39f2ef08b92_0_1122#slide=id.g39f2ef08b92_0_1122',
      },
      {
        label: 'Day 1 — Problem set',
        href: 'https://docs.google.com/document/u/1/d/1pLVd4G-IlOxJaYZZQuhUeON04Nv7KWPtF2-uOgzKWaU/edit?tab=t.w6w73xh9ptzd#heading=h.huxu5m7gzrfb',
      },
      {
        label: 'Tool recommendations',
        href: 'https://docs.google.com/spreadsheets/d/1LyUyAtrmy5VHi8jTrQkGfWst7Qhr5mm-sUg5ResU4mg/edit?usp=sharing',
      },
    ],
  },
];

export const courseDescription =
  "This course teaches you the commercial aspects of applied AI, data science, machine learning, and deep learning. At the same time you'll get a fundamental understanding of how to implement and build systems using state-of-the-art and open-source tools.";

export const stats: { value: string; label: string }[] = [
  { value: '3', label: 'Intensive days' },
  { value: '1', label: 'Working prototype shipped' },
  { value: '100%', label: 'Hands-on, open-source tools' },
  { value: '2019', label: 'Teaching applied AI since' },
];

/** Final-project pitch — must demonstrate the full data-science journey. */
export const finalPresentation: string[] = [
  'Assumptions',
  'Exploratory data analysis (clear graphs)',
  'Journey / trials to get the results',
  'Data transformation / feature engineering steps',
  'Different models and algorithms used',
  'Results and chosen model',
  'Validation of results',
  'Working prototype',
  'Areas of improvement',
  'Next steps',
];

export const grading: { label: string; weight: number }[] = [
  { label: 'Project work (+ pitch)', weight: 50 },
  { label: 'Assignments / quizzes', weight: 35 },
  { label: 'Participation', weight: 15 },
];

export const readings: { title: string; note: string; href: string }[] = [
  {
    title: 'Hands-On Machine Learning with Scikit-Learn & PyTorch',
    note: 'Get the 2025 PyTorch edition — the single best applied reference.',
    href: 'https://www.waterstones.com/book/hands-on-machine-learning-with-scikit-learn-and-pytorch/aurelien-geron//9798341607989',
  },
  {
    title: 'An Introduction to Statistical Learning',
    note: 'Free PDF · the canonical intro to statistical learning (R & Python).',
    href: 'https://www.statlearning.com/',
  },
  {
    title: 'Machine Learning — Coursera (Andrew Ng)',
    note: "The course that launched a million ML careers.",
    href: 'https://www.coursera.org/learn/machine-learning',
  },
  {
    title: 'The Deep Learning Book',
    note: 'Free online · Goodfellow, Bengio & Courville — the deep-learning reference.',
    href: 'https://www.deeplearningbook.org/',
  },
  {
    title: 'DataCamp',
    note: 'Interactive courses for Python, SQL and data science.',
    href: 'https://www.datacamp.com/',
  },
];

export const timeSeries: { title: string; note: string; href: string }[] = [
  {
    title: 'A Gentle Introduction to Time-Series Forecasting',
    note: 'Weights & Biases report.',
    href: 'https://wandb.ai/iamleonie/A-Gentle-Introduction-to-Time-Series-Analysis-Forecasting/reports/A-Gentle-Introduction-to-Time-Series-Analysis-Forecasting--VmlldzoyNjkxOTMz',
  },
  {
    title: 'Time-Series Forecasting with Prophet',
    note: 'Hands-on Kaggle tutorial.',
    href: 'https://www.kaggle.com/code/prashant111/tutorial-time-series-forecasting-with-prophet',
  },
];

export const installSteps: { title: string; body: string; href?: string; cta?: string }[] = [
  {
    title: 'Run in the cloud (recommended)',
    body: "Never used Jupyter notebooks? Run all course material in Google Colab — Google's shared notebook interface in Drive. Nothing to install.",
    href: 'https://colab.research.google.com/',
    cta: 'Open Google Colab',
  },
  {
    title: 'Run locally',
    body: "Prefer local experimentation and haven't used virtual environments before? Follow the Anaconda install instructions.",
    href: 'https://bit.ly/L2L-install',
    cta: 'Anaconda install guide',
  },
];

export const instructors = [
  {
    name: 'Alexander Fred-Ojala',
    role: 'Instructor',
    org: 'SCET · Data Lab, UC Berkeley',
    orgHref: 'http://scet.berkeley.edu/data-lab',
    linkedin: 'https://linkedin.com/in/alexanderfo',
    img: 'imgs/alex.jpg',
  },
  {
    name: 'Marcus Zethraeus',
    role: 'Instructor',
    org: 'Predli',
    orgHref: 'https://predli.com',
    linkedin: 'https://www.linkedin.com/in/marcuszethraeus/',
    img: 'imgs/mz.jpeg',
  },
];

export const faqs: { q: string; a: string; links?: Material[] }[] = [
  {
    q: 'Are there cloud credits for the class project?',
    a: 'Yes. If you need computing resources for your project, look into the AWS Educate program for students or sign up for a Google Cloud account — both give a few hundred dollars of free sign-up credit.',
    links: [
      { label: 'AWS Educate', href: 'https://aws.amazon.com/education/awseducate/apply/' },
      { label: 'Google Cloud free tier', href: 'https://cloud.google.com/free/' },
    ],
  },
  {
    q: 'How is the course graded?',
    a: 'Project work (plus the pitch) is 50%, assignments and quizzes are 35%, and participation is 15%.',
  },
  {
    q: 'Where is the code and course repository?',
    a: 'Everything lives in the GitHub repository.',
    links: [{ label: 'github.com/afo/data-x-mba', href: 'https://github.com/afo/data-x-mba' }],
  },
  {
    q: 'What should I prepare beforehand?',
    a: 'Work through the Learning Path below — especially the Python track and a non-technical ML overview. Set up Google Colab so you can run notebooks on day one.',
  },
];

export const workshops: string[] = [
  'Blockchain intro',
  'Hands-on blockchain',
  'Neural networks, CNNs, computer vision & transfer learning',
  'Python notebook deep-dive',
];
