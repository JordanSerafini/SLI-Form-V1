import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PrivateRoute from "./components/Middleware/PrivateRoute";
import { RatingProvider } from "./context/RatingContext";

import FormPage from "./components/Form-Satisfaction/Form-Page";
import LoginPage from "./components/Login/LoginPage";
import Home from "./components/Page/Home";
import TokenRoute from "./components/Middleware/TokenRoute";
//import { Link } from "react-router-dom";

function App() {
  return (
    <RatingProvider>

    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        
        <Route path="/form-satisfaction" element={<TokenRoute element={FormPage} />} />

        <Route path="/home" element={<PrivateRoute element={<Home />} />} />
      </Routes>


     
    </Router>
    </RatingProvider>
  );
}

export default App;
