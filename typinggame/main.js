'use strict';
{
  const words = ['apple', 'sky', 'blue', 'green'];  //タイピングする文字
  let word = words[Math.floor(Math.random() * words.length)];
  let loc = 0; //タイピングする位置

  let score = 0;
  let miss = 0;
  const timeLimit = 3 * 1000;
  let startTime;

  const target = document.getElementById('target');
  const scoreLabel = document.getElementById('score');
  const missLabel = document.getElementById('miss');
  const timerLabel = document.getElementById('timer');

  function updateTarget() {
    let placeholder = '';
    for (let i = 0; i < loc; i++) {
      placeholder += '_';
    }
    target.textContent = placeholder + word.substring(loc)
  }

  function updateTimer() {
    const timeLeft = startTime + timeLimit - Date.now(); //残り時間
    timerLabel.textContent = (timeLeft / 1000).toFixed(2); //小数点2桁表示
  }
  /**
   * クリックしたら、ゲームスタート
   */
  window.addEventListener('click', () => {
    target.textContent = word;
    startTime = Date.now();
    updateTimer();
  });

  window.addEventListener('keydown', e => {
    if (e.key === word[loc] ) {
      loc++;
      if(loc === word.length) {
        word = words[Math.floor(Math.random() * words.length)];
        loc = 0;
      }
      updateTarget();
      score++;
      scoreLabel.textContent = score;
    } else {
      miss++;
      missLabel.textContent = miss;
    }
  });
}