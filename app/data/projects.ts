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
    id: 'currency-counter',
    name: 'Currency Counter using OpenCV & YOLOv8',
    subtitle: 'Real-Time Indian Currency Detection & Tracking Engine',
    date: '2026',
    description: 'A computer vision application with a custom YOLOv8 model trained to detect all 7 Indian currency denominations in real time, featuring IoU temporal tracking, dataset validation, and ONNX Runtime hardware execution.',
    tech: ['Python', 'OpenCV', 'YOLOv8', 'ONNX Runtime', 'PyTorch', 'NumPy', 'FastAPI'],
    metrics: [
      { label: 'mAP@0.5', value: '98.4%' },
      { label: 'Precision / Recall', value: '96.2% / 95.8%' },
      { label: 'Dataset Split', value: '1.45k (80/10/10)' },
      { label: 'Inference Speed', value: '45+ FPS' }
    ],
    github: 'https://github.com/anshuldhiman-ai/Currency-Counter-OpenCV',
    demo: 'https://huggingface.co/spaces/anshuldhiman-ai/Currency-Counter-OpenCV',
    tags: ['Computer Vision', 'YOLOv8', 'ONNX Runtime', 'PyTorch'],
    artifact: { label: 'CV Detection & Temporal IoU Tracking Pipeline', type: 'architecture' },
    challenge: 'Manual currency counting is error-prone, while live webcam computer vision feeds suffer from frame latency, bounding box jitter, and duplicate counting of moving notes.',
    solution: 'Trained a custom YOLOv8 object detection model on 1,450 annotated currency images across all 7 Indian denominations. Built a custom IoU (Intersection over Union) temporal tracking algorithm with time-verified stability checks, and implemented an ONNX Runtime hardware pipeline (GPU/NPU acceleration with CPU fallback).',
    result: 'Achieved 98.4% mAP@0.5 accuracy and zero duplicate note counts on live webcam feeds with smooth 45+ FPS real-time performance.',
    learned: 'Hardware-aware ONNX acceleration and temporal IoU tracking eliminate object flickering and duplicate counts in live vision streams.',
    proof: [
      'Custom YOLOv8 detection model trained for 7 Indian currency notes',
      'IoU-based temporal tracking algorithm with time stability checks',
      'Hardware-aware ONNX Runtime pipeline (GPU/NPU → CPU fallback)',
      '1,450 annotated image dataset (80/10/10 train/val/test split)'
    ]
  },
  {
    id: 'neural-rag',
    name: 'NeuralRAG – Evaluated Multi-Agent RAG Pipeline',
    subtitle: 'Retrieval-Augmented Generation & Evaluation Suite',
    date: '2026',
    description: 'An end-to-end RAG system combining dense vector search (Qdrant), BGE cross-encoder re-ranking, and automated evaluation using Ragas framework for benchmarked faithfulness and answer relevance.',
    tech: ['Python', 'PyTorch', 'Qdrant', 'BGE Reranker', 'Llama 3.2', 'Ragas', 'Hugging Face', 'FastAPI'],
    metrics: [
      { label: 'Faithfulness Score', value: '0.91' },
      { label: 'Answer Relevance', value: '0.89' },
      { label: 'Context Recall', value: '0.93' },
      { label: 'Latency', value: '<320ms' }
    ],
    github: 'https://github.com/anshuldhiman-ai/NeuralRAG',
    demo: 'https://huggingface.co/spaces/anshuldhiman-ai/NeuralRAG-Demo',
    tags: ['RAG', 'LLMs', 'NLP', 'Evaluation', 'PyTorch'],
    artifact: { label: 'Multi-Stage Vector RAG Architecture', type: 'architecture' },
    challenge: 'Naive vector search RAG pipelines suffer from context hallucination, irrelevant document retrieval, and lack objective automated quality benchmarks.',
    solution: 'Built a two-stage retrieval pipeline with Qdrant dense vector embeddings followed by a BGE cross-encoder reranker. Integrated Ragas automated evaluation framework measuring Faithfulness, Answer Relevance, and Context Recall per query.',
    result: 'Substantially reduced hallucinations and increased retrieval precision with real-time automated quality scoring.',
    learned: 'Two-stage retrieval with cross-encoder re-ranking dramatically improves document context relevance compared to single-pass cosine search.',
    proof: [
      'Two-stage retrieval (Dense vector search + BGE cross-encoder reranker)',
      'Automated Ragas evaluation benchmark (Faithfulness, Relevance, Recall)',
      'Quantized Llama 3.2 local synthesis engine',
      'FastAPI REST API with async vector indexing'
    ]
  },
  {
    id: 'batua',
    name: 'Batua',
    subtitle: 'Personal AI Finance Manager',
    date: 'Jun – Aug 2026',
    description: 'A privacy-first personal finance manager with dual-database auto-failover, custom NLP transaction parser, and offline AI assistant powered by Ollama and scikit-learn.',
    tech: ['Python', 'FastAPI', 'React 19', 'MongoDB', 'SQLite', 'Ollama (Llama 3.2)', 'scikit-learn', 'NLP'],
    metrics: [
      { label: 'Dashboard Latency', value: '<85ms' },
      { label: 'Cloud API Calls', value: '0 (Offline)' },
      { label: 'ML Forecasting', value: 'scikit-learn' }
    ],
    github: 'https://github.com/anshuldhiman-ai/Batua',
    demo: 'https://github.com/anshuldhiman-ai/Batua#demo',
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
    demo: 'https://github.com/anshuldhiman-ai/Format-Flow#docker',
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
