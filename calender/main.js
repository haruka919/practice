'use strict';
console.clear();

{

  const today = new Date();
  let year = today.getFullYear();
  let month = today.getMonth(); //7月

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
    if (year === today.getFullYear() && month === today.getMonth()) {
      dates[today.getDate() - 1].isToday = true;
    }
    return dates;
  }

  function clearCalender() {
    const tbody = document.querySelector('tbody');

    while (tbody.firstChild) {
      tbody.removeChild(tbody.firstChild);
    }
  }

  function renderTitle() {
    const title = `${year}/${String(month + 1).padStart(2, '0')}`;
    document.getElementById('title').textContent = title;
  }

  function renderWeeks() {
    const dates = [
      ...getCalenderHead(),
      ...getCalenderBody(),
      ...getCalenderTail(),
    ];

    const weeks = [];
    const weeksCount = dates.length / 7;

    for (let i = 0; i < weeksCount; i++) {
      weeks.push(dates.splice(0, 7));
    }
    weeks.forEach(week => {
      const tr = document.createElement('tr');
      week.forEach(date => {
        const td = document.createElement('td');
        td.textContent = date.date;
        if (date.isToday) {
          td.classList.add('today');
        }
        if (date.isDisabled) {
          td.classList.add('disabled');
        }

        tr.appendChild(td);
      });
      document.querySelector('tbody').appendChild(tr);
    });
  }

  /**
   * カレンダーを作成（日付を統合）
   */
  function createCalendar() {
    clearCalender();
    renderTitle();
    renderWeeks();
  }

  /**
   * 先月を表示
   */
  document.getElementById('prev').addEventListener('click', () => {
    month--;
    if (month < 0) {
      year--;
      month = 11;
    }
    createCalendar();
  });

  /**
   * 翌月を表示
   */
  document.getElementById('next').addEventListener('click', () => {
    month++;
    if (month > 11) {
      year++;
      month = 0;
    }
    createCalendar();
  });


  /**
   * 今日の戻る
   */
  document.getElementById('today').addEventListener('click', () => {
    year = today.getFullYear();
    month = today.getMonth();
    createCalendar();
  });

  createCalendar();
}