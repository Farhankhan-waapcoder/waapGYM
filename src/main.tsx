
  import { createRoot } from "react-dom/client";
  import App from "./App";
  // Global theme & animation utilities
  import "./styles/globals.css";
  // Tailwind generated layer
  import "./index.css";

  createRoot(document.getElementById("root")!).render(<App />);
  