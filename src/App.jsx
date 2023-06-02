import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import AddOCPage from './pages/AddOCPage/AddOCPage';
import HistoricPage from './pages/HistoricPage/HistoricPage';
import ResetStyle from "./style/ResetStyle";
import { useLocation, useNavigate, Link } from 'react-router-dom';
import 'materialize-css/dist/css/materialize.min.css';
import GraphPage from './pages/GraphPage/GraphPage';
import React, { useState, useEffect } from "react";
import axios from 'axios';


export default function App() {

  const [data, setData] = useState([])

  useEffect(() => {
    axios.get("http://192.168.0.152:4000/api/historico")
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);


  return (
    <>
      <ResetStyle />
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/addOC" element={
              <AddOCPage
                data={data}
                setData={setData}
              />
          } />
          <Route path="/historicPage" element={
              <HistoricPage
                data={data}
                setData={setData}
              />
          } />
          <Route path="/graphPage" element={
              <GraphPage
                data={data}
                setData={setData}
              />
          } />
        </Routes>
      </Router>
    </>
  );
}

