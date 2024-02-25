import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  SharedLayout, 
  UploadPage, 
  ProtectedPage,
  StudentPage, 
  AddStudentPage,
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

            <Route path="records">
              <Route index element={<UploadPage />} />
              <Route 
                path="add" 
                element={
                  <ProtectedPage>
                    <AddStudentPage />
                  </ProtectedPage>
                } 
              />
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
