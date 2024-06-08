// NavigationBar.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';

import { BrowserRouter } from 'react-router-dom';
import NavigationBar from './NavigationBar';

test('renders NavigationBar component', () => {
    render(
      <BrowserRouter>
        <NavigationBar />
      </BrowserRouter>
    );
  
    // 네비게이션 링크가 존재하는지 확인
    const homeLink = screen.getByText(/홈/i);
    const shopLink = screen.getByText(/상점/i);
    const weeklyCheckLink = screen.getByText(/칭찬/i);
    const myPageLink = screen.getByText(/설정/i);
  
    expect(homeLink).toBeTruthy();
    expect(shopLink).toBeTruthy();
    expect(weeklyCheckLink).toBeTruthy();
    expect(myPageLink).toBeTruthy();
  });
