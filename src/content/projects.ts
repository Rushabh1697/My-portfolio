// The projects shown on the site, in display order. Only what is listed here
// appears. Leave out `code` for a private repository and `live` if nothing is
// deployed. Thumbnails live in public/projects/.

export interface Project {
  name: string;
  description: string;
  stack: string[];
  image?: string;
  live?: string;
  code?: string;
}

export const PROJECTS: Project[] = [
  {
    name: 'Pixel Forge',
    description: 'Website for my solo web and Android app studio.',
    stack: ['Next.js', 'TypeScript', 'GSAP'],
    image: '/projects/pixel-forge.jpg',
    live: 'https://pixelforge-web-eta.vercel.app',
  },
  {
    name: 'Kathak Shades',
    description: 'Website for a classical Kathak dance school.',
    stack: ['Next.js', 'TypeScript', 'GSAP'],
    image: '/projects/kathak-shades.jpg',
    live: 'https://kathakshades.in',
    code: 'https://github.com/Rushabh1697/KATHAKSHADES',
  },
  {
    name: 'Jai Mataji Art Furniture',
    description: 'Website for a bespoke handcrafted furniture maker, in business since 1993.',
    stack: ['React', 'Three.js'],
    image: '/projects/jai-mataji-art.jpg',
    live: 'https://jaimatajiart.vercel.app',
    code: 'https://github.com/Rushabh1697/jaimatajiart',
  },
  {
    name: 'Urbanaxis Studio',
    description: 'Website for a contemporary architecture studio.',
    stack: ['React', 'GSAP', 'Framer Motion'],
    image: '/projects/urbanaxis.jpg',
    live: 'https://urbanaxis-seven.vercel.app',
    code: 'https://github.com/Rushabh1697/urbanaxis',
  },
  {
    name: 'GyroPad',
    description: 'Turns an Android phone into a Windows game controller with gyroscope aiming.',
    stack: ['Python', 'Flutter'],
    image: '/projects/gyropad.jpg',
    live: 'https://gyro-pad.vercel.app',
  },
  {
    name: 'E-Cell KCCEMSR',
    description: 'Official website of the college Entrepreneurship Cell.',
    stack: ['Next.js', 'Supabase', 'GSAP'],
    image: '/projects/ecell-kccemsr.jpg',
    live: 'https://kcecellweb.vercel.app',
    code: 'https://github.com/kc-ecell/kcecellweb',
  },
  {
    name: 'E-Cell Attendance',
    description: 'Office check-in with a rotating 6-digit code, a live session timer and an admin console.',
    stack: ['Next.js', 'Supabase'],
    code: 'https://github.com/kc-ecell/Attendence-system-by-rushabh',
  },
  {
    name: 'SkillBuildz',
    description: 'Event registration and project submission platform.',
    stack: ['Next.js', 'Supabase'],
    image: '/projects/skillbuildz.jpg',
    live: 'https://web3skillbuildz.vercel.app',
    code: 'https://github.com/kc-ecell/web3skillbuildz',
  },
];
