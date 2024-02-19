import "./App.css";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import SharedLayout from "./pages/SharedLayout";
import UploadPage from "./pages/UploadPage";
import ViewPage from "./pages/ViewPage";
import Protected from "./components/Protected";
import HomePage from "./pages/HomePage";
import StudentPage from "./pages/StudentPage";
import AddStudentPage from "./pages/AddStudentPage";
import RecordPage from "./pages/RecordPage";
import NotFoundPage from "./pages/NotFoundPage"
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
              <Route path="add" element={<AddStudentPage />} />
              <Route path=":studentId" element={<StudentPage />} />
            </Route>

          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </ContextProvider>
  )
}

export default App;
