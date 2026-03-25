import React, { useState } from "react";
import Editor from "@monaco-editor/react";

export default function App() {
  const [html, setHtml] = useState("<h1 class='title'>Hello World</h1><p class='card'>Edit me ✨</p>");
  const [css, setCss] = useState(`:root {
  --bg: #ffffff;
  --text: #111827;
  --primary: #b2db1c;
  --card: #f3f4f6;
}

body {
  margin: 0;
  font-family: system-ui, sans-serif;
  background: var(--bg);
  color: var(--text);
}

.title {
  text-align: center;
  font-size: 2rem;
  color: var(--primary);
}

.card {
  margin: 20px auto;
  padding: 16px;
  max-width: 300px;
  background: var(--card);
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
  text-align: center;
}

button {
  background: var(--primary);
  color: white;
  border: none;
  padding: 10px 16px;
  border-radius: 8px;
  cursor: pointer;
}
`);
  const [js, setJs] = useState("console.log('Hello from JS');");
  const [darkMode, setDarkMode] = useState(false);

  const srcDoc = `
    <html>
      <head>
        <style>
          ${darkMode ? `
          :root {
            --bg: #111827;
            --text: #f9fafb;
            --primary: #8b5cf6;
            --card: #1f2937;
          }
          ` : ``}
          ${css}
        </style>
      </head>
      <body>
        ${html}
        <script>${js}<\/script>
      </body>
    </html>
  `;

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      {/* Top Bar */}
      <div style={{ padding: "10px", display: "flex", justifyContent: "space-between", background: darkMode ? "#111" : "#eee" }}>
        <h2 style={{ margin: 0 }}>Live Code Editor</h2>
        <button onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? "☀️ Light" : "🌙 Dark"}
        </button>
      </div>

      <div style={{ display: "flex", flex: 1 }}>
        {/* Editors */}
        <div style={{ width: "50%", display: "flex", flexDirection: "column" }}>
          <h3>HTML</h3>
          <Editor
            height="30%"
            language="html"
            theme={darkMode ? "vs-dark" : "light"}
            value={html}
            onChange={(value) => setHtml(value)}
          />

          <h3>CSS</h3>
          <Editor
            height="30%"
            language="css"
            theme={darkMode ? "vs-dark" : "light"}
            value={css}
            onChange={(value) => setCss(value)}
          />

          <h3>JS</h3>
          <Editor
            height="30%"
            language="javascript"
            theme={darkMode ? "vs-dark" : "light"}
            value={js}
            onChange={(value) => setJs(value)}
          />
        </div>

        {/* Preview */}
        <div style={{ width: "50%", borderLeft: "1px solid #ccc" }}>
          <iframe
            srcDoc={srcDoc}
            title="Live Preview"
            sandbox="allow-scripts"
            frameBorder="0"
            width="100%"
            height="100%"
          />
        </div>
      </div>
    </div>
  );
}
