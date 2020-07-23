'use strict';
{
  const word = 'apple';  //タイピングする文字
  let loc = 0; //タイピングする位置

  let score = 0;
  let miss = 0;

  const target = document.getElementById('target');
  const scoreLabel = document.getElementById('score');
  const missLabel = document.getElementById('miss');

  target.textContent = word;

  window.addEventListener('keydown', e => {
    if (e.key === word[loc] ) {
      score++;
      loc++;
      scoreLabel.textContent = score;
    } else {
      miss++;
      missLabel.textContent = miss;
    }
  });
}