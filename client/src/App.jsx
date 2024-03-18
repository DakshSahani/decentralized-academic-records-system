import "./App.css";
import { Routes, Route, HashRouter } from "react-router-dom";
import {
  SharedLayout, 
  UploadPage, 
  ProtectedPage,
  StudentPage, 
  AddStudentPage,
  NotFoundPage, 
  LandingPage,
  LoginPage,
}  from "./pages";
import { ContextProvider } from "./context/Context";

function App() {

  return (
    <ContextProvider>
      <HashRouter basename="/">
        <Routes>
          <Route path="/" element={<SharedLayout />} > 
            <Route index element={<LandingPage />} />
            <Route path="login" element={<LoginPage />}/>
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
      </HashRouter>
    </ContextProvider>
  )
}

export default App;
