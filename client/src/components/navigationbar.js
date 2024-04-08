// import React from 'react';
// import './navigationbar.css';
// import { BrowserRouter as Route, Routes} from 'react-router-dom';

// import Start from './Start.js';

// // function BottomNavigationBar() {
// //   return (
// //     <div className="bottom-nav">
// //       <Link to="./Start.js" className="bottom-nav-item">
// //         Home
// //       </Link>
// //       {/* <a href="#" className="bottom-nav-item">
// //         Search
// //       </a>
// //       <a href="#" className="bottom-nav-item">
// //         Profile
// //       </a> */}
// //     </div>
// //   );
// // }

// function BottomNavigationBar() {
//   return (
//     <Routes>
      
//           <Route path="./Start.js" element={<Start/>} />
          
//         <BottomNavigationBar />
      
//     </Routes>
//   );
// }

// export default BottomNavigationBar;

// NavigationBar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './NavigationBar.css'; // CSS 파일을 임포트합니다.

const NavigationBar = () => {
  return (
    <div className="bottom-nav">
      <Link to="./Start.js" className="nav-item">홈</Link>
      <Link to="./Main.js" className="nav-item">집</Link>
      
      
    </div>
  );
}

export default NavigationBar;
