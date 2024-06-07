import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import AlarmPage from './alarmPage.js';

// fetch Mock을 위한 설정
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve([{ cloud: '50' }]),
  })
);

// useNavigate Hook을 Mocking
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}));

describe('AlarmPage Component', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  it('renders correctly', async () => {
    await act(async () => {
      render(
        <BrowserRouter>
          <AlarmPage />
        </BrowserRouter>
      );
    });
    expect(screen.getByText('약 먹을 시간이에요!')).toBeInTheDocument();
  });

  it('fetches user data successfully', async () => {
    await act(async () => {
      render(
        <BrowserRouter>
          <AlarmPage />
        </BrowserRouter>
      );
    });

    await waitFor(() =>
      expect(global.fetch).toHaveBeenCalledWith('/userProfile')
    );
    await waitFor(() =>
      expect(screen.getByText('약 먹을 시간이에요!')).toBeInTheDocument()
    );
  });

  it('handleClearClick function works correctly', async () => {
    await act(async () => {
      render(
        <BrowserRouter>
          <AlarmPage />
        </BrowserRouter>
      );
    });

    const clearButton = screen.getByText('clear!');
    fireEvent.click(clearButton);

    await waitFor(() =>
      expect(global.fetch).toHaveBeenCalledWith(expect.stringContaining('cloudUpdate'), expect.anything())
    );
  });
});