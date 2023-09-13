import React from "react";
import ReactDOM from "react-dom/client";
import App from "@/App";
import "@/index.css";
import "@/assets/Font.css";
import theme from "@/assets/color";
import { ThemeProvider } from "styled-components";
import { BrowserRouter } from "react-router-dom";
import { RecoilRoot } from "recoil"; // RecoilRoot를 임포트

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <RecoilRoot>
          <App />
        </RecoilRoot>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);
