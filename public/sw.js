let pyodide = null;

importScripts("https://cdn.jsdelivr.net/pyodide/v0.24.0/full/pyodide.js")

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

onmessage = async (e) => {
    if (e.data.type == "initialize") {
        initializePyodide()
        postMessage({ type: "message", value: "Initializing pyodide..." });
    } else if (e.data.type == "run") {
        output = await runPython(e.data.code)
        postMessage({ type: "output", value: output })
    }

};
