import * as vscode from "vscode";

class AiTreeDataProvider implements vscode.TreeDataProvider<vscode.TreeItem> {
  getTreeItem(element: vscode.TreeItem): vscode.TreeItem {
    return element;
  }

  getChildren(): vscode.ProviderResult<vscode.TreeItem[]> {
    const item = new vscode.TreeItem("🚀 Открыть WebView");
    item.command = {
      command: "aiRouse.open",
      title: "Открыть панель AiRouse"
    };
    return [item];
  }
}

export function activate(context: vscode.ExtensionContext) {
  // Регистрируем боковую панель
  vscode.window.registerTreeDataProvider(
    "aiRouseView",
    new AiTreeDataProvider()
  );

  // Регистрируем команду
  const command = vscode.commands.registerCommand("aiRouse.open", () => {
    const panel = vscode.window.createWebviewPanel(
      "aiRousePanel",
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
      <title>AiRouse Menu</title>
      <style>
        body {
          display: flex;
          font-family: sans-serif;
          margin: 0;
        }
        nav {
          width: 200px;
          background-color: #f0f0f0;
          padding: 1rem;
          border-right: 1px solid #ccc;
          box-sizing: border-box;
        }
        main {
          padding: 1rem;
          flex-grow: 1;
        }
        button {
          display: block;
          margin-bottom: 1rem;
          width: 100%;
          padding: 0.5rem;
        }
      </style>
    </head>
    <body>
      <nav>
        <button onclick="sendMessage('greeting')">👋 Привет</button>
        <button onclick="sendMessage('action1')">⚙ Действие 1</button>
        <button onclick="sendMessage('action2')">📡 Действие 2</button>
      </nav>
      <main>
        <h1>AiRouse Панель</h1>
        <div id="output">Выберите пункт в меню.</div>
      </main>
      <script>
        const vscode = acquireVsCodeApi();

        function sendMessage(command) {
          vscode.postMessage({ type: command });
        }

        window.addEventListener('message', event => {
          const message = event.data;
          const output = document.getElementById('output');
          if (message.type === 'response') {
            output.textContent = message.value;
          }
        });
      </script>
    </body>
    </html>
  `;
}
