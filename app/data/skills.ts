export interface SkillGroup {
  title: string;
  summary: string;
  skills: string[];
}

export const usedInProjects: SkillGroup[] = [
  {
    title: 'Languages',
    summary: 'Core programming languages.',
    skills: ['Python', 'C', 'C++', 'SQL']
  },
  {
    title: 'Web & Backend',
    summary: 'Frontend interfaces, server frameworks, and APIs.',
    skills: ['HTML', 'CSS', 'JavaScript', 'React', 'FastAPI', 'Flask']
  },
  {
    title: 'AI / ML',
    summary: 'Machine Learning models, Computer Vision, and AI pipelines.',
    skills: ['YOLOv8', 'PyTorch', 'OpenCV', 'scikit-learn', 'LLMs', 'RAG', 'NLP']
  },
  {
    title: 'Tools & DevOps',
    summary: 'Version control, containerization, and deployment tooling.',
    skills: ['Git', 'GitHub', 'Docker', 'CI/CD']
  },
  {
    title: 'Soft Skills',
    summary: 'Engineering mindset and collaboration strengths.',
    skills: ['Problem-Solving', 'Adaptability', 'Teamwork']
  }
];

export const currentlyLearning: string[] = [
  'Data Structures & Algorithms (DSA)',
  'Building Strong Coding Foundations',
  'Writing Optimized Code & Time Complexity',
  'Target Role: Machine Learning (ML) Engineer'
];
