/**
 * @file postcss.config.mjs
 * @role  Configuration PostCSS pour Tailwind CSS v4.
 *        Le plugin @tailwindcss/postcss compile les classes Tailwind
 *        et les injecte dans le CSS final de l'application.
 */
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};

export default config;
