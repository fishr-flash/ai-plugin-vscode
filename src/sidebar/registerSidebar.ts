import * as vscode from "vscode";
import { AiTreeDataProvider } from "./AiTreeDataProvider";

export function registerSidebar(context: vscode.ExtensionContext) {
  const provider = new AiTreeDataProvider();

  const treeView = vscode.window.createTreeView("aiRouseSidebar", {
    treeDataProvider: provider
  });

  context.subscriptions.push(treeView);
}
