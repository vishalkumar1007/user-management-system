// import { StrictMode } from 'react'
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Toaster } from "sonner";

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <>
    <Toaster
      position="top-right"
      richColors
      toastOptions={{
        style: {
          background: "#252f4663",
          border: "1px solid #404143c7",
          fontSize: "17px",
          backdropFilter:"blur(3px)",
        },
      }}
    />
    <App />
  </>
  // {/* </StrictMode>, */}
);
