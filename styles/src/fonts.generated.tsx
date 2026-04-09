import { Space_Grotesk, Montserrat, Fira_Mono } from 'next/font/google';

const spacegrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  weight: 'variable',
});

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  weight: 'variable',
});

const firamono = Fira_Mono({
  subsets: ['latin'],
  variable: '--font-fira-mono',
  weight: ["400","500","700"],
});

export const fonts = {
  spacegrotesk: spacegrotesk.variable,
  montserrat: montserrat.variable,
  firamono: firamono.variable,
};
