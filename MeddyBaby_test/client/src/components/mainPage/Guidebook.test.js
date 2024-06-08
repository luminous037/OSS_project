import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import InstructionModalWithSlide from './Guidebook'; 

// 모달 창 컴포넌트 테스트 스위트 설정
describe('InstructionModalWithSlide component', () => {
  // 모달 창 렌더링 및 버튼 클릭 테스트
  test('renders instruction modal with slide and handles button click', () => {
    // 모달 창 컴포넌트를 렌더링하고 getByText, queryByText를 사용하여 요소 가져오기
    const { getByText, queryByText } = render(<InstructionModalWithSlide isOpen={true} close={() => {}} />);
    
    // 모달 창 제목 확인
    const modalTitle = getByText('사용 설명서');
    expect(modalTitle).toBeInTheDocument();

    // 버튼 클릭하여 다음 슬라이드로 이동 확인
    const nextButton = getByText('다음');
    fireEvent.click(nextButton);
    const shopPageSlideTitle = queryByText('_상점 페이지가 뭐야?');
    expect(shopPageSlideTitle).toBeInTheDocument(); // 다음 슬라이드의 제목 확인

    // 버튼 클릭하여 이전 슬라이드로 이동하기 전에 이전 슬라이드가 있는지 확인
    const prevButton = getByText('이전');
    fireEvent.click(prevButton);
    const mainPageSlideTitle = queryByText('_메인 페이지가 뭐야?');
    expect(mainPageSlideTitle).toBeInTheDocument(); // 이전 슬라이드의 제목 확인
  });
});
