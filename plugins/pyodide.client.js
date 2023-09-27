let pyodide = null;

export default defineNuxtPlugin(async () => {
  async function runPython(code) {
    if (!pyodide) {
      // only load pyodide once and when needed
      pyodide = await loadPyodide();
      await pyodide.loadPackage("pytest");
    }
    return pyodide.runPythonAsync(code);
  }

  return {
    provide: {
      runPython,
    },
  };
});
