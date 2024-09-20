import "./App.css";
import { Routes, Route } from "react-router-dom";
import { useMemo } from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { Toaster } from "react-hot-toast";
import { themeSettings } from "./theme";
import Navbar from "./components/Navbar";
import Homepage from "./pages/HomePage";
import Register from './pages/Registerpage'
import Login from "./pages/LogIn";
import Summary from "./pages/Summary";
import Paragraph from "./pages/Paragraph";
// import JsConverter from "./pages/JsConverter";
import ScifiImage from "./pages/ScifiImage";
import ChatBot from "./pages/ChatBot";
import JsConverter from "./pages/JsConverter";

function App() {
  const theme = useMemo(() => createTheme(themeSettings()), []);

  return (
    <>
      <ThemeProvider theme={theme}>
        <Navbar />
        <CssBaseline />
        <Toaster />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/summary" element={<Summary />} />
          <Route path="/paragraph" element={<Paragraph />} />
          <Route path="/chatbot" element={<ChatBot />} />
          <Route path="/scifi-image" element={<ScifiImage />} />
          <Route path="/chatbot" element={<ChatBot />} />
          <Route path="/js-converter" element={<JsConverter />} />
        </Routes>
      </ThemeProvider>
    </>
  );
}

export default App;
