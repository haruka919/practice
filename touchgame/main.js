'use strict';

{
  class Panel {
    constructor() {
      this.el = document.createElement('li');
      this.el.classList.add('pressed');
      this.el.addEventListener('click', () => {
        this.check();
      })
    }

    getEl() {
      return this.el;
    }

    activate(num) {
      this.el.classList.remove('pressed');
      this.el.textContent = num;
    }

    check() {
      if (currentNum === parseInt(this.el.textContent, 10)) {
        this.el.classList.add('pressed');
        currentNum++;
      }

      if (currentNum === 4) {
        clearTimeout(setTimeoutId);
      }
    }
  }
  class Board {
    constructor() {
      this.panels = [];
      for (let i = 0; i < 4; i++) {
        this.panels.push(new Panel());
      }
      this.setUp();
    }
    setUp() {
      const board = document.getElementById('board');
      this.panels.forEach(panel => {
        board.appendChild(panel.getEl()); // プロパティではなくメソッド経由で取得する（カプセル化）
      })
    }

    activate() {
      const nums = [0, 1, 2, 3];
      this.panels.forEach(panel => {
        const num = nums.splice(Math.floor(Math.random() * nums.length), 1)[0];
        panel.activate(num);
      })
    }
  }

  const board = new Board();

  let currentNum; //押せる数字
  let startTime;
  let setTimeoutId;

  function runTimer() {
    const timer = document.getElementById('timer');
    timer.textContent = ((Date.now() - startTime) / 1000).toFixed(2);
    setTimeoutId = setTimeout(() => {
      runTimer();
    }, 10);
  }

  const btn = document.getElementById('btn');
  btn.addEventListener('click', () => {
    if (typeof setTimeoutId !== undefined) {
      clearTimeout(setTimeoutId);
    }
    currentNum = 0;
    board.activate();
    startTime = Date.now();
    runTimer();
  });
}