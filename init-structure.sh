#!/bin/bash

mkdir -p src/{shared,commands,webview,sidebar,completion,services}
mkdir -p media resources .vscode

# Пустые index.ts во всех папках
for dir in src/{shared,commands,webview,sidebar,completion,services}; do
  touch "$dir/index.ts"
done

# Примеры файлов
cat > src/extension.ts <<'EOF'
import { registerCommands } from './commands';
import { registerAutocomplete } from './completion';
import { registerSidebar } from './sidebar';
import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
  registerCommands(context);
  registerAutocomplete(context);
  registerSidebar(context);
}
EOF

cat > src/commands/registerCommands.ts <<'EOF'
import * as vscode from 'vscode';

export function registerCommands(context: vscode.ExtensionContext) {
  vscode.window.showInformationMessage('Команды зарегистрированы (заглушка)');
}
EOF

cat > src/commands/index.ts <<'EOF'
export * from './registerCommands';
EOF

cat > src/completion/registerAutocomplete.ts <<'EOF'
import * as vscode from 'vscode';

export function registerAutocomplete(context: vscode.ExtensionContext) {
  vscode.window.showInformationMessage('Автокомплит зарегистрирован (заглушка)');
}
EOF

cat > src/completion/index.ts <<'EOF'
export * from './registerAutocomplete';
EOF

cat > src/sidebar/registerSidebar.ts <<'EOF'
import * as vscode from 'vscode';

export function registerSidebar(context: vscode.ExtensionContext) {
  vscode.window.showInformationMessage('Sidebar зарегистрирован (заглушка)');
}
EOF

cat > src/sidebar/index.ts <<'EOF'
export * from './registerSidebar';
EOF

echo "✅ Структура создана с index.ts в каждом модуле."
