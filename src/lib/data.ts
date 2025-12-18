import type { DeveloperInfo, Project, Comment, Checklist } from './types';

export const developerInfo: DeveloperInfo = {
  name: 'Alex Doe',
  description: 'Full-stack developer with a passion for building modern web applications and open-source projects.',
  techStack: ['TypeScript', 'React', 'Next.js', 'Node.js', 'GraphQL', 'PostgreSQL', 'Docker', 'Kubernetes'],
  links: {
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
  },
};

export const projects: Project[] = [
  {
    id: '1',
    name: 'devcard-portfolio',
    description: 'The very portfolio site you are looking at. Built with Next.js, TypeScript, and ShadCN UI.',
    repoUrl: 'https://github.com/example/devcard-portfolio',
  },
  {
    id: '2',
    name: 'react-query-essentials',
    description: 'A comprehensive guide and set of examples for mastering TanStack Query in React applications.',
    repoUrl: 'https://github.com/example/react-query-essentials',
  },
  {
    id: '3',
    name: 'node-api-boilerplate',
    description: 'A scalable and robust boilerplate for building RESTful APIs with Node.js, Express, and TypeScript.',
    repoUrl: 'https://github.com/example/node-api-boilerplate',
  },
  {
    id: '4',
    name: 'graphql-server-kit',
    description: 'Everything you need to get a GraphQL server up and running quickly with Apollo Server and Prisma.',
    repoUrl: 'https://github.com/example/graphql-server-kit',
  },
  {
    id: '5',
    name: 'css-in-js-showdown',
    description: 'A performance comparison between popular CSS-in-JS libraries like Styled Components and Emotion.',
    repoUrl: 'https://github.com/example/css-in-js-showdown',
  },
  {
    id: '6',
    name: 'docker-for-devs',
    description: 'A beginner-friendly introduction to Docker for web developers, with practical examples.',
    repoUrl: 'https://github.com/example/docker-for-devs',
  },
];

export const comments: Comment[] = [
  {
    id: 'c1',
    projectId: '1',
    author: 'Jane Smith',
    text: 'This is a really cool portfolio! Love the clean design.',
    timestamp: '2023-10-26T10:00:00Z',
  },
  {
    id: 'c2',
    projectId: '1',
    author: 'Bob Johnson',
    text: 'Great use of Next.js Server Components. How did you handle the auth simulation?',
    timestamp: '2023-10-26T11:30:00Z',
  },
  {
    id: 'c3',
    projectId: '2',
    author: 'Alice Williams',
    text: 'Your guide on React Query is fantastic. It helped me a lot in my current project.',
    timestamp: '2023-10-25T14:00:00Z',
  },
];

export const checklists: Checklist[] = [
    {
        projectId: '1',
        tasks: [
            { id: 't1-1', text: 'Implement user registration and authentication UI', completed: true },
            { id: 't1-2', text: 'Create personal CV landing page', completed: true },
            { id: 't1-3', text: 'Build project showcase with comment system', completed: true },
            { id: 't1-4', text: 'Develop private checklist feature with admin controls', completed: false },
            { id: 't1-5', text: 'Deploy to Vercel/Netlify', completed: false },
        ]
    },
    {
        projectId: '3',
        tasks: [
            { id: 't3-1', text: 'Set up Express server with TypeScript', completed: true },
            { id: 't3-2', text: 'Integrate Prisma for database access', completed: true },
            { id: 't3-3', text: 'Implement JWT-based authentication middleware', completed: true },
            { id: 't3-4', text: 'Add comprehensive API documentation with Swagger', completed: false },
        ]
    },
    {
        projectId: '4',
        tasks: [
            { id: 't4-1', text: 'Basic Apollo Server setup', completed: true },
            { id: 't4-2', text: 'Define GraphQL schema and resolvers', completed: true },
            { id: 't4-3', text: 'Connect to a database using Prisma ORM', completed: true },
        ]
    }
];
