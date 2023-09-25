const BASE_URL = "https://pythonexercises.com";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: true,
  devtools: { enabled: true },
  runtimeConfig: {
    siteUrl: BASE_URL,
  },
  app: {
    head: {
      title: "Python Excercises",
      meta: [
        {
          hid: "description",
          name: "description",
          content:
            "Build password-protected portals powered by Notion databases",
        },
      ],
      script: [
        {
          src: "https://cdn.jsdelivr.net/pyodide/v0.24.0/full/pyodide.js",
          async: true,
        },
        {
          src: "https://tally.so/widgets/embed.js",
          async: true,
        },
      ],
      link: [
        {
          rel: "icon",
          type: "image/x-icon",
          href: "data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🐍</text></svg>",
        },
      ],
    },
  },
  modules: ["@nuxt/content", "@nuxtjs/tailwindcss", "nuxt-simple-robots"],
  content: {
    documentDriven: true,
    markdown: {},
    highlight: {
      preload: ["python"],
      theme: {
        // Default theme (same as single string)
        default: "github-dark",
        // Theme used if `html.dark`
        dark: "github-dark",
        // Theme used if `html.sepia`
        sepia: "monokai",
      },
    },
  },
  router: {
    options: {
      strict: true,
    },
  },
  routeRules: {
    // Static page generated on-demand once (SSG - or at least mighty close)
    "/exercises/test/": { ssr: false },
  },
  nitro: {
    prerender: {
      routes: ["/sitemap.xml"],
    },
  },
});
