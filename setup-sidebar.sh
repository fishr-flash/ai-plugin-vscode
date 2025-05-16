#!/bin/bash

SIDEBAR_DIR="src/sidebar"

echo "Создание структуры $SIDEBAR_DIR..."

mkdir -p $SIDEBAR_DIR/{features,components,pages,hooks}
touch $SIDEBAR_DIR/{App.tsx,index.tsx,store.ts,vite-env.d.ts,index.html}
touch $SIDEBAR_DIR/hooks.ts
mkdir -p $SIDEBAR_DIR/features
touch $SIDEBAR_DIR/features/counterSlice.ts

# index.tsx
cat << 'EOF' > $SIDEBAR_DIR/index.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { App } from "./App";
import { store } from "./store";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
EOF

# App.tsx
cat << 'EOF' > $SIDEBAR_DIR/App.tsx
import React from "react";
import { useAppSelector, useAppDispatch } from "./hooks";
import { increment } from "./features/counterSlice";

export const App = () => {
  const count = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Sidebar Panel</h1>
      <p className="mb-2">Count: {count}</p>
      <button
        className="border px-2 py-1"
        onClick={() => dispatch(increment())}
      >
        +1
      </button>
    </div>
  );
};
EOF

# store.ts
cat << 'EOF' > $SIDEBAR_DIR/store.ts
import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./features/counterSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
EOF

# hooks.ts
cat << 'EOF' > $SIDEBAR_DIR/hooks.ts
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "./store";

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
EOF

# counterSlice.ts
cat << 'EOF' > $SIDEBAR_DIR/features/counterSlice.ts
import { createSlice } from "@reduxjs/toolkit";

export const counterSlice = createSlice({
  name: "counter",
  initialState: { value: 0 },
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
  },
});

export const { increment } = counterSlice.actions;
export default counterSlice.reducer;
EOF

# vite-env.d.ts
cat << 'EOF' > $SIDEBAR_DIR/vite-env.d.ts
/// <reference types="vite/client" />
EOF

# index.html
cat << 'EOF' > $SIDEBAR_DIR/index.html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Sidebar</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/sidebar/index.tsx"></script>
  </body>
</html>
EOF

# vite.config.ts
cat << 'EOF' > $SIDEBAR_DIR/vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  root: path.resolve(__dirname),
  base: "./",
  build: {
    outDir: path.resolve(__dirname, "../../dist/sidebar"),
    emptyOutDir: true,
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./"),
    },
  },
});
EOF

# tsconfig.json
cat << 'EOF' > $SIDEBAR_DIR/tsconfig.json
{
  "extends": "../../tsconfig.json",
  "compilerOptions": {
    "composite": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "baseUrl": ".",
    "paths": {
      "@/*": ["*"]
    }
  },
  "include": ["./**/*"]
}
EOF

# tsconfig.node.json
cat << 'EOF' > $SIDEBAR_DIR/tsconfig.node.json
{
  "compilerOptions": {
    "composite": true,
    "module": "ESNext",
    "moduleResolution": "Node",
    "allowSyntheticDefaultImports": true
  },
  "include": ["vite.config.ts"]
}
EOF

echo "✅ Структура sidebar с конфигами Vite и TS готова."
