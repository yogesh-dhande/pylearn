let pyodide = null;

export default defineNuxtPlugin(async () => {
  async function initializePyodide() {
    if (!pyodide) {
      // only load pyodide once and when needed
      const _pyodide = await loadPyodide();
      await _pyodide.loadPackage("pytest");
      pyodide = _pyodide;
      console.log("pyodide initialized");
    }
  }
  async function runPython(code) {
    await initializePyodide();
    return pyodide.runPythonAsync(code);
  }

  return {
    provide: {
      initializePyodide,
      runPython,
    },
  };
});
