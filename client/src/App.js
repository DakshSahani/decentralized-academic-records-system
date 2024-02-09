import "./App.css";
import { useState } from "react";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import SharedLayout from "./pages/SharedLayout";
import UploadPage from "./pages/UploadPage";
import ViewPage from "./pages/ViewPage";
import Protected from "./components/Protected";
import HomePage from "./pages/HomePage";
import StudentPage from "./components/StudentPage";

function App() {
  const [wallet, setWallet] = useState({});

  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <SharedLayout />
        }> 
          <Route index element={<HomePage />} />
          <Route path="view" element={<ViewPage />} />
          <Route path="upload"
            element={
              <Protected wallet={wallet}>
                <Outlet />
              </Protected>
            } 
          >
            <Route index element={<UploadPage />} />
            <Route path=":studentId" element={<StudentPage />} />
          </Route>
        </Route>
        <Route path="*" element={<div>404 Error</div>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
