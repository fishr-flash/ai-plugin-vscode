import * as vscode from "vscode";
export function getWebviewContent(
  webview: vscode.Webview,
  extensionUri: vscode.Uri
): string {
  const imageUri = webview.asWebviewUri(
    vscode.Uri.joinPath(extensionUri, "media", "cover.png")
  );

  return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>AI Rouse</title>
        <style>
          body {
            background-color: #0d0d0d;
            margin: 0;
            padding: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
          }
          img {
            width: 100%;
            max-width: 800px;
            border-radius: 12px;
            box-shadow: 0 0 30px #0ff;
          }
        </style>
      </head>
      <body>
        <img src="${imageUri}" alt="AI Rouse Plugin Cover" />
      </body>
      </html>
    `;
}
