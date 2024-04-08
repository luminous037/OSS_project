import React from 'react';
import {Routes, Route, BrowserRouter} from "react-router-dom";
import './App.css';
import Start from './Start.js';
import BottomNavigationBar from './navigationbar.js';


function App() {
  return (
    <div>
    <BottomNavigationBar/>

  </div>
    // <BrowserRouter>
    //     <div className="App">
         
          
    //       <Routes>
    //       {/* <Route path="/" element={<Main />} /> */}
    //         <Route path="/start" element={<Start />} />
    //       </Routes>
    //     </div>
    //   </BrowserRouter>
  );
}


export default App;
