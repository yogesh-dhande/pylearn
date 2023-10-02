export async function useTestRunner(testFileContent, exercise) {
  const { $runPython } = useNuxtApp();

  const filename = `${exercise._path.replace(
    "/exercises/",
    (Math.random() + 1).toString(36).substring(2, 5) + "_"
  )}.py`;
  await $runPython(`
import js
import os
import pytest
from io import StringIO
import sys
import pyodide
filename = "${filename}"

with open(filename, "w+") as f:
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
  console.log(result);
  const failedRegex = /FAILED .+\.py::(.*?) -/g;
  const matches = result.matchAll(failedRegex);
  const errorRegex = /ERROR .+\.py/g;

  const failedTests = Array.from(matches, (match) => match[1]);

  return {
    testFileContent,
    result,
    pass: failedTests.length === 0 && !result.match(errorRegex),
    failedTests,
  };
}
