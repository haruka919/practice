'use strict';
{
  const question = document.getElementById('question');
  const choices = document.getElementById('choices');
  const btn = document.getElementById('btn');

  const quizSet = [
    {q: 'What is A?', c:['A0', 'A1', 'A2']},
    {q: 'What is B?', c:['B0', 'B1', 'B2']},
    {q: 'What is C?', c:['C0', 'C1', 'C2']},
  ];

  let currentNum = 0;
  let isAnswered = false;


  /**
   * 配列をシャッフルする 
   */
  function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1)); // 配列の最後の要素を除き、その中でランダムに決める
      [arr[j], arr[i]] = [arr[i], arr[j]];
    }
    return arr;
  }

  /**
   * 解答の正誤判定
   */
  function checkAnswer(li) {
    if (isAnswered) {
      return;
    }
    isAnswered = true;
    if (li.textContent === quizSet[currentNum].c[0]) {
      li.classList.add('correct');
    } else {
      li.classList.add('wrong');
    }
  }


  /**
   * クイズをセットする
   */
  function setQuiz() {
    question.textContent = quizSet[currentNum].q;

    const shuffledChoices = shuffle([...quizSet[currentNum].c]); //スプレッド演算子にすることで参照されない。コピーの配列を新たに作っている
    shuffledChoices.forEach(choice => {
      const li = document.createElement('li');
      li.textContent = choice;
      li.addEventListener('click', () => {
        checkAnswer(li);
      });
      choices.appendChild(li);
    });
  }

  setQuiz();
}