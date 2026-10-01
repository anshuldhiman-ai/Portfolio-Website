export interface Tool {
  name: string;
  category: string;
  description: string;
  icon: string;
  proficiency: 'Expert' | 'Advanced' | 'Intermediate' | 'Learning';
}

export const tools: Tool[] = [
  // AI Tools
  {
    name: 'Antigravity 1.0 & 2.0 CLI',
    category: 'AI Tools',
    description: 'Advanced AI development toolkit for building and deploying AI applications',
    icon: '🤖',
    proficiency: 'Advanced',
  },
  {
    name: 'Claude Code Desktop',
    category: 'AI Tools',
    description: 'AI-powered code assistant for intelligent code generation and debugging',
    icon: '🧠',
    proficiency: 'Expert',
  },
  {
    name: 'Devin',
    category: 'AI Tools',
    description: 'Autonomous AI software engineering agent for complex development tasks',
    icon: '⚡',
    proficiency: 'Advanced',
  },
  {
    name: 'GitHub Copilot',
    category: 'AI Tools',
    description: 'AI pair programmer providing intelligent code suggestions and completions',
    icon: '🎯',
    proficiency: 'Expert',
  },
  
  // Development Tools
  {
    name: 'VS Code',
    category: 'Development',
    description: 'Primary IDE for coding with extensive plugin ecosystem',
    icon: '💻',
    proficiency: 'Expert',
  },
  {
    name: 'Git',
    category: 'Development',
    description: 'Version control system for tracking changes and collaboration',
    icon: '📚',
    proficiency: 'Expert',
  },
  {
    name: 'GitHub',
    category: 'Development',
    description: 'Platform for version control, collaboration, and CI/CD',
    icon: '🐙',
    proficiency: 'Expert',
  },
  {
    name: 'Go',
    category: 'Development',
    description: 'Programming language for building scalable and efficient systems',
    icon: '🔷',
    proficiency: 'Intermediate',
  },
];

export const toolCategories = ['AI Tools', 'Development'] as const;
