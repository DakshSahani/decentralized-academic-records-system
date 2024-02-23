import "./App.css";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import {
  SharedLayout, 
  UploadPage, 
  ViewPage, 
  ProtectedPage,
  StudentPage, 
  AddStudentPage, 
  CoursesPage,
  NotFoundPage, 
  LandingPage
}  from "./pages";
import { ContextProvider } from "./context/Context";

function App() {

  return (
    <ContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SharedLayout />} > 
            <Route index element={<LandingPage />} />

            <Route path="records" element={<Outlet />}>
              <Route index element={<UploadPage />} />
              <Route path="add" element={
                <ProtectedPage>
                  <AddStudentPage />
                </ProtectedPage>} />
              <Route path=":studentId" element={
                <ProtectedPage>
                  <StudentPage />
                </ProtectedPage>} />
            </Route>

          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </ContextProvider>
  )
}

export default App;
