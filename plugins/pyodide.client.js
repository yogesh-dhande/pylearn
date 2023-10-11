

export default defineNuxtPlugin(async () => {
  

  function getPyWorker(outputHandler) {
    const pyWorker = new Worker("/sw.js");
    pyWorker.postMessage({ type: "initialize" })
    pyWorker.onmessage = e => {
      if (e.data.type == "message") {
        console.log(e.data.value)
      } else if (e.data.type == "output") {
        outputHandler(e.data.value)
      }
    }

    const worker = {
      run(code) {
        pyWorker.postMessage({ type: "run", code })
      }
    }
      return worker

    }


  return {
    provide: {
      getPyWorker,
    },
  };
});
