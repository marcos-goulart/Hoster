import 'styled-components'

declare module 'styled-components' {
  export interface DefaultTheme {
    borderRadius?: string

    colors: {
      bgMain: string
      bgCard: string
      primaryDark: string
      primaryMedium: string
      accentGold: string
      accentWarm: string
      accentHover: string
      accentGreen: string
      textMain: string
      textMuted: string
      borderColor: string
      phColor: string
      phColorHover: string
      bgColor: string
      bgBrown1: string
      bgBrown2: string
      white: string
      black1: string
      black2: string
      black3: string
      red: string
      orange: string
      orange2: string
      yellow: string
      green: string
      darkGreen: string
      teal: string
      cyan: string
      blue: string
      indigo: string
      purple: string
      pink: string
      gray100: string
      gray200: string
      gray300: string
      gray400: string
      gray500: string
      gray600: string
      gray700: string
      gray800: string
      gray900: string
      primary: string
    }
    shadows: {
      soft: string
      hover: string
    }
    fontFamily: {
      heading: string
      sans: string
      mono: string
      ruda: string
    }
    fontSize: {
      xs: string
      sm: string
      md: string
      base: string
      lg: string
      xl: string
      '2xl': string
      '3xl': string
      '4xl': string
      '5xl': string
    }
    fontWeight: {
      hairline: number
      thin: number
      light: number
      normal: number
      medium: number
      semibold: number
      bold: number
      extrabold: number
      black: number
    }
    screenMedias: {
      sl: string
      md: string
      lg: string
      xl: string
      xxl: string
    }
    Gutters: {
      gutterY: string
      gutterX: string
    }
  }
}
