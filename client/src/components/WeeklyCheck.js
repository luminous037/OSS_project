import React, { useState } from 'react';
import Calendar from 'react-calendar';

function WeeklyCheck() {
  // 출석 데이터 상태 설정 (예: [2024, 3, 10] -> 2024년 4월 10일 출석)
  const [attendanceData, setAttendanceData] = useState([]);

  // 출석 데이터 추가 함수
  function addAttendance(date) {
    setAttendanceData([...attendanceData, date]);
  }

  // 달력 날짜 클릭 핸들러
  function handleDateClick(date) {
    // 이미 출석한 날짜인지 확인
    const isAttended = attendanceData.some(d => d.getTime() === date.getTime());
    if (!isAttended) {
      addAttendance(date);
    } else {
      // 이미 출석한 날짜라면 출석 취소
      setAttendanceData(attendanceData.filter(d => d.getTime() !== date.getTime()));
    }
  }

  return (
    <div>
      <h1>Meddy Check</h1>
      <Calendar
        onClickDay={handleDateClick}
        tileClassName={({ date, view }) => {
          // 날짜에 따라 스타일 지정
          if (attendanceData.some(d => d.getTime() === date.getTime())) {
            // 출석한 날짜는 초록색으로 표시
            return 'attended';
          } else {
            // 출석하지 않은 날짜는 빨간색으로 표시
            return 'absent';
          }
        }}
      />
    </div>
  );
}

export default WeeklyCheck;
