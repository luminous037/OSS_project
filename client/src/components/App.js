
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavigationBar from './NavigationBar.js'; // NavigationBar 컴포넌트를 임포트합니다.
import Start from './Start.js'; // 홈 페이지 컴포넌트
import Main from './Main.js';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/Start" element={<Start />} />
          <Route path="/Main" element={<Main />} />
        </Routes>
        <NavigationBar /> {/* 하단 네비게이션 바를 추가합니다. */}
      </div>
    </Router>
  );
}

export default App;