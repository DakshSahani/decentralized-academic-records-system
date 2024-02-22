import "./App.css";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import {
  SharedLayout, 
  UploadPage, 
  ViewPage, 
  ProtectedPage, 
  HomePage, 
  StudentPage, 
  AddStudentPage, 
  CoursesPage,
  NotFoundPage, 
}  from "./pages";
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
              <Route path=":studentId" element={<CoursesPage showStudentName/>} />
            </Route>

            <Route 
              path="upload"
              element={
                <ProtectedPage>
                  <Outlet />
                </ProtectedPage>
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
