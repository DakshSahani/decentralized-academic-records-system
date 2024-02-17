import "./App.css";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import SharedLayout from "./pages/SharedLayout";
import UploadPage from "./pages/UploadPage";
import ViewPage from "./pages/ViewPage";
import Protected from "./components/Protected";
import HomePage from "./pages/HomePage";
import StudentPage from "./components/StudentPage";
import RecordPage from "./pages/RecordPage";
import { ContextProvider } from "./context/Context";

function App() {

  return (
    <ContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SharedLayout />} > 
            <Route index element={<HomePage />} />

            <Route path="view" element={<Outlet />} >
              <Route index element={<ViewPage />} />
              <Route path=":studentId" element={<RecordPage />} />
            </Route>

            <Route 
              path="upload"
              element={
                <Protected>
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
    </ContextProvider>
  )
}

export default App;
