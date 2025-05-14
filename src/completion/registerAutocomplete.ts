import * as vscode from "vscode";

export function registerAutocomplete(context: vscode.ExtensionContext) {
  const item = new vscode.CompletionItem(
    "aliRouse",
    vscode.CompletionItemKind.Snippet
  );
  item.insertText = "aliRouse";
  item.documentation = new vscode.MarkdownString(
    "Платформа AI расширения для VSCode."
  );

  const provider = vscode.languages.registerCompletionItemProvider(
    { scheme: "file", language: "plaintext" }, // для .txt
    {
      provideCompletionItems(document, position) {
        const items: vscode.CompletionItem[] = [];

        items.push(
          new vscode.CompletionItem(
            "aiRouse",
            vscode.CompletionItemKind.Keyword
          )
        );
        items.push(
          new vscode.CompletionItem("assistant", vscode.CompletionItemKind.Text)
        );
        items.push(
          new vscode.CompletionItem(
            "intelligence",
            vscode.CompletionItemKind.Text
          )
        );
        items.push(item);

        return items;
      }
    },
    "" // триггер: можно указать символ, например '.', чтобы вызывать после точки
  );

  context.subscriptions.push(provider);
}
