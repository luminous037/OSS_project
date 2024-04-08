// import React from 'react';
// //import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import './App.css';

// import BottomNavigationBar from './NavigationBar.js';


// function App() {
//   return (
//     <div>
//     <BottomNavigationBar/>

//   </div>

//   );
// }


// export default App;

// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavigationBar from './NavigationBar'; // NavigationBar 컴포넌트를 임포트합니다.
import Start from './Start.js'; // 홈 페이지 컴포넌트
import Main from './Main.js';



function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route exact path="/Start" component={Start} />
          <Route path="/Main" component={Main} />
          
        </Routes>
        <NavigationBar /> {/* 하단 네비게이션 바를 추가합니다. */}
      </div>
    </Router>
  );
}

export default App;

