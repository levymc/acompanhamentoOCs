import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import AddOCPage from './pages/AddOCPage/AddOCPage';
import ResetStyle from "./style/ResetStyle";
import { useLocation, useNavigate, Link } from 'react-router-dom';


export default function App() {
  return (
    <>
      <ResetStyle />
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/addOC" element={
              <AddOCPage
              />
          } />
        </Routes>
      </Router>
    </>
  );
}

