'use strict';
{
  const word = 'apple';  //タイピングする文字
  let loc = 0; //タイピングする位置

  const target = document.getElementById('target');
  target.textContent = word;

  window.addEventListener('keydown', e => {
    if (e.key === word[loc] ) {
      console.log('score')
      loc++;
    } else {
      console.log('miss');
    }
  });
}