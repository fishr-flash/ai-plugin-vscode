import * as vscode from "vscode";

export class AiTreeDataProvider
  implements vscode.TreeDataProvider<vscode.TreeItem> {
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
