import withNuxt from "./.nuxt/eslint.config.mjs"
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended"
import tailwind from "eslint-plugin-tailwindcss"

export default withNuxt(
  // Your custom configs here
  ...tailwind.configs["flat/recommended"],
  eslintPluginPrettierRecommended,
  {
    rules: {
      "tailwindcss/no-custom-classname": "off",
    },
  },
)
