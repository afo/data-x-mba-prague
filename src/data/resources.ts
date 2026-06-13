/* ============================================================
   LEARNING PATH — curated, verified free resources.
   Every URL was checked live during research (June 2026).
   ============================================================ */

export type Format = 'Video' | 'Interactive' | 'Course' | 'Book' | 'Article' | 'Docs' | 'Paper';

export type Resource = {
  title: string;
  author?: string;
  href: string;
  desc: string;
  format: Format;
  free: boolean;
  featured?: boolean; // visually highlight / interactive
};

export type Level = {
  id: string;
  index: string; // "01"
  title: string;
  kicker: string;
  desc: string;
  resources: Resource[];
};

export const learningPath: Level[] = [
  {
    id: 'foundations',
    index: '01',
    title: 'Foundations & Intuition',
    kicker: 'Start here · no math required',
    desc: 'Build a mental model of what machine learning is and how it works — visually, before any code.',
    resources: [
      {
        title: 'Machine Learning for Everyone',
        author: 'vas3k',
        href: 'https://vas3k.com/blog/machine_learning/',
        desc: 'A genuinely excellent, non-technical overview of ML and data science with real-world analogies.',
        format: 'Article',
        free: true,
      },
      {
        title: 'A Visual Introduction to Machine Learning',
        author: 'R2D3',
        href: 'https://r2d3.us/visual-intro-to-machine-learning-part-1/',
        desc: 'Stunning interactive scrollytelling that explains decision trees, overfitting and bias/variance.',
        format: 'Interactive',
        free: true,
        featured: true,
      },
      {
        title: 'Neural Networks — the essentials',
        author: '3Blue1Brown',
        href: 'https://www.3blue1brown.com/topics/neural-networks',
        desc: 'Grant Sanderson’s beautifully animated series — the best visual intuition for how neural nets learn.',
        format: 'Video',
        free: true,
        featured: true,
      },
    ],
  },
  {
    id: 'machine-learning',
    index: '02',
    title: 'Core Machine Learning',
    kicker: 'The fundamentals, structured',
    desc: 'Supervised & unsupervised learning, model evaluation, and the workflow you’ll use on your project.',
    resources: [
      {
        title: 'Machine Learning Specialization',
        author: 'Andrew Ng · DeepLearning.AI',
        href: 'https://www.coursera.org/specializations/machine-learning-introduction',
        desc: 'The canonical, beginner-friendly ML course. Audit for free.',
        format: 'Course',
        free: true,
      },
      {
        title: 'Machine Learning Crash Course',
        author: 'Google',
        href: 'https://developers.google.com/machine-learning/crash-course',
        desc: '25 lessons and 40+ interactive exercises from Google researchers — no install needed.',
        format: 'Interactive',
        free: true,
        featured: true,
      },
      {
        title: 'StatQuest',
        author: 'Josh Starmer',
        href: 'https://www.youtube.com/@statquest',
        desc: 'Statistics & ML broken down with clarity and humour. Regression, PCA, clustering and more.',
        format: 'Video',
        free: true,
      },
      {
        title: 'Kaggle Learn',
        author: 'Kaggle',
        href: 'https://www.kaggle.com/learn',
        desc: 'Short, hands-on micro-courses with in-browser exercises and free GPU notebooks.',
        format: 'Interactive',
        free: true,
        featured: true,
      },
    ],
  },
  {
    id: 'deep-learning',
    index: '03',
    title: 'Deep Learning',
    kicker: 'Neural nets, in practice',
    desc: 'From the math of backprop to training real networks — top-down (fast.ai) or from-scratch (Karpathy).',
    resources: [
      {
        title: 'Practical Deep Learning for Coders',
        author: 'fast.ai',
        href: 'https://course.fast.ai/',
        desc: 'The famous top-down course: build working models first, then learn the theory underneath.',
        format: 'Course',
        free: true,
      },
      {
        title: 'Neural Networks: Zero to Hero',
        author: 'Andrej Karpathy',
        href: 'https://karpathy.ai/zero-to-hero.html',
        desc: 'Build neural nets from scratch in code, ending with your own GPT. Essential, hands-on.',
        format: 'Video',
        free: true,
        featured: true,
      },
      {
        title: 'Deep Learning Specialization',
        author: 'Andrew Ng · DeepLearning.AI',
        href: 'https://www.deeplearning.ai/courses/deep-learning-specialization/',
        desc: 'Five courses: CNNs, sequence models and the foundations of modern deep learning.',
        format: 'Course',
        free: true,
      },
    ],
  },
  {
    id: 'transformers',
    index: '04',
    title: 'Transformers & LLMs',
    kicker: 'How ChatGPT actually works',
    desc: 'The architecture behind every modern LLM — explained visually, then built in code.',
    resources: [
      {
        title: 'The Illustrated Transformer',
        author: 'Jay Alammar',
        href: 'https://jalammar.github.io/illustrated-transformer/',
        desc: 'The most-read transformer explainer. Self-attention and the full architecture, in diagrams.',
        format: 'Article',
        free: true,
        featured: true,
      },
      {
        title: 'Transformers & Attention',
        author: '3Blue1Brown',
        href: 'https://www.3blue1brown.com/lessons/gpt',
        desc: 'Animated deep-dive into embeddings, attention and how a GPT predicts the next token.',
        format: 'Video',
        free: true,
        featured: true,
      },
      {
        title: "Let's build GPT, from scratch in code",
        author: 'Andrej Karpathy',
        href: 'https://www.youtube.com/watch?v=kCc8FmEb1nY',
        desc: 'Implement a GPT step by step, following “Attention Is All You Need”. Ends with nanoGPT.',
        format: 'Video',
        free: true,
      },
      {
        title: 'Intro to Large Language Models',
        author: 'Andrej Karpathy',
        href: 'https://www.youtube.com/watch?v=zjkBMFhNj_g',
        desc: 'A dense, accessible 1-hour intro to how LLMs are trained and how they behave.',
        format: 'Video',
        free: true,
      },
      {
        title: 'Hugging Face LLM Course',
        author: 'Hugging Face',
        href: 'https://huggingface.co/learn/llm-course/en/chapter1/1',
        desc: 'Free, practical course on transformers, fine-tuning and the 🤗 ecosystem.',
        format: 'Course',
        free: true,
      },
      {
        title: 'Attention Is All You Need',
        author: 'Vaswani et al., 2017',
        href: 'https://arxiv.org/abs/1706.03762',
        desc: 'The original paper that introduced the transformer. Dense, but foundational.',
        format: 'Paper',
        free: true,
      },
    ],
  },
];

