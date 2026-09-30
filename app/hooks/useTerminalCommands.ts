'use client';

import { projects } from '../data/projects';
import { usedInProjects, currentlyLearning } from '../data/skills';

export function useTerminalCommands() {
  const currentPath = ['~'];

  const getPrompt = () => `anshul@portfolio ${currentPath[currentPath.length - 1]} % `;

  const executeCommand = (command: string): string => {
    const [cmd, ...args] = command.split(' ');

    switch (cmd) {
      case 'whoami':
        return `\x1b[1mAnshul Dhiman\x1b[0m
B.Tech CSE (AI & ML) Student - 2nd Year (CGPA: 6.73)
Lovely Professional University, Phagwara
Hometown: Hamirpur, Himachal Pradesh, India`;

      case 'ls':
        if (args[0] === 'projects' || args[0] === '-la') {
          return projects.map(p => `  [project] ${p.name}`).join('\n');
        }
        return `  projects/
  about.md
  skills.txt
  contact.md`;

      case 'cd':
        if (!args[0]) return 'Usage: cd <directory>';
        if (args[0] === 'projects') {
          currentPath.push('projects');
          return '';
        }
        if (args[0] === '..') {
          if (currentPath.length > 1) currentPath.pop();
          return '';
        }
        return `cd: no such file or directory: ${args[0]}`;

      case 'cat':
        if (args[0] === 'about.md') {
          return `\x1b[1mAbout Anshul Dhiman\x1b[0m

I'm a 2nd-year B.Tech CSE (AI & ML) student at LPU Phagwara,
originally from Hamirpur, Himachal Pradesh.

\x1b[1mEducation\x1b[0m
  - Lovely Professional University (B.Tech CSE AI & ML, 2025-Present, CGPA: 6.73)
  - Montessori Cambridge School (Class XII: 61%, Class X: 84.67%)

\x1b[1mFeatured Projects\x1b[0m
  - Batua (Personal AI Finance Manager)
  - Currency Counter using OpenCV (YOLOv8 + ONNX Runtime)
  - FormatFlow (Containerized File Converter)

\x1b[90m"Build practical solutions, learn through real implementation."\x1b[0m`;
        }
        if (args[0] === 'skills.txt') {
          return executeCommand('skills');
        }
        if (args[0] === 'contact.md') {
          return `\x1b[1mContact\x1b[0m

  Email      anshul.dhiman.ml@gmail.com
  LinkedIn   linkedin.com/in/anshul-dhiman-ai
  GitHub     github.com/anshuldhiman-ai
  LeetCode   leetcode.com/anshul_ai
  HackerRank hackerrank.com/anshul_dhiman_ml`;
        }
        return `cat: ${args[0]}: No such file or directory`;

      case 'skills':
        return [
          ...usedInProjects.map(g => `\x1b[1m${g.title}\x1b[0m\n  ${g.skills.join(', ')}`),
          `\x1b[1mCurrently Learning\x1b[0m\n  ${currentlyLearning.join(', ')}`
        ].join('\n\n');

      case 'neofetch':
        return `
   +---------------- Anshul Dhiman ----------------+
   | Degree  B.Tech CSE (AI & ML) @ LPU            |
   | Origin  Hamirpur, Himachal Pradesh            |
   | Year    2nd Year (CGPA: 6.73)                 |
   | Target  Machine Learning (ML) Engineer        |
   | Focus   Data Structures & Algorithms (DSA)    |
   +-----------------------------------------------+`;

      case 'pwd':
        return `/${currentPath.join('/')}`;

      case 'clear':
        return 'CLEAR';

      case 'help':
        return `\x1b[1mAvailable commands:\x1b[0m

  \x1b[32mwhoami\x1b[0m          Profile info
  \x1b[32mls\x1b[0m              List files
  \x1b[32mls projects\x1b[0m     List projects
  \x1b[32mcd <dir>\x1b[0m        Change directory
  \x1b[32mcat <file>\x1b[0m      Read a file
  \x1b[32mskills\x1b[0m          Tech stack
  \x1b[32mneofetch\x1b[0m        System info
  \x1b[32mpwd\x1b[0m             Current directory
  \x1b[32mclear\x1b[0m           Clear screen
  \x1b[32mhistory\x1b[0m         Journey timeline
  \x1b[32mgithub\x1b[0m          GitHub profile
  \x1b[32mlinkedin\x1b[0m        LinkedIn profile
  \x1b[32msocials\x1b[0m         All social profiles`;

      case 'history':
        return `\x1b[1mTimeline (Latest First)\x1b[0m

  2026  2nd Year (6.73 CGPA) — built Batua, Currency Counter OpenCV, FormatFlow; DSA focus
  2025  Enrolled in B.Tech CSE (AI & ML) @ LPU; completed Class XII (61%)
  2024  Built foundational programming skills in Python, C, and Web Dev
  2023  Completed Class X (84.67%) at Montessori Cambridge School; explored tech`;

      case 'sudo':
        if (args.join(' ') === 'hire-me') {
          return `\x1b[32mPermission granted.\x1b[0m

  Email    anshul.dhiman.ml@gmail.com
  LinkedIn linkedin.com/in/anshul-dhiman-ai
  GitHub   github.com/anshuldhiman-ai

  \x1b[90mLet's build something useful together.\x1b[0m`;
        }
        return `sudo: ${args.join(' ')}: command not found`;

      case 'open':
        if (args[0]) {
          const url = args[0].startsWith('http') ? args[0] : `https://${args[0]}`;
          if (typeof window !== 'undefined') {
            window.open(url, '_blank', 'noopener,noreferrer');
          }
          return `\x1b[90mOpening ${url}...\x1b[0m`;
        }
        return 'Usage: open <url>';

      case 'github':
        return `\x1b[1mGitHub\x1b[0m
  \x1b[34mhttps://github.com/anshuldhiman-ai\x1b[0m

  View my repositories, contributions, and projects.`;

      case 'leetcode':
        return `\x1b[1mLeetCode\x1b[0m
  \x1b[34mhttps://leetcode.com/anshul_ai\x1b[0m

  Check my problem-solving practice.`;

      case 'hackerrank':
        return `\x1b[1mHackerRank\x1b[0m
  \x1b[34mhttps://www.hackerrank.com/anshul_dhiman_ml\x1b[0m

  View my coding practice and certifications.`;

      case 'linkedin':
        return `\x1b[1mLinkedIn\x1b[0m
  \x1b[34mhttps://linkedin.com/in/anshul-dhiman-ai\x1b[0m

  Connect with me professionally.`;

      case 'socials':
        return `\x1b[1mSocial Profiles\x1b[0m

  GitHub     github.com/anshuldhiman-ai
  LinkedIn   linkedin.com/in/anshul-dhiman-ai
  LeetCode   leetcode.com/anshul_ai
  HackerRank hackerrank.com/anshul_dhiman_ml

\x1b[90mUse 'open <url>' to visit any profile.\x1b[0m`;

      case 'matrix':
        return `01001001 00100000 01101100 01101111 01110110 01100101
01000001 01001001 00101110 00101110 00101110`;

      case 'konami':
        return `Achievement unlocked.
Secret: anshul.dhiman.ml@gmail.com`;

      default:
        return `zsh: command not found: ${cmd}`;
    }
  };

  return { executeCommand, getPrompt };
}
