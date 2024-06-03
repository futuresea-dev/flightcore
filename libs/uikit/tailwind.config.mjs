/** @type {import('tailwindcss').Config} */
export default {
  theme: {
    extend: {
      fontFamily: {
        sans: ['Tactic Round'],
      },
      fontSize: {
        heading1: [
          '98px',
          {
            lineHeight: '117px',
            letterSpacing: '1.5px',
            fontWeight: '700',
          },
        ],
        heading2: [
          '48px',
          {
            lineHeight: '77px',
            letterSpacing: '0',
            fontWeight: '500',
          },
        ],
        heading3: [
          '34px',
          {
            lineHeight: '40px',
            letterSpacing: '0.25px',
            fontWeight: '400',
          },
        ],
        subtitle: [
          '20px',
          {
            lineHeight: '32px',
            letterSpacing: '0.25px',
            fontWeight: '400',
          },
        ],
        body1: [
          '18px',
          {
            lineHeight: '30px',
            letterSpacing: '0',
            fontWeight: '400',
          },
        ],
        body2: [
          '16px',
          {
            lineHeight: '24px',
            letterSpacing: '0.5px',
            fontWeight: '400',
          },
        ],
        body3: [
          '14px',
          {
            lineHeight: '20px',
            letterSpacing: '0.25px',
            fontWeight: '400',
          },
        ],
        button: [
          '16px',
          {
            lineHeight: '36px',
            letterSpacing: '1.25px',
            fontWeight: '500',
          },
        ],
        caption: [
          '12px',
          {
            lineHeight: '20px',
            letterSpacing: '0.4px',
            fontWeight: '400',
          },
        ],
      },
      colors: {
        'extra-dark': '#1B2634',
        'blue-dark': '#101820',
        'blue-medium': '#243447',
        'blue-light': '#BACBDA',
        'blue-lightest': '#DBE2E6',
        green: '#38D430',
        'green-dark': '#2CA926',
        'green-darker': '#217F1C',
        'green-accent': '#BCE6A7',
        yellow: '#FFE817',
        'yellow-accent': '#FFF6A4',
        error: '#E53935',
        'error-light': '#EF9A9A',
      },
    },
  },
  plugins: [],
}
