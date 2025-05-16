import * as vscode from "vscode";
import * as fs from "fs";
import * as path from "path";

export function getWebviewContent(
  webview: vscode.Webview,
  extensionUri: vscode.Uri
): string {
  const distPath = vscode.Uri.joinPath(extensionUri, "dist", "webview");
  const indexPath = path.join(distPath.fsPath, "index.html");

  let html = fs.readFileSync(indexPath, "utf8");

  // Заменяем пути к скриптам и стилям на безопасные URI
  html = html.replace(/(src|href)="(.+?)"/g, (_match, attr, src) => {
    const filePath = vscode.Uri.joinPath(distPath, src);
    const webviewUri = webview.asWebviewUri(filePath);
    return `${attr}="${webviewUri}"`;
  });

  // /TODO: Добавить иконку во вкладку webview

  // CSP + nonce
  const nonce = getNonce();
  html = html.replace(
    /<head>/,
    `<head>
    <meta http-equiv="Content-Security-Policy"
    content="default-src 'none'; style-src ${webview.cspSource}; script-src 'nonce-${nonce}'; img-src ${webview.cspSource} https: data:;">`
  );
  html = html.replace(/<script /g, `<script nonce="${nonce}" `);

  return html;
}

function getNonce(): string {
  return [...Array(32)].map(() => Math.random().toString(36)[2]).join("");
}
