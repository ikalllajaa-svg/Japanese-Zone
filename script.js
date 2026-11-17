const search = document.getElementById("search");
const words = document.querySelectorAll(".word");

search.addEventListener("input", function () {
  const keyword = search.value.toLowerCase();

  words.forEach(function (word) {
    const content = word.textContent.toLowerCase();

    word.style.display = content.includes(keyword)
      ? "flex"
      : "none";
  });
});

// QUIZ

const quizData = [
  {
    question: "Apa arti dari ありがとう?",
    answers: ["Halo", "Terima kasih", "Selamat pagi", "Maaf"],
    correct: 1
  },
  {
    question: "Apa arti dari こんにちは?",
    answers: ["Halo", "Selamat malam", "Sampai jumpa", "Ya"],
    correct: 0
  },
  {
    question: "Bagaimana bahasa Jepang dari 'Saya'?",
    answers: ["Anata", "Watashi", "Sensei", "Gakusei"],
    correct: 1
  },
  {
    question: "Apa arti dari はい (Hai)?",
    answers: ["Tidak", "Maaf", "Ya", "Terima kasih"],
    correct: 2
  },
  {
    question: "Apa arti dari ねこ (Neko)?",
    answers: ["Anjing", "Kucing", "Burung", "Ikan"],
    correct: 1
  }
];

let currentQuestion = 0;
let score = 0;
let answered = false;

const questionEl = document.getElementById("question");
const answersEl = document.getElementById("answers");
const feedbackEl = document.getElementById("feedback");
const progressEl = document.getElementById("progress");
const nextBtn = document.getElementById("nextBtn");

function showQuestion() {
  answered = false;

  const q = quizData[currentQuestion];

  questionEl.textContent = q.question;
  progressEl.textContent =
    `Soal ${currentQuestion + 1} dari ${quizData.length}`;

  answersEl.innerHTML = "";
  feedbackEl.textContent = "";
  nextBtn.hidden = true;

  q.answers.forEach(function (answer, index) {
    const button = document.createElement("button");

    button.textContent = answer;
    button.className = "answer-btn";

    button.addEventListener("click", function () {
      checkAnswer(index);
    });

    answersEl.appendChild(button);
  });
}

function checkAnswer(index) {
  if (answered) return;

  answered = true;

  const q = quizData[currentQuestion];
  const buttons = answersEl.querySelectorAll("button");

  buttons.forEach(function (button) {
    button.disabled = true;
  });

  if (index === q.correct) {
    score++;
    feedbackEl.textContent = "Benar! Sugoi! 🎉";
  } else {
    feedbackEl.textContent =
      "Belum tepat. Jawaban: " + q.answers[q.correct];
  }

  nextBtn.hidden = false;

  nextBtn.textContent =
    currentQuestion === quizData.length - 1
      ? "Lihat Hasil"
      : "Soal Berikutnya";
}

nextBtn.addEventListener("click", function () {
  currentQuestion++;

  if (currentQuestion < quizData.length) {
    showQuestion();
  } else {
    showResult();
  }
});

function showResult() {
  questionEl.textContent = "Quiz Selesai! おめでとう!";
  answersEl.innerHTML = "";

  feedbackEl.textContent =
    `Nilai kamu: ${score} dari ${quizData.length}`;

  progressEl.textContent = "Terima kasih sudah belajar!";

  nextBtn.hidden = false;
  nextBtn.textContent = "Ulangi Quiz";
  nextBtn.onclick = restartQuiz;
}

function restartQuiz() {
  currentQuestion = 0;
  score = 0;

  nextBtn.onclick = null;
  nextBtn.addEventListener("click", function restartHandler() {
    // Handler quiz normal sudah tersedia.
  }, { once: true });

  showQuestion();
}

showQuestion();
