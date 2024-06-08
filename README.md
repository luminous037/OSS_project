# Meddy Baby

<b>약 먹기 싫어하는 아이들을 위한 도우미 서비스</b>
<p><br></p>

# 설치 방법

**1. node.js 설치**
- node.js 공식 홈페이지에서 설치하기
  
  https://nodejs.org/ko/

- node.js 버전 확인하기
```sh
~$ node -v
```
<p><br></p>

**2. yarn 패키지 매니저 설치**
- yarn 설치
```sh
~$ npm install --global yarn
```

- yarn 버전 확인하기
```sh
~$ yarn --version
```
<p><br></p>

**3. react 설치**
- react 설치하기
```sh
~$ npx create-react-app blog
```

- macos에서 permission error 발생 시 입력하기
```sh
~$ sudo npx create-react-app blog
```
<p><br></p>

**4. mongoDB 연결**

1. vs code에서 mongoDB 확장 설치
2. mongoDB 연동하기
```sh
mongodb+srv://Gaudul:<password>@meddybaby.plkzmsm.mongodb.net/
```

<p><br></p>

**5. firebase 연결**
1. firebase 콘솔에서 프로젝트 생성
2. 프로젝트 설정에서 SDK 설정 env 파일에 저장
3. 프로젝트 설정의 서비스 계정에서 비공개 키 다운
4. 위 2,3 번 내용의 파일을 서버 폴더에 저장

SDK설정 .env 파일 형식
```sh
FIREBASE_API_KEY = "your Firebase Api Key"
FIREBASE_AUTH_DOMAIN = "your Firebase Auth Domain"
FIREBASE_PROJECT_ID = "your Firebase Project Id"
FIREBASE_STORAGE_BUCKET = "your Firebase Storage Bucket"
FIREBASE_MESSAGING_SENDER_ID = "your Firebase Messaging Sender Id"
FIREBASE_APP_ID = "your Firebase App Id"
FIREBASE_MEASUREMENT_ID = "your FireBase Measurement Id"

PORT='your port Number'
```

<p><br></p>

# 의존성

<h10>**OS**</h10>
<p>windows / Mac / Linux</p>

<h10>**Library**</h10>
<p>Node.js / React</p>

<h10>**DB**</h10>
<p>mongoDB</p>

<p><br></p>

# 실행 방법

- repository 복제
```sh
~$ git clone https://github.com/luminous037/OSS_project.git
```


- 서버 폴더에 sdk설정한 .env 파일과 serviceAccountKey.json 파일 추가

- Module 및 library 설치
- 루트 디렉토리, server 폴더, client폴더에서
```sh
~$ npm install
```
- * 위 방법으로 해결이 안될 시
```sh
~$ npm install dotenv
~$ npm install node-cron
~$ npm install firebase-admin
~$ npm install express
```
- client 경로로 이동한 후
```sh
npm install firebase 
```
- server 경로로 이동한 후
```sh
npm install concurrently --save-dev
```
  
```sh
cd server
yarn dev
```
<p><br></p>







# 구성원
| **엄지현 (팀장)** | **민선주** | **임수현** | 
|:---:|:---:|:---:|
| <img src="https://avatars.githubusercontent.com/u/135002121?v=4" width="100" height="100"> | <img src="https://github.com/minseonju.png" width="100" height="100"> | <img src="https://avatars.githubusercontent.com/u/137772044?v=4" width="100" height="100"> |
| <a href="mailto:luminous037@gmail.com"><img src="https://img.shields.io/badge/EMAIL-F0F0F0?style=flat-square&logo=Gmail&logoColor=orange&link=mailto:luminous037@gmail.com"/></a> | <a href="mailto:10sc1108@naver.com"><img src="https://img.shields.io/badge/EMAIL-F0F0F0?style=flat-square&logo=Gmail&logoColor=orange&link=mailto:10sc1108@naver.com"/></a> | <a href="mailto:limjsu12@naver.com"><img src="https://img.shields.io/badge/EMAIL-F0F0F0?style=flat-square&logo=Gmail&logoColor=orange&link=mailto:limjsu12@naver.com"/></a> |
| <a href="https://github.com/luminous037">GitHub</a> | <a href="https://github.com/minseonju">GitHub</a> | <a href="https://github.com/GAUDUL">GitHub</a> |
