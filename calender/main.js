'use strict';
console.clear();

{
  const year = 2020;
  const month = 6; //7月

  /**
   * 先月の日付を取得
   */
  function getCalenderHead() {
    const dates = [];
    const lastDateOfLastMonth = new Date(year, month, 0).getDate(); // 先月(6/30)の末日を取得 => 30
    const firstDayOfThisMonth = new Date(year, month, 1).getDay(); // 今月(7/1)の曜日を取得 => 3

    for (let i = 0; i < firstDayOfThisMonth; i++) {
      // 30
      // 29, 30
      // 28, 29, 30
      dates.unshift({
        date: lastDateOfLastMonth - i,
        isToday: false,
        isDisabled: true,
      });
    }
    return dates;
  }


  /**
   * 来月の日付を取得
   */
  function getCalenderTail() {
    const dates = [];
    const lastDayOfNextMonth = new Date(year, month + 1, 0).getDay(); // 今月の末日(7/31)の曜日を取得 => 5
    for (let i = 1; i < 7 - lastDayOfNextMonth; i++) {
      dates.push({
        date: i,
        isToday: false,
        isDisabled: true,
      });
    }
    return dates;
  }

  /**
   * 今月の日付を取得
   */
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
    return dates;
  }

  /**
   * カレンダーを作成（日付を統合）
   */
  function createCalendar() {
    const dates = [
      ...getCalenderHead(),
      ...getCalenderBody(),
      ...getCalenderTail(),
    ];
    console.log(dates);
  }

  createCalendar();
}