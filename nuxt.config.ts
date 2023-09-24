import monacoEditorPlugin from "vite-plugin-monaco-editor";

const prefix = "monaco-editor/esm/vs";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
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
          src: "https://cdn.jsdelivr.net/npm/ace-builds@1.28.0/src-min-noconflict/ace.min.js",
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
        {
          rel: "stylesheet",
          href: "https://cdn.jsdelivr.net/npm/ace-builds@1.28.0/css/ace.min.css",
        },
      ],
    },
  },
  modules: ["@nuxt/content", "@nuxtjs/tailwindcss", "@nuxtjs/robots"],
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
  vite: {
    optimizeDeps: {
      include: [
        `monaco-editor/esm/vs/language/json/json.worker`,
        `monaco-editor/esm/vs/language/css/css.worker`,
        `monaco-editor/esm/vs/language/html/html.worker`,
        `monaco-editor/esm/vs/language/typescript/ts.worker`,
        `monaco-editor/esm/vs/editor/editor.worker`,
      ],
    },
    plugins: [monacoEditorPlugin({})],
  },
});
