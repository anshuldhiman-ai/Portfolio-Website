export interface SkillGroup {
  title: string;
  summary: string;
  skills: string[];
}

export const usedInProjects: SkillGroup[] = [
  {
    title: 'Languages',
    summary: 'Languages used in algorithm practice and production repositories.',
    skills: ['Python', 'C++', 'C', 'SQL']
  },
  {
    title: 'AI & Vision',
    summary: 'Computer vision, model training, and RAG architectures.',
    skills: ['YOLOv8', 'OpenCV', 'PyTorch', 'ONNX Runtime', 'RAG & Vector Search', 'scikit-learn', 'NLP']
  },
  {
    title: 'Backend & APIs',
    summary: 'High-performance microservices, web servers, and local LLM integrations.',
    skills: ['FastAPI', 'Flask', 'React', 'MongoDB', 'SQLite', 'Ollama']
  },
  {
    title: 'Tools & Hardware',
    summary: 'Containerization, hardware acceleration, and version control.',
    skills: ['Docker', 'ONNX Runtime', 'Git', 'GitHub', 'CI/CD Pipelines']
  }
];

export const currentlyLearning: string[] = [
  'Advanced Data Structures & Algorithms (DSA)',
  'Distributed ML Training & Deep Learning Systems',
  'Quantization & TensorRT Inference Optimization'
];
