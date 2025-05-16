import * as vscode from "vscode";
import { getWebviewContent } from "./getWebviewContent";

export function registerCommands(context: vscode.ExtensionContext) {
  const command = vscode.commands.registerCommand("aiRouse.open", () => {
    const panel = vscode.window.createWebviewPanel(
      "aiRouse",
      "AI Rouse",
      vscode.ViewColumn.One,
      {
        enableScripts: true,
        localResourceRoots: [
          vscode.Uri.joinPath(context.extensionUri, "media"),
          vscode.Uri.joinPath(context.extensionUri, "dist", "webview")
        ]
      }
    );

    panel.webview.html = getWebviewContent(panel.webview, context.extensionUri);

    panel.webview.onDidReceiveMessage(
      message => {
        switch (message.type) {
          case "greeting":
            panel.webview.postMessage({
              type: "response",
              value: "Привет от AiRouse 👋"
            });
            break;
        }
      },
      undefined,
      context.subscriptions
    );
  });

  context.subscriptions.push(command);
}
