import React from 'react';
import { render, fireEvent, act } from '@testing-library/react';
import Cloud from './cloud';

// mock fetch 함수
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve([{ cloud: 50 }]) // 모의로 반환할 데이터 설정
  })
);

describe('Cloud component', () => {
  test('renders cloud image and percentage, and handles button click', async () => {
    let getByAltText, getByText;
    
    await act(async () => {
      // Cloud 컴포넌트를 렌더링하고 getByAltText, getByText를 사용하여 요소 가져오기
      ({ getByAltText, getByText } = render(<Cloud />));
    });
    
    // 클라우드 이미지 확인
    const cloudImage = getByAltText('Cloud');
    expect(cloudImage).toBeInTheDocument();

    // 퍼센티지 확인
    const percentage = getByText(/%/);
    expect(percentage).toBeInTheDocument();
    expect(percentage.textContent).toBe('50%'); // 모의로 반환한 데이터를 확인하여 퍼센티지 값이 제대로 나오는지 테스트

    // 버튼 클릭하여 퍼센티지 증가 확인
    const button = getByText('✨ Have a nice day ✨');
    fireEvent.click(button);
    expect(percentage).toHaveTextContent('85%'); // 버튼 클릭 후 퍼센티지가 35% 증가되어야 함
  });
});
