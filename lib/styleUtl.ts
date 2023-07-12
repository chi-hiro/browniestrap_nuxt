import { rgba } from 'polished'

const color = {
  primary: '#6ED4BE',
  secondary: '#D38A58',
  success: '#81c710',
  info: '#5FBEDB',
  warning: '#EAA930',
  danger: '#E13D3B',
  white: 'white',
  'primary-secondary': 'linear-gradient(90deg, #6ED4BE, #D38A58)',
  'secondary-primary': 'linear-gradient(-90deg, #6ED4BE, #D38A58)',
}

export const variables: { [key: string]: any } = {
  scrollbarW: 16,
  breakpoint: 1024,
  gridGutterWidth: 40,
  iconSize: 24,
  componentHeight: 48,

  base: {
    fontSize: 16,
    lineHeight: 1.75,
  },

  color,

  lightColor: {
    primary: rgba(color.primary, 0.1),
    secondary: rgba(color.secondary, 0.1),
    success: rgba(color.success, 0.1),
    info: rgba(color.info, 0.1),
    warning: rgba(color.warning, 0.1),
    danger: rgba(color.danger, 0.1),
    white: rgba(color.white, 0.1),
  },

  theme: {
    bodyColor: '#606060',
    headingsColor: '#101010',
    mutedColor: 'rgba(0,0,0,0.4)',
    borderColor: 'rgba(0,0,0,0.1)',
    inputBorderColor: 'rgba(0,0,0,0.2)',
    bodyBg: '#FFFFFF',
    mutedBg: 'rgba(0,0,0,0.04)',
    overlayBg: 'rgba(0,0,0,0.3)',
    headerBg: 'white',
  },

  darkTheme: {
    bodyColor: '#FFFFFF',
    headingsColor: '#FFFFFF',
    mutedColor: 'rgba(255,255,255,0.4)',
    borderColor: 'rgba(255,255,255,0.1)',
    inputBorderColor: 'rgba(255,255,255,0.2)',
    bodyBg: '#202020',
    mutedBg: 'rgba(255,255,255,0.04)',
    overlayBg: 'rgba(0,0,0,0.3)',
    headerBg: '#404040',
  },

  input: {
    md: {
      height: 48,
    },

    sm: {
      height: 40,
    },

    lg: {
      height: 56,
    },
  },
}
