import React from 'react';
import { render, waitFor } from '@testing-library/react';
import Seed from './seed';

// 모든 테스트 전에 실행
beforeEach(() => {
  // fetch 모킹
  global.fetch = jest.fn().mockResolvedValue({
    json: jest.fn().mockResolvedValue([{ plant: 'seed', points: '100' }])
  });
});

// 모든 테스트 후에 실행
afterEach(() => {
  // 모킹된 함수 초기화
  jest.clearAllMocks();
});

describe('Seed Component', () => {
  test('renders correctly with initial data', async () => {
    const { getByAltText, getByText } = render(<Seed rainCount={0} setRainCount={() => {}} />);

    // 이미지가 문서에 존재하는지 확인
    await waitFor(() => {
      const seedImage = getByAltText('씨앗 이미지');
      expect(seedImage).toBeInTheDocument();
    }, { timeout: 10000 });

    // 텍스트가 문서에 존재하는지 확인
    await waitFor(() => {
      const element = getByText('보유 금액: 100');
      expect(element).toBeInTheDocument();
    });
  });
});
