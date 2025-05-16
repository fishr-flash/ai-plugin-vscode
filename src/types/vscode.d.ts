// webview/vscode.d.ts — создаёшь рядом с webviewApi.ts
export {};

declare global {
  function acquireVsCodeApi(): {
    postMessage: (message: unknown) => void;
    getState: () => unknown;
    setState: (state: unknown) => void;
  };
}
