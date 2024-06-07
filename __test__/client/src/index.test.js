// src/components/__tests__/index.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import App from '../src/components/App';

test('renders App component without crashing', () => {
  render(<App />);
  
  // 여기에 App 컴포넌트의 특정 요소를 확인하는 코드를 추가할 수 있습니다.
  // 예: "App Component"라는 텍스트가 있는지 확인
  const linkElement = screen.getByText(/App Component/i); // 실제 텍스트에 맞춰 수정
  expect(linkElement).toBeInTheDocument();
});
