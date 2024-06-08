// // jest.config.js
// module.exports = {
//     testEnvironment: 'jest-environment-jsdom',
//     transform: {
//       '^.+\\.jsx?$': 'babel-jest'
//     },
//     moduleNameMapper: {
//       '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
//       '\\.(jpg|jpeg|png|gif|webp|svg)$': 'jest-transform-stub'
//     },
//     setupFilesAfterEnv: ['@testing-library/jest-dom'],
    
//   };

module.exports = {
    
    // babel-jest를 사용하여 JavaScript 파일을 변환합니다.
    transform: {
      '^.+\\.jsx?$': 'babel-jest',
    },
  
    // jest의 기본 테스트 환경을 설정합니다.
    testEnvironment: 'jsdom', 
  
    // CSS 파일 및 이미지 파일에 대한 모의(mock) 처리를 위한 설정입니다.
    moduleNameMapper: {
      '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
      '\\.(jpg|jpeg|png|gif|webp|svg)$': 'jest-transform-stub',
      "^node-fetch$": "node-fetch/lib/index.js"
    },
    setupFiles: ['jest-localstorage-mock'],
  
    // 테스트 실행 전에 환경을 설정할 파일 목록을 지정합니다.
    setupFilesAfterEnv: ['@testing-library/jest-dom'],
  
    // Jest에서 ECMAScript 모듈을 올바르게 지원하기 위한 설정입니다.
    globals: {
      'ts-jest': {
        useESM: true,
      },
    },
    transformIgnorePatterns: [
      "/node_modules/(?!(module-to-transform|another-module)/)"
    ]
  };
  
  
  