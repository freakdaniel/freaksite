import React, {useState} from 'react';
import Header from './components/Header';
import Skills from './components/Skills';
import About from './components/About';
import Footer from './components/Footer';
import BackBlur from './components/BackBlur';
import { ReactFlow } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import '/home/user/pw/personal-web/src/styles/app.css'


function App() {
  
  return (
    <div className="App">
      
   <BackBlur/> 
   <Header/>
   <About/>  
   <Skills/>
   <Footer/>
    
  


    
    </div>
    
  );
}

export default App;
