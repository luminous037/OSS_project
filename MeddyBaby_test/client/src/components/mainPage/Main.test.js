import React from 'react';
import { render, fireEvent, act } from '@testing-library/react';
import Main from './Main';

// Mock the imported images
jest.mock('../image/moon.png', () => 'moon.png');
jest.mock('../image/sun.png', () => 'sun.png');
jest.mock('../image/bench.png', () => 'bench.png');
jest.mock('../image/star.png', () => 'star.png');
jest.mock('../image/cloud5.png', () => 'cloud5.png');
jest.mock('../image/chicken.png', () => 'chicken.png');
jest.mock('../image/plant.png', () => 'item1.png');
jest.mock('../image/santa.png', () => 'item2.png');
jest.mock('../image/dragon.png', () => 'item3.png');
jest.mock('../image/witch.png', () => 'item4.png');
jest.mock('../image/ribbon.png', () => 'item5.png');
jest.mock('../image/crown.png', () => 'item6.png');


test('MainPage 컴포넌트 렌더링 및 구름 클릭 처리', async () => {
  // fetch 또는 다른 비동기 데이터 페칭 모킹
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve([{ rain: 2, attendanceCheck: false, stamp: 3, _id: '123', clothes: 1 }]),
    })
  );

  // Main 컴포넌트 렌더링
  const { getByAltText } = render(<Main />);

  // 데이터가 페칭되고 컴포넌트가 렌더링될 때까지 대기
  await act(async () => {
    await new Promise((resolve) => setTimeout(resolve, 0));
  });

  // Cloud 요소가 문서에 있는지 확인
  const cloudElement = getByAltText('Cloud');
  expect(cloudElement).toBeInTheDocument();

  // Cloud 요소 클릭 이벤트 시뮬레이션
  await act(async () => {
    fireEvent.click(cloudElement);
  });

 
   // Check if elements are rendered correctly
   expect(getByAltText('moon')).toBeInTheDocument();
   expect(getByAltText('Cloud')).toBeInTheDocument();
   expect(getByAltText('bench')).toBeInTheDocument();
   expect(getByAltText('chicken')).toBeInTheDocument();
   expect(getByAltText('Image1')).toBeInTheDocument();

   

});
