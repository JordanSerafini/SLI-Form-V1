import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PrivateRoute from './components/Middleware/PrivateRoute';

import FormPage from "./components/Form-Satisfaction/Form-Page";
import LoginPage from "./components/Login/LoginPage";
import Home from './components/Page/Home';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/form-satisfaction" element={<PrivateRoute element={<FormPage />} />} />
        <Route path="/home" element={<PrivateRoute element={<Home />} />} />

      </Routes>
    </Router>
  );
}

export default App;
