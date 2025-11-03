import React from 'react';
import { ReactFlow } from '@xyflow/react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { motion } from 'framer-motion';
import PageWrapper from './components/PageWrapper';
import '@xyflow/react/dist/style.css';
import Rerokai from "./pages/Rerokai"
import Project from "./pages/Project"



function App() {
  
  return (
    
    <Router>
      <Routes>
        <Route path= "/"element={<PageWrapper><Rerokai/></PageWrapper>}/>
        <Route path= "/project"element={<PageWrapper><Project/></PageWrapper>}/>
      </Routes>
    </Router>

  );
}

export default App;
