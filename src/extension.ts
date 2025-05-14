import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
  const command = vscode.commands.registerCommand("aiRouse.open", () => {
    const panel = vscode.window.createWebviewPanel(
      "aiRousePanel", // уникальный ID панели
      "AiRouse Panel",
      vscode.ViewColumn.One,
      {
        enableScripts: true
      }
    );

    panel.webview.html = getWebviewContent();
  });

  context.subscriptions.push(command);
}

function getWebviewContent(): string {
  return `
    <!DOCTYPE html>
    <html lang="ru">
    <head>
      <meta charset="UTF-8">
      <title>AiRouse</title>
      <style>
        body {
          font-family: sans-serif;
          padding: 2rem;
        }
        button {
          font-size: 1rem;
        }
      </style>
    </head>
    <body>
      <h1>AiRouse WebView Активен</h1>
      <button onclick="sayHi()">Привет, AI</button>
      <script>
        function sayHi() {
          alert('👋 Привет от AiRouse!');
        }
      </script>
    </body>
    </html>
  `;
}
