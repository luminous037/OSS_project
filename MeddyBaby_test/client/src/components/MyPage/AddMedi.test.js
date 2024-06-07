import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import AddMedi from './AddMedi';
import { mount } from 'enzyme';

jest.mock('react-router-dom', () => ({
    useNavigate: jest.fn(() => jest.fn())
  }));

  jest.mock('react-router-dom', () => ({
    useNavigate: jest.fn(() => jest.fn())
  }));  

describe('AddMedi 컴포넌트', () => {
  test('약 정보를 입력하고 저장 버튼을 클릭했을 때, 올바른 데이터가 서버에 전송되는지 확인', async () => {
    const { getByText, getByLabelText } = render(<AddMedi />);
    
    // 약 정보 입력
    fireEvent.change(getByLabelText('먹는 약'), { target: { value: '파르메노' } });
    fireEvent.change(getByLabelText('시간 입력'), { target: { value: '10:00' } });
    fireEvent.click(getByText('아침'));

    // 저장 버튼 클릭
    fireEvent.click(getByText('저장'));

    // 서버에 올바른 데이터가 전송되었는지 확인
    await waitFor(() => {
      expect(fetch).toHaveBeenCalledTimes(1);
      expect(fetch).toHaveBeenCalledWith('http://localhost:4000/addList', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          mediName: '파르메노',
          time: '10:00',
          detail: {
            morning: true,
            afternoon: false,
            evening: false,
            before: false,
            after: false,
            time: ''
          }
        })
      });
    });
  });
});

describe('AddMedi Component', () => {
    let wrapper;
  
    beforeEach(() => {
      wrapper = mount(<AddMedi />);
    });
  
    afterEach(() => {
      wrapper.unmount();
    });
  
    it('renders without crashing', () => {
      expect(wrapper.exists()).toBe(true);
    });
  
    it('calls goToMypage when back button is clicked', () => {
      const backButton = wrapper.find('.back_button button');
      backButton.simulate('click');
      expect(wrapper.props().navigate).toHaveBeenCalledWith('/MyPage');
    });

});

describe('AddMedi Component', () => {
    it('renders without crashing', () => {
      const { getByText } = render(<AddMedi />);
      expect(getByText('알람 설정')).toBeInTheDocument();
    });
  
    it('calls goToMypage when back button is clicked', () => {
      const { getByAltText } = render(<AddMedi />);
      fireEvent.click(getByAltText('back Button'));
      expect(useNavigate()).toHaveBeenCalledWith('/MyPage');
    });
  
    // Add more test cases as needed
  });