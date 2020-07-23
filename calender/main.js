'use strict';
console.clear();

{
  const year = 2020;
  const month = 6; //7月

  function getCalenderHead() {
    const dates = [];
    const lastDateOfLastMonth = new Date(year, month, 0).getDate(); // 先月(6/30)の末日を取得 => 30
    const lastDateOfLastDay = new Date(year, month, 1).getDay(); // 今月(7/1)の曜日を取得 => 3

    for (let i = 0; i < lastDateOfLastDay; i++) {
      // 30
      // 29, 30
      // 28, 29, 30
      dates.unshift({
        date: lastDateOfLastMonth - i,
        isToday: false,
        isDisabled: true,
      });
    }
    console.log(dates);
  }

  function getCalenderBody() {
    const dates = []; //date:日付, day:曜日
    const lastDateOfThisMonth = new Date(year, month + 1, 0).getDate(); // 今月の末日を取得

    for (let i = 1; i <= lastDateOfThisMonth; i++) {
      dates.push({
        date: i,
        isToday: false,
        isDisabled: false,
      });
    }
    console.log(dates);
  }

  getCalenderBody();
  getCalenderHead();
}