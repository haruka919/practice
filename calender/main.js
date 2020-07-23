'use strict';
{
  const year = 2020;
  const month = 4; //5月

  function getCalenderBody() {
    const dates = []; //date:日付, day:曜日
    const lastDate = new Date(year, month + 1, 0).getDate(); // 今月の末日を取得

    for (let i = 1; i <=lastDate; i++) {
      dates.push(i);
    }
    console.log(dates);
  }

  getCalenderBody();
}