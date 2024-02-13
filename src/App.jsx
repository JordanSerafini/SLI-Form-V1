import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PrivateRoute from "./components/Middleware/PrivateRoute";
import { RatingProvider } from "./context/RatingContext";

import FormPage from "./components/Form-Satisfaction/Form-Page";
import LoginPage from "./components/Login/LoginPage";
import Home from "./components/Page/Home";
import ClientList from "./components/Page/client/clientList";
import TokenRoute from "./components/Middleware/TokenRoute";
import ArticleList from "./components/Page/article/articleList";
import ClientDetail from "./components/Page/client/clientDetail";
import ArticleDetail from "./components/Page/article/articleDetail";
//import { Link } from "react-router-dom";

function App() {
  return (
    <RatingProvider>

    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/form-satisfaction" element={<TokenRoute element={FormPage} />} />
        <Route path="/home" element={<PrivateRoute element={<Home />} />} />
        <Route path="/client-list" element={<PrivateRoute element={<ClientList />} />} />
        <Route path="/article-list" element={<ArticleList />} />
        <Route path="/client-detail/:clientId" element={<ClientDetail />} />
        <Route path="/article-detail/:articleId" element={<ArticleDetail />} />
      </Routes>
 
    </Router>
    </RatingProvider>
  );
}

export default App;