/** Interactive playgrounds — featured prominently with framed previews. */
export const playgrounds: (Resource & { tag: string })[] = [
  {
    title: 'TensorFlow Playground',
    author: 'Google',
    href: 'https://playground.tensorflow.org/',
    desc: 'Tinker with a real neural network in your browser — add layers, change activations, watch it learn.',
    format: 'Interactive',
    free: true,
    featured: true,
    tag: 'Train a net',
  },
  {
    title: 'Transformer Explainer',
    author: 'PoloClub · Georgia Tech',
    href: 'https://poloclub.github.io/transformer-explainer/',
    desc: 'A live GPT-2 running in your browser. Explore attention, token flow and probabilities interactively.',
    format: 'Interactive',
    free: true,
    featured: true,
    tag: 'See attention',
  },
  {
    title: 'LLM Visualization (3D)',
    author: 'Brendan Bycroft',
    href: 'https://bbycroft.net/llm',
    desc: 'A stunning 3D walkthrough of a GPT — every matrix multiply and add, layer by layer.',
    format: 'Interactive',
    free: true,
    featured: true,
    tag: 'Walk the model',
  },
];

/* ============================================================
   BUILD WITH AI — tooling, Python & AI-assisted coding.
   ============================================================ */

export const pythonResources: Resource[] = [
  {
    title: 'CS50’s Introduction to Programming with Python',
    author: 'Harvard · freeCodeCamp',
    href: 'https://www.youtube.com/watch?v=nLRL_NcnK-4',
    desc: 'The full Harvard CS50P course — the best place to learn Python properly from zero.',
    format: 'Video',
    free: true,
    featured: true,
  },
  {
    title: 'CS50P — shorter 2024 cut',
    author: 'CS50',
    href: 'https://www.youtube.com/watch?v=0eNc5lJfZFM',
    desc: 'A condensed version if you’re short on time.',
    format: 'Video',
    free: true,
  },
  {
    title: 'Learn Python',
    author: 'Kaggle',
    href: 'https://www.kaggle.com/learn/python',
    desc: 'Seven bite-sized lessons with hands-on, in-browser coding.',
    format: 'Interactive',
    free: true,
  },
  {
    title: 'Automate the Boring Stuff with Python',
    author: 'Al Sweigart',
    href: 'https://automatetheboringstuff.com/',
    desc: 'A free, practical online book — read it cover to cover for everyday automation.',
    format: 'Book',
    free: true,
  },
  {
    title: 'futurecoder',
    author: 'Open source',
    href: 'https://futurecoder.io/',
    desc: '100% free, fully interactive Python course with a built-in editor and debuggers.',
    format: 'Interactive',
    free: true,
  },
];

export const aiCoding: Resource[] = [
  {
    title: 'Anthropic Academy',
    author: 'Anthropic',
    href: 'https://anthropic.skilljar.com/',
    desc: 'Free certified courses: Claude 101, Claude Code, building with the API, MCP, agents & skills.',
    format: 'Course',
    free: true,
    featured: true,
  },
  {
    title: 'Claude Code — Quickstart',
    author: 'Anthropic',
    href: 'https://code.claude.com/docs/en/quickstart',
    desc: 'Official getting-started for Claude Code, the agentic coding CLI used to build this very site.',
    format: 'Docs',
    free: true,
  },
  {
    title: 'OpenAI Codex',
    author: 'OpenAI',
    href: 'https://developers.openai.com/codex',
    desc: 'OpenAI’s coding agent — web, CLI, IDE and desktop. Quickstart and model reference.',
    format: 'Docs',
    free: true,
  },
  {
    title: 'DeepLearning.AI — short courses',
    author: 'DeepLearning.AI',
    href: 'https://www.deeplearning.ai/',
    desc: 'Free short courses on LLMs: fine-tuning, LLMOps, RAG, agents and more.',
    format: 'Course',
    free: true,
  },
];

/** Business / commercial side of AI — this is an MBA course. */
export const businessResources: Resource[] = [
  {
    title: 'AI for Business Specialization',
    author: 'Wharton',
    href: 'https://www.coursera.org/specializations/ai-for-business-wharton',
    desc: 'Big data, ML, governance and ethics framed for business leaders. Audit for free.',
    format: 'Course',
    free: true,
  },
  {
    title: 'The State of AI',
    author: 'McKinsey',
    href: 'https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-state-of-ai',
    desc: 'Data-driven insight on enterprise AI adoption, ROI and organisational change.',
    format: 'Article',
    free: true,
  },
  {
    title: 'OpenAI Academy',
    author: 'OpenAI',
    href: 'https://academy.openai.com/',
    desc: 'Free learning hub on AI basics, LLMs and responsible AI for every audience.',
    format: 'Course',
    free: true,
  },
];
