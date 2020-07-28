{
  // クイズデータ
  class QuizData {
    constructor(quiz) {
      this.quiz = quiz;
      this.api_url = `https://opentdb.com/api.php?amount=1&type=multiple`
      this.getQuizData(this.api_url);
    }
    getQuizData(url) {
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          this.quiz.setQuizzes(data.results[0]);
        })
    }
  }
  
  // クイズ関連の操作
  class Quiz {
    constructor(count) {
      this.title = document.querySelector(".title");
      this.text = document.querySelector(".text");
      this.info = document.querySelector(".info");
      this.answerList = document.querySelector(".answer-list");
      this.startButton = document.querySelector(".start");
      this.count = count; // クイズの問題数
      // クイズに関する情報を格納
      this.quizInfo = {
        quizzes: [],
        currentQuizIndex: 0,
        correctCount: 0,
      };
      this.reset();
      this.startButton.addEventListener("click", () => {
        this.startQuiz();
      });
    }

    // 初期表示
    reset() {
      this.title.textContent = "ようこそ";
      this.text.textContent = "下記ボタンをクリック";
      this.info.hidden = true;
      this.startButton.hidden = false;
      this.quizInfo.currentQuizIndex = 0;
      this.quizInfo.correctCount = 0;
    }

    // クイズを開始する
    startQuiz() {
      // ロード中の表示
      this.title.textContent = "取得中";
      this.text.textContent = "少々お待ちください";
      this.startButton.hidden = true;
      for (let i = 0; i < this.count; i++) {
        new QuizData(this);
      }
      this.setQuiz();
    }

    setQuizzes(results) {
      this.quizInfo.quizzes.push(results);
      console.log(this.quizInfo.quizzes);
    }

    // クイズをセットする
    setQuiz() {
      // 前回の回答リストをリセット
      this.answerList.innerHTML = "";
      // クイズ画面 or 最終問題であれば終了画面を表示
      if (this.quizInfo.currentQuizIndex < this.count) {
        let currentQuiz = this.quizInfo.quizzes[this.quizInfo.currentQuizIndex];
        this.makeQuiz(this.quizInfo.currentQuizIndex, currentQuiz);
      } else {
        this.finishQuiz();
      }
    }

    // 問題を作成
    makeQuiz(index, quiz) {
      this.title.textContent = `問題${index + 1}`;
      this.info.hidden = false;
      document.getElementById("category").textContent = quiz.category;
      document.getElementById("difficulty").textContent = quiz.difficulty;
      this.text.innerHTML = quiz.question;

      // ランダムに並べた回答リスト（配列）を取得
      const answers = this.makeAnswers(quiz);

      answers.forEach((answer) => {
        // 回答ボタンを作成
        let answerButton = document.createElement("button");
        this.answerList.appendChild(answerButton);
        answerButton.innerHTML = answer;
        answerButton.addEventListener("click", (e) => {
          // 正解であれば、正答数カウントを1増やす
          if (e.target.textContent === quiz.correct_answer) {
            this.quizInfo.correctCount++;
          }
          // インデックスカウントを増やし、次のクイズをセット
          this.quizInfo.currentQuizIndex++;
          this.setQuiz();
        });
      });
    }

    // ランダムな回答リストを作成
    makeAnswers(quiz) {
      const answers = [quiz.correct_answer, ...quiz.incorrect_answers];
      return this.shuffle(answers);
    }

    // 配列をシャッフルする
    shuffle([...arr]) {
      let m = arr.length;
      while (m) {
        const i = Math.floor(Math.random() * m--);
        [arr[m], arr[i]] = [arr[i], arr[m]];
      }
      return arr;
    }

    getCount() {
      return this.count;
    }

    // 終了画面
    finishQuiz() {
      this.info.hidden = true;
      this.title.textContent = `あなたの正答数は${this.quizInfo.correctCount}問です。`;
      this.text.textContent = "再度チャレンジしたい場合は以下をクリック！！";
      // ホームへ戻るボタンを作成
      let backHomeButton = document.createElement("button");
      document.querySelector(".container").appendChild(backHomeButton);
      backHomeButton.textContent = "ホームに戻る";
      // ホームへ戻るボタンをクリックしたら、ホームボタンを削除・初期化処理を行う
      backHomeButton.addEventListener("click", (e) => {
        backHomeButton.remove();
        this.reset();
      });
    }
  }


  new Quiz(10);
}