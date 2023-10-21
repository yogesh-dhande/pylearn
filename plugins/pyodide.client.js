export default defineNuxtPlugin(async () => {
  function getPyWorker(outputHandler) {
    const pyWorker = new Worker("/sw.js");
    pyWorker.postMessage({ type: "initialize" });
    pyWorker.onmessage = (e) => {
      if (e.data.type == "message") {
      } else if (e.data.type == "output") {
        outputHandler(e.data.value);
      }
    };

    const worker = {
      run(code, reset = false) {
        pyWorker.postMessage({ type: "run", code, reset });
      },
    };
    return worker;
  }

  return {
    provide: {
      getPyWorker,
    },
  };
});
