import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
    './contexts/**/*.{js,ts,jsx,tsx,mdx}',
    './hooks/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/antd/es/**/*.{js,jsx,ts,tsx}', // Include Ant Design components
  ],
  safelist: [
    // Add any Ant Design classes that might be dynamically created
    'ant-btn',
    'ant-btn-primary',
    'ant-btn-default',
    'ant-modal',
    'ant-drawer',
    'ant-message',
    'ant-notification',
  ],
  theme: {
    extend: {
      colors: {
        // Light mode colors
        background: {
          DEFAULT: '#e5e5e5', // Neutral-200
          dark: '#0a0a0a', // Dark mode background (Neutral-950)
        },
        foreground: {
          DEFAULT: '#0a0a0a', // Neutral-950
          dark: '#fafafa', // Dark mode foreground (Neutral-50)
        },
        card: {
          DEFAULT: '#f5f5f5', // Neutral-100
          foreground: '#0a0a0a', // Neutral-950
          dark: '#171717', // Dark mode card (Neutral-900)
          'foreground-dark': '#fafafa', // Dark mode card foreground (Neutral-50)
        },
        popover: {
          DEFAULT: '#f5f5f5', // Neutral-100
          foreground: '#0a0a0a', // Neutral-950
          dark: '#171717', // Dark mode popover (Neutral-900)
          'foreground-dark': '#fafafa', // Dark mode popover foreground (Neutral-50)
        },
        primary: {
          DEFAULT: '#2563eb', // Primary-600
          foreground: '#fafafa', // Neutral-50
          dark: '#60a5fa', // Dark mode primary (Primary-400)
          'foreground-dark': '#0a0a0a', // Dark mode primary foreground (Neutral-950)
        },
        secondary: {
          DEFAULT: '#f5f5f5', // Neutral-100
          foreground: '#171717', // Neutral-900
          dark: '#262626', // Dark mode secondary (Neutral-800)
          'foreground-dark': '#fafafa', // Dark mode secondary foreground (Neutral-50)
        },
        muted: {
          DEFAULT: '#f5f5f5', // Neutral-100
          foreground: '#737373', // Neutral-500
          dark: '#262626', // Dark mode muted (Neutral-800)
          'foreground-dark': '#a3a3a3', // Dark mode muted foreground (Neutral-400)
        },
        accent: {
          DEFAULT: '#f5f5f5', // Neutral-100
          foreground: '#171717', // Neutral-900
          dark: '#262626', // Dark mode accent (Neutral-800)
          'foreground-dark': '#fafafa', // Dark mode accent foreground (Neutral-50)
        },
        destructive: {
          DEFAULT: '#ef4444', // Red-Orange-500
          foreground: '#fafafa', // Neutral-50
          dark: '#7f1d1d', // Dark mode destructive (Red-Orange-900)
          'foreground-dark': '#fafafa', // Dark mode destructive foreground (Neutral-50)
        },
        border: {
          DEFAULT: '#e5e5e5', // Neutral-200
          dark: '#262626', // Dark mode border (Neutral-800)
        },
        input: {
          DEFAULT: '#f5f5f5', // Neutral-100
          dark: '#262626', // Dark mode input (Neutral-800)
        },
        ring: {
          DEFAULT: '#3b82f6', // Primary-500
          dark: '#d4d4d4', // Dark mode ring (Neutral-300)
        },

        // Chart colors
        chart: {
          '1': '#e05d30', // Red-Orange-600
          '2': '#0d9488', // Teal-600
          '3': '#1e293b', // Navy-800
          '4': '#f59e0b', // Amber-500
          '5': '#f97316', // Orange-500
          '1-dark': '#60a5fa', // Primary-400
          '2-dark': '#14b8a6', // Teal-500
          '3-dark': '#fbbf24', // Amber-400
          '4-dark': '#818cf8', // Sidebar-Blue-400
          '5-dark': '#f87171', // Red-Orange-400
        },

        // Neutral shades
        neutral: {
          50: '#fafafa',
          100: '#f5f5f5',
          200: '#e5e5e5',
          300: '#d4d4d4',
          400: '#a3a3a3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717',
          950: '#0a0a0a',
        },

        // Palette UI-specific colors
        palette: {
          box: {
            DEFAULT: '#fafafa', // Neutral-50
            dark: '#171717', // Neutral-900
          },
          'box-active': {
            DEFAULT: '#eff6ff', // Primary-50
            dark: '#0f172a', // Navy-900
          },
          'segment-form': {
            DEFAULT: '#f5f5f5', // Neutral-100
            dark: '#171717', // Neutral-900
          },
          'segment-list': {
            DEFAULT: '#fafafa', // Neutral-50
            dark: '#171717', // Neutral-900
          },
          'segment-item': {
            DEFAULT: '#f5f5f5', // Neutral-100
            dark: '#262626', // Neutral-800
          },
          'segment-item-hover': {
            DEFAULT: '#e5e5e5', // Neutral-200
            dark: '#404040', // Neutral-700
          },
          'selection-bar': {
            DEFAULT: '#f5f5f5', // Neutral-100
            dark: '#171717', // Neutral-900
          },
          dialog: {
            DEFAULT: '#fafafa', // Neutral-50
            dark: '#171717', // Neutral-900
          },
          'dialog-header': {
            DEFAULT: '#f5f5f5', // Neutral-100
            dark: '#262626', // Neutral-800
          },
        },
      },
      borderRadius: {
        lg: '0.5rem', // --radius
        md: 'calc(0.5rem - 2px)',
        sm: 'calc(0.5rem - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: {
            height: '0',
          },
          to: {
            height: 'var(--radix-accordion-content-height)',
          },
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)',
          },
          to: {
            height: '0',
          },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
      boxShadow: {
        sm: '0 1px 2px rgba(0, 0, 0, 0.05)',
        DEFAULT: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        'dark-sm': '0 1px 2px rgba(0, 0, 0, 0.3)',
        dark: '0 4px 6px -1px rgba(0, 0, 0, 0.4), 0 2px 4px -1px rgba(0, 0, 0, 0.2)',
        'dark-lg': '0 10px 15px -3px rgba(0, 0, 0, 0.4), 0 4px 6px -2px rgba(0, 0, 0, 0.2)',
        'dark-xl': '0 20px 25px -5px rgba(0, 0, 0, 0.4), 0 10px 10px -5px rgba(0, 0, 0, 0.2)',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
export default config;
