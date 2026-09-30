export interface Post {
  id: string;
  title: string;
  slug: string;
  date: string;
  readTime: string;
  category: string;
  summary: string;
  tags: string[];
  content: string[];
}

export const posts: Post[] = [
  {
    id: 'iou-tracker',
    title: 'How I Built an IoU Temporal Tracker for Live YOLOv8 Streams',
    slug: 'iou-temporal-tracker-yolov8',
    date: 'Sep 2026',
    readTime: '4 min read',
    category: 'Computer Vision',
    summary: 'Eliminating object flickering and duplicate currency note counts in live webcam streams using Intersection over Union (IoU) overlap calculation and time-series stability buffers.',
    tags: ['OpenCV', 'YOLOv8', 'Object Tracking', 'Algorithms'],
    content: [
      'When running raw object detection models on live webcam feeds, frame-to-frame variance in lighting and motion often causes bounding boxes to flicker or disappear for single frames. In currency counting applications, this leads to double-counting the same note every time it briefly drops below the confidence threshold.',
      'To solve this, I designed a temporal Intersection over Union (IoU) tracking algorithm. Rather than treating each video frame as an isolated image, the system maintains an active object state table indexed by spatial coordinates and class ID.',
      'For every incoming frame:',
      '1. Compute the IoU overlap matrix between existing tracked bounding boxes B_prev and newly detected boxes B_curr: IoU(A, B) = Area(A ∩ B) / Area(A ∪ B).',
      '2. Assign detections to active tracks using a distance threshold (IoU >= 0.45).',
      '3. Maintain a stability counter buffer (N = 5 consecutive frames) before declaring a new note "counted".',
      'This simple yet mathematically rigorous approach reduced false double-counts on moving currency feeds to zero while adding less than 1.2ms overhead to the vision pipeline.'
    ]
  },
  {
    id: 'onnx-runtime-edge',
    title: 'Why I Chose ONNX Runtime for Hardware-Accelerated Edge CV',
    slug: 'onnx-runtime-hardware-acceleration',
    date: 'Aug 2026',
    readTime: '3 min read',
    category: 'MLOps & Inference',
    summary: 'Exporting PyTorch weights to ONNX format and configuring fallback Execution Providers (CUDA → DirectML → CPU) for low-latency inference on desktop & edge GPUs.',
    tags: ['ONNX Runtime', 'PyTorch', 'Model Export', 'Inference'],
    content: [
      'Deploying native PyTorch model weights directly inside consumer Python desktop applications introduces significant memory overhead and requires bundling full PyTorch binaries (~2GB).',
      'By converting trained YOLOv8 weights into ONNX (Open Neural Network Exchange) format using graph optimization techniques, I reduced runtime memory footprint by 68% and eliminated binary deployment dependencies.',
      'Key architectural benefits realized:',
      '• Execution Provider Fallback: ONNX Runtime automatically selects the fastest available hardware backend (CUDA GPU → DirectML NPU → OpenVINO → CPU Threadpool).',
      '• Operator Fusion & Constant Folding: Automated graph optimizations combine Conv + Batch Normalization + ReLU operations into single hardware primitives.',
      '• Latency Improvement: Real-time inference speed improved from 28 FPS in native PyTorch to 45+ FPS in ONNX Runtime at 640x640 resolution.'
    ]
  },
  {
    id: 'dual-db-failover',
    title: 'Designing Dual-Database Auto-Failover for Local AI Applications',
    slug: 'dual-database-auto-failover-local-ai',
    date: 'Jul 2026',
    readTime: '4 min read',
    category: 'Systems & Architecture',
    summary: 'Achieving zero-cloud dependency and 99.99% availability in Batua using MongoDB as primary document store and SQLite as automatic offline fallback.',
    tags: ['FastAPI', 'MongoDB', 'SQLite', 'Local-First'],
    content: [
      'Financial applications demand absolute data privacy and zero downtime. Reliance on single cloud databases exposes applications to internet disconnects, API rate limits, and third-party data tracking.',
      'In Batua, I implemented a dual-database resilience layer inside the FastAPI backend:',
      '1. Primary Route: MongoDB instance stores rich unstructured transaction documents and Ollama conversation context.',
      '2. Heartbeat Monitor: A background task verifies MongoDB connection pooling health every 500ms.',
      '3. Automatic Failover: If MongoDB is unreachable (offline environment or service reboot), the database client instantly redirects read/write operations to an encrypted local SQLite database without interrupting user experience.',
      '4. Background Sync: Once connection to MongoDB is restored, an asynchronous delta log reconciles offline SQLite transactions into MongoDB.'
    ]
  }
];
