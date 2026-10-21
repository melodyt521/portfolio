export const currentExperience = {
  company: 'Winsights',
  role: 'Product and Data Intern',
  dates: 'Oct 2026 – Present',
  summary: 'Coming soon',
} as const;

export const experiences = [
  {
    slug: 'uiux-design-intern-gamania', company: 'Gamania', folder: 'gamania',
    role: 'UI/UX Design Intern', dates: 'July – August 2024', team: 'Branding Center',
    tools: 'Figma, Adobe Photoshop, Google Sites',
    summary: 'Centralizing brand resources and refining web experiences for Gamania Group.',
    sections: [
      { id: 'overview', title: 'Internship overview', heading: 'Crafting seamless brand experiences', paragraphs: [
        'During my summer 2024 internship at Gamania’s Branding Center, I collaborated on sitemaps, wireframes, and interactive prototypes for the &Me website. The platform was designed to serve Gamania Group employees and subsidiaries across desktop and mobile.',
        'I also helped refine the Cheer Up Foundation website’s interface. Both projects involved balancing usability, visual clarity, and consistency with Gamania’s brand identity.'
      ] },
      { id: 'and-me', title: 'My contributions', heading: '&Me: making brand resources easier to find', paragraphs: [
        'The &Me platform brings brand resources into one place so employees can find materials without lengthy searches or back-and-forth emails. I helped develop the platform’s structure and designed its Download and Brand Goods subpages.',
        'I began with sitemaps to organize each page’s content and a process map to understand how the download page connected with other departments. I then mapped user flows, explored low-fidelity prototypes, and refined the designs into high-fidelity interactive prototypes following feedback.'
      ] },
      { id: 'foundation', title: 'Website refinement', heading: 'Gamania Cheer Up Foundation', paragraphs: [
        'I simplified the homepage by removing unnecessary content and bringing key information and recent events forward. I updated footer information and reduced redundant navigation sections.',
        'Across the website, I improved text hierarchy, alignment, and layout consistency. I also reorganized event content to make the experience clearer and easier to navigate.'
      ] },
      { id: 'takeaways', title: 'Final takeaways', heading: 'Communication and iteration shape the work', paragraphs: [
        'The internship strengthened my understanding of effective communication, responsiveness, and collaboration. Integrating user-centered principles into an established brand helped me appreciate how feedback and iteration improve both function and presentation.'
      ] }
    ]
  },
  {
    slug: 'crypto-arsenal-internship', company: 'Crypto-Arsenal', folder: 'crypto-arsenal',
    role: 'UI/UX Design Intern', dates: 'June – September 2023', team: 'Design & engineering',
    tools: 'Figma, Jira, Mattermost',
    summary: 'Building reusable UI, responsive screens, and clearer flows for a trading platform.',
    sections: [
      { id: 'overview', title: 'Internship overview', heading: 'Improving usability through collaboration', paragraphs: [
        'In summer 2023, I worked with designers, engineers, and Crypto-Arsenal’s CEO to improve the website’s usability. I participated in daily updates and scrum meetings on Monday, Wednesday, and Friday evenings.',
        'These sessions gave the team a regular space to review completed work, plan next steps, and discuss blockers.'
      ] },
      { id: 'system', title: 'My contributions', heading: 'Developing a design system', paragraphs: [
        'I supported a new design system for the existing website, helping with preparation and refining reusable components and variants. I also designed hover states and contextual hover information to make interactions clearer.',
        'Working within design guidelines taught me how reusable patterns support consistency and help the team meet user expectations.'
      ] },
      { id: 'responsive', title: 'Responsive design', heading: 'Designing across screen sizes', paragraphs: [
        'I used Figma Auto Layout to create responsive screens and worked with engineers to validate how the designs adapted across devices. Repeated practice during the internship helped me become more confident with flexible layouts and implementation constraints.'
      ] },
      { id: 'arena', title: 'Product flows', heading: 'Redesigning the Arena detail page', paragraphs: [
        'I mapped user flows for the Arena detail page and discussed them regularly with my mentor, engineers, and the CEO. Those conversations helped align the page’s functionality with user needs before I developed low-fidelity wireframes.',
        'The process showed me how iteration and collaboration can clarify navigation and guide a more usable product experience.'
      ] },
      { id: 'takeaways', title: 'Final takeaways', heading: 'Learning through feedback', paragraphs: [
        'I learned the importance of communication, responsiveness, and adaptability. Working closely with other disciplines reinforced how user-centered design and continuous refinement contribute to a consistent experience.'
      ] }
    ]
  }
] as const;
export type Experience = typeof experiences[number];
