// Everything on the resume, plus the skills shown on the site. Keep the resume
// to one A4 page and check with Print / PDF after editing.

export interface ResumeLink {
  label: string;
  href: string;
}

export interface ResumeEntry {
  title: string;
  /** Shown beside the title, such as an organisation or a tech stack. */
  detail?: string;
  /** Shown at the right edge, such as a date. */
  meta?: string;
  link?: ResumeLink;
  points: string[];
}

export interface ResumeSection {
  heading: string;
  entries: ResumeEntry[];
}

export const RESUME = {
  name: 'Rushabh H. Makwana',
  role: 'Web Developer · Founder, PIXEL Forge',
  location: 'Dombivli, Mumbai, India',
  contacts: [
    { label: '+91 93211 44797', href: 'tel:+919321144797' },
    { label: 'rushabhmakwana784@gmail.com', href: 'mailto:rushabhmakwana784@gmail.com' },
    { label: 'github.com/Rushabh1697', href: 'https://github.com/Rushabh1697' },
    { label: 'linkedin.com/in/rushabh-makwana-43590030a', href: 'https://www.linkedin.com/in/rushabh-makwana-43590030a' },
    {
      label: 'Portfolio: my-portfolio-five-pink-4y38i6keto.vercel.app',
      href: 'https://my-portfolio-five-pink-4y38i6keto.vercel.app/',
    },
  ] satisfies ResumeLink[],
  summary:
    'Web developer who ships real products: paid websites for three clients, platforms for my college Entrepreneurship Cell, and an Android-to-PC game controller. Computer Engineering student (class of 2029), open to web development internships and freelance work.',
  highlights: [
    { value: '3', label: 'paid client websites, all live' },
    { value: '400+', label: 'participants at SINGULARITY 1.0, as organiser' },
    { value: 'Tech Head', label: 'SINGULARITY 2.0, a national-level hackathon' },
  ],
  sections: [
    {
      heading: 'Client Work',
      entries: [
        {
          title: 'Founder & Developer',
          detail: 'PIXEL Forge, solo web and app studio',
          meta: 'Present',
          link: { label: 'pixelforge-web-eta.vercel.app', href: 'https://pixelforge-web-eta.vercel.app' },
          points: ['Built paid websites for three clients, all live today:'],
        },
        {
          title: 'Kathak Shades',
          detail: 'Next.js, TypeScript, GSAP',
          link: { label: 'kathakshades.in', href: 'https://kathakshades.in' },
          points: ['Website for a classical Kathak dance school, live on its own domain.'],
        },
        {
          title: 'Jai Mataji Art Furniture',
          detail: 'React, Three.js',
          link: { label: 'jaimatajiart.vercel.app', href: 'https://jaimatajiart.vercel.app' },
          points: ['Website for a bespoke handcrafted furniture maker in business since 1993.'],
        },
        {
          title: 'Urbanaxis Studio',
          detail: 'React, GSAP, Framer Motion',
          link: { label: 'urbanaxis-seven.vercel.app', href: 'https://urbanaxis-seven.vercel.app' },
          points: ['Website for a contemporary architecture studio.'],
        },
      ],
    },
    {
      heading: 'Leadership & Experience',
      entries: [
        {
          title: 'Web Dev Co-head',
          detail: 'E-Cell, K.C. College of Engineering',
          meta: 'Present',
          points: [
            'Lead contributor to the rebuild of the E-Cell website (Next.js, TypeScript, Supabase, GSAP).',
            'Lead contributor to the attendance system E-Cell uses: rotating 6-digit check-in codes, live session timers and an admin console.',
            'Contributed touch interactions, SEO and accessibility fixes to the website for “the commons.”, a KC College campus app.',
          ],
        },
        {
          title: 'Tech Head, Core Team',
          detail: 'SINGULARITY 2.0',
          meta: '16–17 Jan 2027',
          link: { label: 'singularityhack.in', href: 'https://singularityhack.in' },
          points: ['National-level, 24-hour offline hackathon at K.C. College, Thane, with four tracks.'],
        },
        {
          title: 'Organiser',
          detail: 'SINGULARITY 1.0',
          points: ['24-hour intra-college hackathon with 400+ participants, 120+ teams and 120+ projects.'],
        },
      ],
    },
    {
      heading: 'Project',
      entries: [
        {
          title: 'GyroPad',
          detail: 'Python, Flutter',
          link: { label: 'gyro-pad.vercel.app', href: 'https://gyro-pad.vercel.app' },
          points: [
            'Turns an Android phone into a Windows game controller with gyroscope aiming, tilt steering and button mapping, over Wi-Fi, Bluetooth or USB with PIN pairing.',
          ],
        },
      ],
    },
  ] satisfies ResumeSection[],
  skills: [
    { group: 'Languages', items: ['TypeScript', 'JavaScript', 'Python'] },
    { group: 'Frontend', items: ['React', 'Next.js', 'Tailwind CSS', 'GSAP', 'Framer Motion', 'Three.js'] },
    { group: 'Data & mobile', items: ['Supabase (PostgreSQL)', 'Flutter'] },
    { group: 'Tools', items: ['Git', 'GitHub', 'Vercel'] },
  ],
  education: {
    degree: 'B.Tech in Computer Engineering',
    school: 'K. C. College of Engineering and Management Studies and Research, Thane',
    meta: 'Expected 2029',
  },
};
