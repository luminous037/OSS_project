import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom'; // MemoryRouter를 사용하여 라우터를 테스트합니다.
import App from './App'; // 테스트할 애플리케이션 컴포넌트를 임포트합니다.

// 테스트할 애플리케이션의 기본 경로를 정의합니다.
const renderWithRouter = (ui, { route = '/' } = {}) => {
  window.history.pushState({}, 'Test page', route); // 테스트 페이지의 URL을 설정합니다.
  return render(ui, { wrapper: MemoryRouter }); // MemoryRouter로 감싸서 라우터 기능을 테스트합니다.
};

test('renders Start page by default', () => {
  renderWithRouter(<App />); // 애플리케이션을 렌더링합니다.

  // Start 페이지가 렌더링되었는지 확인합니다.
  const startPageElement = screen.getByText(/This is the start page/i);
  expect(startPageElement).toBeInTheDocument();
});

test('renders NavigationBar on Main, MyPage, WeeklyCheck, and Shop pages', () => {
  renderWithRouter(<App />, { route: '/Main' }); // Main 페이지를 렌더링합니다.

  // 네비게이션 바가 렌더링되었는지 확인합니다.
  const navigationBarElement = screen.getByRole('navigation');
  expect(navigationBarElement).toBeInTheDocument();
});

test('does not render NavigationBar on other pages', () => {
  renderWithRouter(<App />, { route: '/InfoPage_1' }); // 다른 페이지를 렌더링합니다.

  // 네비게이션 바가 렌더링되지 않았는지 확인합니다.
  const navigationBarElement = screen.queryByRole('navigation');
  expect(navigationBarElement).not.toBeInTheDocument();
});
