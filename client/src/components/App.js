
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavigationBar from './navigationBar/NavigationBar.js'; // NavigationBar 컴포넌트를 임포트합니다.
import Start from './startPage/Start.js'; // 홈 페이지 컴포넌트
import InfoPage_1 from './InfoPage/InfoPage_1.js';
import InfoPage_2 from './InfoPage/InfoPage_2.js';
import InfoPage_3 from './InfoPage/InfoPage_3.js';
import Main from './mainPage/Main.js';
import MyPage from './MyPage/MyPage.js';
import AddMedi from './MyPage/AddMedi.js';
import DetailPage from './MyPage/DetailPage.js';
import Alarm from './alarmPage/alarmPage.js';

function App() {

  return (
    <Router>
      <div>
        <Routes>
        <Route path="/App" element={<App />} />
          <Route path="/Start" element={<Start />} />
          <Route path="/Main" element={<Main />} />
          <Route path="/Alarm" element={<Alarm />} />
          <Route path="/InfoPage_1" element={<InfoPage_1 />} />
          <Route path="/InfoPage_1/InfoPage_2" element={<InfoPage_2 />} />
          <Route path="/InfoPage_1/InfoPage_2/InfoPage_3" element={<InfoPage_3 />} />
          <Route path="/MyPage" element={<MyPage />} />
          <Route path="/MyPage/AddMedi" element={<AddMedi />} />
          <Route path="/DetailPage" element={<DetailPage />} />
      </Routes>
        <NavigationBar /> {/* 하단 네비게이션 바를 추가합니다. */}
      </div>
    </Router>
  );
}

export default App;