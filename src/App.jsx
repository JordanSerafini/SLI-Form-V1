import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PrivateRoute from "./components/Middleware/PrivateRoute";
import { RatingProvider } from "./context/RatingContext";

import FormPage from "./components/Form-Satisfaction/Form-Page";
import LoginPage from "./components/Login/LoginPage";
import Home from "./components/Page/Home";
//import { Link } from "react-router-dom";

function App() {
  return (
    <RatingProvider>

    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        
        <Route
          path="/form-satisfaction"
          element={<PrivateRoute element={<FormPage />} />}
        />
        <Route path="/home" element={<PrivateRoute element={<Home />} />} />
      </Routes>


      {/* Navbar 
      <nav className="h-20 w-full bg-second  flex flex-row justify-evenly items-center">
        <ul className="flex list-none p-0 m-0 text-main text-1xl">
          <li className="mr-4">
            <Link to="/home">Home</Link>
          </li>
          <li className="mr-4">
            <Link to="/form-satisfaction">Form</Link>
          </li>
        </ul>
      </nav>
      */}
    </Router>
    </RatingProvider>
  );
}

export default App;
