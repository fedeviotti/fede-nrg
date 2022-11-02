async function initMocks() {
  if (typeof window === "undefined") {
    // disabled because at the moment it's not supported by msw
    // const { server } = await import("./server");
    // server.listen();
  } else {
    const { worker } = await import("./browser");
    worker.start();
  }
}

initMocks();

export {};
