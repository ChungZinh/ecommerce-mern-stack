import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import Error from "./pages/Error";
import Header from "./components/Header";
import AdminRoute from "./components/AdminRoute";
import ScrollToTop from "./components/ScrollToTop";
import Footer from "./components/Footer";

function App() {

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Header  />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route element={<AdminRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
        <Route path="*" element={<Error />} />
      </Routes>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
