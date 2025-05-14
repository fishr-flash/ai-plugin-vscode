import { registerCommands } from "./commands";
import { registerAutocomplete } from "./completion";
import { registerSidebar } from "./sidebar";
import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
  registerCommands(context);
  registerAutocomplete(context);
  registerSidebar(context);
}
