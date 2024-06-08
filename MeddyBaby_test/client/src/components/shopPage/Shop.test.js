import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import Shop from './Shop';

global.fetch = jest.fn();

const mockUserProfileResponse = {
  points: 1000,
  clothes: {},
};

const mockItemsResponse = {
  '1': false,
  '2': false,
  '3': false,
  '4': false,
  '5': false,
  '6': false,
};

describe('Shop Component', () => {
  beforeEach(() => {
    fetch.mockImplementation((url) => {
      if (url === 'http://localhost:4000/userProfile') {
        return Promise.resolve({
          json: () => Promise.resolve([mockUserProfileResponse]),
        });
      } else if (url === 'http://localhost:4000/item') {
        return Promise.resolve({
          json: () => Promise.resolve(mockItemsResponse),
        });
      } else if (url === 'http://localhost:4000/updatePoint') {
        return Promise.resolve();
      } else if (url === 'http://localhost:4000/updateUserProfile') {
        return Promise.resolve();
      }
      return Promise.reject(new Error('unknown url'));
    });
  });

  afterEach(() => {
    fetch.mockClear();
  });

  test('renders Shop component correctly', async () => {
    await act(async () => {
      render(<Shop />);
    });

  });

  test('loads user profile and items correctly', async () => {
    await act(async () => {
      render(<Shop />);
    });

    expect(screen.getByText(mockUserProfileResponse.points)).toBeInTheDocument();
  });

  test('opens purchase modal on item click', async () => {
    await act(async () => {
      render(<Shop />);
    });

    const itemImage = screen.getByAltText('새싹모자');
    fireEvent.click(itemImage);

    expect(screen.getByText("구매 확인")).toBeInTheDocument();
    expect(screen.getByText("'새싹모자'을(를) 100원에 구매하시겠습니까?")).toBeInTheDocument();
  });

  test('opens purchase modal on "산타모자" item click', async () => {
    await act(async () => {
      render(<Shop />);
    });
  
    const santaHatImage = screen.getByAltText('산타모자');
    fireEvent.click(santaHatImage);
  
    expect(screen.getByText("구매 확인")).toBeInTheDocument();
    expect(screen.getByText("'산타모자'을(를) 500원에 구매하시겠습니까?")).toBeInTheDocument();
  });
  
  test('opens purchase modal on "용머리띠" item click', async () => {
    await act(async () => {
      render(<Shop />);
    });
  
    const headbandImage = screen.getByAltText('용머리띠');
    fireEvent.click(headbandImage);
  
    expect(screen.getByText("구매 확인")).toBeInTheDocument();
    expect(screen.getByText("'용머리띠'을(를) 500원에 구매하시겠습니까?")).toBeInTheDocument();
  });
  
  test('opens purchase modal on "마녀모자" item click', async () => {
    await act(async () => {
      render(<Shop />);
    });
  
    const witchHatImage = screen.getByAltText('마녀모자');
    fireEvent.click(witchHatImage);
  
    expect(screen.getByText("구매 확인")).toBeInTheDocument();
    expect(screen.getByText("'마녀모자'을(를) 1000원에 구매하시겠습니까?")).toBeInTheDocument();
  });
  
  test('opens purchase modal on "분홍리본" item click', async () => {
    await act(async () => {
      render(<Shop />);
    });
  
    const pinkRibbonImage = screen.getByAltText('분홍리본');
    fireEvent.click(pinkRibbonImage);
  
    expect(screen.getByText("구매 확인")).toBeInTheDocument();
    expect(screen.getByText("'분홍리본'을(를) 1000원에 구매하시겠습니까?")).toBeInTheDocument();
  });
  
  test('opens purchase modal on "황금왕관" item click', async () => {
    await act(async () => {
      render(<Shop />);
    });
  
    const goldenCrownImage = screen.getByAltText('황금왕관');
    fireEvent.click(goldenCrownImage);
  
    expect(screen.getByText("구매 확인")).toBeInTheDocument();
    expect(screen.getByText("'황금왕관'을(를) 5000원에 구매하시겠습니까?")).toBeInTheDocument();
  });
  

  test('confirms purchase and updates points', async () => {
    await act(async () => {
      render(<Shop />);
    });

    const itemImage = screen.getByAltText('새싹모자');
    fireEvent.click(itemImage);

    const confirmButton = screen.getByText('확인');
    fireEvent.click(confirmButton);

    await waitFor(() => {
      expect(screen.getByText(mockUserProfileResponse.points - 100)).toBeInTheDocument();
      expect(screen.getByText('구매 완료')).toBeInTheDocument();
    });
  });

  test('changes equipped item correctly', async () => {
    await act(async () => {
      render(<Shop />);
    });
  
    const newItemImage = screen.getByAltText('새싹모자');
    fireEvent.click(newItemImage);
  
    // Expect previous item image to be removed
    await waitFor(() => {
      expect(screen.queryByAltText('구매 완료')).toBeNull();
    });
  
    // Expect new item image to be displayed
    await waitFor(() => {
      expect(screen.getByAltText('새싹모자')).toBeInTheDocument();
    });
  });
  
  test('syncs points correctly after purchase', async () => {
    await act(async () => {
      render(<Shop />);
    });
  
    const newItemImage = screen.getByAltText('새싹모자');
    fireEvent.click(newItemImage);
  
    const confirmButton = screen.getByText('확인');
    fireEvent.click(confirmButton);
  
    // Wait for points to be updated
    await waitFor(() => {
      expect(screen.getByText(900)).toBeInTheDocument(); // Assuming the item costs 100 points
    });
  });

  test('closes modal correctly', async () => {
    await act(async () => {
      render(<Shop />);
    });
  
    const itemImage = screen.getByAltText('새싹모자');
    fireEvent.click(itemImage);
  
    const closeButton = screen.getByText('취소');
    fireEvent.click(closeButton);
  
    await waitFor(() => {
      expect(screen.queryByText('구매 확인')).toBeNull();
    });
  });
  
  test('cancels purchase correctly', async () => {
    await act(async () => {
      render(<Shop />);
    });
  
    const itemImage = screen.getByAltText('새싹모자');
    fireEvent.click(itemImage);
  
    const cancelButton = screen.getByText('취소');
    fireEvent.click(cancelButton);
  
    await waitFor(() => {
      expect(screen.queryByText('포인트 부족')).toBeNull();
      expect(screen.queryByText('포인트가 부족하여 구매할 수 없습니다.')).toBeNull();
    });
  });
  
  test('confirms item equip after purchase', async () => {
    await act(async () => {
      render(<Shop />);
    });
  
    const newItemImage = screen.getByAltText('새싹모자');
    fireEvent.click(newItemImage);
  
    const confirmButton = screen.getByText('확인');
    fireEvent.click(confirmButton);
  
    await waitFor(() => {
      expect(screen.getByAltText('새싹모자')).toBeInTheDocument();
    });
  });
  
  test('포인트 갱신 확인', async () => {
    await act(async () => {
      render(<Shop />);
    });
  
    // 초기 포인트 확인
    expect(screen.getByText(mockUserProfileResponse.points)).toBeInTheDocument();
  
    // 아이템을 구매한 경우, 포인트가 올바르게 갱신되는지 확인
    const newItemImage = screen.getByAltText('새싹모자');
    fireEvent.click(newItemImage);
    const confirmButton = screen.getByText('확인');
    fireEvent.click(confirmButton);
    await waitFor(() => {
      expect(screen.getByText(900)).toBeInTheDocument(); // Assuming the item costs 100 points
    });
  });
  
  test('아이템 구매 상태 확인', async () => {
    await act(async () => {
      render(<Shop />);
    });
  
    // 아이템을 구매한 경우, 해당 아이템이 구매 완료 상태로 표시되는지 확인
    const newItemImage = screen.getByAltText('새싹모자');
    fireEvent.click(newItemImage);
    const confirmButton = screen.getByText('확인');
    fireEvent.click(confirmButton);
    await waitFor(() => {
      expect(screen.getByText('구매 완료')).toBeInTheDocument();
    });
  });
  
  test('아이템 구매 후 재구매 방지', async () => {
    await act(async () => {
      render(<Shop />);
    });
  
    // 이미 구매한 아이템을 다시 구매하려고 시도할 때, 구매 모달이 열리지 않는지 확인
    const newItemImage = screen.getByAltText('새싹모자');
    fireEvent.click(newItemImage);
    const confirmButton = screen.getByText('확인');
    fireEvent.click(confirmButton);
  
    // 다시 구매 시도
    fireEvent.click(newItemImage);
    // 구매 모달이 열리지 않는지 확인
    await waitFor(() => {
      expect(screen.queryByText("구매 확인")).toBeNull();
    });
  });

  test('prevents re-purchase of "산타모자"', async () => {
    await act(async () => {
      render(<Shop />);
    });
  
    // Purchase the item
    const santaHatImage = screen.getByAltText('산타모자');
    fireEvent.click(santaHatImage);
    const confirmButton = screen.getByText('확인');
    fireEvent.click(confirmButton);
  
    // Try to purchase the item again
    fireEvent.click(santaHatImage);
  
    // Ensure purchase modal does not open
    await waitFor(() => {
      expect(screen.queryByText("구매 확인")).toBeNull();
    });
  });
  
  test('prevents re-purchase of "용머리띠"', async () => {
    await act(async () => {
      render(<Shop />);
    });
  
    // Purchase the item
    const headbandImage = screen.getByAltText('용머리띠');
    fireEvent.click(headbandImage);
    const confirmButton = screen.getByText('확인');
    fireEvent.click(confirmButton);
  
    // Try to purchase the item again
    fireEvent.click(headbandImage);
  
    // Ensure purchase modal does not open
    await waitFor(() => {
      expect(screen.queryByText("구매 확인")).toBeNull();
    });
  });
  
  test('prevents re-purchase of "마녀모자"', async () => {
    await act(async () => {
      render(<Shop />);
    });
  
    // Purchase the item
    const witchHatImage = screen.getByAltText('마녀모자');
    fireEvent.click(witchHatImage);
    const confirmButton = screen.getByText('확인');
    fireEvent.click(confirmButton);
  
    // Try to purchase the item again
    fireEvent.click(witchHatImage);
  
    // Ensure purchase modal does not open
    await waitFor(() => {
      expect(screen.queryByText("구매 확인")).toBeNull();
    });
  });
  
  test('prevents re-purchase of "분홍리본"', async () => {
    await act(async () => {
      render(<Shop />);
    });
  
    // Purchase the item
    const pinkRibbonImage = screen.getByAltText('분홍리본');
    fireEvent.click(pinkRibbonImage);
    const confirmButton = screen.getByText('확인');
    fireEvent.click(confirmButton);
  
    // Try to purchase the item again
    fireEvent.click(pinkRibbonImage);
  
    // Ensure purchase modal does not open
    await waitFor(() => {
      expect(screen.queryByText("구매 확인")).toBeNull();
    });
  });
  
  test('prevents re-purchase of "황금왕관"', async () => {
    await act(async () => {
      render(<Shop />);
    });
  
    // Purchase the item
    const goldenCrownImage = screen.getByAltText('황금왕관');
    fireEvent.click(goldenCrownImage);
    const confirmButton = screen.getByText('확인');
    fireEvent.click(confirmButton);
  
    // Try to purchase the item again
    fireEvent.click(goldenCrownImage);
  
    // Ensure purchase modal does not open
    await waitFor(() => {
      expect(screen.queryByText("구매 확인")).toBeNull();
    });
  });
  
  
  test('착용 아이템 변경 확인', async () => {
    await act(async () => {
      render(<Shop />);
    });



test('cancels equipped item correctly', async () => {
  await act(async () => {
    render(<Shop />);
  });

  const itemImage = screen.getByAltText('새싹모자');
  fireEvent.click(itemImage);

  const confirmButton = screen.getByText('확인');
  fireEvent.click(confirmButton);

  await waitFor(() => {
    expect(screen.getByAltText('새싹모자')).toBeInTheDocument();
  });

  // Cancel equipped item
  fireEvent.click(itemImage);

  const cancelButton = screen.getByText('취소');
  fireEvent.click(cancelButton);

  
});

test('handles item price change correctly', async () => {
  // Simulate item price change
  const updatedItemsResponse = {
    ...mockItemsResponse,
    '1': { price: 150 },
  };

  fetch.mockImplementationOnce((url) => {
    if (url === 'http://localhost:4000/userProfile') {
      return Promise.resolve({
        json: () => Promise.resolve([mockUserProfileResponse]),
      });
    } else if (url === 'http://localhost:4000/item') {
      return Promise.resolve({
        json: () => Promise.resolve(updatedItemsResponse),
      });
    } else if (url === 'http://localhost:4000/updatePoint') {
      return Promise.resolve();
    } else if (url === 'http://localhost:4000/updateUserProfile') {
      return Promise.resolve();
    }
    return Promise.reject(new Error('unknown url'));
  });

  await act(async () => {
    render(<Shop />);
  });

  await waitFor(() => {
    expect(screen.getByAltText('새싹모자')).toBeInTheDocument();
    expect(screen.getByText('150')).toBeInTheDocument();
  });
});

test('handles network error correctly', async () => {
  fetch.mockImplementationOnce(() => Promise.reject('network error'));

  await act(async () => {
    render(<Shop />);
  });

  await waitFor(() => {
    expect(screen.getByText('네트워크 오류')).toBeInTheDocument();
  });
});

  
    // 새로운 아이템을 구매하고 착용한 경우, 해당 아이템이 올바르게 페이지에 표시되고 이전 아이템은 사라지는지 확인
    const newItemImage = screen.getByAltText('새싹모자');
    fireEvent.click(newItemImage);
    const confirmButton = screen.getByText('확인');
    fireEvent.click(confirmButton);
  
    // 기존 아이템이 사라졌는지 확인
    await waitFor(() => {
      expect(screen.queryByAltText('구매 완료')).toBeNull();
    });
  
    // 새로운 아이템이 표시되었는지 확인
    await waitFor(() => {
      expect(screen.getByAltText('새싹모자')).toBeInTheDocument();
    });
  });
  test('purchases and equips "산타모자" correctly', async () => {
    await act(async () => {
      render(<Shop />);
    });
  
    const santaHatImage = screen.getByAltText('산타모자');
    fireEvent.click(santaHatImage);
  
    const confirmButton = screen.getByText('확인');
    fireEvent.click(confirmButton);
  
    // Previous item disappears
    await waitFor(() => {
      expect(screen.queryByAltText('구매 완료')).toBeNull();
    });
  
    // New item is displayed
    await waitFor(() => {
      expect(screen.getByAltText('산타모자')).toBeInTheDocument();
    });
  });
  
  test('purchases and equips "용머리띠" correctly', async () => {
    await act(async () => {
      render(<Shop />);
    });
  
    const headbandImage = screen.getByAltText('용머리띠');
    fireEvent.click(headbandImage);
  
    const confirmButton = screen.getByText('확인');
    fireEvent.click(confirmButton);
  
    // Previous item disappears
    await waitFor(() => {
      expect(screen.queryByAltText('구매 완료')).toBeNull();
    });
  
    // New item is displayed
    await waitFor(() => {
      expect(screen.getByAltText('용머리띠')).toBeInTheDocument();
    });
  });
  
  test('purchases and equips "마녀모자" correctly', async () => {
    await act(async () => {
      render(<Shop />);
    });
  
    const witchHatImage = screen.getByAltText('마녀모자');
    fireEvent.click(witchHatImage);
  
    const confirmButton = screen.getByText('확인');
    fireEvent.click(confirmButton);
  
    // Previous item disappears
    await waitFor(() => {
      expect(screen.queryByAltText('구매 완료')).toBeNull();
    });
  
    // New item is displayed
    await waitFor(() => {
      expect(screen.getByAltText('마녀모자')).toBeInTheDocument();
    });
  });
  
  test('purchases and equips "분홍리본" correctly', async () => {
    await act(async () => {
      render(<Shop />);
    });
  
    const pinkRibbonImage = screen.getByAltText('분홍리본');
    fireEvent.click(pinkRibbonImage);
  
    const confirmButton = screen.getByText('확인');
    fireEvent.click(confirmButton);
  
    // Previous item disappears
    await waitFor(() => {
      expect(screen.queryByAltText('구매 완료')).toBeNull();
    });
  
    // New item is displayed
    await waitFor(() => {
      expect(screen.getByAltText('분홍리본')).toBeInTheDocument();
    });
  });
  
  test('purchases and equips "황금왕관" correctly', async () => {
    await act(async () => {
      render(<Shop />);
    });
  
    const goldenCrownImage = screen.getByAltText('황금왕관');
    fireEvent.click(goldenCrownImage);
  
    const confirmButton = screen.getByText('확인');
    fireEvent.click(confirmButton);
  
    // Previous item disappears
    await waitFor(() => {
      expect(screen.queryByAltText('구매 완료')).toBeNull();
    });
  
    // New item is displayed
    await waitFor(() => {
      expect(screen.getByAltText('황금왕관')).toBeInTheDocument();
    });
  });
  
  
  test('포인트 부족 상황에서의 구매 시도', async () => {
    fetch.mockImplementationOnce((url) => {
      if (url === 'http://localhost:4000/userProfile') {
        return Promise.resolve({
          json: () => Promise.resolve([{ points: 50, clothes: {} }]),
        });
      } else if (url === 'http://localhost:4000/item') {
        return Promise.resolve({
          json: () => Promise.resolve(mockItemsResponse),
        });
      } else if (url === 'http://localhost:4000/updatePoint') {
        return Promise.resolve();
      } else if (url === 'http://localhost:4000/updateUserProfile') {
        return Promise.resolve();
      }
      return Promise.reject(new Error('unknown url'));
    });
  
    await act(async () => {
      render(<Shop />);
    });
  
    const newItemImage = screen.getByAltText('새싹모자');
    fireEvent.click(newItemImage);
  
    const confirmButton = screen.getByText('확인');
    fireEvent.click(confirmButton);
  
    await waitFor(() => {
      expect(screen.getByText('포인트 부족')).toBeInTheDocument();
      expect(screen.getByText('포인트가 부족하여 구매할 수 없습니다.')).toBeInTheDocument();
    });
  });

  
  test('syncs points correctly after purchase', async () => {
    await act(async () => {
      render(<Shop />);
    });
  
    const newItemImage = screen.getByAltText('새싹모자');
    fireEvent.click(newItemImage);
  
    const confirmButton = screen.getByText('확인');
    fireEvent.click(confirmButton);
  
    await waitFor(() => {
      expect(screen.getByText(900)).toBeInTheDocument(); // Assuming the item costs 100 points
    });
  });

  test('purchases and equips "산타모자" correctly', async () => {
    await act(async () => {
      render(<Shop />);
    });
  
    const santaHatImage = screen.getByAltText('산타모자');
    fireEvent.click(santaHatImage);
  
    const confirmButton = screen.getByText('확인');
    fireEvent.click(confirmButton);
  
    await waitFor(() => {
      expect(screen.getByAltText('산타모자')).toBeInTheDocument();
      expect(screen.queryByAltText('새싹모자')).toBeNull();
    });
  });
  
  test('purchases and equips "용머리띠" correctly', async () => {
    await act(async () => {
      render(<Shop />);
    });
  
    const headbandImage = screen.getByAltText('용머리띠');
    fireEvent.click(headbandImage);
  
    const confirmButton = screen.getByText('확인');
    fireEvent.click(confirmButton);
  
    await waitFor(() => {
      expect(screen.getByAltText('용머리띠')).toBeInTheDocument();
      expect(screen.queryByAltText('새싹모자')).toBeNull();
    });
  });
  
  test('purchases and equips "마녀모자" correctly', async () => {
    await act(async () => {
      render(<Shop />);
    });
  
    const witchHatImage = screen.getByAltText('마녀모자');
    fireEvent.click(witchHatImage);
  
    const confirmButton = screen.getByText('확인');
    fireEvent.click(confirmButton);
  
    await waitFor(() => {
      expect(screen.getByAltText('마녀모자')).toBeInTheDocument();
      expect(screen.queryByAltText('새싹모자')).toBeNull();
    });
  });
  
  test('purchases and equips "분홍리본" correctly', async () => {
    await act(async () => {
      render(<Shop />);
    });
  
    const pinkRibbonImage = screen.getByAltText('분홍리본');
    fireEvent.click(pinkRibbonImage);
  
    const confirmButton = screen.getByText('확인');
    fireEvent.click(confirmButton);
  
    await waitFor(() => {
      expect(screen.getByAltText('분홍리본')).toBeInTheDocument();
      expect(screen.queryByAltText('새싹모자')).toBeNull();
    });
  });
  
  test('purchases and equips "황금왕관" correctly', async () => {
    await act(async () => {
      render(<Shop />);
    });
  
    const goldenCrownImage = screen.getByAltText('황금왕관');
    fireEvent.click(goldenCrownImage);
  
    const confirmButton = screen.getByText('확인');
    fireEvent.click(confirmButton);
  
    await waitFor(() => {
      expect(screen.getByAltText('황금왕관')).toBeInTheDocument();
      expect(screen.queryByAltText('새싹모자')).toBeNull();
    });
  });
  
  


  test('shows insufficient points message', async () => {
    fetch.mockImplementationOnce((url) => {
      if (url === 'http://localhost:4000/userProfile') {
        return Promise.resolve({
          json: () => Promise.resolve([{ points: 50, clothes: {} }]),
        });
      } else if (url === 'http://localhost:4000/item') {
        return Promise.resolve({
          json: () => Promise.resolve(mockItemsResponse),
        });
      } else if (url === 'http://localhost:4000/updatePoint') {
        return Promise.resolve();
      } else if (url === 'http://localhost:4000/updateUserProfile') {
        return Promise.resolve();
      }
      return Promise.reject(new Error('unknown url'));
    });

    await act(async () => {
      render(<Shop />);
    });


    await waitFor(() => {
      expect(screen.getByText('포인트 부족')).toBeInTheDocument();
      expect(screen.getByText('포인트가 부족하여 구매할 수 없습니다.')).toBeInTheDocument();
    });
  });
});
