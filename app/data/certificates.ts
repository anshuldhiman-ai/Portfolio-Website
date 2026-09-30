export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  date: string;
  verifyUrl?: string;
  image?: string;
  description?: string;
}

export const certificates: Certificate[] = [
  {
    id: 'cert-ai-intro',
    title: 'Introduction to Artificial Intelligence',
    issuer: 'Infosys Springboard',
    date: 'Mar 2026',
    image: '/certificates/mooc.jpg',
    description: 'Core concepts of Artificial Intelligence, neural networks, search algorithms, knowledge representation, and ML fundamentals.',
  },
  {
    id: 'cert-python-2',
    title: 'Programming Fundamentals using Python - Part 2',
    issuer: 'Infosys Springboard',
    date: 'Jul 2026',
    image: '/certificates/python_2.png',
    description: 'Advanced Python programming certification covering object-oriented concepts, data structures, and algorithmic logic.',
  },
  {
    id: 'cert-academic-2',
    title: 'Academic & Technical Specialization Credentials',
    issuer: 'Lovely Professional University',
    date: '2026',
    image: '/certificates/academic_cert_2.png',
    description: 'Official academic specialization credentials and course achievements in B.Tech CSE (AI & ML).',
  },
  {
    id: 'cert-cs105-saylor',
    title: 'CS105: Introduction to Python',
    issuer: 'Saylor.org',
    date: 'Feb 2026',
    image: '/certificates/academic_cert_1.png',
    description: 'Comprehensive computer science course certification covering Python programming syntax and core paradigms.',
  },
  {
    id: 'cert-python-1',
    title: 'Programming Fundamentals using Python - Part 1',
    issuer: 'Infosys Springboard',
    date: 'Jul 2026',
    image: '/certificates/python_1.png',
    description: 'Foundational certification in Python control flow, functions, data types, and problem-solving.',
  },
];
