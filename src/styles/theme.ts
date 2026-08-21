import type { DefaultTheme } from 'styled-components'

const round = (num: number) =>
  num
    .toFixed(7)
    .replace(/(\.[0-9]+?)0+$/, '$1')
    .replace(/\.0$/, '')

const rem = (px: number) => `${round(px / 16)}rem`

export const theme: DefaultTheme = {
  colors: {
    bgColor: '#f8f9fa',
    phColor: '#6c757d',
    phColorHover: '#45494cff',
    bgBrown1: '#757575',
    bgBrown2: '#f4f4f4',
    white: '#FFFFFF',
    black1: 'rgba(0, 0, 0, 0.9)',
    black2: 'rgba(0, 0, 0, 0.55)',
    black3: 'rgba(0,0,0,.1)',
    red: '#E03131',
    orange: '#F46A05',
    orange2: '#D85F08',
    yellow: '#FCC419',
    green: '#23DB42',
    darkGreen: '#1bb231',
    teal: '#89DD13',
    cyan: '#3BC9DB',
    blue: '#25BEFF',
    indigo: '#4263Eb',
    purple: '#7E5CEF',
    pink: '#FE5895',
    gray100: '#FAFAFA',
    gray200: '#E9ECEF',
    gray300: '#DEE2E6',
    gray400: '#CED4DA',
    gray500: '#A4ACB4',
    gray600: '#64666B',
    gray700: '#424449',
    gray800: '#1D1E21',
    gray900: '#141518',
    primary: '#F83600',
  },
  fontFamily: {
    heading: ['IBM Plex Sans', 'sans-serif'].join(','),
    sans: ['Open Sans', 'Arial', 'Helvetica', 'sans-serif'].join(','),
    mono: ['IBM Plex Mono', 'serif'].join(','),
    ruda: ['Ruda', 'sans-serif'].join(','),
  },
  fontSize: {
    xs: rem(10),
    sm: rem(12),
    md: rem(14),
    base: rem(16),
    lg: rem(18),
    xl: rem(20),
    '2xl': rem(24),
    '3xl': rem(32),
    '4xl': rem(40),
    '5xl': rem(64),
  },
  fontWeight: {
    hairline: 100,
    thin: 200,
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
    black: 900,
  },
  screenMedias: {
    sl: '576px',
    md: '768px',
    lg: '992px',
    xl: '1200px',
    xxl: '1400px',
  },
  Gutters: {
    gutterX: '1.5rem',
    gutterY: '0',
  },
}
