interface Window {
  webkit: {
    messageHandlers: {
      pinHandler: {
        postMessage: (message: any) => void;
      };
    };
  };
}
