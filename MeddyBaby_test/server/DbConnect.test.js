const { dbConnect, getDatabase } = require('./DbConnect');
const { MongoClient } = require('mongodb');

// 테스트를 위한 가짜 MongoDB 서버 URL
const testUri = "mongodb+srv://Gaudul:ab213466@meddybaby.plkzmsm.mongodb.net/"; // 테스트용 URL

// MongoDB 클라이언트를 Mock으로 대체합니다.
jest.mock('mongodb', () => {
  const mockConnect = jest.fn();
  const mockDb = jest.fn(() => ({ databaseName: 'testDB' }));
  
  return {
    MongoClient: jest.fn(() => ({
      connect: mockConnect,
      db: mockDb,
    })),
  };
});

describe('dbConnect', () => {
  let mockClientInstance;

  beforeEach(() => {
    mockClientInstance = new MongoClient();
    mockClientInstance.connect.mockReset();
  });

  test('successfully connects to MongoDB', async () => {
    // 성공적으로 연결된 상태를 모의합니다.
    mockClientInstance.connect.mockResolvedValueOnce({
      db: mockClientInstance.db,
    });

    // dbConnect 함수를 호출합니다.
    await dbConnect();

    // MongoClient.connect 함수가 호출되었는지 확인합니다.
    expect(MongoClient).toHaveBeenCalledWith(testUri, { useNewUrlParser: true, useUnifiedTopology: true });
    expect(mockClientInstance.connect).toHaveBeenCalled();

    // 데이터베이스 객체가 설정되었는지 확인합니다.
    expect(getDatabase()).toBeTruthy();
    expect(getDatabase().databaseName).toEqual('testDB');
  });

  test('fails to connect to MongoDB', async () => {
    // 연결 실패 상태를 모의합니다.
    const errorMessage = 'Connection failed';
    mockClientInstance.connect.mockRejectedValueOnce(new Error(errorMessage));

    // dbConnect 함수를 호출합니다.
    await dbConnect();

    // MongoClient.connect 함수가 호출되었는지 확인합니다.
    expect(MongoClient).toHaveBeenCalledWith(testUri, { useNewUrlParser: true, useUnifiedTopology: true });
    expect(mockClientInstance.connect).toHaveBeenCalled();

    // 데이터베이스 객체가 설정되지 않았는지 확인합니다.
    expect(getDatabase()).toBeNull();
  });
});
