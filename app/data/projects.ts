export interface Project {
  id: string;
  name: string;
  subtitle?: string;
  date?: string;
  description: string;
  tech: string[];
  metrics: { label: string; value: string }[];
  github?: string;
  demo?: string;
  image?: string;
  tags: string[];
  artifact: {
    label: string;
    type: 'dashboard' | 'architecture';
    items?: string[];
  };
  challenge: string;
  solution: string;
  result: string;
  learned: string;
  proof: string[];
}

export const projects: Project[] = [
  {
    id: 'batua',
    name: 'Batua',
    subtitle: 'Personal AI Finance Manager',
    date: 'Jun – Aug 2026',
    description: 'A privacy-first personal finance manager with dual-database auto-failover, custom NLP transaction parser, and offline AI assistant powered by Ollama and scikit-learn.',
    tech: ['Python', 'FastAPI', 'React 19', 'MongoDB', 'SQLite', 'Ollama (Llama 3.2)', 'scikit-learn', 'NLP'],
    metrics: [
      { label: 'Timeline', value: 'Jun - Aug 2026' },
      { label: 'Dashboard', value: '<100ms' },
      { label: 'Cloud Calls', value: '0' }
    ],
    github: 'https://github.com/anshuldhiman-ai/Batua',
    tags: ['Fintech', 'NLP', 'Local-First', 'Machine Learning'],
    artifact: { label: 'Dual-Database & AI Architecture', type: 'architecture' },
    challenge: 'Logging expenses manually is tedious, and cloud finance applications compromise sensitive financial privacy while introducing setup friction.',
    solution: 'Engineered a dual-database architecture (MongoDB with automatic SQLite failover) and a custom NLP parser converting natural-language input into structured transactions in real time.',
    result: 'Deployed an offline AI assistant (Ollama / Llama 3.2) with scikit-learn ML forecasting and anomaly detection, operating with zero cloud dependency or API costs.',
    learned: 'Dual-database failovers and offline LLM architectures enable privacy-first applications with enterprise-grade resilience.',
    proof: [
      'Dual-database auto-failover (MongoDB → SQLite)',
      'Custom NLP parser for natural-language transactions',
      'Offline Llama 3.2 assistant via Ollama',
      'ML-based cash flow forecasting (scikit-learn)'
    ]
  },
  {
    id: 'currency-counter',
    name: 'Currency Counter using OpenCV',
    subtitle: 'Real-Time Indian Currency Detection',
    date: '2026',
    description: 'A computer vision application with a custom YOLOv8 model trained to detect all 7 Indian currency denominations in real time, with IoU tracking and hardware-aware ONNX inference.',
    tech: ['Python', 'OpenCV', 'YOLOv8', 'ONNX Runtime', 'Computer Vision', 'PyTorch', 'NumPy'],
    metrics: [
      { label: 'Denominations', value: '7 Notes' },
      { label: 'Inference', value: 'ONNX Pipeline' },
      { label: 'Input', value: 'Webcam Feed' }
    ],
    github: 'https://github.com/anshuldhiman-ai/Currency-Counter-OpenCV',
    tags: ['Computer Vision', 'OpenCV', 'YOLOv8', 'ONNX'],
    artifact: { label: 'CV Detection & Tracking Pipeline', type: 'architecture' },
    challenge: 'Manual currency counting is error-prone, while webcam computer vision feeds suffer from frame latency and duplicate counting of moving notes.',
    solution: 'Trained a custom YOLOv8 object detection model for all 7 Indian currency notes, built an IoU-based tracking algorithm with time-verified stability checks, and implemented an ONNX Runtime hardware pipeline (NPU → GPU → CPU fallback).',
    result: 'Real-time webcam currency detection and verification system with zero duplicate note counts and low-latency inference.',
    learned: 'Hardware-aware ONNX acceleration and IoU temporal tracking eliminate object flickering and duplicate counts in live vision streams.',
    proof: [
      'Custom YOLOv8 detection model for 7 Indian currency notes',
      'IoU-based temporal tracking algorithm with stability checks',
      'Hardware-aware ONNX Runtime pipeline (NPU → GPU → CPU)',
      'Zero duplicate note counting on live webcam feeds'
    ]
  },
  {
    id: 'format-flow',
    name: 'FormatFlow',
    subtitle: 'File Format Converter',
    date: '2026',
    description: 'A containerized file conversion engine supporting 14+ input and 15+ output formats with a 4-stage fallback conversion chain, bulk export, and ZIP packaging.',
    tech: ['Python', 'Flask', 'PyMuPDF', 'Pandas', 'Pillow', 'Docker', 'python-docx'],
    metrics: [
      { label: 'Formats In/Out', value: '14+ / 15+' },
      { label: 'Fallback Chain', value: '4 Stages' },
      { label: 'Deployment', value: 'Docker' }
    ],
    github: 'https://github.com/anshuldhiman-ai/Format-Flow',
    tags: ['Developer Tools', 'Flask', 'Docker', 'Python'],
    artifact: { label: 'Conversion Engine Architecture', type: 'dashboard', items: ['PDF', 'DOCX', 'Images'] },
    challenge: 'Format conversions usually require 4 to 5 separate tools, and single-tool converters fail when handling unusual or malformed files.',
    solution: 'Built a containerized Docker conversion engine with a 4-stage fallback chain (PyMuPDF → python-docx → LibreOffice → Pandoc) and automated ZIP packaging with custom page-range selection.',
    result: 'All-in-one file converter application maximizing conversion success rate across corrupt or unusual document formats with single-click bulk export.',
    learned: 'Cascading fallback pipelines ensure high reliability when processing non-standard or user-uploaded media files.',
    proof: [
      'Containerized engine for 14+ input and 15+ output formats',
      '4-stage fallback chain (PyMuPDF → docx → LibreOffice → Pandoc)',
      'Automatic ZIP packaging & page-range selection',
      'Dockerized container deployment'
    ]
  }
];
