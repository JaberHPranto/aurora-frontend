export interface Template {
  id: string;
  title: string;
  description: string;
  preview: string;
  content: string;
  category: string;
}

export const templateData: Template[] = [
  {
    id: "1",
    title: "Marketing Email",
    description: "A template for sending marketing emails.",
    preview:
      "Subject: Check out our new product!\n\nHi [Name],\n\nWe're excited to announce...",
    content:
      "Subject: Check out our new product!\n\nHi [Name],\n\nWe're excited to announce...\n\nThanks for reaching out! We're sorry to hear that you're experiencing...\n\nThanks for reaching out! We're sorry to hear that you're experiencing...\n\nThanks for reaching out! We're sorry to hear that you're experiencing... \n\nThanks for reaching out! We're sorry to hear that you're experiencing...\n\nThanks for reaching out! We're sorry to hear that you're experiencing...",
    category: "patients",
  },
  {
    id: "2",
    title: "Intervention Pitch",
    description: "A template for a sales pitch.",
    preview: "Hi [Name],\n\nI'm reaching out to see if you're interested in...",
    content: "Hi [Name],\n\nI'm reaching out to see if you're interested in...",
    category: "intervention",
  },
  {
    id: "3",
    title: "Customer comparator Response",
    description: "A template for responding to customer comparator requests.",
    preview:
      "Hi [Name],\n\nThanks for reaching out! We're sorry to hear that you're experiencing...",
    content:
      "Hi [Name],\n\nThanks for reaching out! We're sorry to hear that you're experiencing...",
    category: "comparator",
  },
  {
    id: "4",
    title: "Social Media Post",
    description: "A template for creating social media posts.",
    preview: "Check out our latest blog post on...",
    content: "Check out our latest blog post on...",
    category: "patients",
  },
  {
    id: "5",
    title: "Cold Email",
    description: "A template for sending cold emails.",
    preview:
      "Hi [Name],\n\nI hope this email finds you well. I'm reaching out because...",
    content:
      "Hi [Name],\n\nI hope this email finds you well. I'm reaching out because...",
    category: "intervention",
  },
  {
    id: "6",
    title: "Bug Report",
    description: "A template for reporting bugs.",
    preview:
      "Summary: [Short description of the bug]\n\nSteps to reproduce:\n1. ...\n2. ...",
    content:
      "Summary: [Short description of the bug]\n\nSteps to reproduce:\n1. ...\n2. ...",
    category: "comparator",
  },
  // {
  //   id: "7",
  //   title: "Project Proposal",
  //   description: "A template for writing project proposals.",
  //   preview: "Project Title: [Project Title]\n\nExecutive Summary: ...",
  //   content: "Project Title: [Project Title]\n\nExecutive Summary: ...",
  //   category: "outcomes",
  // },
  // {
  //   id: "8",
  //   title: "Meeting Agenda",
  //   description: "A template for creating meeting agendas.",
  //   preview:
  //     "Meeting Title: [Meeting Title]\n\nDate: [Date]\n\nTime: [Time]\n\nAttendees: ...",
  //   content:
  //     "Meeting Title: [Meeting Title]\n\nDate: [Date]\n\nTime: [Time]\n\nAttendees: ...",
  //   category: "outcomes",
  // },
  {
    id: "9",
    title: "Onboarding Email",
    description: "A template for onboarding new users.",
    preview:
      "Welcome to [Product Name]!\n\nWe're so glad to have you on board.",
    content:
      "Welcome to [Product Name]!\n\nWe're so glad to have you on board.",
    category: "patients",
  },
  {
    id: "10",
    title: "Lead Generation",
    description: "A template for lead generation.",
    preview: "Are you looking for [Solution]?\n\nWe can help!",
    content: "Are you looking for [Solution]?\n\nWe can help!",
    category: "intervention",
  },
  {
    id: "11",
    title: "Feature Request",
    description: "A template for requesting new features.",
    preview:
      "Feature Title: [Feature Title]\n\nDescription: ...\n\nUse Case: ...",
    content:
      "Feature Title: [Feature Title]\n\nDescription: ...\n\nUse Case: ...",
    category: "study design",
  },
  {
    id: "12",
    title: "Product Review",
    description: "A template for writing product reviews.",
    preview:
      "Product: [Product Name]\n\nRating: [Rating]/5\n\nPros: ...\n\nCons: ...",
    content:
      "Product: [Product Name]\n\nRating: [Rating]/5\n\nPros: ...\n\nCons: ...",
    category: "study design",
  },
  {
    id: "13",
    title: "Technical Documentation",
    description: "A template for writing technical documentation.",
    preview: "# [Title]\n\n## Overview\n\n...\n\n## Installation\n\n...",
    content: "# [Title]\n\n## Overview\n\n...\n\n## Installation\n\n...",
    category: "study design",
  },
  {
    id: "14",
    title: "Case Study",
    description: "A template for writing case studies.",
    preview:
      "# [Client Name] Case Study\n\n## Challenge\n\n...\n\n## Solution\n\n...",
    content:
      "# [Client Name] Case Study\n\n## Challenge\n\n...\n\n## Solution\n\n...",
    category: "patients",
  },
];
