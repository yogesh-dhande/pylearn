export async function useTestRunner(testFileContent, exercise) {
  let pass = false;
  const filename = `${exercise._path.replace("/exercises/", "")}.py`;
  const pyodide = await loadPyodide();
  await pyodide.loadPackage("pytest");
  await pyodide.runPythonAsync(`
import js
import pytest
from io import StringIO
import sys
import pyodide
filename = "${filename}"


with open(filename, "w") as f:
    f.write('''${testFileContent}''')


# Capture the output
output = StringIO()
sys.stdout = output

# Run the tests
pytest.main(["-qq", filename])

# Get the captured output
captured_output = output.getvalue()

# Restore the original stdout
sys.stdout = sys.__stdout__

# Send the captured output to javascript
js.document.getElementById("pytest-output").value = captured_output
                    
`);
  const result = document.getElementById("pytest-output").value;
  if (result.split("\n")[0].includes("F")) {
    pass = false;
  } else {
    pass = true;
  }

  return { testFileContent, result, pass };
}
