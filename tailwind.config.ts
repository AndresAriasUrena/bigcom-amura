import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./pages/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}', './app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    fontFamily: {
      Julius_Sans_One: ['var(--font-julius-sans-one)'],
      Raleway: ['var(--font-Raleway)'],
      Charm: ['var(--font-Charm)'],
      Judson: ['var(--font-Judson)'],
      Urbanist: ['var(--font-Urbanist)'],
    },
    screens: {
      coxs: '375px',
      xs: '425px',
      cosm: '500px',
      sm: '576px',
      comd: '680px',
      md: '768px',
      colg: '850px',
      lg: '992px',
      coxl: '1050px',
      xl: '1200px',
      co2xl: '1320px',
      '2xl': '1440px',
      '3xl': '1660px',
      '4xl': '1800px',
      max: '2000px',
      // max-width breakpoints
      maxcosm: { max: '424.5px' },
      maxsm: { max: '575.5px' },
      maxcomd: { max: '649.5px' },
      maxmd: { max: '767.5px' },
      maxlg: { max: '991.5px' },
      maxxl: { max: '1199.5px' },
      // min and max width breakpoints
      'md-to-lg': { min: '768px', max: '992px' },
      'lg-to-xl': { min: '992px', max: '1199px' },
    },
    extend: {
      colors: {
        c1: '#4E014F',
        c2: '#50297a',
        c3: '#151515',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
};
export default config;
