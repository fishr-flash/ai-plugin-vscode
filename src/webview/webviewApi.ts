// webview/webviewApi.ts
const vscode = acquireVsCodeApi();

export function sendMessage(message: unknown) {
  vscode.postMessage(message);
}

export function onMessage(handler: (message: unknown) => void) {
  window.addEventListener("message", event => {
    const message = event.data;
    handler(message);
  });
}
