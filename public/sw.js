let pyodide = null;
let my_namespace = null;

importScripts("https://cdn.jsdelivr.net/pyodide/v0.24.0/full/pyodide.js");

async function initializePyodide() {
  if (!pyodide) {
    // only load pyodide once and when needed
    const _pyodide = await loadPyodide();
    await _pyodide.loadPackage("pytest");
    pyodide = _pyodide;
    console.log("pyodide initialized");
  }
}

async function runPython(code, reset = false) {
  await initializePyodide();
  if (reset) {
    my_namespace = pyodide.globals.get("dict")();
  }
  return pyodide.runPython(code, { globals: my_namespace });
}

onmessage = async (e) => {
  if (e.data.type == "initialize") {
    initializePyodide();
    postMessage({ type: "message", value: "Initializing pyodide..." });
  } else if (e.data.type == "run") {
    try {
      output = await runPython(e.data.code, e.data.reset);
      postMessage({ type: "output", value: output });
    } catch (err) {
      postMessage({
        type: "output",
        value: err.message.split(`File "<exec>", `).pop(),
      });
    }
  }
};
